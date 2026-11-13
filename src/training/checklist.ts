/**
 * Pasos de la punción ecoguiada del acceso vascular, en el orden en que se hacen, marcados
 * automáticamente a partir del estado del simulador.
 *
 * Basado en: Moyano Franco MJ, Salgueira Lazo M, Roca-Tey R. Punción ecoguiada del acceso vascular
 * para hemodiálisis (Nefrología al día); GEMAV 2017; procedimientos SEDEN 3.3 y 3.4.
 * La vía periférica ecoguiada tiene su propia lista (`pivChecklist`).
 */
import { tr } from '../i18n';

export interface ChecklistState {
  /** ángulo entre el brazo y el cuerpo del paciente (°) y descenso del brazo desde el hombro (°) */
  armAngle: number;
  armPitch: number;
  /** medidas terminadas con el calibre */
  measures: number;
  /** posición de la sonda a lo largo del brazo (mm desde la muñeca) */
  probeX: number;
  access?: { anastomosisX?: number; zone: [number, number]; avoid?: { x0: number; x1: number }[]; graft?: boolean };
  /** punta de la otra aguja, ya confirmada (mm desde la muñeca) */
  otherTipX: number | null;
  tourniquet: boolean;
  asepsis: boolean;
  placed: boolean;
  /** la aguja activa ha dado reflujo */
  flashed: boolean;
  inLumen: boolean;
  /** ángulo entre la aguja y el eje del vaso (°) */
  angleToVessel: number | null;
  flushes: number;
  confirmed: boolean;
  /** vía periférica ecoguiada (catéter sobre aguja): si está, la lista es la de este procedimiento */
  piv?: PivChecklistState;
}

export interface PivChecklistState {
  /** compresor aplicado en el momento de la punción (antes de puncionar, el estado actual) */
  tourniquetAtPuncture: boolean;
  /** la punta del catéter, y no solo el bisel de la aguja, está en la luz */
  catheterTipInVein: boolean;
  /** % del catéter dentro de la vena (null si no está en una vena) */
  inVeinPct: number | null;
  /** el catéter se ha deslizado sobre la aguja por la luz de la vena */
  threaded: boolean;
  needleOut: boolean;
  /** lavado con suero correcto con el catéter ya colocado */
  flushed: boolean;
}

export interface ChecklistItem {
  label: string;
  done: boolean;
  /** cómo se hace en el simulador */
  how: string;
}

/**
 * Brazo apoyado, cómodo y relajado (recomendaciones británicas de punción, VASBI 2018), en abducción moderada:
 * los ≈ 45° del cuerpo son un criterio ergonómico del simulador, no una cifra de las guías.
 */
export function armPositionOk(armAngle: number, armPitch: number): boolean {
  return armAngle >= 30 && armAngle <= 60 && armPitch <= 25;
}

/** Zona de punción adecuada en la posición actual de la sonda. */
export function zoneOk(s: Pick<ChecklistState, 'probeX' | 'access' | 'otherTipX'>): boolean {
  const a = s.access;
  if (!a) return false;
  const x = s.probeX;
  if (x < a.zone[0] || x > a.zone[1]) return false;
  if (a.anastomosisX !== undefined && Math.abs(x - a.anastomosisX) < 30) return false;
  if ((a.avoid ?? []).some((z) => x >= z.x0 && x <= z.x1)) return false;
  return s.otherTipX === null || Math.abs(x - s.otherTipX) >= 50;
}

/**
 * Pasos de la vía periférica ecoguiada con catéter sobre aguja, en el orden del Manual MSD
 * («How To Do Ultrasound-Guided Peripheral Intravenous Catheter Insertion»): compresor, asepsia, reflujo,
 * avanzar 1–2 mm más para que entre la punta del catéter, deslizar el catéter con la aguja quieta, retirar
 * la aguja, soltar el compresor y lavar con suero. La longitud de catéter dentro de la vena (≥ 65 %) es de
 * Pandurangadu 2018.
 */
export function pivChecklist(s: ChecklistState): ChecklistItem[] {
  const p = s.piv!;
  return [
    {
      label: tr('Brazo apoyado y relajado (≈ 45° del cuerpo)', 'Arm supported and relaxed (≈ 45° from the body)'),
      done: armPositionOk(s.armAngle, s.armPitch),
      how: tr(
        `sobre una superficie firme y plana (ahora ${Math.round(s.armAngle)}°) · Sala y ergonomía`,
        `on a firm, flat surface (now ${Math.round(s.armAngle)}°) · Room &amp; ergonomics`,
      ),
    },
    {
      label: tr('Vena localizada y medida', 'Vein located and measured'),
      done: s.measures >= 2,
      how: tr(
        'en transversal (1): se colapsa al presionar y la arteria no; profundidad y diámetro con el calibre (M)',
        'in short axis (1): it collapses under pressure and the artery does not; depth and diameter with the caliper (M)',
      ),
    },
    { label: tr('Compresor aplicado', 'Tourniquet applied'), done: p.tourniquetAtPuncture, how: tr('proximal al punto de punción (K): la vena se distiende', 'proximal to the insertion site (K): the vein distends') },
    {
      label: tr('Asepsia', 'Asepsis'),
      done: s.asepsis,
      how: tr('piel desinfectada, funda y gel estériles · botón Asepsia', 'disinfected skin, sterile cover and gel · Asepsis button'),
    },
    {
      label: tr('Catéter sobre aguja colocado', 'Catheter-over-needle placed'),
      done: s.placed,
      how: tr('sonda en una mano, catéter en la otra · N o los botones de abordaje', 'probe in one hand, catheter in the other · N or the approach buttons'),
    },
    { label: tr('Punta de la aguja en la vena (reflujo)', 'Needle tip in the vein (flashback)'), done: s.flashed, how: tr('↑ siguiendo la punta en la pantalla', '↑ following the tip on the screen') },
    {
      label: tr('Punta del catéter en la vena', 'Catheter tip in the vein'),
      done: p.catheterTipInVein,
      how: tr('tras el reflujo, avanza 1–2 mm más (Mayús + ↑): el catéter queda por detrás del bisel', 'after flashback, advance 1–2 mm further (Shift + ↑): the catheter sits behind the bevel'),
    },
    {
      label: tr('Catéter deslizado en la vena (≥ 65 % dentro)', 'Catheter threaded into the vein (≥ 65% inside)'),
      done: p.threaded && p.inVeinPct !== null && p.inVeinPct >= 65,
      how: tr(
        `con la aguja quieta, desliza el catéter hasta el cono (U)${p.inVeinPct !== null ? ` · ahora ${p.inVeinPct} %` : ''}`,
        `holding the needle still, slide the catheter up to the hub (U)${p.inVeinPct !== null ? ` · now ${p.inVeinPct}%` : ''}`,
      ),
    },
    { label: tr('Aguja retirada', 'Needle removed'), done: p.needleOut, how: tr('botón «Retirar aguja» o ↓', '“Remove needle” button or ↓') },
    {
      label: tr('Compresor retirado y lavado con suero', 'Tourniquet released and saline flush'),
      done: !s.tourniquet && p.flushed,
      how: tr('suelta el compresor (K) y lava (J): el suero debe entrar sin extravasación', 'release the tourniquet (K) and flush (J): saline must flow with no extravasation'),
    },
    { label: tr('Vía confirmada', 'Line confirmed'), done: s.confirmed, how: tr('Intro', 'Enter') },
  ];
}

export function procedureChecklist(s: ChecklistState): ChecklistItem[] {
  if (s.piv) return pivChecklist(s);
  const graft = !!s.access?.graft;
  return [
    {
      label: tr('Brazo apoyado y relajado (≈ 45° del cuerpo)', 'Arm supported and relaxed (≈ 45° from the body)'),
      done: armPositionOk(s.armAngle, s.armPitch),
      how: tr(
        `sobre una superficie firme y plana (ahora ${Math.round(s.armAngle)}°) · Sala y ergonomía`,
        `on a firm, flat surface (now ${Math.round(s.armAngle)}°) · Room &amp; ergonomics`,
      ),
    },
    {
      label: tr('Vena localizada y medida', 'Vein located and measured'),
      done: s.measures >= 2,
      how: tr('en transversal (1), profundidad y diámetro con el calibre (M)', 'in short axis (1), depth and diameter with the caliper (M)'),
    },
    {
      label: tr('Zona de punción adecuada', 'Suitable cannulation site'),
      done: zoneOk(s),
      how: tr(
        `≥ 3 cm de la anastomosis, fuera de zonas a evitar${s.otherTipX !== null ? ' y ≥ 5 cm de la otra aguja' : ''} · pestaña Caso`,
        `≥ 3 cm from the anastomosis, outside areas to avoid${s.otherTipX !== null ? ' and ≥ 5 cm from the other needle' : ''} · Case tab`,
      ),
    },
    graft
      ? { label: tr('Sin compresor (prótesis)', 'No tourniquet (graft)'), done: !s.tourniquet, how: 'K' }
      : { label: tr('Compresor (FAV nativa)', 'Tourniquet (native AVF)'), done: s.tourniquet, how: 'K' },
    {
      label: tr('Asepsia', 'Asepsis'),
      done: s.asepsis,
      how: tr('piel desinfectada, funda y gel estériles · botón Asepsia', 'disinfected skin, sterile cover and gel · Asepsis button'),
    },
    {
      label: tr('Aguja colocada', 'Needle placed'),
      done: s.placed,
      how: tr('sonda en una mano, aguja en la otra · N o «Longitudinal · en plano»', 'probe in one hand, needle in the other · N or “Long axis · in-plane”'),
    },
    { label: tr('Punta en la luz (reflujo)', 'Tip in the lumen (flashback)'), done: s.flashed, how: tr('↑ siguiendo la punta en la pantalla', '↑ following the tip on the screen') },
    {
      label: tr('Aguja alineada y comprobada con suero', 'Needle aligned and checked with saline'),
      done: s.inLumen && s.angleToVessel !== null && s.angleToVessel <= 25 && s.flushes > 0,
      how: tr('≤ 25° con el vaso (AvPág + ↑) y lavado con suero (J)', '≤ 25° to the vessel (PgDn + ↑) and saline flush (J)'),
    },
    { label: tr('Punción confirmada', 'Cannulation confirmed'), done: s.confirmed, how: tr('Intro', 'Enter') },
  ];
}
