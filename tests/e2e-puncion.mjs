// Punción completa manejando la interfaz como un usuario (clics y teclado), con capturas.
//   node tests/e2e-puncion.mjs <url> [carpeta_capturas] [corto|largo|largo-venosa|corto-dntp|via|via-movil]
//   corto: eje corto con la tecla N desde el modo Exploración (avance sin seguir la punta).
//   largo: abordaje longitudinal con buena técnica: compresor (K), vista longitudinal (2), asepsia,
//          «Longitudinal · en plano»,
//          avance con ↑ hasta la luz, aplanar (AvPág) y avanzar hasta alinear la aguja con el vaso,
//          lavado con suero (J) visto en plano y con Doppler color (C), Intro.
//   largo-venosa: lo mismo con la aguja venosa, unos 5 cm proximal a la zona de la arterial (W),
//          anterógrada (hacia el corazón).
//   corto-dntp: eje corto con buena técnica: compresor, N, posicionamiento dinámico de la punta
//          (↑ hasta ver la punta, Mayús+W hasta perderla, y repetir), aplanar (AvPág) y avanzar,
//          lavado con suero (J) sobre la punta, aguas abajo y con Doppler color (C), Intro.
//   via:   vía periférica ecoguiada en el caso «piv_dificil» (lo carga la propia prueba): la vena se
//          colapsa al presionar (X), compresor (K), medidas, vista longitudinal (2), asepsia, catéter
//          sobre aguja en plano, ↑ hasta el reflujo, Mayús+↑ hasta que entra la punta del catéter,
//          U para deslizarlo hasta el cono, «Retirar aguja», soltar el compresor (K), suero (J), Intro.
//   via-movil: lo mismo en la interfaz táctil (?movil=1, pantalla de móvil), con sus botones y la
//          rueda de ajuste (Presión, Avance y Catéter).
// Sin Playwright completo vale playwright-core con un navegador instalado: PW_CHANNEL=msedge (o chrome).
// PW_GPU=1 usa la GPU del equipo en lugar de SwiftShader.
// Solo se lee el estado de la aplicación (window.app) para saber cuándo parar; las acciones son
// clics y teclas reales. El bucle de render se pausa durante cada captura (SwiftShader es lento).
// Cada captura guarda la pantalla completa y la imagen ecográfica nativa (<nombre>-eco.png).
import { createRequire } from 'module';
import { mkdirSync, writeFileSync } from 'fs';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { try { pw = require('playwright-core'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); } }

const [url, out = 'tests/screens/e2e', eje = 'corto'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
/** vía periférica: catéter sobre aguja en el caso piv_dificil, en escritorio o en la interfaz táctil */
const via = eje.startsWith('via');
const movil = eje === 'via-movil';
const target = new URL(url);
if (via) target.searchParams.set('caso', 'piv_dificil');
if (movil) target.searchParams.set('movil', '1');
const browser = await pw.chromium.launch({
  channel: process.env.PW_CHANNEL || undefined,
  args: process.env.PW_GPU === '1' ? ['--ignore-gpu-blocklist'] : ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: movil ? { width: 390, height: 844 } : { width: 1400, height: 860 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

const state = () => page.evaluate(() => {
  const a = window.app;
  const n = a.needle;
  const inLumen = n.state === 'luz';
  const cen = inLumen ? n.centering(a.model) : null;
  return {
    modo: a.mode,
    colocada: n.placed,
    estado: n.state,
    insertada: +n.depth.toFixed(1),
    vaso: n.inVessel?.def.id ?? null,
    luz_mm: inLumen ? +n.intraluminalLength(a.model).toFixed(1) : 0,
    centrado: cen === null ? null : +cen.toFixed(2),
    ...(n.cath ? { cateter: n.cath.stage, deslizado: +n.cath.slid.toFixed(1), en_vena_mm: +n.catheterInVein(a.model).toFixed(1) } : {}),
  };
});
const log = async (paso) => console.log(paso.padEnd(34), JSON.stringify(await state()));
const shot = async (name) => {
  // dejar correr unos fotogramas (paneles al día) y pausar el render para capturar
  await page.evaluate(() => { window.app.maxFrames = window.app.frameCount + 3; });
  await page.waitForFunction(() => window.app.frameCount >= window.app.maxFrames, null, { timeout: 120000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/${name}.png`, timeout: 120000 });
  // imagen ecográfica nativa, con la proporción física (ancho × profundidad) y la orientación de pantalla
  const eco = await page.evaluate(() => {
    const sim = window.app.sim;
    const nl = sim.nl, na = sim.na;
    const c = document.createElement('canvas');
    c.width = nl; c.height = na;
    const g = c.getContext('2d');
    const id = g.createImageData(nl, na);
    id.data.set(sim.readDisplay());
    g.putImageData(id, 0, 0);
    const k = 22; // px por mm
    const z = document.createElement('canvas');
    z.width = Math.round(sim.pose.width * k);
    z.height = Math.round(sim.settings.depth * k);
    const gz = z.getContext('2d');
    if (sim.settings.flipLR) { gz.translate(z.width, 0); gz.scale(-1, 1); }
    gz.drawImage(c, 0, 0, z.width, z.height);
    return z.toDataURL('image/png');
  });
  writeFileSync(`${out}/${name}-eco.png`, Buffer.from(eco.split(',')[1], 'base64'));
  // reanudar sólo si el bucle llegó a detenerse (evita dos bucles de render a la vez)
  await page.evaluate(() => {
    const a = window.app;
    const stopped = a.frameCount >= a.maxFrames;
    a.maxFrames = Infinity;
    if (stopped) requestAnimationFrame(() => a.frame());
  });
};
/** Mantiene pulsada una tecla hasta que se cumple la condición sobre el estado. */
const holdUntil = async (key, done, maxMs = 240000) => {
  await page.keyboard.down(key);
  const t0 = Date.now();
  let s = await state();
  while (!done(s) && Date.now() - t0 < maxMs) {
    await page.waitForTimeout(150);
    s = await state();
  }
  await page.keyboard.up(key);
  return s;
};
const WALL = ['tienda', 'luz', 'pared-post', 'transfixión', 'hueso'];
const PAST = ['luz', 'pared-post', 'transfixión', 'hueso'];
const BAD = ['pared-post', 'transfixión', 'hueso'];

/**
 * Posición de la punta respecto al plano de imagen (eje corto). eDir > 0: la punta ha pasado el
 * plano en el sentido de avance de la aguja; |eDir| < half: la punta está dentro del grosor de corte.
 */
const tipInfo = () => page.evaluate(() => {
  const a = window.app, n = a.needle, sim = a.sim;
  const dirE = Math.sign(n.dir.dot(sim.pose.E)) || 1;
  const im = sim.tissueToImage(n.tip);
  const inLumen = n.state === 'luz';
  return {
    eDir: im.e * dirE,
    eEntry: sim.tissueToImage(n.entry).e * dirE,
    half: sim.sliceThickness(Math.max(0, im.w)) / 2,
    w: im.w,
    estado: n.state,
    depth: n.depth,
    angle: n.angle,
    av: inLumen ? n.angleToVessel(a.model) : null,
    luz: inLumen ? n.intraluminalLength(a.model) : 0,
    cen: inLumen ? n.centering(a.model) : null,
    probeX: a.probe.x,
    frame: a.frameCount,
    // vía periférica
    press: a.probe.press,
    colapso: a.caseDef.access ? a.collapseOf(a.caseDef.access.veinId) : 0,
    cathIn: !!n.cath && n.catheterTipInLumen(a.model),
    cathFull: !!n.cath?.full,
    cathStage: n.cath?.stage ?? null,
  };
});
/** Mantiene pulsadas unas teclas fotograma a fotograma hasta que se cumple la condición. */
const holdFrames = async (keys, done, maxFrames = 200) => {
  for (const k of keys) await page.keyboard.down(k);
  let t = await tipInfo();
  for (let n = 0; n < maxFrames && !done(t); n++) {
    const f = t.frame;
    await page.waitForFunction((f) => window.app.frameCount > f, f, { timeout: 120000, polling: 40 });
    t = await tipInfo();
  }
  for (const k of [...keys].reverse()) await page.keyboard.up(k);
  return t;
};
/** Desliza la sonda (Mayús+W / Mayús+S, pasos finos) hasta dejar la punta dentro del corte. */
const centerOnTip = async () => {
  let t = await tipInfo();
  if (t.eDir > 0.4 * t.half) t = await holdFrames(['Shift', 'w'], (x) => x.eDir <= 0.2 * x.half, 60);
  else if (t.eDir < -0.4 * t.half) t = await holdFrames(['Shift', 's'], (x) => x.eDir >= -0.2 * x.half, 60);
  return t;
};
/**
 * Mide con el calibre la profundidad y el diámetro del vaso de acceso, con la sonda en transversal.
 * El calibre se activa con la tecla M o, en la interfaz táctil, con el botón «Medir».
 */
const measureVein = async (toggle = () => page.keyboard.press('m')) => {
  await toggle();
  const pts = await page.evaluate(() => {
    const a = window.app;
    const v = a.vesselInImage(a.caseDef.access?.veinId ?? 'fav');
    if (!v) return null;
    const r = document.getElementById('usView').getBoundingClientRect();
    const at = (u, w) => {
      const [x, y] = a.monitor.toPx(u, w);
      return [r.left + x, r.top + y];
    };
    const top = v.w - v.r;
    return [at(v.u, 0.3), at(v.u, top), at(v.u, top), at(v.u, v.w + v.r)];
  });
  if (!pts) throw new Error('El vaso de acceso no está en la imagen para medirlo');
  for (const [x, y] of pts) {
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
  }
  await toggle();
  return page.evaluate(() => window.app.monitor.calipers.filter((c) => c.b).map((c) => c.label));
};
const waitFlush = (tau) => page.waitForFunction((tau) => { const a = window.app; return (a.flush && a.time - a.flush.t0 >= tau) || a.metrics.infiltrations > 0; }, tau, { timeout: 240000, polling: 50 });

// basta con el documento: la espera real es a que la aplicación dibuje sus primeros fotogramas
await page.goto(target.href, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForFunction(() => window.app && window.app.frameCount > 2, null, { timeout: 180000 });
// 1. cerrar la bienvenida con su botón
if (await page.isVisible('#modalClose')) await page.click('#modalClose');
await log('1. bienvenida cerrada');
let s;
if (via) {
  // Botones de cada interfaz. En la táctil: barra de navegación, botones del panel inferior y rueda de
  // ajuste (se elige el ajuste en su ficha y se mantiene pulsado + o −).
  const btn = (name) => page.getByRole('button', { name, exact: true }).click();
  const chip = (id) => page.click(`.m-chip[data-id="${id}"]`);
  /** Mantiene pulsado un botón (− o + de la rueda) fotograma a fotograma hasta que se cumple la condición. */
  const holdButton = async (selector, done, maxFrames = 400) => {
    const box = await page.locator(selector).boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    let t = await tipInfo();
    for (let n = 0; n < maxFrames && !done(t); n++) {
      const f = t.frame;
      await page.waitForFunction((f) => window.app.frameCount > f, f, { timeout: 120000, polling: 40 });
      t = await tipInfo();
    }
    await page.mouse.up();
    return t;
  };
  const PLUS = '.m-jog button:last-child';
  const MINUS = '.m-jog button:first-child';
  /** Arrastra la rueda de ajuste `px` píxeles (avance fino: 0,04 mm por píxel). */
  const dragJog = async (px) => {
    const box = await page.locator('.m-jog-strip').boundingBox();
    const x0 = box.x + box.width / 2 - px / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x0, y);
    await page.mouse.down();
    await page.mouse.move(x0 + px, y, { steps: 4 });
    await page.mouse.up();
  };
  // 2. localizar la vena en transversal y comprobar que se colapsa al presionar (la arteria no)
  if (movil) {
    await btn('Centrar');
    await btn('Transv.');
  } else {
    await page.click('#modeTabs button[data-mode="cannulate"]');
    await page.click('button[title^="Centrar sobre el vaso"]');
    await page.keyboard.press('1');
  }
  await page.waitForTimeout(1500);
  await shot('01-vena-en-transversal');
  let t;
  if (movil) {
    await chip('presion');
    t = await holdButton(PLUS, (x) => x.colapso > 0.7, 300);
  } else t = await holdFrames(['x'], (x) => x.colapso > 0.7, 300);
  if (t.colapso <= 0.6) throw new Error(`La vena no se colapsa al presionar (colapso ${t.colapso.toFixed(2)})`);
  await log('2. la vena se colapsa al presionar');
  await shot('02-vena-colapsada');
  if (movil) t = await holdButton(MINUS, (x) => x.press <= 0.8, 300);
  else t = await holdFrames(['z'], (x) => x.press <= 0.8, 300);
  // 3. compresor y medidas (profundidad y diámetro) con el calibre
  if (movil) await btn('Compresor');
  else await page.keyboard.press('k');
  await page.waitForTimeout(800);
  console.log('   medidas (profundidad, diámetro):', (await measureVein(movil ? () => btn('Medir') : undefined)).join(', '));
  await shot('03-compresor-y-medidas');
  // 4. vista longitudinal, asepsia y catéter sobre aguja en plano
  if (movil) {
    await page.click('#mNav button[data-nav="cannulate"]');
    await btn('Long.');
    await btn('Asepsia');
    await btn('En plano');
  } else {
    await page.keyboard.press('2');
    await page.waitForTimeout(800);
    await page.getByRole('button', { name: 'Asepsia', exact: true }).click();
    await page.getByRole('button', { name: 'Longitudinal · en plano' }).click();
  }
  await page.waitForFunction(() => window.app.needle.placed, null, { timeout: 60000 });
  await log('4. compresor, asepsia y catéter en plano');
  await shot('04-cateter-sobre-la-piel');
  // 5. avanzar viendo la aguja hasta la pared (signo de la tienda) y la luz (reflujo)
  const advance = async (done, maxFrames) => {
    if (!movil) return holdFrames(['ArrowUp'], done, maxFrames);
    await chip('avance');
    return holdButton(PLUS, done, maxFrames);
  };
  t = await advance((x) => WALL.includes(x.estado), 400);
  if (t.estado === 'tienda') {
    await shot('05-signo-tienda');
    t = await advance((x) => PAST.includes(x.estado), 80);
  }
  if (t.estado !== 'luz') throw new Error(`La punta no quedó en la luz (estado ${t.estado}, ${t.depth.toFixed(1)} mm)`);
  await page.waitForTimeout(2500); // reflujo en la cámara de la aguja
  await log('5. ↑ hasta el reflujo');
  await shot('06-reflujo');
  // con el reflujo, la punta del catéter aún no ha entrado: si se intenta deslizar, no progresa
  if (movil) {
    await chip('cateter');
    await dragJog(40);
  } else await holdFrames(['u'], () => false, 3);
  t = await tipInfo();
  if (t.cathStage !== 'montado') throw new Error('El catéter se deslizó sin tener la punta en la vena');
  // 6. avanzar 1–2 mm más, en pasos finos, hasta que la punta del catéter esté dentro de la vena
  for (let i = 0; i < 40 && !t.cathIn && t.estado === 'luz'; i++) {
    if (movil) {
      await chip('avance');
      await dragJog(8);
      t = await tipInfo();
    } else t = await holdFrames(['Shift', 'ArrowUp'], (x) => x.cathIn || x.estado !== 'luz', 4);
  }
  // un poco más de margen, sin llegar a la pared posterior
  if (movil) await dragJog(10);
  else await holdFrames(['Shift', 'ArrowUp'], () => false, 6);
  t = await tipInfo();
  if (!t.cathIn || t.estado !== 'luz') throw new Error(`La punta del catéter no quedó en la vena (estado ${t.estado})`);
  await log('6. 1–2 mm más: catéter en la vena');
  await shot('07-punta-del-cateter-en-la-vena');
  // 7. con la aguja quieta, deslizar el catéter hasta el cono
  if (movil) {
    await chip('cateter');
    t = await holdButton(PLUS, (x) => x.cathFull, 600);
  } else t = await holdFrames(['u'], (x) => x.cathFull, 600);
  if (!t.cathFull) throw new Error('El catéter no llegó hasta el cono');
  await log('7. catéter deslizado hasta el cono');
  await shot('08-cateter-deslizado');
  // 8. retirar la aguja: queda el catéter
  if (movil) await btn('Retirar');
  else await page.getByRole('button', { name: 'Retirar aguja', exact: true }).click();
  await page.waitForFunction(() => window.app.needle.needleOut, null, { timeout: 60000 });
  await log('8. aguja retirada');
  await shot('09-aguja-retirada');
  // 9. soltar el compresor y lavar con suero: sin extravasación
  if (movil) {
    await btn('Compresor');
    await btn('Suero');
  } else {
    await page.keyboard.press('k');
    await page.keyboard.press('j');
  }
  await waitFlush(1.2);
  if (await page.evaluate(() => window.app.metrics.infiltrations > 0)) throw new Error('El lavado produjo una extravasación: el catéter no estaba en la vena');
  await log('9. compresor suelto y lavado con suero');
  await shot('10-lavado-con-suero');
  await page.waitForFunction(() => !window.app.flush, null, { timeout: 240000, polling: 100 });
  s = await state();
  if (movil) await btn('Confirmar');
} else if (eje === 'corto-dntp') {
  // 2. modo Punción (pestaña), sonda centrada (◎), compresor (K) y vista transversal (1)
  await page.click('#modeTabs button[data-mode="cannulate"]');
  await page.click('button[title^="Centrar sobre el vaso"]');
  await page.keyboard.press('k');
  await page.keyboard.press('1');
  await page.waitForTimeout(1500);
  console.log('   medidas (profundidad, diámetro):', (await measureVein()).join(', '));
  await log('2. Punción, compresor, eje corto');
  // 3. asepsia (funda y gel estériles) y aguja fuera de plano (N con la sonda en transversal)
  await page.getByRole('button', { name: 'Asepsia', exact: true }).click();
  await page.keyboard.press('n');
  await page.waitForFunction(() => window.app.needle.placed, null, { timeout: 60000 });
  await log('3. tecla N (fuera de plano)');
  // 4. posicionamiento dinámico de la punta: plano junto a la entrada (Mayús+S) y después, en ciclos,
  //    ↑ hasta ver la punta (punto brillante) y Mayús+W hasta perderla
  let t = await holdFrames(['Shift', 's'], (x) => x.eEntry > -2.5, 120);
  await shot('01-sonda-junto-a-la-entrada');
  let shotTissue = false;
  let shotTent = false;
  for (let cycle = 0; cycle < 60 && t.estado !== 'luz'; cycle++) {
    t = await holdFrames(['ArrowUp'], (x) => x.eDir >= -0.35 * x.half || x.estado === 'luz' || BAD.includes(x.estado), 80);
    if (BAD.includes(t.estado)) throw new Error(`Complicación durante el DNTP: ${t.estado}`);
    if (!shotTissue && t.estado === 'tejido' && t.depth > 2.5) {
      await shot('02-punta-en-el-tejido');
      shotTissue = true;
    }
    if (!shotTent && t.estado === 'tienda') {
      t = await centerOnTip();
      await shot('03-signo-tienda');
      shotTent = true;
    }
    if (t.estado === 'luz') break;
    t = await holdFrames(['Shift', 'w'], (x) => x.eDir < -1.1 * x.half, 60);
  }
  if (t.estado !== 'luz') throw new Error(`No se llegó a la luz con DNTP (estado ${t.estado})`);
  t = await centerOnTip();
  await page.waitForTimeout(2500); // reflujo en la cámara de la aguja
  await log('4. DNTP hasta la luz');
  await shot('04-punta-en-la-luz');
  // 5. aplanar (AvPág) y avanzar a la vez dentro de la luz, siguiendo la punta con la sonda, hasta
  //    alinear la aguja con el eje del vaso (criterio final ≤ 25°; aquí con margen)
  const AV = 22;
  const goal = (x) => (x.av ?? 90) <= AV && x.luz >= 6 && (x.cen ?? 1) < 0.6;
  for (let i = 0; i < 40 && t.estado === 'luz' && !goal(t); i++) {
    if (Math.abs(t.eDir) > 0.6 * t.half) {
      t = await centerOnTip();
      continue;
    }
    const flatten = (t.av ?? 0) > AV && t.luz >= 2.5;
    const keys = flatten ? ['PageDown', 'ArrowUp'] : ['ArrowUp'];
    t = await holdFrames(keys, (x) => x.estado !== 'luz' || Math.abs(x.eDir) > 0.6 * x.half || goal(x) || (flatten && (x.av ?? 0) <= AV), 12);
  }
  if (t.estado !== 'luz') throw new Error(`La punta salió de la luz al aplanar (estado ${t.estado})`);
  t = await centerOnTip();
  await log('5. aplanar y avanzar');
  await shot('05-punta-centrada');
  // 6. lavado con suero sobre la punta (J): microburbujas y chorro en la luz
  await page.keyboard.press('j');
  await waitFlush(0.8);
  if (await page.evaluate(() => window.app.metrics.infiltrations > 0)) throw new Error('El lavado produjo una infiltración: la punta no estaba en la luz');
  await log('6. J: suero sobre la punta');
  await shot('06-suero-en-la-punta');
  // 7. deslizar la sonda ~6 mm aguas abajo durante el lavado: la luz se llena de microburbujas
  t = await holdFrames(['w'], (x) => x.eDir < -6, 12);
  await waitFlush(1.8);
  await log('7. suero aguas abajo');
  await shot('07-suero-aguas-abajo');
  // volver sobre la punta cuando termine el lavado
  await page.waitForFunction(() => !window.app.flush, null, { timeout: 240000, polling: 100 });
  t = await holdFrames(['s'], (x) => x.eDir > -1.2, 12);
  t = await centerOnTip();
  // 8. segundo lavado con Doppler color (C): chorro con aliasing junto a la punta
  await page.keyboard.press('c');
  await page.keyboard.press('j');
  await waitFlush(0.7);
  await log('8. J con Doppler color');
  await shot('08-suero-doppler-color');
  await page.waitForFunction(() => !window.app.flush, null, { timeout: 240000, polling: 100 });
  await page.keyboard.press('c');
  s = await state();
} else if (eje === 'largo' || eje === 'largo-venosa') {
  const venosa = eje === 'largo-venosa';
  // 2. modo Punción (pestaña), sonda centrada (◎), compresor (K) y vista longitudinal (2)
  await page.click('#modeTabs button[data-mode="cannulate"]');
  if (venosa) {
    // la aguja venosa va proximal a la arterial (≥ 5 cm entre puntas): deslizar la sonda hacia el codo
    await holdFrames(['w'], (x) => x.probeX >= 160, 80);
  }
  await page.click('button[title^="Centrar sobre el vaso"]');
  await page.keyboard.press('k');
  // localizar y medir la vena en transversal (1) y pasar a longitudinal (2)
  await page.keyboard.press('1');
  await page.waitForTimeout(1500);
  console.log('   medidas (profundidad, diámetro):', (await measureVein()).join(', '));
  await page.keyboard.press('2');
  await page.waitForTimeout(1500);
  if (venosa) await page.getByRole('button', { name: 'Venosa', exact: true }).click();
  await log(`2. Punción, compresor, eje largo${venosa ? ', aguja venosa' : ''}`);
  // 3. asepsia y aguja en plano con el botón de la consola: entra por el extremo distal de la sonda
  await page.getByRole('button', { name: 'Asepsia', exact: true }).click();
  await page.getByRole('button', { name: 'Longitudinal · en plano' }).click();
  await page.waitForFunction(() => window.app.needle.placed, null, { timeout: 60000 });
  await log('3. asepsia y «Longitudinal · en plano»');
  await shot('01-aguja-en-plano');
  // 4. avanzar (↑) viendo la aguja entera hasta la pared (signo de la tienda) y la luz (reflujo)
  let t = await holdFrames(['ArrowUp'], (x) => WALL.includes(x.estado), 300);
  if (!WALL.includes(t.estado)) throw new Error(`La aguja no llegó al vaso (estado ${t.estado}, ${t.depth.toFixed(1)} mm)`);
  await log('4. ↑ hasta la pared');
  if (t.estado === 'tienda') {
    await shot('02-signo-tienda');
    t = await holdFrames(['ArrowUp'], (x) => PAST.includes(x.estado), 60);
  }
  if (t.estado !== 'luz') throw new Error(`La punta no quedó en la luz (estado ${t.estado})`);
  await page.waitForTimeout(2500); // reflujo en la cámara de la aguja
  await log('5. ↑ hasta la luz (reflujo)');
  await shot('03-reflujo');
  // 6. bajar el ángulo (AvPág) y avanzar a la vez por el centro de la luz hasta alinear la aguja con el vaso
  const AV = 20;
  const goal = (x) => (x.av ?? 90) <= AV && x.luz >= 6 && (x.cen ?? 1) < 0.6;
  for (let i = 0; i < 40 && t.estado === 'luz' && !goal(t); i++) {
    const flatten = (t.av ?? 0) > AV && t.luz >= 2;
    t = await holdFrames(flatten ? ['PageDown', 'ArrowUp'] : ['ArrowUp'], (x) => x.estado !== 'luz' || goal(x) || (flatten && (x.av ?? 0) <= AV), 12);
  }
  if (t.estado !== 'luz') throw new Error(`La punta salió de la luz al aplanar (estado ${t.estado})`);
  await log('6. aplanar y avanzar');
  await shot('04-aguja-alineada');
  // 7. lavado con suero (J): chorro de microburbujas desde la punta que el flujo arrastra aguas abajo
  await page.keyboard.press('j');
  await waitFlush(0.5);
  if (await page.evaluate(() => window.app.metrics.infiltrations > 0)) throw new Error('El lavado produjo una infiltración: la punta no estaba en la luz');
  await log('7. J: chorro en la punta');
  await shot('05-suero-chorro');
  await waitFlush(2.0);
  await log('8. J: la luz se llena aguas abajo');
  await shot('06-suero-aguas-abajo');
  // al terminar la inyección el flujo se lleva el suero y la luz vuelve a verse anecoica
  await page.waitForFunction(() => !window.app.flush, null, { timeout: 240000, polling: 100 });
  await shot('07-fin-del-lavado');
  // 9. segundo lavado con Doppler color (C): chorro con aliasing junto a la punta
  await page.keyboard.press('c');
  await page.keyboard.press('j');
  await waitFlush(0.7);
  await log('9. J con Doppler color');
  await shot('08-suero-doppler-color');
  await page.waitForFunction(() => !window.app.flush, null, { timeout: 240000, polling: 100 });
  await page.keyboard.press('c');
  s = await state();
} else {
  // 2. centrar la sonda sobre el vaso (botón ◎) y vista transversal (tecla 1)
  await page.click('button[title^="Centrar sobre el vaso"]');
  await page.keyboard.press('1');
  await page.waitForTimeout(1500);
  await log('2. sonda centrada, eje corto');
  // 3. N desde el modo Exploración: debe pasar a Punción y colocar la aguja
  await page.keyboard.press('n');
  await page.waitForFunction(() => window.app.needle.placed, null, { timeout: 60000 });
  await log('3. tecla N');
  await shot('01-aguja-colocada');
  // 4. avanzar con ↑ hasta la pared y la luz
  s = await holdUntil('ArrowUp', (x) => WALL.includes(x.estado));
  await log('4. ↑ hasta la pared');
  if (s.estado === 'tienda') {
    await shot('02-signo-tienda');
    s = await holdUntil('ArrowUp', (x) => PAST.includes(x.estado));
  }
  await page.waitForTimeout(3000); // dejar que aparezca el reflujo en la cámara de la aguja
  await log('5. ↑ hasta la luz');
  await shot('03-reflujo');
}
// confirmar con Intro (en la interfaz táctil ya se ha pulsado «Confirmar»)
if (!movil) await page.keyboard.press('Enter');
await page.waitForTimeout(2000);
const result = await page.evaluate(() => ({
  puntuacion: window.app.metrics.score(),
  pasos: `${document.querySelectorAll('#mSteps li.done').length}/${document.querySelectorAll('#mSteps li').length}`,
  redirecciones: window.app.metrics.redirections,
  lavados: window.app.metrics.flushes,
  infiltraciones: window.app.metrics.infiltrations,
  criterios: window.app.metrics.checks.map((c) => `${c.ok === null ? '·' : c.ok ? '✓' : '✗'} ${c.label}: ${c.detail}`),
}));
await log('Intro (evaluación)');
await shot(eje === 'corto' ? '04-evaluacion' : via ? '11-evaluacion' : '09-evaluacion');
const vis = await page.evaluate(() => window.app.metrics.snapshot().tipVisiblePct);
const cateter_pct = await page.evaluate(() => window.app.metrics.snapshot().catheterPct);
console.log(JSON.stringify({ ...result, punta_visible_pct: Math.round(vis), ...(via ? { cateter_en_vena_pct: cateter_pct } : {}) }, null, 1));
console.log('errores de la página:', errors.length ? errors : 'ninguno');
await browser.close();
const flushOk = eje === 'corto' ? true : result.lavados === (via ? 1 : 2);
// vía periférica: todos los criterios cumplidos, con al menos el 65 % del catéter dentro de la vena
const viaOk = !via || (cateter_pct >= 65 && result.criterios.every((c) => c.startsWith('✓')));
// ninguna ruta cambia la trayectoria en el tejido: aplanar dentro de la luz no es una redirección
const ok = s.estado === 'luz' && !errors.length && flushOk && viaOk && result.infiltraciones === 0 && result.redirecciones === 0;
process.exit(ok ? 0 : 1);
