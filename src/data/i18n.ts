// The blog is published in English plus the languages of countries where
// psoriasis is especially common (Norway, Denmark, Germany) and French.
// Imports keep their .ts extension: the build script reads this file with Node.
import type { Article, ArticleCategory, ArticleText } from './articles.ts'

export const LANGS = ['en', 'fr', 'de', 'no', 'da'] as const
export type Lang = (typeof LANGS)[number]

/** English lives at /blog, every other language under its own prefix: /fr/blog. */
export function langFromPath(path: string): Lang {
  const first = path.split('/')[1] as Lang
  return first !== 'en' && LANGS.includes(first) ? first : 'en'
}

export const blogPath = (lang: Lang, slug?: string) =>
  `${lang === 'en' ? '' : `/${lang}`}/blog${slug ? `/${slug}` : ''}`

const LOADERS: Record<
  Exclude<Lang, 'en'>,
  () => Promise<{ default: Record<string, ArticleText> }>
> = {
  fr: () => import('./i18n/articles.fr.ts'),
  de: () => import('./i18n/articles.de.ts'),
  no: () => import('./i18n/articles.no.ts'),
  da: () => import('./i18n/articles.da.ts'),
}

const loaded: Partial<Record<Lang, Record<string, ArticleText>>> = {}

/** Fetches one language's articles. Called before the app first renders, and by the build. */
export async function loadLang(lang: Lang) {
  if (lang !== 'en' && !loaded[lang]) loaded[lang] = (await LOADERS[lang]()).default
}

/** The article in the given language (loadLang first), or the English original. */
export function localize(article: Article, lang: Lang): Article {
  const text = loaded[lang]?.[article.slug]
  if (!text) return article
  const { imageAlt, ...rest } = text
  return {
    ...article,
    ...rest,
    image: article.image && imageAlt ? { ...article.image, alt: imageAlt } : article.image,
  }
}

type Strings = {
  name: string
  locale: string
  nav: { guide: string; food: string; blog: string; about: string; contact: string }
  openGuide: string
  blogEyebrow: string
  blogTitle: string
  blogIntro: (count: number) => string
  blogMetaTitle: string
  blogMetaDescription: string
  all: string
  featured: string
  minRead: (n: number) => string
  takeaways: string
  onThisPage: string
  goDeeper: string
  guideEnglish: string
  sources: string
  sourcesNote: string
  disclaimer: string
  moreOn: string
  photo: string
  language: string
  share: string
  copied: string
  footerTagline: string
  explore: string
  legal: string
  sourceCode: string
  footerDisclaimer: string
  categories: Record<ArticleCategory, string>
}

export const UI: Record<Lang, Strings> = {
  en: {
    name: 'English',
    locale: 'en-GB',
    nav: { guide: '3D body guide', food: 'Food', blog: 'Blog', about: 'About', contact: 'Contact' },
    openGuide: 'Open the 3D guide',
    blogEyebrow: 'Blog',
    blogTitle: 'Psoriasis, explained plainly',
    blogIntro: (n) =>
      `${n} articles on types, treatments, skin care, food and the emotional side of psoriasis. Every one lists its sources.`,
    blogMetaTitle: 'Psoriasis articles',
    blogMetaDescription:
      'Plain-language articles on psoriasis: types, treatments, skin care, food, stress and talking about it, each with its sources.',
    all: 'All',
    featured: 'Featured',
    minRead: (n) => `${n} min read`,
    takeaways: 'Key takeaways',
    onThisPage: 'On this page',
    goDeeper: 'Go deeper in the 3D guide',
    guideEnglish: '',
    sources: 'Sources',
    sourcesNote: '',
    disclaimer:
      'General information, not medical advice. Talk to your doctor or dermatologist before changing your treatment.',
    moreOn: 'Keep reading',
    photo: 'Photo',
    language: 'Language',
    share: 'Copy link',
    copied: 'Link copied',
    footerTagline: 'A free, open-source guide for the 125 million people who live with psoriasis.',
    explore: 'Explore',
    legal: 'Legal',
    sourceCode: 'Source code',
    footerDisclaimer:
      'This site is for education only and is not medical advice. Always talk to your doctor or dermatologist. In an emergency, call your local emergency number.',
    categories: {
      'Understanding psoriasis': 'Understanding psoriasis',
      Treatments: 'Treatments',
      'Skin care': 'Skin care',
      'Food & lifestyle': 'Food & lifestyle',
      'Mind & mood': 'Mind & mood',
    },
  },
  fr: {
    name: 'Français',
    locale: 'fr-FR',
    nav: {
      guide: 'Guide 3D du corps',
      food: 'Alimentation',
      blog: 'Blog',
      about: 'À propos',
      contact: 'Contact',
    },
    openGuide: 'Ouvrir le guide 3D',
    blogEyebrow: 'Blog',
    blogTitle: 'Le psoriasis, expliqué simplement',
    blogIntro: (n) =>
      `${n} articles sur les types de psoriasis, les traitements, les soins de la peau, l’alimentation et le vécu émotionnel. Chacun cite ses sources.`,
    blogMetaTitle: 'Articles sur le psoriasis',
    blogMetaDescription:
      'Des articles clairs sur le psoriasis : types, traitements, soins de la peau, alimentation, stress et comment en parler, avec leurs sources.',
    all: 'Tous',
    featured: 'À la une',
    minRead: (n) => `${n} min de lecture`,
    takeaways: 'À retenir',
    onThisPage: 'Sur cette page',
    goDeeper: 'Aller plus loin avec le guide 3D',
    guideEnglish: 'Le guide 3D est en anglais.',
    sources: 'Sources',
    sourcesNote: 'Les sources sont en anglais.',
    disclaimer:
      'Information générale, pas un avis médical. Parlez-en à votre médecin ou à votre dermatologue avant de modifier votre traitement.',
    moreOn: 'À lire aussi',
    photo: 'Photo',
    language: 'Langue',
    share: 'Copier le lien',
    copied: 'Lien copié',
    footerTagline:
      'Un guide gratuit et open source pour les 125 millions de personnes qui vivent avec le psoriasis.',
    explore: 'Explorer',
    legal: 'Mentions légales',
    sourceCode: 'Code source',
    footerDisclaimer:
      'Ce site est uniquement éducatif et ne remplace pas un avis médical. Parlez-en toujours à votre médecin ou à votre dermatologue. En cas d’urgence, appelez le numéro d’urgence local.',
    categories: {
      'Understanding psoriasis': 'Comprendre le psoriasis',
      Treatments: 'Traitements',
      'Skin care': 'Soins de la peau',
      'Food & lifestyle': 'Alimentation et mode de vie',
      'Mind & mood': 'Moral et bien-être',
    },
  },
  de: {
    name: 'Deutsch',
    locale: 'de-DE',
    nav: {
      guide: '3D-Körperguide',
      food: 'Ernährung',
      blog: 'Blog',
      about: 'Über uns',
      contact: 'Kontakt',
    },
    openGuide: '3D-Guide öffnen',
    blogEyebrow: 'Blog',
    blogTitle: 'Psoriasis, verständlich erklärt',
    blogIntro: (n) =>
      `${n} Artikel über Formen, Behandlungen, Hautpflege, Ernährung und die seelische Seite der Psoriasis. Jeder nennt seine Quellen.`,
    blogMetaTitle: 'Artikel über Psoriasis',
    blogMetaDescription:
      'Verständliche Artikel über Psoriasis (Schuppenflechte): Formen, Behandlungen, Hautpflege, Ernährung, Stress und darüber sprechen, jeweils mit Quellen.',
    all: 'Alle',
    featured: 'Empfohlen',
    minRead: (n) => `${n} Min. Lesezeit`,
    takeaways: 'Das Wichtigste in Kürze',
    onThisPage: 'Auf dieser Seite',
    goDeeper: 'Mehr dazu im 3D-Guide',
    guideEnglish: 'Der 3D-Guide ist auf Englisch.',
    sources: 'Quellen',
    sourcesNote: 'Die Quellen sind auf Englisch.',
    disclaimer:
      'Allgemeine Informationen, keine ärztliche Beratung. Sprechen Sie mit Ihrer Ärztin oder Ihrem Arzt, bevor Sie Ihre Behandlung ändern.',
    moreOn: 'Weiterlesen',
    photo: 'Foto',
    language: 'Sprache',
    share: 'Link kopieren',
    copied: 'Link kopiert',
    footerTagline:
      'Ein kostenloser Open-Source-Ratgeber für die 125 Millionen Menschen, die mit Psoriasis leben.',
    explore: 'Entdecken',
    legal: 'Rechtliches',
    sourceCode: 'Quellcode',
    footerDisclaimer:
      'Diese Website dient nur der Information und ersetzt keine ärztliche Beratung. Sprechen Sie immer mit Ihrer Ärztin, Ihrem Arzt oder Ihrer Hautärztin. Im Notfall rufen Sie den Notruf an.',
    categories: {
      'Understanding psoriasis': 'Psoriasis verstehen',
      Treatments: 'Behandlung',
      'Skin care': 'Hautpflege',
      'Food & lifestyle': 'Ernährung & Lebensstil',
      'Mind & mood': 'Seele & Psyche',
    },
  },
  no: {
    name: 'Norsk',
    locale: 'nb-NO',
    nav: {
      guide: '3D-kroppsguide',
      food: 'Kosthold',
      blog: 'Blogg',
      about: 'Om oss',
      contact: 'Kontakt',
    },
    openGuide: 'Åpne 3D-guiden',
    blogEyebrow: 'Blogg',
    blogTitle: 'Psoriasis, enkelt forklart',
    blogIntro: (n) =>
      `${n} artikler om typer, behandling, hudpleie, kosthold og den følelsesmessige siden av psoriasis. Alle oppgir kildene sine.`,
    blogMetaTitle: 'Artikler om psoriasis',
    blogMetaDescription:
      'Lettleste artikler om psoriasis: typer, behandling, hudpleie, kosthold, stress og hvordan du snakker om det, alle med kilder.',
    all: 'Alle',
    featured: 'Utvalgt',
    minRead: (n) => `${n} min lesing`,
    takeaways: 'Det viktigste',
    onThisPage: 'På denne siden',
    goDeeper: 'Lær mer i 3D-guiden',
    guideEnglish: '3D-guiden er på engelsk.',
    sources: 'Kilder',
    sourcesNote: 'Kildene er på engelsk.',
    disclaimer:
      'Generell informasjon, ikke medisinske råd. Snakk med legen din eller hudlegen før du endrer behandlingen.',
    moreOn: 'Les videre',
    photo: 'Foto',
    language: 'Språk',
    share: 'Kopier lenke',
    copied: 'Lenke kopiert',
    footerTagline:
      'En gratis guide med åpen kildekode for de 125 millioner menneskene som lever med psoriasis.',
    explore: 'Utforsk',
    legal: 'Juridisk',
    sourceCode: 'Kildekode',
    footerDisclaimer:
      'Dette nettstedet er kun til opplysning og er ikke medisinske råd. Snakk alltid med legen din eller hudlegen. Ring 113 eller ditt lokale nødnummer i en nødsituasjon.',
    categories: {
      'Understanding psoriasis': 'Forstå psoriasis',
      Treatments: 'Behandling',
      'Skin care': 'Hudpleie',
      'Food & lifestyle': 'Kosthold og livsstil',
      'Mind & mood': 'Psykisk helse',
    },
  },
  da: {
    name: 'Dansk',
    locale: 'da-DK',
    nav: {
      guide: '3D-kropsguide',
      food: 'Kost',
      blog: 'Blog',
      about: 'Om os',
      contact: 'Kontakt',
    },
    openGuide: 'Åbn 3D-guiden',
    blogEyebrow: 'Blog',
    blogTitle: 'Psoriasis, forklaret enkelt',
    blogIntro: (n) =>
      `${n} artikler om typer, behandling, hudpleje, kost og den følelsesmæssige side af psoriasis. Alle angiver deres kilder.`,
    blogMetaTitle: 'Artikler om psoriasis',
    blogMetaDescription:
      'Letlæste artikler om psoriasis: typer, behandling, hudpleje, kost, stress og hvordan du taler om det, alle med kilder.',
    all: 'Alle',
    featured: 'Udvalgt',
    minRead: (n) => `${n} min. læsning`,
    takeaways: 'Det vigtigste',
    onThisPage: 'På denne side',
    goDeeper: 'Læs mere i 3D-guiden',
    guideEnglish: '3D-guiden er på engelsk.',
    sources: 'Kilder',
    sourcesNote: 'Kilderne er på engelsk.',
    disclaimer:
      'Generel information, ikke lægefaglig rådgivning. Tal med din læge eller hudlæge, før du ændrer din behandling.',
    moreOn: 'Læs videre',
    photo: 'Foto',
    language: 'Sprog',
    share: 'Kopiér link',
    copied: 'Link kopieret',
    footerTagline:
      'En gratis guide med åben kildekode til de 125 millioner mennesker, der lever med psoriasis.',
    explore: 'Udforsk',
    legal: 'Juridisk',
    sourceCode: 'Kildekode',
    footerDisclaimer:
      'Dette websted er kun til oplysning og er ikke lægefaglig rådgivning. Tal altid med din læge eller hudlæge. Ring 112 eller dit lokale alarmnummer i en nødsituation.',
    categories: {
      'Understanding psoriasis': 'Forstå psoriasis',
      Treatments: 'Behandling',
      'Skin care': 'Hudpleje',
      'Food & lifestyle': 'Kost og livsstil',
      'Mind & mood': 'Psyke og trivsel',
    },
  },
}
