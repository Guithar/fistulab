import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { ArmShape } from '../../src/anatomy/armShape';
import { caseById, CASES } from '../../src/anatomy/cases';
import { waveFactor, waveStats } from '../../src/anatomy/hemo';
import { AnatomyModel } from '../../src/anatomy/model';
import { Needle } from '../../src/interaction/needle';
import { computePose, defaultProbeState, skinParamAbove } from '../../src/interaction/probePose';
import type { ProbePose } from '../../src/sim/UltrasoundSim';
import { catheterPct, Metrics, pivChecks, PivOutcome } from '../../src/training/metrics';
import { FLUSH_INJECT_S, flushParams, innerDiameter, jetVelocity } from '../../src/sim/flush';
import { armPositionOk, ChecklistState, procedureChecklist, zoneOk } from '../../src/training/checklist';
import { LESSONS } from '../../src/training/lessons';

function build(id: string) {
  const cd = caseById(id);
  const arm = new ArmShape(undefined, cd.armOpts);
  const model = new AnatomyModel(arm, cd.build(arm));
  model.hr = cd.hr;
  model.updateDynamics(0.3);
  return { cd, arm, model };
}

describe('hemodinámica', () => {
  it('las formas de onda tienen media 1 a lo largo del ciclo', () => {
    for (const k of ['feed', 'avf', 'artery', 'mixed', 'graft'] as const) {
      let s = 0;
      const N = 2000;
      for (let i = 0; i < N; i++) s += waveFactor(k, (i / N) * (60 / 72), 72);
      expect(s / N).toBeCloseTo(1, 2);
    }
  });

  it('índices de resistencia coherentes con la literatura', () => {
    expect(waveStats('feed').ri).toBeGreaterThan(0.4); // arteria nutricia de FAV ≈ 0.47 ± 0.07
    expect(waveStats('feed').ri).toBeLessThan(0.58);
    expect(waveStats('artery').ri).toBeGreaterThan(0.9); // arteria periférica en reposo ≈ 1
    expect(waveStats('avf').ri).toBeLessThan(0.5);
  });
});

describe('forma del brazo', () => {
  it('centrar la sonda sobre el vaso deja su eje en la normal de la piel', () => {
    const { arm, model } = build('rc_madura');
    const fav = model.byId('fav')!;
    for (const k of [40, 70, 100]) {
      const c = fav.samples[k].p;
      const f = (() => {
        const par = skinParamAbove(arm, c);
        return arm.skinFrame(par.x, par.theta);
      })();
      const d = c.clone().sub(f.S);
      const offAxis = d.addScaledVector(f.N, -d.dot(f.N)).length();
      expect(offAxis).toBeLessThan(0.05); // mm
    }
  });

  it('en eje largo sobre el vaso hay una sola etiqueta para él', () => {
    const { arm, model } = build('rc_madura');
    const fav = model.byId('fav')!;
    const st = { ...defaultProbeState(), ...skinParamAbove(arm, fav.samples[70].p), rot: 90 };
    const pose = computePose(arm, st, { F: new Vector3(), L: new Vector3(), B: new Vector3(), E: new Vector3(), press: 0, width: 38 } as ProbePose);
    const cr = model.planeCrossings(pose.F, pose.L, pose.B, pose.E, 38, 25).filter((c) => c.st === fav);
    expect(cr.length).toBe(1);
    expect(cr[0].along).toBe(true);
    // en eje corto sigue siendo un cruce (las lecciones distinguen así el corte transversal)
    const tr = computePose(arm, { ...st, rot: 0 }, { ...pose } as ProbePose);
    const cc = model.planeCrossings(tr.F, tr.L, tr.B, tr.E, 38, 25).filter((c) => c.st === fav);
    expect(cc.length).toBe(1);
    expect(cc[0].along).toBe(false);
  });

  it('surfacePoint y skinDepth son coherentes', () => {
    const arm = new ArmShape();
    for (const [x, th, d] of [
      [50, 40, 3],
      [120, -60, 6],
      [300, 80, 5],
      [150, 0, 10],
    ]) {
      const p = arm.surfacePoint(x, th, 'skin', d);
      expect(arm.skinDepth(p)).toBeCloseTo(d, 0);
    }
  });
});

describe('modelo anatómico', () => {
  it('todos los casos se construyen sin errores', () => {
    for (const c of CASES) {
      const arm = new ArmShape(undefined, c.armOpts);
      const m = new AnatomyModel(arm, c.build(arm));
      expect(m.structures.length).toBeGreaterThan(10);
      if (c.access) expect(m.byId(c.access.veinId)).toBeDefined();
    }
  });

  it('el centro de la FAV está en la luz y la sangre fluye hacia proximal', () => {
    const { model } = build('rc_madura');
    const fav = model.byId('fav')!;
    const smp = fav.samples[Math.floor(fav.samples.length * 0.25)];
    const q = model.query(smp.p);
    expect(q.inLumen).toBe(true);
    expect(q.struct?.def.id).toBe('fav');
    expect(q.vel.dot(smp.t)).toBeGreaterThan(20); // cm/s
    expect(q.vel.length()).toBeLessThan(200);
  });

  it('la integral del perfil de velocidad reproduce el caudal (continuidad)', () => {
    const { model } = build('rc_madura');
    const fav = model.byId('fav')!;
    const smp = fav.samples[80];
    const t = smp.t;
    const n1 = new Vector3(0, 1, 0).addScaledVector(t, -t.y).normalize();
    const n2 = new Vector3().crossVectors(t, n1);
    const R = smp.r * fav.dyn.radiusScale;
    let flow = 0; // cm³/s
    const N = 60;
    const dA = ((2 * R) / N) ** 2 / 100; // cm²
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        const a = -R + ((i + 0.5) * 2 * R) / N;
        const b = -R + ((j + 0.5) * 2 * R) / N;
        if (a * a + b * b > R * R * 0.995) continue;
        const p = smp.p.clone().addScaledVector(n1, a).addScaledVector(n2, b);
        const q = model.query(p);
        if (q.inLumen && q.struct === fav) flow += q.vel.dot(t) * dA;
      }
    expect(flow / fav.dyn.qNow).toBeGreaterThan(0.85);
    expect(flow / fav.dyn.qNow).toBeLessThan(1.15);
  });

  it('la estenosis acelera el flujo (VPS > 3× la vena de salida)', () => {
    const { model } = build('rc_estenosis');
    const fav = model.byId('fav')!;
    let minR = Infinity;
    let iMin = 0;
    fav.samples.forEach((s, i) => {
      if (s.s > 8 && s.s < 40 && s.r < minR) {
        minR = s.r;
        iMin = i;
      }
    });
    const vSten = model.query(fav.samples[iMin].p).vel.length();
    const vDown = model.query(fav.samples[iMin + 60].p).vel.length();
    expect(minR * 2).toBeLessThan(2.2); // luz residual < 2 mm aprox.
    expect(vSten / vDown).toBeGreaterThan(3);
  });
});

describe('aguja', () => {
  it('atraviesa piel y pared, entra en la luz y produce reflujo', () => {
    const { arm, model } = build('rc_madura');
    const fav = model.byId('fav')!;
    const target = fav.samples[70].p;
    const th = (Math.atan2(target.z, target.y) * 180) / Math.PI;
    const n = new Needle('venosa');
    const events: string[] = [];
    n.onEvent = (e) => events.push(e.type);
    // entrar 10 mm distal al objetivo con 35°, en dirección proximal
    n.place(arm, target.x - 9, th, 0, 35);
    const ids = new Set(['fav']);
    for (let i = 0; i < 120 && n.state !== 'luz'; i++) {
      n.depth += 0.2;
      n.update(model, i * 0.05, ids);
    }
    expect(events).toContain('skin');
    expect(events).toContain('tent');
    expect(events).toContain('pop');
    expect(events).toContain('flash');
    expect(n.state).toBe('luz');
    // seguir avanzando con 35° acaba contactando con la pared posterior
    for (let i = 0; i < 80; i++) {
      n.depth += 0.2;
      n.update(model, 10 + i * 0.05, ids);
    }
    expect(events).toContain('backwall');
  });

  it('bajar el ángulo con la punta en la luz no es una redirección; pivotar en el tejido sí', () => {
    const { arm, model } = build('rc_madura');
    const fav = model.byId('fav')!;
    const target = fav.samples[70].p;
    const th = (Math.atan2(target.z, target.y) * 180) / Math.PI;
    const ids = new Set(['fav']);
    const n = new Needle('venosa');
    n.place(arm, target.x - 9, th, 0, 35);
    let t = 0;
    for (let i = 0; i < 120 && n.state !== 'luz'; i++) {
      n.depth += 0.2;
      n.update(model, (t += 0.05), ids);
    }
    expect(n.state).toBe('luz');
    // aplanar y avanzar a la vez (AvPág + ↑) hasta 23°
    for (let i = 0; i < 12; i++) {
      n.angle -= 1;
      n.depth += 0.4;
      n.update(model, (t += 0.05), ids);
    }
    expect(n.state).toBe('luz');
    expect(n.redirections).toBe(0);
    // con la punta en el tejido, un giro de 6° sí es una redirección
    const m = new Needle('venosa');
    m.place(arm, target.x - 9, th, 0, 35);
    m.depth = 3;
    m.update(model, 0, ids);
    expect(m.state).toBe('tejido');
    m.heading = 6;
    m.update(model, 0.1, ids);
    expect(m.redirections).toBe(1);
  });

  it('cruzar el rumbo ±180° gira por el camino corto (sin barrido de 360°)', () => {
    const { arm, model } = build('rc_madura');
    const n = new Needle('venosa');
    n.place(arm, 120, 40, 179, 30);
    const ids = new Set(['fav']);
    n.depth = 4;
    n.update(model, 0, ids);
    const tip0 = n.tip.clone();
    n.heading = -179; // 2° de giro real
    n.update(model, 0.1, ids);
    expect(n.tip.distanceTo(tip0)).toBeLessThan(0.3);
    expect(n.redirections).toBe(0);
    expect(n.heading).toBeCloseTo(-179, 5);
  });

  it('el nervio cubital no atraviesa el epicóndilo en ningún caso', () => {
    for (const c of CASES) {
      const arm = new ArmShape(undefined, c.armOpts);
      const m = new AnatomyModel(arm, c.build(arm));
      const nerve = m.byId('n_cubital');
      const epi = m.byId('humero_epi');
      if (!nerve || !epi) continue;
      for (const s of nerve.samples) {
        const q = m.query(s.p);
        expect(q.struct?.def.kind).not.toBe('bone');
      }
    }
  });
});

describe('lavado con suero', () => {
  it('chorro de alta velocidad a la salida de una aguja 15G (≈ 2 m/s)', () => {
    const v = jetVelocity(innerDiameter(1.829));
    expect(v).toBeGreaterThan(150);
    expect(v).toBeLessThan(300);
  });

  it('en una FAV de alto flujo el penacho sale del campo en cuanto termina la inyección', () => {
    const fav = { t0: 10, sidx: 3, vmean: 500, qVessel: 15, jetVel: 200 };
    const during = flushParams(fav, 11);
    expect(during.active).toBe(true);
    expect(during.jet).toBeCloseTo(1, 5);
    expect(during.tail).toBe(0);
    expect(during.intensity).toBeGreaterThan(0.5);
    expect(flushParams(fav, 10 + FLUSH_INJECT_S + 1).active).toBe(false);
  });

  it('en una vena de flujo lento el penacho se ve más tiempo y está menos diluido', () => {
    const vein = { t0: 0, sidx: 1, vmean: 40, qVessel: 0.5, jetVel: 200 };
    const p = flushParams(vein, FLUSH_INJECT_S + 1);
    expect(p.active).toBe(true);
    expect(p.tail).toBeGreaterThan(0);
    expect(p.front).toBeGreaterThan(p.tail);
    expect(p.jet).toBeLessThan(0.01);
    const fav = flushParams({ ...vein, vmean: 500, qVessel: 15 }, 1);
    expect(flushParams(vein, 1).intensity).toBeGreaterThan(fav.intensity);
  });
});

describe('lista de pasos de la punción', () => {
  const base: ChecklistState = {
    armAngle: 58,
    armPitch: 17,
    measures: 0,
    probeX: 110,
    access: { anastomosisX: 27, zone: [60, 230] },
    otherTipX: null,
    tourniquet: false,
    asepsis: false,
    placed: false,
    flashed: false,
    inLumen: false,
    angleToVessel: null,
    flushes: 0,
    confirmed: false,
  };

  it('brazo a unos 45° del cuerpo y apoyado', () => {
    expect(armPositionOk(45, 10)).toBe(true);
    expect(armPositionOk(58, 17)).toBe(true); // disposición por defecto de la sala
    expect(armPositionOk(80, 10)).toBe(false); // casi en cruz
    expect(armPositionOk(15, 10)).toBe(false); // pegado al cuerpo
    expect(armPositionOk(45, 35)).toBe(false); // colgando
  });

  it('zona: ≥ 3 cm de la anastomosis, dentro de la zona y ≥ 5 cm de la otra aguja', () => {
    expect(zoneOk(base)).toBe(true);
    expect(zoneOk({ ...base, probeX: 50 })).toBe(false); // a 2,3 cm de la anastomosis
    expect(zoneOk({ ...base, probeX: 250 })).toBe(false); // fuera de la zona
    expect(zoneOk({ ...base, otherTipX: 140 })).toBe(false); // 3 cm de la otra punta
    expect(zoneOk({ ...base, probeX: 160, otherTipX: 102 })).toBe(true);
    expect(zoneOk({ ...base, access: { ...base.access!, avoid: [{ x0: 100, x1: 120 }] } })).toBe(false);
  });

  it('los pasos se marcan con el estado y el compresor depende del tipo de acceso', () => {
    const done = (s: ChecklistState) => procedureChecklist(s).filter((i) => i.done).length;
    expect(done(base)).toBe(2); // brazo y zona
    const full = { ...base, measures: 2, tourniquet: true, asepsis: true, placed: true, flashed: true, inLumen: true, angleToVessel: 20, flushes: 1, confirmed: true };
    expect(done(full)).toBe(9);
    const graft = procedureChecklist({ ...full, access: { ...base.access!, graft: true } });
    expect(graft[3].label).toContain('Sin compresor');
    expect(graft[3].done).toBe(false);
  });
});

describe('vía periférica: caso piv_dificil', () => {
  const ZONE = [300, 320, 340, 360];

  it('se añade al final sin tocar los doce casos de fístula', () => {
    expect(CASES.map((c) => c.id)).toEqual([
      'normal',
      'rc_madura',
      'bc_obeso',
      'rc_tortuosa',
      'rc_estenosis',
      'rc_aneurisma',
      'rc_inmadura',
      'rc_colaterales',
      'bb_transpuesta',
      'ptfe_asa',
      'rc_hematoma',
      'rc_calcificada',
      'piv_dificil',
    ]);
    expect(CASES.filter((c) => c.procedure === 'piv').map((c) => c.id)).toEqual(['piv_dificil']);
  });

  it('enlaza los artículos y las fuentes de sus cifras', () => {
    const { cd } = build('piv_dificil');
    expect(cd.sources!.length).toBeGreaterThanOrEqual(6);
    for (const s of cd.sources!) {
      expect(s.url).toMatch(/^https:\/\//);
      expect(s.label.length).toBeGreaterThan(20);
    }
    // el criterio del 65 % cita su artículo en el caso y en la evaluación
    expect(cd.sources!.some((s) => s.label.includes('Pandurangadu') && s.url.includes('10.1136/emermed-2017-206803'))).toBe(true);
    expect(cd.objectives.join(' ')).toContain('Pandurangadu 2018');
  });

  it('la vena diana está en el límite de la regla 3:1:3: ≈ 3 mm con compresor y a 1–1,5 cm', () => {
    const { cd, arm, model } = build('piv_dificil');
    const zone = cd.access!.zone;
    const v = model.byId(cd.access!.veinId)!;
    expect(v.def.kind).toBe('vein');
    const inZone = v.samples.filter((s) => s.p.x >= zone[0] && s.p.x <= zone[1]);
    expect(inZone.length).toBeGreaterThan(20);
    for (const s of inZone) {
      // sin compresor no llega a los 3 mm
      const d0 = 2 * s.r * v.dyn.radiusScale;
      expect(d0).toBeGreaterThan(2.4);
      expect(d0).toBeLessThan(3);
      // pared anterior a ≈ 1 cm y pared posterior a menos de 1,5 cm; por encima de la fascia
      const depth = arm.skinDepth(s.p);
      expect(depth - s.r).toBeGreaterThan(9.5);
      expect(depth + s.r).toBeLessThan(15);
      expect(arm.fasciaDepth(s.p)).toBeLessThan(-s.r);
      expect(model.query(s.p).inLumen).toBe(true);
    }
    model.tourniquet = true;
    model.updateDynamics(0.3);
    for (const s of inZone) {
      const d1 = 2 * s.r * v.dyn.radiusScale;
      expect(d1).toBeGreaterThanOrEqual(3);
      expect(d1).toBeLessThan(3.4);
    }
  });

  it('las venas superficiales son finas y la arteria humeral y el nervio mediano quedan más profundos, a poca distancia', () => {
    const { arm, model } = build('piv_dificil');
    for (const id of ['v_cefalica', 'v_mediana_ab', 'v_mediana_cubital']) for (const s of model.byId(id)!.samples) expect(2 * s.r).toBeLessThan(2);
    const v = model.byId('v_basilica')!;
    for (const x of ZONE) {
      const at = (id: string) => {
        const st = model.byId(id)!;
        return st.samples.reduce((a, b) => (Math.abs(b.p.x - x) < Math.abs(a.p.x - x) ? b : a));
      };
      const vein = v.samples.reduce((a, b) => (Math.abs(b.p.x - x) < Math.abs(a.p.x - x) ? b : a));
      for (const id of ['a_humeral', 'n_mediano']) {
        const o = at(id);
        expect(arm.skinDepth(o.p)).toBeGreaterThan(arm.skinDepth(vein.p) + 4);
        const d = o.p.distanceTo(vein.p);
        expect(d).toBeGreaterThan(5);
        expect(d).toBeLessThan(30);
      }
    }
  });
});

/** Coloca el catéter sobre aguja apuntando a la vena diana (en plano, hacia proximal) y avanza hasta el reflujo. */
function pivToFlash(angle = 45, length = 48) {
  const { cd, arm, model } = build('piv_dificil');
  model.tourniquet = true;
  model.updateDynamics(0.3);
  const v = model.byId(cd.access!.veinId)!;
  const target = v.samples.find((s) => s.p.x >= 330)!;
  const par = skinParamAbove(arm, target.p);
  const depth = arm.skinDepth(target.p);
  const n = new Needle('venosa');
  n.setCatheter(20, length);
  const events: string[] = [];
  n.onEvent = (e) => events.push(e.type);
  const ids = new Set([v.def.id]);
  let t = 0;
  n.place(arm, par.x - depth / Math.tan((angle * Math.PI) / 180), par.theta, 0, angle);
  const advance = (mm: number) => {
    for (let k = 0; k < Math.round(mm / 0.1); k++) {
      n.depth += 0.1;
      n.update(model, (t += 0.02), ids);
    }
  };
  for (let i = 0; i < 400 && n.state !== 'luz'; i++) advance(0.1);
  const slide = (mm: number) => n.slideCatheter(model, mm, (t += 0.02));
  const withdraw = () => {
    n.depth = -3;
    n.update(model, (t += 0.02), ids);
  };
  return { n, c: n.cath!, model, v, events, ids, advance, slide, withdraw };
}

describe('catéter sobre aguja: máquina de estados', () => {
  it('con el reflujo la punta del catéter aún no está en la vena y no progresa', () => {
    const { n, c, model, events, slide } = pivToFlash();
    expect(n.state).toBe('luz');
    expect(n.inVessel?.def.id).toBe('v_basilica');
    expect(events).toContain('flash');
    expect(n.catheterTipInLumen(model)).toBe(false);
    expect(slide(1)).toBe(false);
    expect(c.stage).toBe('montado');
    expect(c.slid).toBe(0);
    expect(events).toContain('cath-stuck');
  });

  it('avanzando 1–2 mm más entra la punta del catéter; se desliza por la luz y la aguja queda fija', () => {
    const { n, c, model, v, events, advance, slide, ids } = pivToFlash();
    advance(1.8);
    expect(n.state).toBe('luz');
    expect(n.catheterTipInLumen(model)).toBe(true);
    expect(slide(1)).toBe(true);
    expect(c.stage).toBe('avanzado');
    expect(c.vessel).toBe(v);
    expect(events).toContain('cath-advance');
    // la aguja ya no avanza ni cambia de ángulo: sólo puede retirarse
    const d = n.depth;
    n.depth += 3;
    n.angle -= 10;
    n.update(model, 99, ids);
    expect(n.depth).toBe(d);
    expect(n.angle).toBe(45);
    // hasta el cono: todo el tramo libre sigue dentro de la luz
    for (let i = 0; i < 200 && !c.full; i++) slide(0.5);
    expect(c.full).toBe(true);
    expect(n.catheterInserted()).toBeCloseTo(c.length, 3);
    for (const p of [...c.free, c.tip]) {
      const q = model.query(p);
      expect(q.struct).toBe(v);
      expect(q.inLumen).toBe(true);
    }
    // el catéter, flexible, acaba alineado con la vena
    const smp = v.samples[model.nearestSample(v, c.tip).idx];
    expect(Math.abs(smp.t.dot(c.tipDir))).toBeGreaterThan(0.98);
    expect(slide(1)).toBe(false);
  });

  it('retirar la aguja deja el catéter en la vena; la longitud dentro no cambia al soltar el compresor', () => {
    const { n, c, model, v, events, advance, slide, withdraw } = pivToFlash();
    advance(1.8);
    for (let i = 0; i < 200 && !c.full; i++) slide(0.5);
    const mm = n.catheterInVein(model);
    expect(mm).toBeGreaterThan(0.65 * c.length);
    expect(mm).toBeLessThan(c.length - 12);
    withdraw();
    expect(c.stage).toBe('aguja-retirada');
    expect(n.needleOut).toBe(true);
    expect(n.inserted).toBe(true);
    expect(n.state).toBe('luz');
    expect(n.inVessel).toBe(v);
    expect(events).toContain('needle-out');
    expect(n.deviceTip().distanceTo(c.tip)).toBe(0);
    expect(n.catheterEcho().length).toBeGreaterThanOrEqual(2);
    model.tourniquet = false;
    model.updateDynamics(0.4);
    expect(n.catheterInVein(model)).toBeCloseTo(mm, 6);
    n.removeCatheter(100);
    expect(c.stage).toBe('montado');
    expect(n.state).toBe('fuera');
    expect(n.inserted).toBe(false);
  });

  it('con poco ángulo el trayecto hasta la vena se come el catéter: el de 48 mm no llega al 65 % y el de 64 mm sí', () => {
    const run = (angle: number, length: number) => {
      const { n, c, model, advance, slide } = pivToFlash(angle, length);
      advance(2);
      expect(n.state).toBe('luz');
      for (let i = 0; i < 300 && !c.full; i++) slide(0.5);
      return (100 * n.catheterInVein(model)) / c.length;
    };
    expect(run(45, 48)).toBeGreaterThanOrEqual(65);
    expect(run(30, 48)).toBeLessThan(65);
    expect(run(30, 64)).toBeGreaterThanOrEqual(65);
  });

  it('deslizar el catéter con la aguja en el tejido lo deja fuera de la vena', () => {
    const { cd, arm, model } = build('piv_dificil');
    const v = model.byId(cd.access!.veinId)!;
    const target = v.samples.find((s) => s.p.x >= 330)!;
    const par = skinParamAbove(arm, target.p);
    const n = new Needle('venosa');
    n.setCatheter();
    const events: string[] = [];
    n.onEvent = (e) => events.push(e.type);
    n.place(arm, par.x - 12, par.theta, 0, 45);
    n.depth = 6;
    n.update(model, 0, new Set());
    expect(n.state).toBe('tejido');
    expect(n.slideCatheter(model, 5, 1)).toBe(true);
    expect(events).toContain('cath-out');
    expect(n.cath!.outside).toBe(true);
    n.depth = -3;
    n.update(model, 2, new Set());
    expect(n.needleOut).toBe(true);
    expect(n.state).toBe('tejido');
    expect(n.inVessel).toBeNull();
    expect(n.catheterInVein(model)).toBe(0);
  });

  it('en la arteria humeral el catéter no cuenta como «en vena» y los avisos son de error', () => {
    const { arm, model } = build('piv_dificil');
    const n = new Needle('venosa');
    n.setCatheter(20, 64);
    const events: { type: string; severity: string }[] = [];
    n.onEvent = (e) => events.push({ type: e.type, severity: e.severity });
    const ids = new Set(['v_basilica']);
    let t = 0;
    // entrada casi vertical: se busca el punto desde el que la aguja llega a la arteria
    let hit = false;
    for (let th = -75; th <= -5 && !hit; th += 2.5) {
      n.place(arm, 335, th, 0, 70);
      for (let i = 0; i < 330 && n.state !== 'hueso'; i++) {
        n.depth = Math.min(n.maxDepth, n.depth + 0.2);
        n.update(model, (t += 0.02), ids);
        if (n.state === 'luz' && n.inVessel?.def.kind === 'artery') {
          hit = true;
          break;
        }
      }
    }
    expect(hit).toBe(true);
    for (let i = 0; i < 40 && !n.catheterTipInLumen(model) && n.state === 'luz'; i++) {
      n.depth += 0.1;
      n.update(model, (t += 0.02), ids);
    }
    expect(n.catheterTipInLumen(model)).toBe(true);
    expect(n.catheterVessel(model)?.def.kind).toBe('artery');
    expect(n.catheterInVein(model)).toBe(0);
    events.length = 0;
    expect(n.slideCatheter(model, 10, (t += 0.02))).toBe(true);
    expect(events).toContainEqual({ type: 'cath-advance', severity: 'error' });
    expect(n.catheterInVein(model)).toBe(0);
    n.depth = -3;
    n.update(model, (t += 0.02), ids);
    expect(n.needleOut).toBe(true);
    expect(events).toContainEqual({ type: 'needle-out', severity: 'error' });
    expect(n.catheterVessel(model)?.def.kind).toBe('artery');
    expect(n.catheterInVein(model)).toBe(0);
  });

  it('retirar la aguja sin haber deslizado el catéter lo saca todo', () => {
    const { n, c, events, withdraw } = pivToFlash();
    withdraw();
    expect(c.stage).toBe('montado');
    expect(n.needleOut).toBe(false);
    expect(n.state).toBe('fuera');
    expect(events).toContain('withdraw');
  });

  it('al recolocar el catéter, el reflujo del intento anterior ya no cuenta', () => {
    const { n, withdraw } = pivToFlash();
    expect(n.firstFlashTime).toBeGreaterThanOrEqual(0);
    withdraw();
    const { arm } = build('piv_dificil');
    n.place(arm, n.entryX, n.entryTheta, 0, 45);
    expect(n.firstFlashTime).toBe(-1);
  });

  it('una aguja de fístula no tiene catéter', () => {
    const n = new Needle('arterial');
    expect(n.cath).toBeNull();
    expect(n.device).toBe('fistula');
    expect(n.maxDepth).toBe(23);
    expect(n.catheterPath()).toEqual([]);
    expect(n.catheterEcho()).toEqual([]);
    expect(n.deviceTip().equals(n.tip)).toBe(true);
  });
});

describe('vía periférica: métrica, evaluación y lista de pasos', () => {
  const good: PivOutcome = {
    needleOut: true,
    vessel: { name: 'Vena basílica', kind: 'vein' },
    inVeinMm: 32.6,
    lengthMm: 48,
    transfixed: false,
    arteryHit: false,
    nerveHit: false,
    asepsis: true,
    tourniquet: false,
    flushed: true,
    infiltrations: 0,
  };

  it('porcentaje de catéter dentro de la vena', () => {
    expect(catheterPct(32.6, 48)).toBe(68);
    expect(catheterPct(31.2, 48)).toBe(65);
    expect(catheterPct(60, 48)).toBe(100);
    expect(catheterPct(0, 48)).toBe(0);
    expect(catheterPct(10, 0)).toBeNull();
    const m = new Metrics();
    expect(m.snapshot().catheterPct).toBeNull();
    m.catheterInVein = 24;
    m.catheterLength = 48;
    expect(m.snapshot().catheterPct).toBe(50);
    expect(m.snapshot().catheterInVein).toBe(24);
  });

  it('una vía correcta cumple todos los criterios y no incluye los de la fístula', () => {
    const checks = pivChecks(good);
    expect(checks.every((c) => c.ok === true)).toBe(true);
    expect(checks.map((c) => c.label).join(' ')).not.toMatch(/anastomosis|arterial \(|venosa|Separación/i);
    expect(checks[1].detail).toContain('68 %');
    expect(checks[1].label).toContain('Pandurangadu 2018');
  });

  it('criterio de longitud: ≥ 65 % del catéter dentro de la vena', () => {
    expect(pivChecks({ ...good, inVeinMm: 31.2 })[1].ok).toBe(true); // 65 %
    expect(pivChecks({ ...good, inVeinMm: 30.6 })[1].ok).toBe(false); // 64 %
    expect(pivChecks({ ...good, vessel: null })[1].ok).toBeNull();
  });

  it('no es válida con la aguja dentro, fuera de la vena o en una arteria', () => {
    expect(pivChecks({ ...good, needleOut: false })[0].ok).toBe(false);
    expect(pivChecks({ ...good, vessel: null })[0].ok).toBe(false);
    const art = pivChecks({ ...good, vessel: { name: 'Arteria humeral', kind: 'artery' }, arteryHit: true });
    expect(art[0].ok).toBe(false);
    expect(art[2].ok).toBe(false);
    expect(pivChecks({ ...good, nerveHit: true })[2].ok).toBe(false);
    expect(pivChecks({ ...good, transfixed: true })[3].ok).toBe(false);
    expect(pivChecks({ ...good, asepsis: false })[4].ok).toBe(false);
    expect(pivChecks({ ...good, tourniquet: true })[5].ok).toBe(false);
    expect(pivChecks({ ...good, flushed: false })[6].ok).toBe(false);
    expect(pivChecks({ ...good, flushed: false, infiltrations: 1 })[6].detail).toContain('Extravasación');
  });

  it('la extravasación del lavado penaliza la puntuación', () => {
    const m = new Metrics();
    m.onEvent({ t: 1, type: 'infiltration', msg: '', severity: 'error' });
    m.checks = pivChecks({ ...good, vessel: null, flushed: false, infiltrations: 1 });
    expect(m.score()).toBe(100 - 12 - 35 - 5);
  });

  it('lista de pasos propia: once pasos que se marcan con el estado', () => {
    const base: ChecklistState = {
      armAngle: 58,
      armPitch: 17,
      measures: 0,
      probeX: 335,
      access: { zone: [295, 375] },
      otherTipX: null,
      tourniquet: false,
      asepsis: false,
      placed: false,
      flashed: false,
      inLumen: false,
      angleToVessel: null,
      flushes: 0,
      confirmed: false,
      piv: { tourniquetAtPuncture: false, catheterTipInVein: false, inVeinPct: null, threaded: false, needleOut: false, flushed: false },
    };
    const items = procedureChecklist(base);
    expect(items.length).toBe(11);
    expect(items.filter((i) => i.done).length).toBe(1); // el brazo
    expect(items.map((i) => i.label).join(' ')).not.toMatch(/anastomosis|FAV|prótesis/i);
    // con el compresor aún puesto el último paso clínico no se marca
    const placed = { ...base, measures: 2, tourniquet: true, asepsis: true, placed: true, flashed: true, inLumen: true };
    const mid = procedureChecklist({ ...placed, piv: { tourniquetAtPuncture: true, catheterTipInVein: true, inVeinPct: 67, threaded: true, needleOut: true, flushed: false } });
    expect(mid.filter((i) => i.done).length).toBe(9);
    const short = procedureChecklist({ ...placed, piv: { tourniquetAtPuncture: true, catheterTipInVein: true, inVeinPct: 50, threaded: true, needleOut: true, flushed: false } });
    expect(short[7].done).toBe(false);
    const full = procedureChecklist({ ...placed, tourniquet: false, confirmed: true, piv: { tourniquetAtPuncture: true, catheterTipInVein: true, inVeinPct: 67, threaded: true, needleOut: true, flushed: true } });
    expect(full.every((i) => i.done)).toBe(true);
  });
});

describe('lecciones', () => {
  it('cada lección tiene un caso que existe y la de la vía periférica usa el caso nuevo', () => {
    for (const l of LESSONS) expect(CASES.some((c) => c.id === l.caseId)).toBe(true);
    expect(new Set(LESSONS.map((l) => l.id)).size).toBe(LESSONS.length);
    const piv = LESSONS.find((l) => l.id === 'via-periferica')!;
    expect(piv.caseId).toBe('piv_dificil');
    expect(piv.mode).toBe('cannulate');
    // como en las demás, casi todos los pasos se comprueban solos
    expect(piv.steps.every((s) => !!s.check)).toBe(true);
  });
});

describe('métricas', () => {
  it('penaliza la infiltración de suero y cuenta los lavados', () => {
    const m = new Metrics();
    m.onEvent({ t: 1, type: 'flush', msg: '', severity: 'ok' });
    expect(m.score()).toBe(100);
    m.onEvent({ t: 2, type: 'infiltration', msg: '', severity: 'error' });
    expect(m.score()).toBe(88);
    expect(m.snapshot().flushes).toBe(1);
    expect(m.snapshot().infiltrations).toBe(1);
  });

  it('el avance en plano antes de que la punta entre en la imagen no cuenta como avance a ciegas', () => {
    const m = new Metrics();
    m.frame(0, 4, null, false, 0, 0); // bajo el extremo de la sonda
    m.frame(1, 10, true, false, 0, 0);
    expect(m.tipVisiblePct()).toBe(100);
    m.frame(2, 10, false, false, 0, 0); // fuera del haz dentro del campo: sí cuenta
    expect(m.tipVisiblePct()).toBe(50);
  });

  it('penaliza transfixión y punción arterial', () => {
    const m = new Metrics();
    expect(m.score()).toBe(100);
    m.onEvent({ t: 1, type: 'skin', msg: '', severity: 'info' });
    m.onEvent({ t: 2, type: 'transfix', msg: '', severity: 'error' });
    const s1 = m.score();
    expect(s1).toBeLessThan(90);
    m.onEvent({ t: 3, type: 'artery', msg: '', severity: 'error' });
    expect(m.score()).toBeLessThan(s1 - 20);
  });
});
