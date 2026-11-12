/**
 * Páginas del sitio y sus traducciones: de aquí salen las entradas de la compilación (vite.config.ts),
 * el sitemap y las comprobaciones de las pruebas (hreflang, enlaces y metadatos).
 * Rutas relativas a la raíz del sitio, terminadas en «/»; cada página es <ruta>index.html.
 */
export interface PagePair {
  es: string;
  en: string;
}

/** Simulador. */
export const APP_PAGES: PagePair = { es: '', en: 'en/' };

/** Índice de guías. */
export const GUIDE_INDEX: PagePair = { es: 'guias/', en: 'en/guides/' };

/** Guías de punción y ecografía de la FAV (en el orden en que aparecen en el índice). */
export const GUIDES: PagePair[] = [
  { es: 'guias/tipos-fistula-arteriovenosa/', en: 'en/guides/types-of-av-fistula/' },
  { es: 'guias/mapeo-vascular-ecografia/', en: 'en/guides/vein-mapping-ultrasound/' },
  { es: 'guias/tecnica-puncion-fav/', en: 'en/guides/avf-cannulation-technique/' },
  { es: 'guias/puncion-ecoguiada-fav/', en: 'en/guides/ultrasound-guided-fistula-cannulation/' },
  { es: 'guias/arteria-o-vena-ecografia/', en: 'en/guides/artery-vs-vein-ultrasound/' },
  { es: 'guias/puncion-dificil-fav/', en: 'en/guides/difficult-fistula-cannulation/' },
  { es: 'guias/primera-puncion-fav/', en: 'en/guides/first-cannulation-new-fistula/' },
  { es: 'guias/angulo-agujas-puncion-fav/', en: 'en/guides/avf-needle-angle-and-gauge/' },
  { es: 'guias/exploracion-fisica-fav/', en: 'en/guides/av-fistula-physical-exam/' },
  { es: 'guias/regla-de-los-6-maduracion-fav/', en: 'en/guides/rule-of-6s-fistula-maturation/' },
  { es: 'guias/ecografia-doppler-fav/', en: 'en/guides/av-fistula-doppler-ultrasound/' },
  { es: 'guias/puncion-escalera-area-ojal/', en: 'en/guides/rope-ladder-buttonhole-cannulation/' },
  { es: 'guias/estenosis-fav/', en: 'en/guides/av-fistula-stenosis/' },
  { es: 'guias/trombosis-fav/', en: 'en/guides/clotted-av-fistula/' },
  { es: 'guias/infiltracion-fav/', en: 'en/guides/fistula-infiltration/' },
  { es: 'guias/aneurisma-fav/', en: 'en/guides/av-fistula-aneurysm/' },
  { es: 'guias/formacion-puncion-ecoguiada/', en: 'en/guides/ultrasound-cannulation-training-program/' },
  { es: 'guias/via-periferica-ecoguiada/', en: 'en/guides/ultrasound-guided-peripheral-iv/' },
];

export const ALL_PAGES: PagePair[] = [APP_PAGES, GUIDE_INDEX, ...GUIDES];

export const SITE_ORIGIN = 'https://fistulab.com/';
