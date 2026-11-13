/**
 * Métricas de competencia en punción ecoguiada y puntuación.
 *
 * Inspiradas en:
 *  - NeedleTrainer (Intelligent Ultrasound): % de tiempo con la punta visible, tiempo total.
 *  - PerkTutor (3D Slicer): recorrido de la aguja en el tejido, tiempo de inserción.
 *  - Sites et al. 2007: avanzar sin ver la punta y movimiento involuntario de la sonda son los
 *    errores más frecuentes del principiante.
 *  - Blaivas & Adhikari 2009: perforación de pared posterior en eje corto.
 *  - Guías de acceso vascular (KDOQI 2019, GEMAV 2017): distancia a la anastomosis, separación entre
 *    agujas, dirección de la aguja venosa, zonas a evitar.
 *  - Vía periférica ecoguiada: longitud de catéter dentro de la vena (Pandurangadu 2018, Bahl 2020) y
 *    pasos del procedimiento (Manual MSD). Ver docs/FUNDAMENTOS.md §13.
 */
import type { NeedleEvent } from '../interaction/needle';
import { tr } from '../i18n';

export interface FinalCheck {
  label: string;
  ok: boolean | null;
  detail: string;
  penalty: number;
}

export interface MetricsSnapshot {
  elapsed: number;
  skinPunctures: number;
  redirections: number;
  pathInTissue: number;
  backWallContacts: number;
  transfixions: number;
  arterialPunctures: number;
  nerveContacts: number;
  boneContacts: number;
  flushes: number;
  infiltrations: number;
  tipVisiblePct: number;
  shaftConfusions: number;
  probeMoveDuringAdvance: number;
  maxCollapse: number;
  timeToFlash: number | null;
  /** vía periférica: mm de catéter dentro de la vena y % de la longitud del catéter (null sin catéter) */
  catheterInVein: number;
  catheterPct: number | null;
  score: number;
  checks: FinalCheck[];
}

/**
 * Fracción mínima del catéter que debe quedar dentro de la vena: con ≥ 65 % no falló ninguno en 72 h;
 * con < 30 % fallaron todos (Pandurangadu 2018).
 */
export const CATHETER_MIN_PCT = 65;

/** Porcentaje (entero) de la longitud del catéter que está dentro de la vena; null si no hay catéter. */
export function catheterPct(inVeinMm: number, lengthMm: number): number | null {
  if (!(lengthMm > 0)) return null;
  return Math.round((100 * Math.max(0, Math.min(inVeinMm, lengthMm))) / lengthMm);
}

/** Estado final de una vía periférica para evaluarla. */
export interface PivOutcome {
  /** la aguja se ha retirado y queda el catéter */
  needleOut: boolean;
  /** vaso en cuya luz está el catéter (null: fuera de un vaso) */
  vessel: { name: string; kind: string } | null;
  /** mm de catéter dentro de la luz y longitud del catéter */
  inVeinMm: number;
  lengthMm: number;
  transfixed: boolean;
  arteryHit: boolean;
  nerveHit: boolean;
  asepsis: boolean;
  /** compresor aún puesto al evaluar */
  tourniquet: boolean;
  /** lavado correcto con este catéter ya colocado */
  flushed: boolean;
  infiltrations: number;
}

/**
 * Criterios de evaluación de la vía periférica ecoguiada. Los de la fístula (anastomosis, separación
 * entre agujas, dirección arterial/venosa) no se aplican.
 */
export function pivChecks(o: PivOutcome): FinalCheck[] {
  const OK = tr('Correcto', 'OK');
  const YES = tr('Sí', 'Yes');
  const inVein = o.needleOut && o.vessel?.kind === 'vein';
  const pct = catheterPct(o.inVeinMm, o.lengthMm);
  const where = !o.needleOut
    ? tr('La aguja sigue dentro del catéter', 'The needle is still inside the catheter')
    : !o.vessel
      ? tr('El catéter no está en la luz de una vena', 'The catheter is not in a vein lumen')
      : o.vessel.kind === 'vein'
        ? tr(`En ${o.vessel.name}`, `In ${o.vessel.name}`)
        : tr(`En ${o.vessel.name}: no es una vena`, `In ${o.vessel.name}: not a vein`);
  return [
    { label: tr('Catéter en la luz de una vena, con la aguja retirada', 'Catheter in a vein lumen, needle removed'), ok: inVein, detail: where, penalty: 35 },
    {
      // se decide sobre el porcentaje redondeado que se muestra
      label: tr(`Catéter dentro de la vena ≥ ${CATHETER_MIN_PCT} % de su longitud (Pandurangadu 2018)`, `≥ ${CATHETER_MIN_PCT}% of the catheter inside the vein (Pandurangadu 2018)`),
      ok: inVein && pct !== null ? pct >= CATHETER_MIN_PCT : null,
      detail: inVein && pct !== null ? tr(`${o.inVeinMm.toFixed(0)} de ${o.lengthMm} mm (${pct} %)`, `${o.inVeinMm.toFixed(0)} of ${o.lengthMm} mm (${pct}%)`) : '—',
      penalty: 10,
    },
    {
      label: tr('Sin punción arterial ni contacto con un nervio', 'No arterial puncture or nerve contact'),
      ok: !o.arteryHit && !o.nerveHit,
      detail: [o.arteryHit ? tr('arteria', 'artery') : '', o.nerveHit ? tr('nervio', 'nerve') : ''].filter(Boolean).join(', ') || OK,
      penalty: 0,
    },
    { label: tr('Sin atravesar la pared posterior de la vena', 'Back wall of the vein not perforated'), ok: !o.transfixed, detail: o.transfixed ? tr('Transfixión', 'Transfixion') : OK, penalty: 0 },
    { label: tr('Técnica aséptica (piel desinfectada, funda y gel estériles)', 'Aseptic technique (skin disinfected, sterile cover and gel)'), ok: o.asepsis, detail: o.asepsis ? YES : 'No', penalty: 5 },
    {
      label: tr('Compresor retirado al terminar', 'Tourniquet released at the end'),
      ok: !o.tourniquet,
      detail: o.tourniquet ? tr('Sigue aplicado', 'Still applied') : YES,
      penalty: 3,
    },
    {
      label: tr('Lavado con suero sin extravasación (Manual MSD)', 'Saline flush with no extravasation (MSD Manual)'),
      ok: o.flushed,
      detail: o.flushed
        ? o.infiltrations
          ? tr('Sí, tras una extravasación previa', 'Yes, after an earlier extravasation')
          : YES
        : o.infiltrations
          ? tr('Extravasación: retirar el catéter y canalizar en otro punto', 'Extravasation: remove the catheter and cannulate at another site')
          : tr('Sin comprobar', 'Not checked'),
      penalty: 5,
    },
  ];
}

export class Metrics {
  startTime = -1;
  now = 0;
  skinPunctures = 0;
  redirections = 0;
  pathInTissue = 0;
  backWallContacts = 0;
  transfixions = 0;
  arterialPunctures = 0;
  nerveContacts = 0;
  boneContacts = 0;
  /** lavados con suero con la punta en la luz (comprobación de posición) */
  flushes = 0;
  /** suero infiltrado en el tejido (punta fuera de la luz) */
  infiltrations = 0;
  advVisible = 0;
  advTotal = 0;
  shaftConfusions = 0;
  private confusionActive = false;
  probeMoveDuringAdvance = 0;
  maxCollapse = 0;
  firstSkin = -1;
  firstFlash = -1;
  /** vía periférica: mm de catéter dentro de la vena y longitud del catéter (0 = sin catéter) */
  catheterInVein = 0;
  catheterLength = 0;
  checks: FinalCheck[] = [];
  log: NeedleEvent[] = [];

  reset() {
    Object.assign(this, new Metrics());
  }

  start(t: number) {
    if (this.startTime < 0) this.startTime = t;
  }

  onEvent(e: NeedleEvent) {
    this.start(e.t);
    this.log.push(e);
    switch (e.type) {
      case 'skin':
        this.skinPunctures++;
        if (this.firstSkin < 0) this.firstSkin = e.t;
        break;
      case 'flash':
        if (this.firstFlash < 0) this.firstFlash = e.t;
        break;
      case 'backwall':
        this.backWallContacts++;
        break;
      case 'transfix':
        this.transfixions++;
        break;
      case 'artery':
        this.arterialPunctures++;
        break;
      case 'nerve':
        this.nerveContacts++;
        break;
      case 'bone':
        this.boneContacts++;
        break;
      case 'redirect':
        this.redirections++;
        break;
      case 'flush':
        this.flushes++;
        break;
      case 'infiltration':
        this.infiltrations++;
        break;
      default:
        break;
    }
  }

  /**
   * Registro por fotograma durante el avance de la aguja.
   * @param advance mm avanzados en este fotograma (>0 avanzando)
   * @param tipVisible punta dentro del haz (lateral, profundidad y grosor de corte); null si ninguna
   *   técnica permite verla (en plano, antes de entrar en la imagen): ese avance no cuenta
   * @param shaftInBeamTipBeyond el haz corta el cuerpo de la aguja pero la punta está más allá
   * @param probeMove mm de desplazamiento de la sonda en este fotograma
   */
  frame(t: number, advance: number, tipVisible: boolean | null, shaftInBeamTipBeyond: boolean, probeMove: number, collapse: number) {
    this.now = t;
    if (advance > 0.001) {
      this.start(t);
      if (tipVisible !== null) {
        this.advTotal += advance;
        if (tipVisible) this.advVisible += advance;
      }
      if (probeMove > 0.02) this.probeMoveDuringAdvance += probeMove;
      if (shaftInBeamTipBeyond) {
        if (!this.confusionActive) {
          this.shaftConfusions++;
          this.confusionActive = true;
        }
      }
    }
    if (!shaftInBeamTipBeyond) this.confusionActive = false;
    this.maxCollapse = Math.max(this.maxCollapse, collapse);
  }

  tipVisiblePct(): number {
    return this.advTotal > 0.5 ? (100 * this.advVisible) / this.advTotal : 100;
  }

  score(): number {
    let s = 100;
    s -= Math.max(0, this.skinPunctures - 1) * 8;
    s -= this.redirections * 3;
    s -= this.backWallContacts * 6;
    s -= this.transfixions * 18;
    s -= this.arterialPunctures * 30;
    s -= this.nerveContacts * 20;
    s -= this.boneContacts * 6;
    s -= this.infiltrations * 12;
    s -= this.shaftConfusions * 4;
    const tv = this.tipVisiblePct();
    if (tv < 80) s -= (80 - tv) * 0.4;
    if (this.probeMoveDuringAdvance > 8) s -= Math.min(8, (this.probeMoveDuringAdvance - 8) * 0.5);
    if (this.maxCollapse > 0.5) s -= 5;
    for (const c of this.checks) if (c.ok === false) s -= c.penalty;
    return Math.max(0, Math.round(s));
  }

  snapshot(): MetricsSnapshot {
    return {
      elapsed: this.startTime >= 0 ? this.now - this.startTime : 0,
      skinPunctures: this.skinPunctures,
      redirections: this.redirections,
      pathInTissue: this.pathInTissue,
      backWallContacts: this.backWallContacts,
      transfixions: this.transfixions,
      arterialPunctures: this.arterialPunctures,
      nerveContacts: this.nerveContacts,
      boneContacts: this.boneContacts,
      flushes: this.flushes,
      infiltrations: this.infiltrations,
      tipVisiblePct: this.tipVisiblePct(),
      shaftConfusions: this.shaftConfusions,
      probeMoveDuringAdvance: this.probeMoveDuringAdvance,
      maxCollapse: this.maxCollapse,
      timeToFlash: this.firstSkin >= 0 && this.firstFlash >= 0 ? this.firstFlash - this.firstSkin : null,
      catheterInVein: this.catheterInVein,
      catheterPct: catheterPct(this.catheterInVein, this.catheterLength),
      score: this.score(),
      checks: this.checks,
    };
  }
}

export function grade(score: number): { label: string; color: string } {
  if (score >= 90) return { label: tr('Excelente', 'Excellent'), color: '#3ddc97' };
  if (score >= 75) return { label: tr('Competente', 'Competent'), color: '#8bd450' };
  if (score >= 55) return { label: tr('Mejorable', 'Needs work'), color: '#f2c14e' };
  return { label: tr('Insuficiente', 'Insufficient'), color: '#ef5b5b' };
}
