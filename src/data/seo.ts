// Imports keep their .ts extension: the build script reads this file with Node.
import { ARTICLES } from './articles.ts'
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
  '/blog': {
    title: 'Psoriasis articles',
    description:
      'Plain-language articles on psoriasis: types, treatments, skin care, food, stress and talking about it, each with its sources.',
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

export const articleFromPath = (path: string) =>
  path.startsWith('/blog/') ? ARTICLES.find((a) => `/blog/${a.slug}` === path) : undefined

export function metaFor(path: string): PageMeta {
  const article = articleFromPath(path)
  return article
    ? { title: article.title, description: article.description }
    : (PAGES_META[path] ?? NOT_FOUND)
}
