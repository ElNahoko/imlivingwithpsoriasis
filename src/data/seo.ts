// Imports keep their .ts extension: the build script reads this file with Node.
import { ARTICLES } from './articles.ts'
import { LANGS, UI, blogPath, langFromPath, localize } from './i18n.ts'
import { SITE } from './site.ts'

export type PageMeta = { title: string; description: string }

/** Title and description of every fixed page, for the tab, search results and link previews. */
export const PAGES_META: Record<string, PageMeta> = {
  '/': {
    title: '',
    description:
      'A free, private, evidence-based guide to psoriasis. Explore a 3D body to see where psoriasis appears and why, what triggers flares, what to eat, and how to prepare for your next appointment.',
  },
  '/guide': {
    title: 'Interactive 3D body guide',
    description:
      'Turn a 3D body and tap the eight places psoriasis appears most: what it looks like there, why it happens, what helps, and when to see a doctor.',
  },
  '/food': {
    title: 'Food and psoriasis: what to eat and what to limit',
    description:
      'Over 60 foods rated for psoriasis with the reason for each, based on dermatology dietary recommendations and the Mediterranean diet research.',
  },
  '/about': {
    title: 'About',
    description:
      'Why I’m living with psoriasis exists: plain, kind, evidence-based answers for the 125 million people who live with psoriasis.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Questions, story ideas, partnerships or corrections. Get in touch.',
  },
  '/privacy': {
    title: 'Privacy policy',
    description: 'What data this site keeps (almost none) and where it stays (your browser).',
  },
  '/terms': { title: 'Terms of use', description: 'The terms for using this site.' },
  '/medical-disclaimer': {
    title: 'Medical disclaimer',
    description:
      'This site is educational and not medical advice. When psoriasis needs urgent care.',
  },
}

export const NOT_FOUND: PageMeta = {
  title: 'Page not found',
  description: 'This page does not exist.',
}

export const fullTitle = (title: string) =>
  title ? `${title} | ${SITE.name}` : `${SITE.name}: an interactive guide to psoriasis`

/** The article at /blog/<slug> or /<lang>/blog/<slug>, in that language. */
export function articleFromPath(path: string) {
  const lang = langFromPath(path)
  const article = ARTICLES.find((a) => blogPath(lang, a.slug) === path)
  return article && localize(article, lang)
}

/** The blog index in each language: /blog, /fr/blog, … */
export const isBlogIndex = (path: string) => LANGS.some((l) => blogPath(l) === path)

export function metaFor(path: string): PageMeta {
  const article = articleFromPath(path)
  if (article) return { title: article.title, description: article.description }
  if (isBlogIndex(path)) {
    const ui = UI[langFromPath(path)]
    return { title: ui.blogMetaTitle, description: ui.blogMetaDescription }
  }
  return PAGES_META[path] ?? NOT_FOUND
}
