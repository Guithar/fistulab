/**
 * Aguja de punción: geometría, interacción con los tejidos y eventos clínicos.
 *
 * Modelo de interacción:
 *  - Entrada cutánea en un punto de la piel con un ángulo respecto a la superficie y un rumbo.
 *  - Al contactar con la pared anterior de un vaso, la pared se deforma ("tienda") hasta un umbral
 *    que depende del tipo de vaso; al superarlo se produce el "pop" y la punta entra en la luz.
 *  - En la luz aparece el reflujo (flashback), pulsátil en FAV/arteria.
 *  - La pared posterior también se deforma y puede perforarse (transfixión) → extravasación/hematoma.
 *  - Contacto con nervio (parestesia), arteria no diana (punción arterial), hueso (tope).
 *
 * Catéter periférico sobre aguja (vía periférica ecoguiada): la aguja lleva montado un catéter cuya
 * punta queda algo por detrás del bisel. Estados: catéter montado (se mueve con la aguja) → catéter
 * deslizado sobre la aguja, que ya no avanza (el catéter, flexible, sigue la luz de la vena) → aguja
 * retirada (queda el catéter). Ver docs/FUNDAMENTOS.md §13.
 */
import { Vector3 } from 'three';
import type { AnatomyModel, QueryResult, Structure } from '../anatomy/model';
import type { ArmShape } from '../anatomy/armShape';
import { CATHETER_GAUGES, CATHETER_SETBACK, GAUGES } from '../scene/instruments';
import { LANG, tr } from '../i18n';

export type NeedleRole = 'arterial' | 'venosa';
export type NeedleStateName = 'fuera' | 'piel' | 'tejido' | 'tienda' | 'luz' | 'pared-post' | 'transfixión' | 'hueso';
/** Aguja de fístula o catéter venoso periférico sobre aguja. */
export type NeedleDevice = 'fistula' | 'cateter';
/** Catéter montado en la aguja → deslizado sobre ella → aguja retirada (el catéter queda en la vena). */
export type CatheterStage = 'montado' | 'avanzado' | 'aguja-retirada';

/** Nombre de la aguja para mostrar («arterial», «venosa» / «arterial», «venous»). */
export function roleLabel(role: NeedleRole): string {
  return LANG === 'en' ? (role === 'arterial' ? 'arterial' : 'venous') : role;
}

/** Fase del catéter para mostrar. */
export function stageLabel(stage: CatheterStage): string {
  if (stage === 'montado') return tr('catéter sobre la aguja', 'catheter on the needle');
  if (stage === 'avanzado') return tr('catéter deslizado', 'catheter threaded');
  return tr('aguja retirada', 'needle removed');
}

/** Dispositivo para mostrar: «aguja arterial 15G» / «catéter 20G» (en inglés, «arterial needle 15G» / «20G catheter»). */
export function deviceLabel(n: Needle): string {
  if (n.cath) return tr(`catéter ${n.gauge}G`, `${n.gauge}G catheter`);
  return tr(`aguja ${roleLabel(n.role)} ${n.gauge}G`, `${roleLabel(n.role)} needle ${n.gauge}G`);
}

const STATE_EN: Record<NeedleStateName, string> = {
  fuera: 'outside',
  piel: 'skin',
  tejido: 'tissue',
  tienda: 'tenting',
  luz: 'lumen',
  'pared-post': 'back wall',
  transfixión: 'transfixion',
  hueso: 'bone',
};

/** Estado de la punta para mostrar (los valores de `NeedleStateName` son identificadores internos). */
export function stateLabel(state: NeedleStateName): string {
  return LANG === 'en' ? STATE_EN[state] : state;
}

export interface NeedleEvent {
  t: number;
  type:
    | 'skin'
    | 'tent'
    | 'pop'
    | 'flash'
    | 'backwall'
    | 'transfix'
    | 'artery'
    | 'nerve'
    | 'bone'
    | 'tendon'
    | 'thrombus'
    | 'exit'
    | 'withdraw'
    | 'redirect'
    | 'hematoma'
    | 'flush'
    | 'infiltration'
    /** catéter: empieza a deslizarse por la luz / introducido hasta el cono */
    | 'cath-advance'
    /** catéter: no progresa (su punta no ha entrado en la vena, o la luz está ocupada) */
    | 'cath-stuck'
    /** catéter: deslizado con la punta de la aguja fuera de la luz */
    | 'cath-out'
    /** aguja retirada de dentro del catéter */
    | 'needle-out';
  msg: string;
  severity: 'info' | 'ok' | 'warn' | 'error';
  struct?: string;
}

export interface Puncture {
  st: Structure;
  p: Vector3;
  back: boolean;
  t: number;
}

const TENT_LIMIT: Record<string, number> = { vein: 1.0, avf: 1.7, artery: 2.2, graft: 2.6 };
const BACK_LIMIT: Record<string, number> = { vein: 0.8, avf: 1.2, artery: 1.6, graft: 2.0 };

/** Catéter venoso periférico montado sobre la aguja (el calibre es el de `Needle.gauge`). */
export class Catheter {
  /** longitud del catéter (mm) */
  length = 48;
  stage: CatheterStage = 'montado';
  /** mm que el catéter se ha deslizado sobre la aguja */
  slid = 0;
  /** inserción de la aguja al empezar a deslizar el catéter (mm): desde entonces la aguja no avanza */
  baseDepth = 0;
  /** vaso por cuya luz avanza (null: la punta de la aguja no estaba en una luz) */
  vessel: Structure | null = null;
  /** deslizado con la punta de la aguja fuera de la luz: el catéter queda en el tejido */
  outside = false;
  /** mm del trayecto, desde la entrada cutánea, en los que la aguja entra en la luz */
  lumenEntry = 0;
  /** introducido hasta el cono */
  full = false;
  /** lavado con suero correcto con el catéter ya colocado */
  flushed = false;
  /** tramo libre, más allá de la punta de la aguja: puntos intermedios, punta y dirección actuales */
  readonly free: Vector3[] = [];
  readonly tip = new Vector3();
  readonly tipDir = new Vector3();
  freeLen = 0;

  reset() {
    this.stage = 'montado';
    this.slid = 0;
    this.baseDepth = 0;
    this.vessel = null;
    this.outside = false;
    this.lumenEntry = 0;
    this.full = false;
    this.flushed = false;
    this.free.length = 0;
    this.freeLen = 0;
  }
}

export class Needle {
  role: NeedleRole;
  gauge = 15;
  length = 25;
  /** catéter sobre aguja (vía periférica); null = aguja de fístula */
  cath: Catheter | null = null;
  placed = false;
  entry = new Vector3();
  normal = new Vector3(0, 1, 0);
  tx = new Vector3(1, 0, 0);
  tt = new Vector3(0, 0, 1);
  entryX = 0;
  entryTheta = 0;
  /** rumbo (grados) en el plano tangente: 0 = hacia proximal (+x), 90 = hacia +theta */
  heading = 0;
  /** ángulo con la piel (grados) */
  angle = 25;
  /** longitud insertada (mm) desde el punto de entrada; ≤ 0 = fuera */
  depth = -3;
  tip = new Vector3();
  dir = new Vector3();
  state: NeedleStateName = 'fuera';
  /** estructura vascular en la que está la punta (luz) */
  inVessel: Structure | null = null;
  tentStruct: Structure | null = null;
  tentAmount = 0;
  private tentStart = 0;
  private tentBack = false;
  flash = 0;
  flashArterial = false;
  punctures: Puncture[] = [];
  events: NeedleEvent[] = [];
  confirmed = false;
  private lastQ: QueryResult | null = null;
  private prevDepth = -3;
  private prevAngle = 25;
  private prevHeading = 0;
  private inTissueSince = -1;
  firstFlashTime = -1;
  skinTime = -1;
  nerveHit = false;
  arteryHit = false;
  boneHit = false;
  transfixed = false;
  backContacts = 0;
  redirections = 0;
  pathInTissue = 0;
  onEvent: ((e: NeedleEvent) => void) | null = null;

  constructor(role: NeedleRole) {
    this.role = role;
  }

  /** Diámetro exterior (mm): el de la aguja de fístula o el del catéter. */
  get od(): number {
    return this.cath ? (CATHETER_GAUGES[this.gauge]?.od ?? 1.1) : (GAUGES[this.gauge]?.od ?? 1.83);
  }

  get radius() {
    return this.od / 2;
  }

  get device(): NeedleDevice {
    return this.cath ? 'cateter' : 'fistula';
  }

  /** Convierte la aguja en un catéter periférico sobre aguja del calibre y la longitud dados. */
  setCatheter(gauge = 20, length = 48) {
    this.cath ??= new Catheter();
    this.cath.reset();
    this.cath.length = length;
    this.gauge = gauge;
    // la aguja sobresale del catéter por la punta
    this.length = length + CATHETER_SETBACK;
  }

  /** Inserción máxima (mm): la aguja de fístula no entra hasta las aletas; el catéter, hasta el cono. */
  get maxDepth(): number {
    return this.cath ? this.cath.length + CATHETER_SETBACK : this.length - 2;
  }

  /** La aguja se ha retirado y queda el catéter. */
  get needleOut(): boolean {
    return this.cath?.stage === 'aguja-retirada';
  }

  /** Hay algo dentro de la piel: la aguja o el catéter que ha dejado. */
  get inserted(): boolean {
    return this.placed && (this.depth > 0 || this.needleOut);
  }

  /** Coloca la aguja con la punta apoyada sobre la piel en (x, theta). */
  place(arm: ArmShape, x: number, theta: number, heading: number, angle: number) {
    const f = arm.skinFrame(x, theta);
    this.entry.copy(f.S);
    this.normal.copy(f.N);
    this.tx.copy(f.Tx);
    this.tt.copy(f.Tt);
    this.entryX = x;
    this.entryTheta = theta;
    this.heading = heading;
    this.angle = angle;
    this.depth = -3;
    this.prevDepth = -3;
    // la nueva orientación no es un pivote dentro del tejido
    this.prevAngle = angle;
    this.prevHeading = heading;
    this.redirAcc = 0;
    this.placed = true;
    this.state = 'fuera';
    this.inVessel = null;
    this.tentAmount = 0;
    this.tentStruct = null;
    this.confirmed = false;
    this.cath?.reset();
    this.computeGeometry();
  }

  computeGeometry() {
    const h = (this.heading * Math.PI) / 180;
    const a = (this.angle * Math.PI) / 180;
    const along = this.tx.clone().multiplyScalar(Math.cos(h)).addScaledVector(this.tt, Math.sin(h));
    this.dir.copy(along).multiplyScalar(Math.cos(a)).addScaledVector(this.normal, -Math.sin(a)).normalize();
    this.tip.copy(this.entry).addScaledVector(this.dir, this.depth);
  }

  /** Punto de entrada en la piel (o punta si está fuera) → para la GPU */
  backPoint(out = new Vector3()) {
    return out.copy(this.entry).addScaledVector(this.dir, Math.min(0, this.depth) - 0.5);
  }

  private emit(t: number, type: NeedleEvent['type'], msg: string, severity: NeedleEvent['severity'], struct?: string) {
    const e: NeedleEvent = { t, type, msg, severity, struct };
    this.events.push(e);
    this.onEvent?.(e);
  }

  /** Posición de la punta para una profundidad, ángulo y rumbo dados. */
  private tipAt(depth: number, angle: number, heading: number, out = new Vector3()): Vector3 {
    const h = (heading * Math.PI) / 180;
    const a = (angle * Math.PI) / 180;
    const along = tmpV.copy(this.tx).multiplyScalar(Math.cos(h)).addScaledVector(this.tt, Math.sin(h));
    const dir = tmpW.copy(along).multiplyScalar(Math.cos(a)).addScaledVector(this.normal, -Math.sin(a)).normalize();
    return out.copy(this.entry).addScaledVector(dir, depth);
  }

  /**
   * Avanza la simulación física de la aguja tras un cambio de profundidad, ángulo o rumbo.
   * Los cambios se recorren en pasos de ≤ 0,2 mm de desplazamiento de la punta para no saltarse
   * paredes, también cuando la aguja pivota (un barrido lateral empuja el tejido como un avance).
   */
  update(model: AnatomyModel, t: number, accessIds: Set<string>) {
    if (!this.placed) return;
    if (this.cath && this.cath.stage !== 'montado') {
      this.updateSheathed(t);
      return;
    }
    const d0 = this.prevDepth;
    const a0 = this.prevAngle;
    const h0 = this.prevHeading;
    const d1 = this.depth;
    const a1 = this.angle;
    const h1 = this.heading;
    // giro más corto entre rumbos (evita barrer 360° al cruzar ±180°)
    const dh = ((((h1 - h0) % 360) + 540) % 360) - 180;
    const move = this.tipAt(d0, a0, h0, tmpA).distanceTo(this.tipAt(d1, a1, h1, tmpB));
    if (move < 1e-5 && d0 === d1) {
      this.computeGeometry();
      return;
    }
    // redirección: pivotar la aguja con la punta dentro del tejido. Con la punta en la luz, bajar el
    // ángulo tras el reflujo (o al tocar la pared) y alinearla con el vaso es la maniobra indicada.
    const inLumen = this.state === 'luz' || (this.state === 'tienda' && this.tentBack);
    if (!inLumen && Math.max(d0, d1) > 2) {
      this.redirAcc += Math.abs(a1 - a0) + Math.abs(dh);
      if (this.redirAcc > 4) {
        this.redirections++;
        this.redirAcc = 0;
        this.emit(t, 'redirect', tr('Redirección de la aguja dentro del tejido', 'Needle redirected within the tissue'), 'warn');
      }
    }
    const withdrawing = d1 < d0 - 1e-6;
    const pivot = a1 !== a0 || dh !== 0;
    const advancing = d1 > d0 + 1e-6 || (!withdrawing && pivot);
    // el recorrido de la punta en un pivote es un arco: acotar por la longitud del arco
    const arc = (Math.max(d0, d1, 0) * (Math.abs(a1 - a0) + Math.abs(dh)) * Math.PI) / 180;
    const steps = Math.min(400, Math.max(1, Math.ceil(Math.max(move, arc) / 0.2), Math.ceil(Math.abs(d1 - d0) / 0.2)));
    for (let i = 1; i <= steps; i++) {
      const f = i / steps;
      this.angle = a0 + (a1 - a0) * f;
      this.heading = h0 + dh * f;
      const d = d0 + (d1 - d0) * f;
      const stop = this.step(model, t, d, advancing, accessIds);
      if (stop !== null) {
        this.depth = stop;
        break;
      }
      this.depth = d;
    }
    if (this.depth > 0 || d0 > 0) this.pathInTissue += move;
    this.heading = ((((this.heading + 180) % 360) + 360) % 360) - 180;
    this.prevDepth = this.depth;
    this.prevAngle = this.angle;
    this.prevHeading = this.heading;
    this.computeGeometry();
    if (this.state === 'luz' && this.inVessel) this.flashArterial = this.inVessel.def.kind === 'artery';
  }

  private redirAcc = 0;
  private lastStructId: string | null = null;
  /** punto de contacto con la pared (para registrar el orificio) */
  private contact = new Vector3();

  /** ¿Hay un orificio previo en la pared de `st` cerca de `p`? */
  private hasHole(st: Structure, p: Vector3, back?: boolean): boolean {
    return this.punctures.some((h) => h.st === st && (back === undefined || h.back === back) && h.p.distanceTo(p) < 2.5);
  }

  /** Un paso a profundidad d. Devuelve una profundidad de tope si la aguja no puede avanzar. */
  private step(model: AnatomyModel, t: number, d: number, advancing: boolean, access: Set<string>): number | null {
    this.depth = d;
    this.computeGeometry();
    const q = model.query(this.tip, this.lastQ ?? undefined);
    this.lastQ = q;
    const prevState = this.state;
    if (d <= 0) {
      if (prevState !== 'fuera') this.emit(t, 'withdraw', tr('Aguja retirada de la piel', 'Needle withdrawn from the skin'), 'info');
      this.state = 'fuera';
      this.inVessel = null;
      this.tentAmount = 0;
      this.tentStruct = null;
      this.lastStructId = null;
      return null;
    }
    if (prevState === 'fuera') {
      this.state = 'piel';
      this.skinTime = t;
      this.emit(t, 'skin', tr('Punción cutánea', 'Skin puncture'), 'info');
    }
    const sid = q.struct?.def.id ?? null;
    const changed = sid !== this.lastStructId;
    this.lastStructId = sid;
    // hueso: tope
    if (q.struct && q.struct.code === 12) {
      if (!this.boneHit)
        this.emit(
          t,
          'bone',
          tr(`Contacto óseo (${q.struct.def.name}): la aguja no avanza`, `Bone contact (${q.struct.def.name}): the needle cannot advance`),
          'error',
          q.struct.def.id,
        );
      this.boneHit = true;
      this.state = 'hueso';
      this.tentAmount = 0;
      this.tentStruct = null;
      this.inVessel = null;
      return Math.max(0, d - 0.3);
    }
    if (prevState === 'hueso') this.state = 'tejido';
    // nervio
    if (q.struct && q.struct.code === 10 && !this.nerveHit) {
      this.emit(
        t,
        'nerve',
        tr(`¡Contacto con ${q.struct.def.name}! El paciente refiere parestesia/dolor`, `Contact with ${q.struct.def.name}! The patient reports paresthesia/pain`),
        'error',
        q.struct.def.id,
      );
      this.nerveHit = true;
    }
    if (q.struct && q.struct.code === 11 && advancing && changed) {
      this.emit(
        t,
        'tendon',
        tr(`La aguja atraviesa el ${q.struct.def.name.toLowerCase()}`, `The needle passes through the ${q.struct.def.name.toLowerCase()}`),
        'warn',
        q.struct.def.id,
      );
    }

    // interacción con vasos
    const st = q.struct && q.struct.isVessel ? q.struct : null;
    if (this.state === 'tienda' && this.tentStruct) {
      const lim = this.tentBack ? BACK_LIMIT[this.tentStruct.def.kind] ?? 1 : TENT_LIMIT[this.tentStruct.def.kind] ?? 1.5;
      const amt = d - this.tentStart;
      if (amt < 0 || !advancing) {
        // retroceso: la pared vuelve a su sitio
        this.tentAmount = 0;
        this.state = this.tentBack ? 'luz' : 'tejido';
        this.inVessel = this.tentBack ? this.tentStruct : null;
        this.tentStruct = null;
        return null;
      }
      if (amt < lim) {
        this.tentAmount = amt;
        return null;
      }
      // "pop": la pared cede
      const s = this.tentStruct;
      this.tentAmount = 0;
      this.tentStruct = null;
      this.punctures.push({ st: s, p: this.contact.clone(), back: this.tentBack, t });
      if (!this.tentBack) {
        this.emit(t, 'pop', tr(`Pérdida de resistencia: pared anterior de ${s.def.name} atravesada`, `Loss of resistance: anterior wall of ${s.def.name} punctured`), 'info', s.def.id);
        const q2 = model.query(this.tip);
        if (q2.struct === s && q2.inLumen) {
          this.enterLumen(t, s, access);
        } else if (q2.struct === s && q2.inThrombus) {
          this.state = 'tejido';
          this.emit(t, 'thrombus', tr('La punta está dentro de un trombo: no hay reflujo', 'The tip is inside a thrombus: no flashback'), 'warn', s.def.id);
        } else if (this.crossedLumen(model, s)) {
          this.state = 'transfixión';
          this.transfixed = true;
          this.emit(t, 'transfix', tr(`Vaso atravesado de lado a lado (${s.def.name}): riesgo de hematoma`, `Vessel transfixed (${s.def.name}): risk of hematoma`), 'error', s.def.id);
        } else {
          this.state = 'tejido';
          this.emit(
            t,
            'exit',
            tr(`Punción tangencial: la aguja ha resbalado por la pared de ${s.def.name}`, `Tangential puncture: the needle slid along the wall of ${s.def.name}`),
            'warn',
            s.def.id,
          );
        }
      } else {
        this.state = 'transfixión';
        this.transfixed = true;
        this.inVessel = null;
        this.emit(t, 'transfix', tr(`Perforación de la pared posterior (${s.def.name}): extravasación`, `Back wall perforated (${s.def.name}): extravasation`), 'error', s.def.id);
      }
      return null;
    }
    if (this.state === 'luz' && this.inVessel) {
      const v = this.inVessel;
      if (q.struct === v && q.inLumen) return null;
      if (advancing) {
        // orificio posterior previo: la aguja lo atraviesa sin nueva perforación
        if (this.hasHole(v, this.tip, true)) {
          this.state = 'transfixión';
          this.inVessel = null;
          return null;
        }
        this.state = 'tienda';
        this.tentBack = true;
        this.tentStruct = v;
        this.tentStart = d;
        this.tentAmount = 0;
        this.contact.copy(this.tip);
        this.backContacts++;
        this.emit(
          t,
          'backwall',
          tr('La punta contacta con la pared del vaso: detener, bajar el ángulo y alinear', 'The tip is touching the vessel wall: stop, lower the angle and align'),
          'warn',
          v.def.id,
        );
        return null;
      }
      this.state = 'tejido';
      this.inVessel = null;
      this.emit(t, 'exit', tr('La punta ha salido de la luz del vaso', 'The tip has left the vessel lumen'), 'warn', v.def.id);
      return null;
    }
    if (this.state === 'transfixión') {
      if (st && q.inLumen && !advancing && this.hasHole(st, this.tip)) {
        // al retirar vuelve a la luz a través del orificio posterior
        this.enterLumen(t, st, access, true);
      } else if (st && q.inWall && advancing && !this.hasHole(st, this.tip)) {
        this.contact.copy(this.tip);
        this.beginTent(t, st, d, false);
      }
      return null;
    }
    // en tejido
    if (st) {
      const hole = this.hasHole(st, this.tip);
      if (q.inLumen) {
        if (hole || !advancing) this.enterLumen(t, st, access);
        else {
          this.contact.copy(this.tip);
          this.beginTent(t, st, d, false);
        }
        return null;
      }
      if (q.inWall && advancing && !hole) {
        this.contact.copy(this.tip);
        this.beginTent(t, st, d, false);
        return null;
      }
    }
    this.state = 'tejido';
    return null;
  }

  /** ¿El tramo de aguja entre el contacto con la pared y la punta pasa por la luz del vaso? */
  private crossedLumen(model: AnatomyModel, st: Structure): boolean {
    const p = new Vector3();
    const len = this.contact.distanceTo(this.tip);
    for (let s = 0; s <= len; s += 0.25) {
      p.copy(this.contact).addScaledVector(this.dir, s);
      const q = model.query(p);
      if (q.struct === st && q.inLumen) return true;
    }
    return false;
  }

  private beginTent(t: number, st: Structure, d: number, back: boolean) {
    this.state = 'tienda';
    this.tentBack = back;
    this.tentStruct = st;
    this.tentStart = d;
    this.tentAmount = 0;
    this.emit(t, 'tent', tr(`La punta indenta la pared de ${st.def.name} (signo de la tienda)`, `The tip is indenting the wall of ${st.def.name} (tenting)`), 'info', st.def.id);
  }

  private enterLumen(t: number, st: Structure, access: Set<string>, silent = false) {
    this.state = 'luz';
    this.inVessel = st;
    // el giro acumulado en el tejido no se suma a los que se hagan tras salir de la luz
    this.redirAcc = 0;
    if (st.def.kind === 'artery' && !access.has(st.def.id)) {
      if (!this.arteryHit)
        this.emit(
          t,
          'artery',
          tr(`¡Punción arterial! (${st.def.name}) — reflujo rojo brillante y pulsátil`, `Arterial puncture! (${st.def.name}) — bright red, pulsatile flashback`),
          'error',
          st.def.id,
        );
      this.arteryHit = true;
    } else if (!silent) {
      if (this.firstFlashTime < 0) this.firstFlashTime = t;
      this.emit(t, 'flash', tr(`Reflujo de sangre: punta en la luz de ${st.def.name}`, `Blood flashback: tip in the lumen of ${st.def.name}`), 'ok', st.def.id);
    }
  }

  /** Longitud (mm) del tramo distal de la aguja que está dentro de la luz del vaso actual. */
  intraluminalLength(model: AnatomyModel): number {
    if (this.state !== 'luz' || !this.inVessel) return 0;
    let len = 0;
    const p = new Vector3();
    for (let s = 0; s < Math.max(0, this.depth); s += 0.5) {
      p.copy(this.tip).addScaledVector(this.dir, -s);
      const q = model.query(p);
      if (q.struct === this.inVessel && q.inLumen) len += 0.5;
      else break;
    }
    return len;
  }

  /** Ángulo (grados) entre la aguja y el eje local del vaso en el que está. */
  angleToVessel(model: AnatomyModel): number | null {
    if (!this.inVessel) return null;
    const { idx } = model.nearestSample(this.inVessel, this.tip);
    const t = this.inVessel.samples[idx].t;
    const c = Math.abs(t.dot(this.dir));
    return (Math.acos(Math.min(1, c)) * 180) / Math.PI;
  }

  /** Distancia de la punta al eje del vaso relativa al radio (0 = centrada, 1 = en la pared). */
  centering(model: AnatomyModel): number | null {
    if (!this.inVessel) return null;
    const q = model.query(this.tip);
    if (q.struct !== this.inVessel) return null;
    return Math.max(0, Math.min(1, (q.sd + q.r) / Math.max(q.r, 1e-3)));
  }

  /** Sentido de la aguja respecto al flujo del vaso: 1 = anterógrada, −1 = retrógrada. */
  flowDirection(model: AnatomyModel, st: Structure): number {
    const { idx } = model.nearestSample(st, this.tip);
    const t = st.samples[idx].t;
    const q = st.def.flow?.q ?? 1;
    return Math.sign(t.dot(this.dir) * q);
  }

  // ------------------------------------------------------------------------------------------
  // Catéter sobre aguja
  // ------------------------------------------------------------------------------------------

  /** Vaso en cuya luz está la punta de la aguja (también si toca la pared posterior desde dentro). */
  private lumenVessel(): Structure | null {
    if (this.state === 'luz') return this.inVessel;
    if (this.state === 'tienda' && this.tentBack) return this.tentStruct;
    return null;
  }

  /** Punto del trayecto rectilíneo de la aguja a `s` mm de la entrada cutánea. */
  private trackPoint(s: number, out = new Vector3()): Vector3 {
    return out.copy(this.entry).addScaledVector(this.dir, s);
  }

  /** Longitud de catéter bajo la piel (mm), medida a lo largo de su trayecto. */
  catheterInserted(): number {
    const c = this.cath;
    if (!c) return 0;
    return Math.max(0, (c.stage === 'montado' ? this.depth : c.baseDepth) - CATHETER_SETBACK + c.slid);
  }

  /** Punta por la que sale el suero y que queda en el vaso: la del catéter si lo hay; si no, la de la aguja. */
  deviceTip(out = new Vector3()): Vector3 {
    const c = this.cath;
    if (!c) return out.copy(this.tip);
    if (c.freeLen > 0) return out.copy(c.tip);
    return this.trackPoint((c.stage === 'montado' ? this.depth : c.baseDepth) - CATHETER_SETBACK + c.slid, out);
  }

  /** Dirección de salida en esa punta. */
  deviceDir(out = new Vector3()): Vector3 {
    const c = this.cath;
    return out.copy(c && c.freeLen > 0 ? c.tipDir : this.dir);
  }

  /** ¿La punta del catéter está dentro de la luz? (con el catéter aún montado, la del vaso en que está la aguja) */
  catheterTipInLumen(model: AnatomyModel): boolean {
    const c = this.cath;
    if (!c) return false;
    if (c.stage !== 'montado') return !!c.vessel && !c.outside;
    const v = this.lumenVessel();
    if (!v) return false;
    const q = model.query(this.deviceTip(tmpA));
    return q.struct === v && q.inLumen;
  }

  /**
   * Longitud de catéter dentro de la luz del vaso (mm). Con el catéter montado se mide sobre el trayecto
   * de la aguja; una vez deslizado, es la longitud introducida menos el tramo de piel a pared, que se
   * fija al empezar a deslizar (el catéter acompaña a la vena si esta cambia de calibre al soltar el compresor).
   */
  catheterInVein(model: AnatomyModel): number {
    const c = this.cath;
    if (!c) return 0;
    // décimas de milímetro: el mismo valor redondea igual en la línea de estado, en la métrica y en la evaluación
    const tenths = (mm: number) => Math.round(Math.max(0, mm) * 10) / 10;
    if (c.stage !== 'montado') return c.vessel && !c.outside ? tenths(c.baseDepth - CATHETER_SETBACK + c.slid - c.lumenEntry) : 0;
    const v = this.lumenVessel();
    if (!v) return 0;
    const tipS = this.depth - CATHETER_SETBACK;
    const entryS = this.lumenEntryArc(model, v);
    return tenths(tipS - entryS);
  }

  /** mm desde la entrada cutánea hasta el punto en que el trayecto de la aguja entra en la luz de `v`. */
  private lumenEntryArc(model: AnatomyModel, v: Structure): number {
    const p = tmpA;
    const inside = (s: number) => {
      const q = model.query(this.trackPoint(s, p));
      return q.struct === v && q.inLumen;
    };
    // la punta puede estar apoyada en la pared posterior: buscar hacia atrás el primer punto en la luz
    let s = this.depth;
    for (let k = 0; k < 30 && s > 0 && !inside(s); k++) s -= 0.1;
    while (s > 0 && inside(s - 0.1)) s -= 0.1;
    return Math.max(0, s);
  }

  /** Avisos que se repetirían en cada fotograma: uno cada 2 s como mucho. */
  private lastStuck = -10;
  private emitStuck(t: number, msg: string, struct?: string) {
    if (t - this.lastStuck < 2) return;
    this.lastStuck = t;
    this.emit(t, 'cath-stuck', msg, 'warn', struct);
  }

  /**
   * Desliza el catéter `mm` sobre la aguja, que queda fija. Con la punta del catéter en la luz avanza
   * sin resistencia y, al superar la punta de la aguja, sigue el eje de la vena; si la aguja ha dado
   * reflujo pero la punta del catéter aún no ha entrado (queda 1–2 mm por detrás del bisel), no
   * progresa; con la aguja fuera de la luz, entra en el tejido. Devuelve true si ha avanzado.
   */
  slideCatheter(model: AnatomyModel, mm: number, t: number): boolean {
    const c = this.cath;
    if (!c || !this.placed || this.confirmed || c.stage === 'aguja-retirada' || mm <= 0 || this.depth <= 0) return false;
    if (c.stage === 'montado') {
      const v = this.lumenVessel();
      if (v && !this.catheterTipInLumen(model)) {
        this.emitStuck(
          t,
          tr(
            'El catéter no progresa: su punta aún no ha entrado en la vena. Avanza la aguja 1–2 mm más',
            'The catheter will not advance: its tip has not entered the vein yet. Advance the needle 1–2 mm further',
          ),
          v.def.id,
        );
        return false;
      }
      c.stage = 'avanzado';
      c.baseDepth = this.depth;
      c.vessel = v;
      c.outside = !v;
      c.lumenEntry = v ? this.lumenEntryArc(model, v) : 0;
      if (v) {
        // la aguja queda quieta dentro de la luz
        this.state = 'luz';
        this.inVessel = v;
        this.tentAmount = 0;
        this.tentStruct = null;
        this.emit(t, 'cath-advance', tr(`El catéter se desliza sin resistencia por la luz de ${v.def.name}`, `The catheter slides without resistance along the lumen of ${v.def.name}`), 'ok', v.def.id);
      } else {
        this.emit(
          t,
          'cath-out',
          tr(
            'El catéter avanza con resistencia: no está en la vena. Retíralo y canaliza en otro punto',
            'The catheter meets resistance: it is not in the vein. Remove it and cannulate at another site',
          ),
          'error',
        );
      }
    }
    const max = c.length - (c.baseDepth - CATHETER_SETBACK);
    let rem = Math.min(mm, max - c.slid);
    let moved = false;
    // tramo que aún recorre sobre la aguja
    const onNeedle = Math.min(rem, Math.max(0, CATHETER_SETBACK - c.slid));
    if (onNeedle > 0) {
      c.slid += onNeedle;
      rem -= onNeedle;
      moved = true;
    }
    if (rem > 1e-6 && c.freeLen === 0) {
      this.trackPoint(c.baseDepth, c.tip);
      c.tipDir.copy(this.dir);
      c.free.length = 0;
    }
    while (rem > 1e-6) {
      const h = Math.min(rem, 0.25);
      if (!this.stepFree(model, h)) {
        this.emitStuck(t, tr('El catéter no progresa más por la luz de la vena', 'The catheter will not advance any further along the vein lumen'), c.vessel?.def.id);
        break;
      }
      c.slid += h;
      rem -= h;
      moved = true;
    }
    if (!c.full && c.slid >= max - 1e-3) {
      c.full = true;
      this.emit(t, 'cath-advance', tr('Catéter introducido hasta el cono: retira la aguja', 'Catheter inserted up to the hub: remove the needle'), 'info', c.vessel?.def.id);
    }
    return moved;
  }

  /**
   * Avanza `h` mm la punta libre del catéter. Dentro de un vaso se orienta con su eje, tiende al centro
   * de la luz y resbala por la pared sin atravesarla; fuera, sigue recto por el tejido. Devuelve false
   * si la luz no continúa (trombo o final del vaso).
   */
  private stepFree(model: AnatomyModel, h: number): boolean {
    const c = this.cath!;
    const v = c.vessel;
    const p = tmpA.copy(c.tip);
    const d = tmpB.copy(c.tipDir);
    if (v && !c.outside) {
      const radial = (q: Vector3) => {
        const smp = v.samples[model.nearestSample(v, q).idx];
        const rel = tmpV.copy(q).sub(smp.p);
        return { smp, rad: rel.addScaledVector(smp.t, -rel.dot(smp.t)) };
      };
      const a = radial(p);
      const sgn = a.smp.t.dot(d) >= 0 ? 1 : -1;
      const want = tmpW.copy(a.smp.t).multiplyScalar(sgn).addScaledVector(a.rad, -0.06).normalize();
      // se alinea con la vena en ≈ 2–3 mm, igual con pasos largos que cortos (no depende de los fotogramas)
      d.lerp(want, 1 - Math.pow(0.85, h / 0.25)).normalize();
      p.addScaledVector(d, h);
      // radio sin la distensión del compresor: el trayecto sigue dentro de la luz al soltarlo
      const b = radial(p);
      const R = Math.max(0.15, b.smp.r * Math.min(1, v.dyn.radiusScale) - this.od / 2 - 0.05);
      const len = b.rad.length();
      if (len > R) p.addScaledVector(b.rad, -(1 - R / len));
      const q = model.query(p);
      if (!(q.struct === v && q.inLumen)) return false;
    } else {
      p.addScaledVector(d, h);
    }
    c.tip.copy(p);
    c.tipDir.copy(d);
    c.freeLen += h;
    if (!c.free.length || c.free[c.free.length - 1].distanceTo(p) >= 0.5) c.free.push(p.clone());
    return true;
  }

  /** Con el catéter deslizado, la aguja ya no interactúa con el tejido: solo puede retirarse por dentro de él. */
  private updateSheathed(t: number) {
    const c = this.cath!;
    this.angle = this.prevAngle;
    this.heading = this.prevHeading;
    if (c.stage === 'avanzado') {
      // no se reintroduce la aguja en el catéter
      this.depth = Math.min(this.depth, this.prevDepth);
      if (this.depth <= 0) {
        c.stage = 'aguja-retirada';
        this.depth = -3;
        this.tentAmount = 0;
        this.tentStruct = null;
        const v = c.vessel && !c.outside ? c.vessel : null;
        this.state = v ? 'luz' : 'tejido';
        this.inVessel = v;
        this.flashArterial = v?.def.kind === 'artery';
        this.emit(
          t,
          'needle-out',
          v
            ? tr(`Aguja retirada: el catéter queda en la luz de ${v.def.name}`, `Needle removed: the catheter stays in the lumen of ${v.def.name}`)
            : tr('Aguja retirada: el catéter no está en una vena', 'Needle removed: the catheter is not in a vein'),
          v ? 'ok' : 'warn',
          v?.def.id,
        );
      }
    } else this.depth = -3;
    this.prevDepth = this.depth;
    this.computeGeometry();
  }

  /** Retira de la piel el catéter que había quedado colocado. */
  removeCatheter(t: number) {
    const c = this.cath;
    if (!c) return;
    c.reset();
    this.depth = this.prevDepth = -3;
    this.state = 'fuera';
    this.inVessel = null;
    this.lastStructId = null;
    this.computeGeometry();
    this.emit(t, 'withdraw', tr('Catéter retirado de la piel', 'Catheter removed from the skin'), 'info');
  }

  /** Trayecto del catéter, del cono (fuera de la piel) a la punta, para dibujarlo en 3D. */
  catheterPath(): Vector3[] {
    const c = this.cath;
    if (!c) return [];
    const anchor = c.stage === 'montado' ? this.depth : c.baseDepth;
    const tipS = anchor - CATHETER_SETBACK + c.slid;
    const hubS = tipS - c.length;
    const pts = [this.trackPoint(hubS)];
    if (c.freeLen > 0) {
      if (hubS < -1) pts.push(this.trackPoint(0));
      if (anchor - 1 > Math.max(hubS, 0) + 0.5) pts.push(this.trackPoint(anchor - 1));
      pts.push(this.trackPoint(anchor), ...c.free.map((p) => p.clone()), c.tip.clone());
    } else pts.push(this.trackPoint(tipS));
    return pts;
  }

  /**
   * Tramos rectos de catéter que se ven en la ecografía: los que quedan bajo la piel sin la aguja
   * dentro (plástico: doble línea, sin sombra). El tramo libre, curvo, se aproxima con dos rectas.
   */
  catheterEcho(): { a: Vector3; b: Vector3 }[] {
    const c = this.cath;
    if (!c || c.stage === 'montado') return [];
    const out: { a: Vector3; b: Vector3 }[] = [];
    const tipS = c.baseDepth - CATHETER_SETBACK + c.slid;
    const straightEnd = c.freeLen > 0 ? c.baseDepth : tipS;
    const from = Math.max(this.needleOut ? -0.5 : this.depth, tipS - c.length, -0.5);
    if (straightEnd - from > 0.3) out.push({ a: this.trackPoint(from), b: this.trackPoint(straightEnd) });
    if (c.freeLen > 0.3) {
      const t0 = this.trackPoint(c.baseDepth);
      // punto de quiebro: donde el catéter ya se ha alineado con la vena (≈ 4 mm)
      const k = c.free.findIndex((p) => p.distanceTo(t0) >= 4);
      if (k >= 0 && c.free[k].distanceTo(c.tip) > 2) out.push({ a: t0, b: c.free[k].clone() }, { a: c.free[k].clone(), b: c.tip.clone() });
      else out.push({ a: t0, b: c.tip.clone() });
    }
    return out;
  }
}

const tmpA = new Vector3();
const tmpB = new Vector3();
const tmpV = new Vector3();
const tmpW = new Vector3();
