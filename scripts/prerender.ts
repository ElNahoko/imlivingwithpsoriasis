// Runs after `vite build`. Writes one HTML file per page with its own title,
// description, canonical URL, link-preview tags, JSON-LD and readable content,
// so search engines and AI crawlers see every page without running JavaScript.
// Also writes sitemap.xml and llms.txt. The React app replaces the static
// content as soon as it mounts.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { ARTICLES, parseBody, type Article } from '../src/data/articles.ts'
import { FOODS, VERDICT_LABELS } from '../src/data/foods.ts'
import { PAGES_META, fullTitle } from '../src/data/seo.ts'
import { SITE } from '../src/data/site.ts'

const dist = join(import.meta.dirname, '..', 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const url = (path: string) => SITE.url + path

const NAV = [
  ['/', 'Home'],
  ['/guide', '3D body guide'],
  ['/food', 'Food guide'],
  ['/blog', 'Articles'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
]

const PSORIASIS = {
  '@type': 'MedicalCondition',
  name: 'Psoriasis',
  sameAs: 'https://en.wikipedia.org/wiki/Psoriasis',
}

const ORG = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#org`,
  name: SITE.name,
  url: url('/'),
  logo: url('/favicon.svg'),
  sameAs: [SITE.repo],
}

const crumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: url(path),
  })),
})

function articleHtml(a: Article) {
  const body = parseBody(a.body)
    .map((b) =>
      b.type === 'h2'
        ? `<h2>${esc(b.text)}</h2>`
        : b.type === 'ul'
          ? `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
          : `<p>${esc(b.text)}</p>`,
    )
    .join('\n')
  const refs = a.refs.map((r) => `<li><a href="${esc(r.url)}">${esc(r.label)}</a></li>`).join('')
  return `<article><h1>${esc(a.title)}</h1><p>${esc(a.description)}</p>
<p><time datetime="${a.date}">${a.date}</time> · ${esc(a.category)}</p>
${body}
<h2>Sources</h2><ul>${refs}</ul></article>`
}

const articleList = (list: Article[]) =>
  `<ul>${list
    .map((a) => `<li><a href="/blog/${a.slug}">${esc(a.title)}</a>: ${esc(a.description)}</li>`)
    .join('')}</ul>`

type Page = { path: string; title: string; description: string; html: string; ld: object[] }

const pages: Page[] = Object.entries(PAGES_META).map(([path, meta]) => {
  const intro = `<h1>${esc(meta.title || SITE.name)}</h1><p>${esc(meta.description)}</p>`
  let html = intro
  let ld: object[] = [
    {
      '@type': 'WebPage',
      name: fullTitle(meta.title),
      url: url(path),
      description: meta.description,
    },
  ]
  if (path === '/') {
    html += `<h2>Latest articles</h2>${articleList(ARTICLES.slice(0, 6))}`
    ld = [
      ORG,
      {
        '@type': 'WebSite',
        name: SITE.name,
        url: url('/'),
        description: meta.description,
        publisher: { '@id': ORG['@id'] },
        inLanguage: 'en',
      },
    ]
  }
  if (path === '/blog') {
    html += articleList(ARTICLES)
    ld = [
      {
        '@type': 'Blog',
        name: `${SITE.name} articles`,
        url: url('/blog'),
        description: meta.description,
        blogPost: ARTICLES.map((a) => ({
          '@type': 'BlogPosting',
          headline: a.title,
          url: url(`/blog/${a.slug}`),
        })),
      },
      crumbs([
        ['Home', '/'],
        ['Articles', '/blog'],
      ]),
    ]
  }
  if (path === '/food' || path === '/guide') {
    if (path === '/food')
      html += `<ul>${FOODS.map(
        (f) =>
          `<li><strong>${esc(f.name)}</strong> (${VERDICT_LABELS[f.verdict]}): ${esc(f.why)}</li>`,
      ).join('')}</ul>`
    ld = [
      {
        '@type': 'MedicalWebPage',
        name: fullTitle(meta.title),
        url: url(path),
        description: meta.description,
        about: PSORIASIS,
        audience: { '@type': 'Patient' },
        publisher: { '@id': ORG['@id'] },
      },
      ORG,
    ]
  }
  return { path, title: meta.title, description: meta.description, html, ld }
})

for (const a of ARTICLES) {
  const path = `/blog/${a.slug}`
  pages.push({
    path,
    title: a.title,
    description: a.description,
    html: articleHtml(a),
    ld: [
      {
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.description,
        url: url(path),
        mainEntityOfPage: url(path),
        datePublished: a.date,
        dateModified: a.date,
        articleSection: a.category,
        inLanguage: 'en',
        about: PSORIASIS,
        author: { '@id': ORG['@id'] },
        publisher: { '@id': ORG['@id'] },
        citation: a.refs.map((r) => r.url),
      },
      ORG,
      crumbs([
        ['Home', '/'],
        ['Articles', '/blog'],
        [a.title, path],
      ]),
    ],
  })
}

const nav = `<nav>${NAV.map(([href, label]) => `<a href="${href}">${label}</a>`).join(' · ')}</nav>`
const footer = `<p>Educational information, not medical advice.</p>`

for (const page of pages) {
  const title = esc(fullTitle(page.title))
  const description = esc(page.description)
  const isArticle = page.path.startsWith('/blog/')
  const head = `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url(page.path)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url(page.path)}" />
    <meta property="og:type" content="${isArticle ? 'article' : 'website'}" />
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': page.ld,
    }).replace(/</g, '\\u003c')}</script>`

  const html = template
    .replace(/<title>[\s\S]*<!-- \/meta -->/, head)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${nav}<main>${page.html}</main>${footer}</div>`,
    )

  // With `cleanUrls`, Vercel serves /blog/x from blog/x.html.
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
  mkdirSync(dirname(join(dist, file)), { recursive: true })
  writeFileSync(join(dist, file), html)
}

const lastmod = ARTICLES.map((a) => a.date)
  .sort()
  .at(-1)
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => {
    const article = ARTICLES.find((a) => `/blog/${a.slug}` === p.path)
    return `  <url><loc>${url(p.path)}</loc><lastmod>${article?.date ?? lastmod}</lastmod></url>`
  })
  .join('\n')}
</urlset>
`,
)

// llms.txt: a plain map of the site for AI assistants (https://llmstxt.org).
writeFileSync(
  join(dist, 'llms.txt'),
  `# ${SITE.name}

> ${PAGES_META['/'].description}

Educational information about psoriasis, written in plain language and based on dermatology guidelines and peer-reviewed research. Not medical advice.

## Guides

${['/guide', '/food']
  .map((p) => `- [${PAGES_META[p].title}](${url(p)}): ${PAGES_META[p].description}`)
  .join('\n')}

## Articles

${ARTICLES.map((a) => `- [${a.title}](${url(`/blog/${a.slug}`)}): ${a.description}`).join('\n')}

## About

- [About](${url('/about')}): ${PAGES_META['/about'].description}
- [Medical disclaimer](${url('/medical-disclaimer')})
`,
)

console.log(`prerendered ${pages.length} pages, sitemap.xml and llms.txt`)
