# Estrategia de tráfico orgánico de Fistulab

Estudio estratégico para atraer público y usuarios de forma orgánica: contenidos SEO, embudo de enlaces (directorios, listas y comunidades), vídeo y redes.

*Fecha: 25 de octubre de 2026. El sitio se lanzó el 7 de octubre de 2026.*

> **Limitaciones de este estudio.**
> - **Search Console:** al redactar el estudio no tuve acceso. El 27 de octubre llegaron los primeros datos, desde otra sesión con acceso a la propiedad; están en el apartado 2.0.
> - **Volúmenes de búsqueda:** el estudio no los incluye. La prioridad de cada tema se basa en lo que muestran los resultados de búsqueda reales: quién posiciona y con qué formato. También pesan el tamaño de cada audiencia y el encaje con el simulador. Cuando haya datos de Search Console, se recalibran.
> - **Verificación de directorios, comunidades y fechas:** proceden de búsquedas web hechas el 25 de octubre de 2026. Casi ningún sitio se pudo abrir directamente. Lo marcado como «sin verificar» hay que confirmarlo antes de actuar, y lo mismo vale para cualquier plazo de envío.

---

## Resumen ejecutivo

1. **El nicho está casi vacío en formato web.**
   - En español, las búsquedas sobre punción de la FAV las ocupan PDFs: manuales de SEDEN, protocolos del SAS, Redalyc y repositorios universitarios. También aparecen artículos de divulgación (Portales Médicos) y apuntes de academias (SalusPlay).
   - En inglés dominan los resúmenes de estudios (IVTEAM, clinicaltrials.gov) y los PDFs de la NKF.
   - Casi nadie tiene guías HTML prácticas, actualizadas y con imagen. Las 16 guías de Fistulab ya son mejores que la mayor parte de lo que posiciona.
2. **Google ya muestra las guías, pero casi nadie hace clic.** Hasta el 27 de octubre hubo unas 510 impresiones y 3 clics. Dos guías en inglés (infiltración y agujas) están en el borde de la primera página, en las posiciones 9–11; ya les he ajustado el título y la descripción (apartado 2.0). En nuestras pruebas, el repositorio de GitHub también aparece en búsquedas como «punción ecoguiada FAV».
3. **La gran ventaja es la imagen.** Ninguna guía tiene hoy una sola captura del simulador (0 imágenes `<img>`), y en YouTube no hay ningún vídeo que muestre la punción ecoguiada en plano explicada en 3D. Una misma sesión de grabación con el simulador puede dar un vídeo largo, cuatro clips cortos, varias capturas para las guías y GIFs para redes.
4. **Contenidos: pasar de 8 a unos 25 temas por idioma en 6 meses**, en seis bloques:
   - valoración del acceso;
   - complicaciones;
   - técnica;
   - ecografía para enfermería;
   - formación;
   - herramientas.
   
   Cada página lleva a un caso o a una lección del simulador (`?caso=`, `?leccion=`). Ese enlace es el embudo.
5. **Los cinco primeros artículos:**
   - tipos de FAV;
   - punción difícil (profunda, tortuosa, con colaterales);
   - exploración física (frémito, soplo, elevación del brazo);
   - simuladores de punción, con *phantom* casero;
   - cómo implantar la punción ecoguiada en la unidad.
   
   Además, una **calculadora de Qa** y un **checklist imprimible**, que son lo que más enlaces atrae.
6. **Embudo de enlaces en tres niveles:**
   - **Nivel 1:** sociedades, cursos y revistas. Dan pocos enlaces, pero de mucha autoridad y tráfico muy cualificado.
   - **Nivel 2:** directorios y listas curadas de simulación, POCUS, recursos educativos abiertos y guías de biblioteca universitaria.
   - **Nivel 3:** plataformas que ya posicionan solas: YouTube, GitHub, Reddit, LinkedIn y Zenodo.
   
   Hay que evitar los directorios genéricos y el intercambio masivo de enlaces.
7. **Hay plazos inminentes:**
   - congreso SEDEN, del 8 al 10 de noviembre en Murcia;
   - póster en ANNA, hasta el 8 de diciembre;
   - comunicación al congreso de la Vascular Access Society (VAS), hasta el 15 de diciembre;
   - SESSEP, hasta el 20 de diciembre;
   - EIR, el 23 de enero de 2027.
8. **Vídeo antes que más redes.** Primero dos vídeos estrella:
   - en español: «Punción ecoguiada de la FAV paso a paso»;
   - en inglés: «In-plane vs out-of-plane explained in 3D».
   
   Después, una serie corta semanal, «El error de la semana», para Shorts, Reels y TikTok.
9. **Redes con foco:**
   - LinkedIn y X para la enfermería española (SEDEN sigue en X);
   - Bluesky (#NephSky) y X para la nefrología internacional;
   - grupos de Facebook y WhatsApp en España y Latinoamérica, siempre con permiso de quien los administra;
   - Reddit solo con la etiqueta de cada comunidad: técnica en r/threejs y r/webgl, y enfermería solo donde lo permitan.
10. **Hay que reforzar la autoría.** Es contenido médico de alto riesgo para los buscadores (lo que Google llama YMYL), y hoy lo firma «Fistulab» como organización. Una autoría con nombre y titulación, más una revisión clínica nombrada, es lo que más credibilidad añade.
11. **Hoy no se puede saber qué canal funciona**, porque no hay analítica: el sitio no usa cookies ni la tiene. Hay que decidir si se añade un contador sin cookies (apartado 13).

---

## 1. Punto de partida

### 1.1 El sitio hoy

| Aspecto | Estado | Valoración |
|---|---|---|
| Páginas | Simulador, índice de guías y 8 guías, en español y en inglés (20 URL en el sitemap) | Buena base, pero corta para tener autoridad en el tema |
| Calidad de las guías | 1.800–3.100 palabras, «En resumen», tablas, diagramas SVG, referencias (KDOQI 2019, GEMAV 2017, VASBI) y botones a casos y lecciones | Muy buena: por encima de lo que posiciona |
| SEO técnico | Canónicas, `hreflang`, schema `Article` + `MedicalWebPage`, migas de pan, sitemap generado al compilar, IndexNow tras cada publicación | Correcto |
| Imágenes | **Ninguna** `<img>` en las guías (solo SVG). Todas comparten `og.jpg` como imagen para redes | Gran margen de mejora: búsqueda de imágenes, redes y tiempo de lectura |
| Autoría | `author` = organización Fistulab. No hay persona ni revisor clínico | Punto débil en contenido médico (E-E-A-T) |
| Enlaces externos | Prácticamente ninguno: dominio nuevo | Es el cuello de botella |
| Medición | Sin analítica (promesa de privacidad). Search Console y Bing pendientes de confirmar | No se ve qué canal funciona |
| Conversión | Uso del simulador, Ko-fi y correo. No hay boletín ni forma de volver a contactar | El embudo termina en el primer uso |

### 1.2 La competencia en Google: un nicho de PDFs

Las búsquedas de prueba muestran el mismo patrón en casi todos los temas:

- **«punción ecoguiada fístula arteriovenosa»:**
  - el manual de procedimientos de enfermería nefrológica (PDF de enfermerianefrologica.com);
  - un protocolo PDF del Hospital Virgen de la Victoria (SAS);
  - *Diálisis y Trasplante* en PDF;
  - repositorios universitarios de Ecuador y Perú;
  - Redalyc.
- **«cuidados de la fístula arteriovenosa enfermería»:** repositorios universitarios (Jaén y UPCH), revistas brasileñas y portuguesas en PDF y tres artículos de Revista Portales Médicos.
- **«thrill y soplo fístula exploración física»:** PDFs de *Angiología* y *Revista Cubana de Angiología*, y un caso de Radiopaedia.
- **«ultrasound guided fistula cannulation»:** registros de clinicaltrials.gov, resúmenes de IVTEAM y repositorios universitarios.
- **«how to cannulate a fistula»:** IVTEAM, manuales académicos en PDF y PMC.
- **«AV fistula physical exam»:** PMC, un PDF del London Health Sciences Centre, NephSIM y open-exam-prep (preparación del examen BONENT).
- **«simulador de ecografía online gratis» y «free online ultrasound simulator»:** HealthySimulation, SonoSim, SIMTICS, InSimo y apps de iOS. Ninguno es gratuito y específico del acceso vascular.

**Conclusión:** en este nicho se gana con amplitud y formato. Hacen falta muchas páginas HTML útiles y bien enlazadas entre sí, con imagen y práctica, que cubran todo el tema mejor que los PDFs. El volumen total de búsquedas del nicho es modesto. Por eso hay que dominarlo entero y abrirse a temas vecinos con más volumen: ecografía básica para enfermería, arteria o vena, artefactos y simuladores.

### 1.3 A quién atraer

| Segmento | Qué busca | Dónde está | Qué le ofrece Fistulab | Peso |
|---|---|---|---|---|
| Enfermería de hemodiálisis (España y Latinoamérica) | Técnica, complicaciones, cómo empezar con la ecografía | Google, grupos de WhatsApp y Facebook, X, SEDEN, cursos | Guías, casos y práctica sin riesgo | **Principal** |
| *Dialysis nurses* y **técnicos de hemodiálisis en EE. UU.** (allí también pinchan los técnicos con certificación CCHT o CHT) | Técnica, preparación de exámenes, primeras semanas de trabajo | Google, YouTube, TikTok, Reddit, allnurses | Guías en inglés, preguntas de examen, simulador | **Principal** (volumen) |
| *Renal nurses* en Reino Unido, Australia y Nueva Zelanda | Recomendaciones VASBI, formación MAGIC, ecografía | ANN UK, KQuIP, RSA | Práctica previa a la formación presencial | Media |
| Estudiantes de enfermería (EIR y NCLEX) | Preguntas tipo test, conceptos | Google, TikTok, academias | Preguntas con explicación y vídeos cortos | Media (pico en diciembre y enero) |
| Nefrología, accesos vasculares e intervencionismo | Doppler, Qa, estenosis, POCUS | Bluesky (#NephSky), X, congresos (VAS, ASDIN, SEN) | Casos de estenosis y Doppler pulsado | Media (dan autoridad y enlaces) |
| **Docentes, supervisión y centros de simulación** | Cómo formar al equipo, rúbricas, simuladores | Congresos, SESSEP, HealthySimulation, LinkedIn | Guía docente, rúbrica, proyección en clase | **Clave**: un docente trae a un grupo entero |
| Pacientes en hemodiálisis domiciliaria | Autopunción, dolor, ojal | Home Dialysis Central, r/dialysis, asociaciones | Guías divulgativas y práctica visual | Baja: con cuidado |
| Comunidad de desarrolladores (WebGL, three.js) | Proyectos técnicos curiosos | Hacker News, r/threejs, foro de three.js | Física de ultrasonidos en WebGL2 y código abierto | Solo para enlaces y marca |

---

## 2. Search Console: puesta a punto y rutina

### 2.0 Línea base (datos del 27 de octubre de 2026)

**Propiedad.** `sc-domain:fistulab.com`, de dominio, con permiso de propietario.

**Sitemap.** 20 URL enviadas, último rastreo el 22 de octubre. El informe marca 0 indexadas, pero las páginas ya reciben impresiones, así que ese contador va con retraso. Las cuatro guías nuevas (tipos de FAV y punción difícil, en los dos idiomas) entrarán en el sitemap al publicar.

**Rendimiento.** Unas 510 impresiones y 3 clics.

| Página | Impresiones | Posición | Clics |
|---|---|---|---|
| `/en/guides/fistula-infiltration/` | 150 | 8,9 | 1 |
| `/en/guides/avf-needle-angle-and-gauge/` | 148 | 10,7 | 0 |
| `/guias/regla-de-los-6-maduracion-fav/` | 59 | 8,1 | 0 |
| `/en/guides/av-fistula-doppler-ultrasound/` | 59 | 38 | 0 |
| `/guias/puncion-ecoguiada-fav/` | 34 | 50 | 0 |

| Consulta | Impresiones | Posición |
|---|---|---|
| «punción ecoguiada» | 23 | 68 |
| «dialysis fistula infiltration» | 9 | 9 |
| «infiltrated fistula» | 8 | 11 |

**Lectura de los datos:**
- Con tres semanas de vida y sin enlaces, el inglés recibe más impresiones que el español: el mercado de EE. UU. pesa.
- Las dos guías en inglés en la posición 9–11 son la palanca más rápida. Ya están reescritos sus títulos y descripciones, pendientes de publicar:
  - **infiltración:** «Infiltrated dialysis fistula: what to do, how to prevent it», que recoge las dos consultas reales;
  - **agujas:** «Dialysis needle gauge and AV fistula cannulation angle», con las cifras clave en la descripción.
- «Punción ecoguiada» en la posición 68 es una consulta genérica: también la buscan quienes canalizan vías periféricas o centrales. Se sube con enlaces y con la guía D3 («en plano o fuera de plano»), no retocando el título.
- **URL con `?leccion=` y `?caso=`.** El simulador y su versión inglesa llevan una canónica fija a `https://fistulab.com/` y `https://fistulab.com/en/`, y el código no reescribe la URL. Por eso Google las agrupa en la portada. En Search Console saldrán como «página alternativa con etiqueta canónica adecuada»: es lo esperado y no hay que corregir nada. No conviene bloquearlas en `robots.txt`, porque Google dejaría de ver la canónica.
- **Segunda ronda (27 de octubre), a partir de la propuesta de la sesión de Directorios:**
  - **infiltración (EN):** el título pasa a «Infiltrated fistula in dialysis: what to do, ice or heat». Se añade un cuadro de qué hacer en los primeros minutos, en la misma sesión y en los días siguientes, también en la versión en español;
  - **agujas (EN):** el título pasa a «Dialysis needle size chart (14–17G) and cannulation angle». Se añade la pregunta «Is the venous needle placed antegrade or retrograde?» en los dos idiomas. La tabla de calibre y flujo ya seguía a la NKF;
  - **regla de los 6 (ES):** «Regla de los 6 de la fístula: cuándo está madura», con las tres cifras en la descripción;
  - **punción ecoguiada (ES):** «Punción ecoguiada de la fístula arteriovenosa paso a paso»;
  - **Doppler (EN):** «AV fistula ultrasound: normal flow volume & stenosis».
- **Pendiente en Search Console (lo hace el responsable del proyecto):**
  - pedir la indexación, URL a URL, de las guías en español sin impresiones (infiltración, aneurisma, técnica, escalera y ojal) y de las cuatro guías nuevas en cuanto se publiquen;
  - comprobar en GitHub, en *Settings → Pages*, que está marcado *Enforce HTTPS*, porque Bing ve la portada con `http`.
- **Próxima revisión:** cuando las páginas lleven 4 semanas publicadas con los títulos nuevos. Hay que comparar el CTR y la posición de las dos guías en inglés y repetir el ajuste con «regla de los 6» si sigue en la posición 8 sin clics.

### 2.0 bis. Segunda lectura (datos del 10 de noviembre de 2026)

Datos de Google desde el 12 de octubre: 8 clics y 897 impresiones. El móvil se queda con 525 impresiones y la posición 10. Por países, EE. UU. suma 360 impresiones, España 97 y México 47. **Ninguno de los cambios de este estudio estaba publicado**: los datos miden el sitio original.

| Página | Impresiones | Posición | Tendencia (12–26/10 frente a 27/10–09/11) |
|---|---|---|---|
| Agujas (EN) | 374 | 9,7 | Sube: es la página fuerte. Nuevas consultas sobre el bisel |
| Infiltración (EN) | 172 | 9,7 | Baja fuerte: de 151 a 21 impresiones y de la posición 8,9 a la 14,9 |
| Regla de los 6 (ES) | 97 | 6,3 | Gana posición (de 7,8 a 3,7) y pierde volumen |
| Doppler (EN) | 94 | 31 | Sube de posición (de 38,8 a 15,8). Recibe consultas de mapeo, como «avf mapping ultrasound» en la posición 71 |
| Punción ecoguiada (ES) | 54 | 56 | «Punción ecoguiada»: 42 impresiones en la posición 69, la mayor brecha |
| Aneurisma (EN) | 22 | 17,8 | Sube mucho (de la posición 38 a la 8,3). En Bing es su mejor página |

**Indexación:**
- **Indexadas:** `/guias/`, `/guias/puncion-ecoguiada-fav/` y, en inglés, agujas, infiltración y aneurisma.
- **«Rastreada: actualmente sin indexar»:** `/guias/tecnica-puncion-fav/`.
- **«Descubierta: actualmente sin indexar»:** `/guias/aneurisma-fav/` y `/guias/puncion-escalera-area-ojal/`.
- **Desconocidas para Google:** `/guias/infiltracion-fav/` (su URL correcta) y `/en/`, que en Bing sí tiene 60 impresiones.

**Bing** (16/10–06/11): 5 clics y 246 impresiones. Destacan el aneurisma (EN), `/en/`, la técnica (EN) y la escalera y el ojal, entre las posiciones 3 y 6. Sigue viendo `http://fistulab.com/`.

**Decisiones tomadas:**
1. **Siguiente artículo: mapeo vascular prequirúrgico** (ES/EN). Lo justifican tres cosas: el grupo de ecografía en inglés es el que más sube, la consulta «avf mapping ultrasound» ya llega a la guía equivocada (Doppler, posición 71), y estaba en el plan con el número 8.
2. **Preguntas sobre el bisel** en la guía de agujas («¿bisel hacia arriba o hacia abajo?», «¿qué es el ojo posterior?»), por las consultas nuevas sobre el bisel.
3. **Enlaces directos desde la portada** (ES/EN) a las guías sin indexar (técnica, infiltración, aneurisma, escalera y ojal) y al mapeo, para que Google las rastree antes.
4. **Enlace del Doppler al mapeo**, en los dos idiomas, para que cada consulta llegue a su página.

**Pendiente (responsable del proyecto):**
- **Publicar:** subir la rama y fusionarla en `main`. Los títulos y las guías nuevas no cuentan hasta entonces.
- **Pedir la indexación, URL a URL, de:**
  - `https://fistulab.com/en/`
  - `https://fistulab.com/guias/tecnica-puncion-fav/`
  - `https://fistulab.com/guias/aneurisma-fav/`
  - `https://fistulab.com/guias/puncion-escalera-area-ojal/`
  - `https://fistulab.com/guias/infiltracion-fav/`
  - las 12 URL nuevas de las guías, en cuanto estén publicadas.
- **Comprobar *Enforce HTTPS* en GitHub Pages,** porque Bing sigue viendo `http`.

### 2.1 Esta semana

1. **Propiedad de dominio.** Da de alta `fistulab.com` como propiedad de dominio en Search Console. Se verifica con un registro TXT en DonDominio, y así cubre `www`, `http` y todas las rutas.
2. **Sitemap.** Envía `https://fistulab.com/sitemap.xml` en *Sitemaps* y comprueba que figuran las 20 URL descubiertas.
3. **Indexación.** En *Inspección de URLs*, revisa la portada, `/en/`, `/guias/` y `/en/guides/`. Pide la indexación de cada una que salga como «no indexada».
4. **Informe de páginas.** En *Indexación → Páginas*, apunta cuántas están indexadas y los motivos de exclusión:
   - **«Descubierta: actualmente sin indexar»:** falta autoridad o enlaces internos.
   - **«Rastreada: actualmente sin indexar»:** Google duda de la calidad o del valor añadido de la página.
   - **«Duplicada»:** revisa la canónica de la portada con parámetros como `?caso=`.
5. **Bing Webmaster Tools.** Importa el sitio desde Search Console (un clic). Bing alimenta a Copilot y a parte de los buscadores con IA, y ya recibe los avisos de IndexNow.
6. **Exportación inicial.** Exporta *Rendimiento → Consultas* y *Páginas* de los últimos 28 días. Será la línea base.

### 2.2 Rutina mensual (a partir de la semana 4–6)

| Qué mirar | Dónde | Regla de decisión |
|---|---|---|
| Consultas en posición 8–30 con impresiones | Rendimiento → Consultas, ordenadas por posición | **Oportunidad cercana**. Refuerza la página que ya aparece: añade una sección o una pregunta frecuente con esa consulta, más enlaces internos hacia ella y un título más preciso |
| Consultas con impresiones y CTR < 1 % en posición < 10 | Consultas + CTR | Reescribe el `<title>` y la meta descripción para que respondan exactamente a esa consulta |
| Consultas que no encajan en ninguna página | Consultas sin página clara | **Idea de artículo nuevo**: súmala a la tabla del apartado 3.2 |
| Preguntas | Filtro de consulta con la expresión regular `^(como\|cómo\|que\|qué\|cuando\|cuándo\|cuanto\|cuánto\|por que\|por qué\|cual\|cuál\|se puede\|how\|what\|when\|why\|which\|can\|should)\b` | Material para las preguntas frecuentes de cada guía y para los vídeos cortos |
| País | Rendimiento → Países | Si México, Colombia o Argentina crecen, añade términos locales («canulación», «fístula», «hemodiálisis crónica») |
| Español frente a inglés | Filtro de página `/en/` | Reparte el esfuerzo de traducción según dónde haya más impresiones |
| Canibalización | Filtro por consulta y pestaña *Páginas* | Si dos guías se alternan para la misma consulta, define cuál es la principal y enlaza la otra hacia ella |

**Si me pasas cada mes estos dos CSV, te devuelvo la lista priorizada de cambios:**
- *Consultas* × *Páginas*: Rendimiento, «Exportar», últimos 3 meses;
- informe de *Páginas* de indexación.

### 2.3 Medir lo que Search Console no ve

Sin analítica no se sabe:
- cuánta gente llega desde YouTube, Reddit o un directorio;
- cuántos pasan de una guía al simulador.

Hay tres opciones (decisión en el apartado 13):

1. **Seguir sin analítica.** Se mide con Search Console, Bing, las estadísticas propias de cada plataforma (YouTube Studio, LinkedIn, Reddit) y Ko-fi. Es coherente con la promesa de privacidad, pero no deja ver el embudo.
2. **Contador agregado sin cookies.** Sería GoatCounter, Plausible o Cloudflare Web Analytics, sin datos personales. Permite ver referencias, páginas y clics «guía → simulador». Exige actualizar el aviso de privacidad del README y del «Acerca de».
3. **Señales indirectas:**
   - enlaces profundos distintos por canal, como `?caso=bc_obeso&modo=cannulate` en YouTube frente a `?caso=bc_obeso` en las guías;
   - un botón «¿Te ha sido útil?» que abra un correo.
   
   Es una opción pobre, pero no recoge nada.

---

## 3. Mapa de contenidos

### 3.1 Principios

- **Una página para cada intención de búsqueda.** Antes de escribir, comprueba que no responde a la misma pregunta que una guía existente. Si se parece, amplía la existente.
- **Cada página termina en el simulador**, con un caso concreto, una lección o un modo, y lo enlaza en dos puntos: arriba, en el resumen, y al final.
- **Cada tema nuevo enlaza a 3–5 guías relacionadas** y recibe enlaces de al menos 2 guías existentes. El índice de guías se agrupa por bloques.
- **Las dos versiones, siempre a la vez**: misma estructura, `hreflang` y prueba automática (ya está montado en `src/guides/pages.ts`).
- **Formato que gana en este nicho:**
  - «En resumen» con 5–7 viñetas, para fragmentos destacados y respuestas de IA;
  - tablas;
  - capturas del simulador con `alt` descriptivo;
  - un vídeo corto;
  - preguntas frecuentes;
  - referencias.

### 3.2 Ideas de artículos priorizadas

Prioridad:
- **P1:** primeras 12 semanas.
- **P2:** meses 4–6.
- **P3:** cuando haya datos de Search Console que la justifiquen.

Las rutas siguen el patrón actual.

#### A. Valoración del acceso

| # | P | Título de trabajo | Ruta ES · EN | Intención | Practicar en el simulador |
|---|---|---|---|---|---|
| A1 | P1 · **publicada** | Exploración física de la FAV: frémito, soplo, elevación del brazo y aumento del pulso | `guias/exploracion-fisica-fav/` · `en/guides/av-fistula-physical-exam/` | Informativa (enfermería, técnicos, exámenes) | `?caso=rc_estenosis`, `?caso=rc_madura` |
| A2 | P1 · **publicada** | Tipos de fístula arteriovenosa: radiocefálica, braquiocefálica, braquiobasílica y prótesis (con 3D) | `guias/tipos-fistula-arteriovenosa/` · `en/guides/types-of-av-fistula/` | Informativa amplia (estudiantes, pacientes, enfermería) | `rc_madura`, `bc_obeso`, `bb_transpuesta`, `ptfe_asa` |
| A3 | P2 · **publicada** | Mapeo vascular con ecografía antes de la FAV | `guias/mapeo-vascular-ecografia/` · `en/guides/vein-mapping-ultrasound/` | Profesional (nefrología, cirugía, enfermería de ERCA) | `?caso=normal&modo=explore` |
| A4 | P3 | FAV, prótesis o catéter: cómo se elige el acceso vascular | `guias/fav-protesis-o-cateter/` · `en/guides/fistula-vs-graft-vs-catheter/` | Informativa (estudiantes, pacientes) | — |

#### B. Complicaciones

| # | P | Título de trabajo | Ruta ES · EN | Intención | Practicar |
|---|---|---|---|---|---|
| B1 | P1 · **publicada** | Estenosis de la FAV: signos, Doppler y cuándo avisar | `guias/estenosis-fav/` · `en/guides/av-fistula-stenosis/` | Profesional | `?caso=rc_estenosis`, `?leccion=doppler-fav` |
| B2 | P1 · **publicada** | FAV trombosada: fístula sin frémito, qué hacer y en cuánto tiempo | `guias/trombosis-fav/` · `en/guides/clotted-av-fistula/` | Urgente (enfermería y pacientes) | `?caso=rc_aneurisma` (trombo mural) |
| B3 | P2 | Salida accidental de la aguja venosa: prevención, fijación y actuación | `guias/salida-aguja-venosa/` · `en/guides/venous-needle-dislodgement/` | Seguridad del paciente | — |
| B4 | P2 | Síndrome de robo: isquemia de la mano en la FAV | `guias/sindrome-robo-fav/` · `en/guides/dialysis-access-steal-syndrome/` | Profesional | — |
| B5 | P2 | Recirculación del acceso: causas y cómo medirla | `guias/recirculacion-acceso-vascular/` · `en/guides/access-recirculation/` | Profesional | `rc_estenosis` |
| B6 | P2 | Sangrado tras la diálisis y hemostasia prolongada | `guias/hemostasia-sangrado-fav/` · `en/guides/fistula-bleeding-after-dialysis/` | Mixta | — |
| B7 | P3 | Infección del acceso vascular | `guias/infeccion-acceso-vascular/` · `en/guides/av-access-infection/` | Mixta | — |
| B8 | P3 | Brazo hinchado: hipertensión venosa y estenosis central | `guias/hipertension-venosa-fav/` · `en/guides/venous-hypertension-fistula-arm-swelling/` | Mixta | — |

#### C. Técnica de punción

| # | P | Título de trabajo | Ruta ES · EN | Intención | Practicar |
|---|---|---|---|---|---|
| C1 | P1 · **publicada** | Punción difícil: FAV profunda, tortuosa, con colaterales o calcificada | `guias/puncion-dificil-fav/` · `en/guides/difficult-fistula-cannulation/` | Profesional, **la ventaja diferencial de Fistulab** | `bc_obeso`, `rc_tortuosa`, `rc_colaterales`, `rc_calcificada` |
| C2 | P1 | Punción de la prótesis de PTFE | `guias/puncion-protesis-ptfe/` · `en/guides/av-graft-cannulation/` | Profesional (resultados casi vacíos: patentes y fabricante) | `?caso=ptfe_asa&modo=cannulate` |
| C3 | P2 | Dolor en la punción de la FAV: anestesia tópica, técnica y comunicación | `guias/dolor-puncion-fav/` · `en/guides/fistula-cannulation-pain/` | Mixta (pacientes y enfermería) | — |
| C4 | P2 | Autopunción en hemodiálisis domiciliaria: cómo se aprende | `guias/autopuncion-hemodialisis-domiciliaria/` · `en/guides/self-cannulation-home-hemodialysis/` | Pacientes de hemodiálisis domiciliaria y quienes los forman | `?caso=rc_madura` |

En lugar de crear una página nueva sobre las primeras punciones de una FAV nueva, conviene **ampliar** la sección 7 de *Técnica de punción*. Es la consulta probable «primera punción fístula».

#### D. Ecografía para enfermería (temas vecinos con más volumen)

| # | P | Título de trabajo | Ruta ES · EN | Intención | Practicar |
|---|---|---|---|---|---|
| D1 | P1 · **publicada** | ¿Arteria o vena? Cómo distinguirlas en ecografía (seis signos y trampas) | `guias/arteria-o-vena-ecografia/` · `en/guides/artery-vs-vein-ultrasound/` | POCUS amplia (urgencias, UCI, vías periféricas) | `?leccion=arteria-vena` |
| D2 | P1 | Ecografía básica para enfermería: profundidad, ganancia, foco y TGC | `guias/ecografia-basica-enfermeria/` · `en/guides/ultrasound-knobology/` | POCUS amplia | `?leccion=knobologia` |
| D3 | P2 | En plano o fuera de plano: qué abordaje elegir en cualquier acceso vascular | `guias/en-plano-fuera-de-plano/` · `en/guides/in-plane-vs-out-of-plane/` | POCUS amplia. Debe ser genérica para no competir con *Punción ecoguiada de la FAV* | `?leccion=eje-largo`, `?leccion=eje-corto` |
| D4 | P2 | Artefactos ecográficos en el acceso vascular: sombra, refuerzo, reverberación y anisotropía | `guias/artefactos-ecografia-acceso-vascular/` · `en/guides/ultrasound-artifacts-vascular-access/` | Muy visual: búsqueda de imágenes | `?leccion=artefactos`, `rc_calcificada` |
| D5 | P2 | Doppler color sin errores: escala, *aliasing*, ganancia y ángulo | `guias/doppler-color-basico/` · `en/guides/color-doppler-basics/` | POCUS | `rc_estenosis` |
| D6 | P2 | Ecógrafo portátil para la unidad de hemodiálisis: qué mirar al elegirlo | `guias/ecografo-portatil-hemodialisis/` · `en/guides/portable-ultrasound-for-dialysis/` | Comercial: comparativa por criterios, sin afiliación y declarándolo | — |

#### E. Formación y docentes (la parte del embudo donde alguien decide adoptarlo)

| # | P | Título de trabajo | Ruta ES · EN | Intención | Practicar |
|---|---|---|---|---|---|
| E1 | P1 | Simuladores de punción de la FAV: virtual, *phantom* casero y comerciales | `guias/simuladores-puncion-fav/` · `en/guides/fistula-cannulation-simulators/` | Docentes y quienes buscan «simulador». **Atrae enlaces** | Portada |
| E2 | P1 · **publicada** | Cómo implantar la punción ecoguiada en una unidad: plan de formación y rúbrica | `guias/formacion-puncion-ecoguiada/` · `en/guides/ultrasound-cannulation-training-program/` | Supervisión y docencia | `?vista=enfoque` (proyectar) |
| E3 | P1 en EN, P2 en ES | Preguntas de examen sobre acceso vascular con explicación: CCHT, CHT y CNN en inglés; EIR en español | `guias/preguntas-acceso-vascular/` · `en/guides/dialysis-vascular-access-practice-questions/` | Estudiantes y técnicos (gran volumen en EE. UU.) | Un caso por pregunta |
| E4 | P3 | Glosario del acceso vascular español-inglés | `guias/glosario-acceso-vascular/` · `en/guides/vascular-access-glossary/` | Cola larga | — |

#### F. Herramientas y recursos (para atraer enlaces)

| # | P | Recurso | Ruta ES · EN | Por qué |
|---|---|---|---|---|
| F1 | P1 | **Calculadora de flujo del acceso (Qa)** a partir de la TAMV y el diámetro, con interpretación según los umbrales de la guía Doppler | `herramientas/calculadora-flujo-fav/` · `en/tools/av-fistula-flow-calculator/` | Las calculadoras se enlazan y se guardan en favoritos |
| F2 | P1 | **Descargables:** checklist de punción ecoguiada (A4), póster de la regla de los 6 y tabla de agujas y flujo de bomba (PDF y PNG) | `recursos/` · `en/resources/` | Se cuelgan en la sala de la unidad (con QR al simulador), en intranets y en Pinterest |
| F3 | P2 | Calculadora de recirculación | `herramientas/calculadora-recirculacion/` · `en/tools/access-recirculation-calculator/` | Complementa a B5 |
| F4 | P2 | Selector de calibre de aguja según el flujo de bomba (tabla NKF) dentro de la guía de agujas | En la guía existente | Mejora una guía que ya posiciona |

**Nota técnica:** las guías son páginas sin JavaScript. Las calculadoras necesitan un script pequeño. Hay que mantenerlo independiente, cargarlo solo en esa página y hacerlo funcionar sin cookies ni peticiones a terceros.

#### G. Páginas de casos clínicos

Son doce páginas hechas con la misma plantilla, una por caso: `casos/<caso>/` y `en/cases/<case>/`. Cada una lleva:
- el nombre clínico del caso («FAV braquiocefálica profunda en paciente obeso»);
- 2–3 capturas: ecografía, 3D y sección anatómica;
- qué buscar y los errores típicos;
- un enlace a la guía teórica;
- un botón grande «Practicar este caso».

Captan búsquedas de cola larga, como «fístula tortuosa punción», «fístula con colaterales» o «FAV calcificada ecografía», y son la entrada más directa al simulador. Empezar después de C1, que las enlaza todas.

#### H. Expansión estratégica: portugués de Brasil

Brasil tiene uno de los mayores volúmenes de pacientes en diálisis del mundo y una comunidad de enfermería muy activa en Instagram. Casi no hay contenido en portugués sobre punción ecoguiada. Traducir las guías P1 y la interfaz abriría un mercado sin competencia.

Exige trabajo de producto: hoy `tr()` solo admite dos idiomas. **Es una decisión, no una tarea** (apartado 13).

#### I. Línea para pacientes (encargo del 27 de octubre)

Se pidió buscar palabras clave y artículos con búsquedas reales para promover el sitio. La sesión de Directorios cruzó Search Console (3 meses), 4 búsquedas de resultados y el repositorio. **No hay volúmenes medidos**: Semrush no tenía unidades. Su conclusión es que hoy todo el contenido es para enfermería y no hay nada para pacientes, que es donde está el volumen de búsqueda.

Prioridad propuesta, integrada con el mapa anterior. Todas van en español y en inglés salvo que se indique.

| Prioridad | Artículo | Público | Relación con el mapa | Casos o lecciones |
|---|---|---|---|---|
| 1 | Cuidados de la FAV / *AV fistula care: a patient's guide* | Pacientes | Nueva | — |
| 2 | Ejercicios para la fístula (pelota) / *Fistula exercises* | Pacientes | Nueva | `rc_inmadura`, lección `madurez` |
| 3 | Frémito y soplo: cómo saber si la fístula funciona / *Fistula bruit and thrill* | Pacientes | Versión para pacientes de A1 (exploración física, para profesionales) | `rc_madura`, `rc_estenosis` |
| 4 | Catéter o fístula para hemodiálisis / *Fistula vs catheter (and graft)* | Pacientes | A4 | — |
| 5 | Estenosis y trombosis: señales de alarma / *AV fistula stenosis and clotting* | Pacientes | Versión para pacientes de B1 y B2 | `rc_estenosis`, lección `doppler-fav` |
| 6 · **publicada** | Punción venosa periférica ecoguiada (en los dos idiomas, porque el sitio publica siempre en pares) | Profesionales | D3 ampliada; responde a «punción ecoguiada», en la posición 68 | caso `normal`, lecciones `eje-corto`, `eje-largo`, `arteria-vena` |
| 7 · **publicada** | Primeras punciones de una FAV nueva / *First cannulation of a new fistula* | Profesionales | Antes era «ampliar la sección 7 de *Técnica*»; ahora, página propia | `rc_madura`, `rc_inmadura` |
| 8 | Ojal en hemodiálisis domiciliaria (primero EN) | Pacientes | C4 | `rc_madura` |
| 9 | Mapeo venoso antes de la cirugía / *Vein mapping before AVF surgery* | Mixto | A3 | caso `normal` |
| 10 | Página pilar: qué es una FAV / *What is an AV fistula* | Pacientes | Complementa a A2 (*Tipos de FAV*) | `rc_madura`, `ptfe_asa`, `bb_transpuesta` |
| — | Hematoma tras la diálisis | — | No se crea: se amplía la guía de infiltración | — |

**Volúmenes del Planificador de Google Ads (28 de octubre de 2026, de octubre de 2025 a septiembre de 2026).** Son tramos, no cifras: la cuenta no gasta.

| Ámbito | Resultado |
|---|---|
| España | 15 de 16 palabras sin datos; solo «cuidados de la fístula arteriovenosa» da 10–100 al mes |
| EE. UU. y Reino Unido | 6 palabras en 10–100; el resto, sin datos |
| Todo el mundo, 100–1.000 | «av fistula care», «fistula exercises», «buttonhole technique», «rule of 6s fistula», «antegrade vs retrograde cannulation» (esta última, al alza en el último trimestre) |
| Todo el mundo, 10–100 | «avf cannulation angle» |

El Planificador se queda corto en este nicho: «fistula infiltration» sale sin datos y en Search Console ya suma unas 150 impresiones. Sirve para ordenar, no para descartar.

**Orden actualizado:**
1. Cuidados de la FAV.
2. Ejercicios.
3. *Buttonhole*, primero en inglés.
4. Frémito y soplo.
5. Catéter o fístula.
6. Estenosis y trombosis.
7. Primeras punciones (**publicada**).
8. Mapeo venoso.
9. Vía periférica ecoguiada (**publicada**).
10. Pilar «Qué es una FAV».
11. Hematoma, como ampliación de la guía de infiltración.

Solo del 1 al 3 hay volumen medido. Los tres primeros, salvo el *buttonhole* para profesionales, esperan a la autoría con nombre.

**Mejoras hechas a las guías que ya cubren búsquedas de 100–1.000 (28 de octubre):**
- **Regla de los 6** (ES/EN): tabla «los cuatro seis» y dos preguntas frecuentes («¿Se sigue usando?» y «¿Vale para las prótesis?»).
- **Agujas** (ES/EN): tabla de anterógrada frente a retrógrada y la pregunta «¿Es mejor la punción arterial anterógrada o retrógrada?». La de la aguja venosa ya estaba.
- ***Buttonhole* (EN):** título «Buttonhole technique vs rope ladder and area cannulation» y un apartado explícito sobre cómo se crea el túnel (también en ES).

**Requisitos para todo el contenido médico** (de obligado cumplimiento antes de publicar los artículos para pacientes):

- **Autoría y revisión clínica con nombre y titulación,** como `Person` y `reviewedBy` en los datos estructurados, más una página «Comité de revisión». **Pendiente de decidir quién firma.**
- **Fuentes:** KDOQI 2019, GEMAV (SEN/SEDEN), EDTNA/ERCA y ESVS 2018.
- **En los artículos para pacientes:**
  - sin dosis;
  - aviso de que no sustituyen a su equipo;
  - un cuadro «Cuándo ir a urgencias»: la fístula no vibra, un sangrado que no para, fiebre o enrojecimiento, la mano fría o dolorosa.
- **Etiqueta de público** («Para profesionales» o «Para pacientes») en la línea de fecha. Ya está en las 20 guías profesionales y en la plantilla.
- **`dateModified` real** cuando cambia el contenido.
- **El simulador** se presenta siempre como herramienta formativa, no como producto sanitario.

### 3.3 Contenido de temporada

| Fecha | Contenido |
|---|---|
| Noviembre de 2026 (SEN y SEDEN en Murcia) | Publicar A2 o C1 esa semana y mover vídeos y carrusel con el hashtag del congreso |
| Diciembre de 2026 y enero de 2027 (EIR, 23 de enero de 2027) | E3 en español + 20 clips de preguntas tipo EIR de acceso vascular y ecografía |
| 11 de marzo de 2027 (Día Mundial del Riñón) | Contenido divulgativo (A2, A4, B2) y campaña de recursos descargables para las unidades |
| Abril de 2027 (ANNA en Orlando, VAS en Belgrado, SESSEP en Madrid) | Pósteres o talleres; versión en inglés de E2 |
| Mayo de 2027 (Día Internacional de la Enfermería, 12 de mayo) | Agradecimiento + recursos gratuitos para las unidades |
| 12–18 de septiembre de 2027 (*Nephrology Nurses Week*, EE. UU.; fecha calculada) | Serie en inglés «7 casos difíciles en 7 días» |

---

## 4. Briefs de los primeros artículos

Plantilla común para todos:
- **SEO:** `<title>` de 60 caracteres como máximo, meta descripción de 155 como máximo y un único H1.
- **Arranque:** «En resumen» arriba, y en las primeras pantallas un botón «Practicar en el simulador».
- **Medios:** al menos 3 capturas del simulador con `alt` y pie de foto.
- **Cierre:** preguntas frecuentes (4–6), referencias numeradas y fecha de actualización.
- **Datos estructurados:** `Article` + `MedicalWebPage`, con autor y revisor con nombre (apartado 5).

### A2 · Tipos de fístula arteriovenosa

- **Consulta principal:** «tipos de fístula arteriovenosa».
- **Secundarias:** fístula radiocefálica (Cimino-Brescia), braquiocefálica, humerobasílica o braquiobasílica transpuesta, superficialización, prótesis de PTFE, «FAV de antebrazo o de brazo».
- **Equivalente EN:** «types of AV fistula», «radiocephalic vs brachiocephalic fistula», «brachiobasilic transposition».
- **Título:** «Tipos de fístula arteriovenosa para hemodiálisis (en 3D)».
- **Estructura:**
  1. Qué es una FAV, en dos párrafos.
  2. Radiocefálica.
  3. Braquiocefálica.
  4. Braquiobasílica transpuesta.
  5. Prótesis de PTFE.
  6. Tabla comparativa: localización, maduración, profundidad habitual, particularidades de la punción y complicaciones típicas.
  7. Cómo se ve cada una en ecografía, con capturas.
  8. Qué cambia al puncionar cada una.
  9. Practica cada tipo: cuatro enlaces profundos.
- **Ventaja propia:** cada tipo con su vista 3D del simulador, el plano de corte y la ecografía. Nadie lo tiene. Son imágenes para búsqueda de imágenes, Pinterest e Instagram.
- **Enlaces internos:** regla de los 6, punción de prótesis (C2), punción difícil (C1) y mapeo (A3).

### C1 · Punción difícil de la FAV

- **Consulta principal:** «punción difícil fístula arteriovenosa».
- **Secundarias:** FAV profunda, fístula en paciente obeso, fístula tortuosa, colaterales, calcificación, «no encuentro la fístula».
- **Equivalente EN:** «difficult fistula cannulation», «deep fistula cannulation», «cannulating a deep fistula in obese patients».
- **Título:** «Punción difícil de la FAV: profunda, tortuosa o con colaterales».
- **Estructura:**
  1. Qué hace difícil una FAV.
  2. Antes de pinchar: mapa ecográfico y marcado de la piel.
  3. FAV profunda: longitud de aguja, ángulo, abordaje en plano.
  4. FAV tortuosa: elegir el tramo recto.
  5. Colaterales y duplicación: identificar el vaso principal con Doppler.
  6. Calcificación y sombra acústica.
  7. Después de un hematoma.
  8. Cuándo parar: dos intentos y pedir ayuda.
  9. Cuándo derivar: superficialización o revisión quirúrgica.
  10. Practica: cuatro casos.
- **Vídeo asociado:** la serie «Casos difíciles», un vídeo por caso (apartado 8).
- **Enlaces internos:** punción ecoguiada, agujas, infiltración y páginas de casos (G).

### A1 · Exploración física de la FAV

- **Consulta principal:** «exploración física fístula arteriovenosa».
- **Secundarias:** frémito o *thrill* de la fístula, soplo de la fístula, prueba de elevación del brazo, prueba de aumento del pulso, «fístula sin thrill», «mirar, escuchar, palpar».
- **Equivalente EN:** «AV fistula physical exam», «thrill and bruit», «arm elevation test», «pulse augmentation test».
- **Título:** «Exploración física de la FAV: frémito, soplo y maniobras».
- **Estructura:**
  1. Mirar.
  2. Palpar: frémito normal y patológico.
  3. Escuchar: soplo continuo frente a agudo o discontinuo.
  4. Elevación del brazo (valora el drenaje).
  5. Aumento del pulso (valora la entrada).
  6. Tabla «normal, estenosis de entrada y estenosis de salida».
  7. Cuándo pedir un Doppler.
  8. Errores frecuentes.
  9. Practica.
- **Competencia a superar:** PDFs de angiología, un PDF del LHSC, NephSIM y open-exam-prep. Ninguno combina la tabla con imagen.
- **Enlaces internos:** la *Técnica de punción* debe enlazar aquí desde su tabla «mirar, escuchar, palpar», y desde aquí, Doppler, trombosis (B2) y estenosis (B1).

### E1 · Simuladores de punción de la FAV

- **Consulta principal:** «simulador punción ecoguiada».
- **Secundarias:** simulador de fístula arteriovenosa, *phantom* casero de ecografía con gelatina, simulador de canalización vascular.
- **Equivalente EN:** «fistula cannulation simulator», «homemade ultrasound phantom vascular access», «free ultrasound simulator».
- **Título:** «Simuladores de punción ecoguiada de la FAV: virtual, casero y comercial».
- **Estructura:**
  1. Por qué simular: evidencia y curva de aprendizaje.
  2. Tres familias: virtual, *phantom* casero y comercial.
  3. Cómo fabricar un *phantom* casero paso a paso, citando los modelos publicados (gelatina con drenajes Penrose en *Angiología*, 2025; modelo de gelatina del *Jornal Vascular Brasileiro*; pechuga de pollo con globo de látex).
  4. Tabla comparativa: coste, tacto, imagen, retroalimentación y métricas, disponibilidad.
  5. Itinerario combinado: virtual, luego *phantom*, luego paciente supervisado.
  6. Qué pedirle a un simulador.
- **Por qué atrae enlaces:** la sección del *phantom* casero es lo que comparten docentes y unidades. Hay que ser justos con la competencia: es lo que da credibilidad.
- **Posicionamiento:** «El calentamiento gratuito antes del *phantom* y del paciente». No sustituye a la práctica supervisada.

### E2 · Implantar la punción ecoguiada en la unidad

- **Consulta principal:** «formación en punción ecoguiada enfermería».
- **Secundarias:** programa de formación en ecografía para hemodiálisis, competencias de punción ecoguiada, rúbrica.
- **Equivalente EN:** «ultrasound-guided cannulation training program», «dialysis cannulation competency checklist».
- **Título:** «Cómo implantar la punción ecoguiada en tu unidad de hemodiálisis».
- **Base:** `docs/GUIA_DOCENTE.md` (seis sesiones de 45 minutos, objetivos, rúbrica y evidencia de logro).
- **Estructura:**
  1. Qué dice la evidencia: ensayos de Chen 2022 en *Hemodialysis International*, piloto de Schoch 2023 en *J Vasc Access* y ensayo de 2022 sobre el abordaje en plano.
  2. Material: ecógrafo, sonda lineal, funda y gel estériles.
  3. Una persona de referencia.
  4. Itinerario de seis sesiones.
  5. Rúbrica.
  6. Cómo medir el éxito en la unidad: punciones fallidas, infiltraciones y uso de catéter.
  7. Kit descargable: PDF con rúbrica, checklist y diapositivas.
- **Llamada a la acción:** «Proyecta el simulador en clase» (`?vista=enfoque`) y «Escríbenos para un taller».

### F1 · Calculadora de Qa

- **Consultas:** «calcular flujo fístula arteriovenosa», «fórmula Qa», «fistula flow volume calculation».
- **Contenido:**
  - campos TAMV (cm/s) y diámetro (mm);
  - resultado en mL/min con la fórmula a la vista;
  - interpretación con los mismos umbrales de la guía Doppler;
  - errores frecuentes: ángulo, diámetro mal medido, medición en la vena en lugar de la arteria humeral;
  - enlace a la lección Doppler para practicar la medición.

### E3 (EN) · Dialysis vascular access practice questions

- **Consulta principal:** «CCHT practice questions vascular access».
- **Secundarias:** «dialysis technician exam questions cannulation», «CNN exam vascular access questions».
- **Competencia:** bancos de preguntas de pago (Docsity, Stuvia) y apps. Una versión gratuita y rigurosa tiene hueco.
- **Contenido:**
  - 25–30 preguntas originales con explicación desplegable (`<details>`, sin JavaScript);
  - cada explicación enlaza a una guía y a un caso.
- **Aviso:** no es material oficial de ningún examen.
- **Versión en español (EIR):** publicarla antes de Navidad para la recta final del EIR 2027.

---

## 5. Mejoras rápidas en lo que ya existe

En orden de impacto por esfuerzo:

1. **Capturas reales del simulador en las 16 guías.**
   - Entre 2 y 4 por guía, en WebP, con `alt` descriptivo («Ecografía en eje largo de una FAV radiocefálica con la aguja en plano y la punta en la luz») y `<figcaption>`.
   - Hoy hay 0 imágenes. Es la mejora más barata: aumenta el tiempo de lectura y da tráfico desde la búsqueda de imágenes.
   - Se capturan con `?max=us`, `?max=3d` y `?max=anat`.
2. **Imagen para redes propia por guía.** Hoy todas usan `og.jpg`. Cuando alguien comparte una guía en WhatsApp o LinkedIn, debería verse esa ecografía concreta.
3. **Autoría y revisión clínica con nombre.**
   - Añadir `author` (Person, con titulación), `reviewedBy` y `lastReviewed`, más un recuadro visible bajo el título.
   - Crear una página «Quiénes somos y revisión clínica».
   - Invitar a 2–3 revisores, enfermería de hemodiálisis y nefrología: suben la credibilidad y además difunden el proyecto.
4. **Preguntas frecuentes al final de cada guía.** De 4 a 6, sacadas de las consultas de Search Console (filtro de preguntas del apartado 2.2). Ayudan con las preguntas relacionadas de Google y con las respuestas de los buscadores con IA.
5. **Vídeo incrustado sin cookies.**
   - En cada guía, cuando exista su vídeo: miniatura local y el `iframe` de `youtube-nocookie.com` solo al pulsar, para no romper la promesa de privacidad.
   - Más `VideoObject` en los datos estructurados.
6. **Botones de compartir sin rastreo:** WhatsApp (`https://wa.me/?text=`), Telegram y correo. En España y Latinoamérica, las guías circulan por los grupos de WhatsApp de la unidad.
7. **Botón «Imprimir o guardar en PDF».** La hoja de estilo de impresión ya existe en `src/guides/guides.css`. Las unidades imprimen protocolos.
8. **Enlaces internos:**
   - la *Técnica de punción* debe enlazar a todas las demás;
   - el índice de guías, agrupado por bloques;
   - la presentación legible de la portada debe enlazar directamente a las 3–4 guías principales, no solo al índice.
9. **README de GitHub.** El repositorio ya aparece en las búsquedas:
   - añadir una sección «Guías» con enlaces a cada una;
   - añadir *topics* (`ultrasound`, `hemodialysis`, `medical-education`, `simulation`, `webgl`, `threejs`);
   - añadir `CITATION.cff`.
10. **DOI en Zenodo.** Conectar el repositorio, publicar una versión y obtener el DOI. Es requisito práctico para pósteres, revistas y para que la gente lo cite.
11. **Modo incrustable (producto, P2).**
    - Un `?embed=1` con interfaz reducida y enlace «Abrir en Fistulab», más un fragmento de código para que los docentes lo incrusten en su web o en Moodle.
    - Cada incrustación es un enlace y un canal de tráfico. Requiere desarrollo.

---

## 6. El embudo: de la búsqueda al simulador

```
DESCUBRIMIENTO                      CONSIDERACIÓN                       ADOPCIÓN                           RECOMENDACIÓN
(estudiantes, POCUS, pacientes)     (enfermería de hemodiálisis)        (docentes, supervisión)            (todos)
───────────────────────────         ───────────────────────────         ───────────────────────────        ──────────────────────
Tipos de FAV (A2)                   Técnica, punción ecoguiada          Formación en la unidad (E2)        Compartir por WhatsApp
Arteria o vena (D1)                 Punción difícil (C1)                Simuladores (E1)                   Kit docente y póster con QR
Ecografía básica (D2)               Complicaciones (B1–B6)              Guía docente y rúbrica             Boletín «un caso al mes» (opcional)
Preguntas EIR / CCHT (E3)           Calculadora Qa (F1)                 Taller o charla                    Ko-fi
Shorts / TikTok / Reels             Vídeos largos YouTube               Pósteres y congresos               Revisión clínica con nombre
        │                                   │                                   │
        └──► ?leccion=…  (lección)          └──► ?caso=… &modo=cannulate        └──► ?vista=enfoque (proyectar)
```

**Reglas del embudo:**
- **Cada pieza tiene una sola llamada a la acción principal**, y siempre es un enlace profundo concreto, nunca solo «visita fistulab.com».
- **Los vídeos y publicaciones enlazan a una guía**, no a la portada. La guía ya lleva al caso. Así el enlace externo refuerza la página que debe posicionar.
- **El final del embudo hoy no existe.** Tras la primera punción no hay forma de que la persona vuelva. Hay tres opciones baratas:
  1. el póster descargable con QR para la sala de la unidad (trae gente de forma recurrente, sin recoger datos);
  2. el aviso «Añadir a la pantalla de inicio», porque la aplicación es instalable;
  3. un boletín mensual opcional, «un caso al mes» (apartado 13).

---

## 7. Embudo de enlaces: directorios, listas y comunidades

### 7.1 Cómo funciona y qué evitar

Un buen embudo de enlaces cumple dos condiciones: una página que ya recibe visitas de la audiencia adecuada y que enlaza a Fistulab. Si la página no tiene audiencia, el enlace no trae visitas. Si la audiencia no encaja, Google tampoco lo valora.

| Nivel | Qué es | Ejemplos | Qué aporta |
|---|---|---|---|
| **1. Instituciones** | Sociedades, cursos, revistas y guías de biblioteca universitaria | SEDEN, GEMAV, ANN UK, curso MAGIC, *Enfermería Nefrológica*, guías de biblioteca universitarias | Autoridad máxima y tráfico muy cualificado. Se consigue con un activo que merezca el enlace: guía docente, póster, calculadora o artículo |
| **2. Directorios y listas curadas** | Recopilaciones de simuladores, recursos de POCUS y recursos educativos abiertos | HealthySimulation, Ultrasound Fanatic, Tom Wade MD, CAN-Sim, MERLOT, OER Commons | Enlaces temáticos y goteo de visitas |
| **3. Plataformas que ya posicionan** | Contenido propio en plataformas con autoridad que aparece en Google, sobre todo en búsquedas sin buenos resultados | YouTube, GitHub, Zenodo, LinkedIn, Reddit, foro de three.js, Hacker News | Visibilidad inmediata mientras el dominio gana autoridad. Ya ocurre: el repositorio de GitHub aparece en búsquedas del tema |

**No hacer:**
- redes de blogs para enlazar, intercambios masivos de enlaces o comprar enlaces;
- directorios genéricos de «envía tu web»;
- comentarios con enlace en blogs ajenos;
- añadir enlaces propios en Wikipedia (conflicto de interés);
- publicar el mismo enlace en diez grupos el mismo día.

En contenido médico, Google es especialmente estricto con las señales artificiales.

### 7.2 Plazos próximos

| Evento | Cuándo y dónde | Plazo | Acción |
|---|---|---|---|
| Congreso SEN | 5–7 de noviembre de 2026, Murcia | — | Publicaciones en redes con el hashtag del congreso |
| **51.º Congreso SEDEN** | **8–10 de noviembre de 2026, Murcia** | Resúmenes cerrados | Ir o contactar: tarjeta con QR, demostración en el móvil y noticia para SEDEN |
| **ANNA National Symposium 2027** | 17–21 de abril de 2027, Orlando | **Pósteres: 8 de diciembre de 2026** (confirmar; ANNA unificó póster y comunicación oral) | Póster «Free browser-based simulator for ultrasound-guided AVF cannulation» |
| **15.º congreso de la VAS** | 15–17 de abril de 2027, Belgrado | **15 de diciembre de 2026** | Resumen (encaje máximo: acceso vascular internacional) |
| **SESSEP 2027** | 14–17 de abril de 2027, CEU San Pablo, Madrid | **20 de diciembre de 2026** (visto en X; confirmar en la web) | Comunicación. Suele publicarse en *Rev Esp Educ Méd*, lo que deja un enlace permanente |
| ASDIN 2027 | 26–28 de febrero de 2027, Nueva Orleans | Sin publicar; probablemente cerrando | Comprobar |
| ERA 2027 · SESAM 2027 | 3–6 de junio, Róterdam · 16–18 de junio, Riga | Por anunciar | Vigilar |
| SEDEN 2027 (52.º) | Otoño de 2027 | Por la convocatoria de 2026, probablemente marzo–abril de 2027 | Taller práctico con el simulador |
| EDTNA/ERCA 2027 | Sin anunciar (la de 2026 cerró el 1 de marzo) | Probablemente a principios de 2027 | Vigilar |

### 7.3 Nivel 1: instituciones, sociedades y formación

| Destino | Idioma | Encaje | Cómo | Enfoque |
|---|---|---|---|---|
| **SEDEN**: noticias, formación y congreso ([seden.org](https://www.seden.org)) | ES | 5 | Correo con nota de prensa y propuesta de taller para 2027 | Herramienta gratuita, en español, para practicar entre turnos |
| **Autores del capítulo «Punción ecoguiada del acceso vascular»** de *Nefrología al día* (Moyano, Salgueira y Roca-Tey) | ES | 5 | Correo pidiendo revisión y, si les parece útil, una cita en la próxima actualización | El simulador sigue la técnica del capítulo |
| **GEMAV** y el **curso de Parc Taulí** de ecografía para enfermería nefrológica ([tauli.cat/hospital/ptivas](https://www.tauli.cat/hospital/ptivas)) | ES | 5 | Correo a la dirección del curso | Práctica previa al curso presencial, que no lo sustituye |
| **Curso en línea de ecografía básica del acceso vascular** de SEDEN | ES | 5 | Proponerlo como material complementario | Ídem |
| SalusPlay (tiene un tema de ecografía en el acceso vascular) | ES | 4 | Contacto editorial | Práctica para complementar el tema |
| *Diario Enfermero* / Consejo General de Enfermería | ES | 5 | Nota de prensa (contacto sin verificar) | Iniciativa española gratuita y de código abierto |
| Redacción Médica, sección de enfermería e innovación | ES | 4 | Nota de prensa | Ídem |
| Sociedades latinoamericanas: SAEN (Argentina), SENFERDIALT (Chile), SLANH (congreso del 25 al 28 de agosto de 2027 en Panamá) | ES | 4 | Correo o mensaje en redes | Gratis, en español y sin instalación |
| **NephroPOCUS** (Abhilash Koratala, [nephropocus.com](https://nephropocus.com)) | EN | 5 | Correo o mensaje directo | Ecografía física de la FAV para complementar su temario de POCUS |
| **ANN UK Vascular Access Community of Practice** ([ann-uk.org/vascular-access](https://ann-uk.org/vascular-access/)) y autores del curso **MAGIC** de UK Kidney Association | EN | 5 | Contactar con quien lidera el grupo; ofrecer una sesión virtual | Práctica después del curso en línea |
| NephSIM ([nephsim.com](https://nephsim.com)) | EN | 4 | Correo: enlaces cruzados con sus casos de acceso vascular | Complemento interactivo |
| IVTEAM ([ivteam.com](https://ivteam.com)) | EN | 4 | Correo editorial | Herramienta gratuita de formación en acceso vascular |
| Blog de KQuIP (UK) | EN | 4 | Propuesta de artículo invitado | Mejora de calidad: menos punciones fallidas |
| *ASN Kidney News* (kidneynews@asn-online.org) | EN | 3 | Propuesta de 300–500 palabras con imagen | Innovación educativa |
| NephJC y *Freely Filtered* | EN | 3 | Propuesta ligada a los ensayos de punción ecoguiada | Club de lectura |
| ISN Academy (POCUS) | EN | 3 | Equipo de educación | Global, gratuito, en el navegador |
| ESRD Networks / Fistula First | EN-US | 3 | Contactar con la *Network* | Formación del personal en punción |

**Expertos a los que pedir opinión** (como revisión, no como petición de difusión):
- Adrienne Barrett (Sonosite Institute);
- Monica Schoch (Deakin; tesis sobre POCUS en la punción para hemodiálisis);
- Jennifer Hanko (Belfast);
- José Ibeas y Rubén Iglesias (Parc Taulí).

### 7.4 Nivel 2: directorios y listas curadas

| Destino | Encaje | Cómo | Nota |
|---|---|---|---|
| **HealthySimulation.com**: [formulario de artículos](https://www.healthysimulation.com/submit-articles/) y su [guía de simuladores de ecografía](https://www.healthysimulation.com/ultrasound-simulator/) | 4 | Artículo gratuito + petición de inclusión | Más de 35.000 suscriptores, con edición en español. **El más rentable del nivel 2** |
| Ultrasound Fanatic: [mejores simuladores](https://ultrasoundfanatic.com/simulators/) | 3 | Pedir inclusión | Lo lleva un competidor, pero es una página que posiciona para «simulador» |
| Recursos de [Tom Wade MD](https://www.tomwademd.net/resources/) | 3 | Correo | Enlaza recursos gratuitos de POCUS con frecuencia |
| Core Ultrasound / 5 Minute Sono | 3 | Correo | Ya publica simuladores caseros de acceso vascular |
| [CAN-Sim](https://can-sim.ca/virtual-simulation-games-open-source/) (simulación virtual de código abierto) | 4 | Correo | Red canadiense de simulación en enfermería |
| [UTHSC: educación clínica virtual](https://uthsc.edu/simulation/resources/virtual-education.php) | 3 | Correo | Lista simulaciones virtuales gratuitas |
| **Guías de biblioteca universitarias**: [Hofstra POCUS](https://libguides.hofstra.edu/pocus), [Chemeketa dialysis](https://libraryguides.chemeketa.edu/dialysis), [U Manitoba nephrology nursing](https://libguides.lib.umanitoba.ca/wrha/nephrology) | 4 | Correo a cada responsable | Enlaces desde dominios `.edu`, poco tráfico pero muy cualificado. Buscar más con «libguides dialysis», «libguides ultrasound» y «libguides nephrology nursing» |
| MERLOT y OER Commons | 3 | Alta gratuita (OER Commons la revisa una bibliotecaria) | Fácil, tráfico bajo |
| AlternativeTo | 2 | Crear la ficha como alternativa gratuita a simuladores de pago | Sin verificar |
| [Foro de three.js, sección *Showcase*](https://discourse.threejs.org/t/about-the-showcase-category/25) | 1 (audiencia) / alto (enlace) | Publicación moderada | Los proyectos destacados pueden aparecer en la portada de threejs.org |
| Show HN (Hacker News) y Product Hunt | 2 | Un día concreto, con la página en inglés | Pico de tráfico técnico y algún enlace. Presentar el mismo día que el foro de three.js |
| Listas «awesome» de GitHub | 1–2 | — | `awesome-healthcare` no tiene sección de educación. **No existe ninguna lista de educación médica ni de ecografía**: crear `awesome-ultrasound-education` puede convertirse en un activo propio |

### 7.5 Nivel 3: plataformas que ya posicionan

| Plataforma | Qué publicar | Para qué búsquedas |
|---|---|---|
| **YouTube** | Vídeos largos por caso y por técnica (apartado 8) | «punción ecoguiada FAV», «cómo pinchar una fístula», «ultrasound guided fistula cannulation». En español no hay vídeos que compitan |
| **GitHub** | README con guías enlazadas, *topics*, `CITATION.cff` y versiones | Búsquedas técnicas y académicas. Ya aparece |
| **Zenodo** | Versión con DOI + PDF de dos páginas, «Fistulab: open-source web simulator…» | Búsqueda académica y citas |
| **LinkedIn** (perfil personal) | Carruseles «5 errores en la punción ecoguiada», artículos largos que resuman las guías | Supervisión y docencia. LinkedIn también aparece en Google |
| **Reddit** | Hilos útiles: «Lo que aprendí construyendo un simulador de ecografía física en WebGL» | Búsquedas en inglés del tipo «… reddit» |
| **Pinterest** | Pósteres e infografías (regla de los 6, agujas, checklist) | Búsqueda de imágenes y Pinterest. Mucha audiencia de enfermería estudiante |

### 7.6 Publicaciones científicas (enlaces permanentes y citas)

| Revista | Formato | Encaje | Coste |
|---|---|---|---|
| ***Enfermería Nefrológica*** | Original breve o carta, mejor con una evaluación pequeña (encuesta a 20–30 profesionales) | 5 | Sin tasas |
| *Journal of Renal Care* (EDTNA/ERCA) | Iniciativa práctica o carta | 5 | — |
| *Nephrology Nursing Journal* (ANNA) | Artículos de sección | 5 | — |
| *POCUS Journal* | Original, protocolo o caso | 4 | Sin tasas, CC BY |
| *JMIR Medical Education* | Le interesan las herramientas abiertas, también sin evaluar | 4 | Tiene tasas |
| *Journal of Kidney Care* (UK) · *Renal Society of Australasia Journal* | Iniciativas prácticas o innovación | 4 | — |
| *Advances in Simulation* | Artículo de innovación | 3 | Tasas BMC |
| JOSE (*Journal of Open Source Education*) | Artículo corto con declaración de necesidad, revisado en GitHub | 2 | Sin tasas, DOI de Crossref |

**Orden recomendado:**
1. DOI en Zenodo, ya.
2. Encuesta breve de usabilidad y utilidad a profesionales que lo prueben en noviembre y diciembre.
3. Resúmenes para VAS, ANNA y SESSEP con esos datos.
4. Original breve en *Enfermería Nefrológica* en el primer trimestre de 2027.

### 7.7 Plantillas de contacto

**Español: a sociedades, cursos y docentes.**

> **Asunto:** Simulador gratuito de punción ecoguiada de la FAV, por si os sirve para formación
>
> Hola, [nombre]:
>
> Soy [nombre], [profesión]. He creado Fistulab (fistulab.com), un simulador gratuito y de código abierto que funciona en el navegador, también en el móvil, para practicar la punción ecoguiada de la FAV. Incluye abordaje en plano y fuera de plano, Doppler y Qa, y 12 casos difíciles (FAV profunda, estenosis, aneurisma, prótesis…), con evaluación según GEMAV y KDOQI. No requiere registro ni guarda datos.
>
> Lo hemos pensado como práctica previa, no como sustituto del *phantom* ni de la punción supervisada. Por si encaja en [vuestro curso / vuestra sección de recursos], este enlace abre directamente [el caso o la lección]: [enlace profundo].
>
> Me ayudaría mucho vuestra opinión clínica, sobre todo si veis algo que corregir.
>
> Gracias,
> [firma, con titulación]

**Inglés: a listas de recursos y bibliotecas.**

> **Subject:** Free browser-based simulator for ultrasound-guided AV fistula cannulation
>
> Hi [name],
>
> I noticed your [resource page / guide] lists free [POCUS / dialysis] learning tools. I built Fistulab (fistulab.com/en/), a free, open-source, no-signup ultrasound simulator for practising AV fistula and graft cannulation (in-plane and out-of-plane, Doppler, 12 difficult cases, KDOQI 2019-based scoring). It runs in any modern browser, including phones.
>
> If it fits, here is a direct link to a good starting point: [deep link]. Happy to hear any feedback, and I'm glad to adjust anything that would make it more useful for your learners.
>
> Best,
> [name, credentials]

---

## 8. Vídeo

### 8.1 El hueco

- **Inglés:** los vídeos de punción que posicionan tienen entre 4 y 10 años, salvo uno reciente orientado al examen CCHT. Explican la punción a ciegas.
  - La punción ecoguiada vive en seminarios web de Sonosite (de 13 a 60 minutos), alojados en la web del fabricante y no optimizados para YouTube.
  - **No apareció ningún vídeo en YouTube que muestre claramente la aguja guiada por ecografía.**
- **Español:** hay algunos vídeos de punción convencional (entre ellos una sesión clínica de Fundación Renal). Para «punción ecoguiada FAV» y «cómo pinchar una fístula» **no apareció ningún vídeo**.
- **No hay:**
  - explicaciones en 3D del abordaje en plano frente al fuera de plano;
  - vídeos cortos sobre punción ecoguiada;
  - vídeos que enseñen errores (pared posterior, signo de la tienda, infiltración vista en la ecografía);
  - vídeos por casos.

### 8.2 Series y formatos

| Serie | Formato | Ejemplos (con enlace profundo en la descripción) | Ritmo |
|---|---|---|---|
| **Vídeos estrella** | 8–15 min, horizontal | ES: «Punción ecoguiada de la FAV paso a paso (eje largo)» (`?leccion=eje-largo`). EN: «Ultrasound-guided AV fistula cannulation: in-plane vs out-of-plane, explained in 3D» | Semanas 1–2 |
| **Casos difíciles** | 6–10 min | FAV profunda en obesidad (`bc_obeso`), estenosis yuxtaanastomótica y *aliasing* (`rc_estenosis`), prótesis de PTFE (`ptfe_asa`), aneurisma con trombo (`rc_aneurisma`), hematoma (`rc_hematoma`) | 1 cada 1–2 semanas, alternando idioma |
| **El error de la semana / Error of the week** | 20–45 s vertical | Pared posterior, signo de la tienda, confundir el cuerpo de la aguja con la punta, infiltración en la ecografía, punción arterial | 2–3 por semana |
| **¿Qué artefacto es? / Guess the artifact** | 15–30 s vertical, con la respuesta en el comentario fijado | Sombra, refuerzo, reverberación, cola de cometa (`?leccion=artefactos`) | 1 por semana |
| **A ciegas frente a ecografía** | 30–60 s | El mismo brazo: lo que se palpa frente a lo que hay debajo (3D + ecografía) | Mensual |
| **Pregunta EIR / CCHT** | 30 s | Pregunta, pausa y respuesta con imagen del simulador | Diario en diciembre y enero |
| **Directo «Puncionamos juntos»** | 30–45 min | Un caso en directo con preguntas del chat | Mensual, a partir del mes 3 |

### 8.3 SEO en YouTube

- **Título:** la frase de búsqueda exacta al principio y la marca al final, por ejemplo «Punción ecoguiada de la FAV en eje largo, paso a paso | Simulador gratuito».
- **Subidas por idioma:** una subida en español y otra en inglés, cada una con sus subtítulos revisados (no solo los automáticos).
- **Capítulos:** el primero en 0:00, al menos tres, cada uno de 10 segundos como mínimo. Nombrados con términos de búsqueda: «Signo de la tienda», «Bajar el ángulo tras el reflujo»…
- **Descripción:** las dos primeras líneas llevan el enlace a la guía correspondiente y el enlace profundo al caso, más un resumen de 150–200 palabras con las palabras clave secundarias.
- **Shorts:** las descripciones ya no admiten enlaces clicables. Vincula cada Short a su vídeo largo con «Vídeo relacionado» en YouTube Studio y pon el enlace en un comentario fijado.
- **Organización:** una lista de reproducción por serie y por idioma, pantallas finales y una tarjeta hacia el vídeo estrella.
- **En la web:** incrustar cada vídeo en su guía (fachada sin cookies, apartado 5) con `VideoObject`. Así los vídeos refuerzan la guía y la guía refuerza los vídeos.

### 8.4 Producción con el simulador

1. **Grabación:**
   - OBS a 1080p y 60 fps, o 30 en portátil;
   - `?vista=enfoque` para el monitor grande con el 3D flotante;
   - `?max=us` o `?max=3d` para planos limpios;
   - `?movil=1` en una ventana estrecha para vertical nativo 9:16.
2. **Voz:** guion corto de 120–150 palabras por minuto y el mismo guion traducido. Se puede grabar la voz aparte y reutilizar las imágenes para los dos idiomas.
3. **De una sesión de 90 minutos salen:**
   - 1 vídeo largo;
   - 3–4 clips cortos;
   - 6–10 capturas WebP para las guías;
   - 2 GIFs o MP4 cortos para redes y para la propia guía;
   - 1 carrusel de LinkedIn.
4. **Avisos:** educativo, no sustituye a la práctica supervisada, sin imágenes de pacientes.

---

## 9. Redes y comunidades

### 9.1 Dónde está la audiencia

Las cifras son aproximadas, sacadas de buscadores y rastreadores, porque no se pudo abrir ninguna plataforma.

| Canal | Para quién | Datos | Uso recomendado |
|---|---|---|---|
| **LinkedIn** (perfil personal) | Supervisión, docencia, nefrología | Vascular Access Society, ANN UK y SLANH activos | 1–2 publicaciones por semana: carrusel, clip y aprendizaje. El perfil personal funciona mejor que los grupos |
| **X** | Enfermería española: SEDEN publica allí; NephJC sigue en X | — | Hilos de congresos y clips |
| **Bluesky** | Nefrología internacional | La comunidad #NephTwitter se trasladó en gran parte a Bluesky desde noviembre de 2024, con el hashtag **#NephSky**. Hay un *starter pack* de Medsky | Hilos con GIF, #NephSky, #MedSky, #FOAMed, #POCUS. Mencionar a NephroPOCUS y NephJC |
| **TikTok e Instagram** | Estudiantes, enfermería joven, técnicos de EE. UU., Latinoamérica | #dialysisnurse: unos 18.200 posts, sobre todo humor y «un día en mi vida». Contenido técnico, poco. Un vídeo de NURSING.com sobre frémito y soplo: unos 41.000 «me gusta». @docpablog, «Aguja para fístula en hemodiálisis»: unos 13.700 | Reutilizar los Shorts: errores, preguntas tipo examen, 3D frente a ecografía |
| **Grupos de Facebook** | Enfermería de diálisis en España y Latinoamérica, técnicos de EE. UU. | Tamaños sin verificar: Google no indexa bien los grupos | Buscar a mano «enfermería nefrológica», «enfermeras de hemodiálisis», «técnicos en hemodiálisis», «dialysis nurses» y «dialysis technicians». Anotar tamaño y normas, y **escribir a quien administra antes de publicar** |
| **Grupos de WhatsApp y Telegram** | Unidades de diálisis (España y Latinoamérica) | No son públicos | No entrar a publicar. Facilitar que circule: botón de compartir, póster con QR, nota para supervisión |
| **Reddit** | Ver tabla siguiente | — | Primero la parte técnica; en enfermería, solo con valor y declarando autoría |
| **allnurses** (foro *Dialysis/Renal*) | *Dialysis nurses* nuevos | Hilos sobre la formación en la empresa (unas 4 semanas de clase y 6 o más con tutor) | Responder en hilos existentes con el enfoque de «practicar gratis antes de la tutorización» |
| **Home Dialysis Central** (foros) | Hemodiálisis domiciliaria, autopunción | Hilos de técnica de ojal y punción | Solo con C4 publicada y en tono de ayuda |

**Reddit:** tamaños aproximados de GummySearch, que cerró en noviembre de 2025. Revisar `/about/rules` de cada comunidad antes de publicar.

| Comunidad | Miembros | Uso |
|---|---|---|
| r/threejs · r/webgl | ~32–58 mil · ~11 mil | **Empezar aquí**: «Física de ultrasonidos en WebGL2», con detalles técnicos |
| r/SideProject | ~430–800 mil | Historia del proyecto |
| r/StudentNurse · r/NursingStudents | ~180–195 mil · ~43–45 mil | Preguntas de examen y herramientas de estudio, si las normas lo permiten |
| r/nursing | ~1,1 millones | Normas estrictas: solo una publicación de valor, declarando autoría |
| r/emergencymedicine | ~137 mil | Ángulo de acceso vascular ecoguiado (D1, D3) |
| r/Sonographers · r/Radiology | ~20 mil · ~207 mil | Artefactos y física (D4) |
| r/nephrology | ~4 mil | Pequeña pero encaje exacto |
| r/dialysis · r/kidneydisease | ~9 mil · ~20 mil | **Sobre todo pacientes**. Empatía, no producto |

### 9.2 Colaboraciones con creadores de contenido

- **Español:**
  - **SABDI La Enfermera** (@sabdilaenfermera) publica valoración ecográfica y punción de la FAV: **es la mejor candidata**;
  - @docpablog;
  - @pronefroelsalvador, nefrólogo en El Salvador;
  - Ruth Molina («Diálisis 42 horas», #HemodialisisBaila).
- **Inglés:** NURSING.com (enfoque NCLEX) y cuentas hospitalarias como la de Austin Health.
- **Propuesta:** un enlace profundo a un caso y clips 3D gratis para sus vídeos. Formato «dúo» o *stitch*: «así se ve esa aguja en la ecografía». Sin pago y con crédito.

### 9.3 Normas de comunidad

- **Primero aportar valor:** como referencia, unas 9 contribuciones sin enlace por cada enlace propio (Reddit ya no lo exige; cada comunidad pone sus normas).
- **Declarar siempre la autoría:** «Lo he hecho yo, es gratuito y de código abierto».
- **Pedir permiso** a quien administra o modera antes de publicar.
- **Nunca el mismo enlace en varios grupos el mismo día.**
- **Sin imágenes de pacientes:** solo el simulador, con aviso de herramienta educativa.
- **Responder a todos los comentarios**, sobre todo las correcciones clínicas: son oro.

---

## 10. Plan de 90 días

Ritmo objetivo:
- 1 artículo a la semana, en los dos idiomas;
- 1 vídeo largo a la semana, alternando idioma;
- 3 vídeos cortos a la semana;
- 5–10 contactos a la semana.

**Ritmo mínimo viable**, si falta tiempo: 1 artículo y 1 vídeo largo cada dos semanas, y 2 cortos a la semana.

| Semana | Contenidos web | Vídeo y redes | Enlaces y contactos |
|---|---|---|---|
| **1** (26 oct.–1 nov.) | Search Console + Bing (2.1). Capturas en *Punción ecoguiada* y *Técnica* (5.1). Autoría (5.3) | Grabar el vídeo estrella en español (eje largo) + 3 cortos. LinkedIn: presentación del proyecto | Zenodo + `CITATION.cff` + README. Correo a SEDEN antes del congreso. r/threejs |
| **2** (2–8 nov.) | **A2 Tipos de FAV** | Vídeo estrella en inglés (en plano frente a fuera de plano). Publicaciones del congreso SEN (5–7 nov.). Hilo en #NephSky | Propuesta a HealthySimulation. Tarjeta con QR para Murcia |
| **3** (9–15 nov.) | **C1 Punción difícil** | Vídeo «FAV profunda en obesidad». Corto durante SEDEN (8–10 nov.). Carrusel en LinkedIn | Congreso SEDEN: contactos y demostración. Propuestas a NephroPOCUS y NephJC |
| **4** (16–22 nov.) | **A1 Exploración física** + **F2 descargables** (checklist, póster de la regla de los 6) | «El error de la semana» n.º 1 y 2. 21 de noviembre: Día de la Enfermería en Argentina | Show HN + *showcase* de three.js el mismo día. Primeros grupos de Facebook (con permiso) |
| **5** (23–29 nov.) | **E1 Simuladores y *phantom* casero** | Vídeo «Estenosis y *aliasing*» (EN) | Lote de correos: guías de biblioteca, CAN-Sim, UTHSC, Tom Wade, Core Ultrasound y NephSIM. Redactar el póster de ANNA |
| **6** (30 nov.–6 dic.) | **F1 Calculadora Qa** + **B1 Estenosis** | Corto «Qa en 30 segundos» | **Enviar el póster de ANNA (8 dic.)**. Lanzar la encuesta de utilidad a profesionales |
| **7** (7–13 dic.) | **E3 en español: preguntas EIR** | Empieza la serie diaria de preguntas EIR (cortos) | **Resumen de VAS (15 dic.)**. Contacto con academias de EIR |
| **8** (14–20 dic.) | **E2 Formación en la unidad** + kit docente en PDF | Vídeo «Prótesis de PTFE» (EN) | **Comunicación a SESSEP (20 dic.)**. **Primera revisión de Search Console** (apartado 2.2) |
| **9** (21 dic.–3 ene.) | **E3 en inglés: preguntas de examen** + **B2 FAV trombosada** | Preguntas EIR diarias | Correos ligeros (festivos) |
| **10** (4–10 ene.) | **D1 Arteria o vena** | Vídeo de la lección «arteria o vena». 6 de enero: Día de la Enfermera en México | Grupos latinoamericanos |
| **11** (11–17 ene.) | **D2 Ecografía básica para enfermería** | Recta final del EIR | Borrador del original breve para *Enfermería Nefrológica* |
| **12** (18–24 ene.) | Actualizar títulos y descripciones según Search Console. Preguntas frecuentes en las 8 guías originales | EIR el 23 de enero: vídeo «Las 10 preguntas de acceso vascular que más caen» | Revisión de los 90 días y plan del trimestre 2: Día Mundial del Riñón (11 mar.), ANNA y VAS en abril |

---

## 11. Indicadores

| Indicador | Fuente | Objetivo a 90 días | Comentario |
|---|---|---|---|
| URL del sitemap indexadas | Search Console → Páginas | 100 % en la semana 4 y las nuevas en menos de 7 días | Si no, revisar enlaces internos y calidad |
| Páginas publicadas | Repositorio | 8 guías + 8 nuevas + calculadora + descargables, en los dos idiomas | Lo que depende de ti |
| Consultas con impresiones | Search Console | Línea base en la semana 4 y crecimiento mes a mes | En un nicho pequeño importa más la cobertura que el volumen |
| Posición media en las consultas principales | Search Console | Primeros 5 puestos en «punción ecoguiada FAV», «técnica punción FAV», «regla de los 6 FAV» y equivalentes en inglés | Las principales del nicho |
| Clics y CTR | Search Console | CTR > 3 % en consultas con posición < 10 | Si no, reescribir títulos |
| Dominios que enlazan (relevantes) | Search Console → Enlaces | 15–25 dominios temáticos | Contar solo los que tienen que ver con el tema |
| Enlaces de nivel 1 | Manual | ≥ 3 (sociedad, curso, revista o guía de biblioteca) | Los más valiosos |
| Vídeos publicados y visualizaciones | YouTube Studio | 10 largos, más de 30 cortos | El tiempo de visualización importa más que las visualizaciones |
| Clics desde YouTube a la web | YouTube Studio (clics en enlaces y tarjetas) | Línea base | Sin analítica es la única referencia del canal |
| Comunicaciones enviadas | Manual | ANNA, VAS y SESSEP enviadas | — |
| Apoyos en Ko-fi y correos recibidos | Ko-fi y bandeja de entrada | Línea base | Señal cualitativa |

---

## 12. Lo que no conviene hacer

- **Contenido generado en masa sin revisión clínica.** Google penaliza el contenido producido a escala sin valor añadido, y en contenido médico un error destroza la reputación. Cada guía nueva necesita la misma revisión de fuentes que las actuales.
- **Comprar enlaces, redes de blogs, intercambios masivos y directorios genéricos de pago.**
- **Prometer resultados clínicos** («reduce las infiltraciones un X %») sin datos propios. Mejor: «la evidencia sugiere…», con la cita.
- **Usar imágenes de pacientes reales.** Solo el simulador.
- **Publicar en grupos sin permiso** o con el mismo texto en todos.
- **Añadir enlaces propios en Wikipedia.**
- **Esparcir la marca:** mejor 3 canales bien llevados (YouTube, LinkedIn y un tercero) que 8 abandonados.

---

## 13. Decisiones pendientes

| Decisión | Opciones | Recomendación |
|---|---|---|
| **Analítica** | (a) seguir sin; (b) contador agregado sin cookies (GoatCounter, Plausible, Cloudflare Web Analytics), actualizando el aviso de privacidad | **(b)**, con transparencia. Sin ver referencias no se sabe qué canal funciona. Si la privacidad absoluta es una seña de identidad irrenunciable, (a), aceptando el ángulo muerto |
| **Autoría con nombre** | Firmar con tu nombre y titulación; un comité de revisión; o seguir como organización | Nombre + al menos una revisión clínica externa con nombre |
| **Identidad en vídeo** | Cara y voz propias; solo voz; o voz sintética | Voz propia, aunque sin cara: en sanidad la voz humana genera confianza |
| **Boletín** | Ninguno; «un caso al mes» con alta voluntaria (exige política de privacidad y RGPD) | Empezar en el mes 3, cuando haya contenido para alimentarlo |
| **Calculadoras y modo incrustable** | Desarrollarlos o no | Calculadora sí (P1). Modo incrustable en el trimestre 2 |
| **Portugués de Brasil** | Ahora, más adelante o nunca | Valorarlo en el mes 4 con datos de Search Console. Es la expansión con menos competencia |
| **Asistencia a SEDEN (8–10 nov.)** | Ir, mandar material a alguien que vaya, o solo redes | Si es posible, ir: es la mayor concentración de la audiencia principal en España |

---

## Fuentes consultadas

Las fuentes son búsquedas del 25 de octubre de 2026. Las marcadas «sin verificar» en el texto no se pudieron abrir.

**Competencia en resultados de búsqueda**

- [Manual de procedimientos de enfermería nefrológica: punción ecoguiada (PDF)](https://enfermerianefrologica.com/procedimientos/article/download/3.4/1689/6384)
- [Punción de fístulas arteriovenosas en hemodiálisis, Hospital Virgen de la Victoria, SAS (PDF)](https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/hospital/virgen-victoria/sites/default/files/2025-03/118-03-ES-Punci%C3%B3n%20de%20f%C3%ADstulas%20arteriovenosas%20en%20hemodi%C3%A1lisis.pdf)
- [Nefrología al día: punción ecoguiada del acceso vascular](https://nefrologiaaldia.org/es-articulo-puncion-ecoguiada-del-acceso-vascular-para-hemodialisis-592-pdf)
- [SalusPlay: aplicación práctica del ecógrafo al acceso vascular](https://www.salusplay.com/apuntes/cuidados-medico-quirurgicos/tema-8-aplicacion-practica-del-ecografo-al-acceso-vascular/resumen)
- [Revista Portales Médicos: cuidados de enfermería en las FAV](https://www.revista-portalesmedicos.com/revista-medica/enfermeria-fistulas-arteriovenosas/)
- [Universidad de Jaén: cuidados de la fístula arteriovenosa](https://crea.ujaen.es/items/16269e9d-f098-4019-86b1-c0c749400339)
- [IVTEAM: arteriovenous fistula cannulation technique](https://ivteam.com/intravenous-literature/dialysis/arteriovenous-fistula-cannulation-technique/)
- [IVTEAM: POCUS for arteriovenous fistula access](https://ivteam.com/intravenous-literature/pocus-for-arteriovenous-fistula-access/)
- [ClinicalTrials.gov NCT05410691: ecografía portátil en la punción por enfermería renal](https://clinicaltrials.gov/study/NCT05410691)
- [NKF: AV access cannulation checklists (PDF)](https://www.kidney.org/sites/default/files/vait-11c_av_access_cannulation_checklists.pdf)
- [LHSC: physical examination of fistulae (PDF)](https://www.lhsc.on.ca/doc/orientation/VAEP-Module-Two-Fistulae/presentation_content/external_files/physicalexamination.pdf)
- [NephSIM, caso 9](https://nephsim.com/case-9-diagnosis-conclusions/)
- [Open Exam Prep: physical examination, BONENT](https://open-exam-prep.com/study-guides/bonent-chn/vascular-access-types/access-examination)
- [Simulador casero de punción ecoguiada, *Angiología* (PDF)](https://www.revistaangiologia.es/filesPortalWeb/1573/CO-WM-00746-01.pdf)
- [HealthySimulation: simulación de ultrasonido (ES)](https://www.healthysimulation.com/es/etiqueta/simuladores-de-ultrasonido/p%C3%A1gina/2/)
- [InSimo: online ultrasound simulator](https://www.insimo.com/online-ultrasound-simulator)

**Vídeo y redes**

- [Sonosite: ultrasound visualization for hemodialysis cannulation](https://www.sonosite.com/webinars/see-know-ultrasound-visualization-hemodialysis-cannulation)
- [YouTube: AV Fistula Cannulation Step by Step](https://www.youtube.com/watch?v=4l853U2hSoo)
- [YouTube: Sesión clínica, técnicas de punción de la FAV](https://www.youtube.com/watch?v=SzRh9bIR2VM)
- [TikTok: #dialysisnurse](https://www.tiktok.com/tag/dialysisnurse?lang=en)
- [NephJC: The Bluesky migration](http://www.nephjc.com/news/2024/11/12/the-bluesky-migration)
- [Clinical Kidney Journal: Skytorial](https://academic.oup.com/ckj/article/18/2/sfae414/7928126)
- [Tubefilter: enlaces en las descripciones de Shorts](https://tubefilter.com/2023/08/10/youtube-shorts-comments-spam/)
- [allnurses: dialysis nursing](https://allnurses.com/dialysis-nursing-t187332/)

**Eventos y plazos**

- [51.º Congreso SEDEN 2026](https://www.seden.org/eventos/51-congreso-nacional-seden-2026)
- [EIR 2027: fecha y plazas (CODEM)](https://www.codem.es/noticias/eir-2027-boe-oficializa-2-341-plazas-enfermeria-y-fecha-examen-que-se-celebrara-23-enero)
- [ANNA National Symposium](https://www.annanurse.org/event/national-symposium/)
- [VAS 2027](https://vas2027.org/)
- [SESSEP 2027](https://www.congresosessep.es/SESSEP2027)
- [ANNA Nephrology Nurses Week](https://www.annanurse.org/event/nephrology-nurses-week/)

**Directorios y formación**

- [HealthySimulation: envío de artículos](https://www.healthysimulation.com/submit-articles/)
- [HealthySimulation: ultrasound simulator](https://www.healthysimulation.com/ultrasound-simulator/)
- [Ultrasound Fanatic: simulators](https://ultrasoundfanatic.com/simulators/)
- [CAN-Sim: virtual simulation games](https://can-sim.ca/virtual-simulation-games-open-source/)
- [UK Kidney Association: MAGIC](https://education.ukkidney.org/course/magic)
- [ANN UK: vascular access](https://ann-uk.org/vascular-access/)
- [Curso de ecografía vascular para enfermería nefrológica, Parc Taulí (PDF)](https://www.tauli.cat/en/hospital/images/SubSites/PAVCourses/Documents/Curso_ecografia_vascular_enfermeria_nefrologica.pdf)
- [SEDEN: ecografía básica del acceso vascular](https://www.seden.org/formacion/ecografia-de-ecografia-basica-del-acceso-vascular-para-enfermeria-nefrologica)
- [JOSE: envío](https://openjournals.readthedocs.io/en/jose/submitting.html)
