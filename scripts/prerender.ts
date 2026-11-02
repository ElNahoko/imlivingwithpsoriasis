// Runs after `vite build`. Writes one HTML file per page with its own title,
// description, canonical URL, language links, link-preview tags, JSON-LD and
// readable content, so search engines and AI crawlers see every page without
// running JavaScript. Also writes sitemap.xml and llms.txt. The React app
// replaces the static content as soon as it mounts.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { ARTICLES, parseBody, type Article } from '../src/data/articles.ts'
import { FOODS, VERDICT_LABELS } from '../src/data/foods.ts'
import { LANGS, UI, blogPath, loadLang, localize, type Lang } from '../src/data/i18n.ts'
import { PAGES_META, fullTitle } from '../src/data/seo.ts'
import { SITE } from '../src/data/site.ts'

const dist = join(import.meta.dirname, '..', 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')
for (const lang of LANGS) await loadLang(lang)

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const url = (path: string) => SITE.url + path

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

function articleHtml(a: Article, lang: Lang) {
  const ui = UI[lang]
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
  const image = a.image
    ? `<figure><img src="/blog/${a.slug}.jpg" alt="${esc(a.image.alt)}" width="${a.image.width}" height="${a.image.height}"><figcaption>${ui.photo}: ${esc(a.image.author)}, ${esc(a.image.license)}, via Wikimedia Commons</figcaption></figure>`
    : ''
  return `<article><h1>${esc(a.title)}</h1><p>${esc(a.description)}</p>
<p><time datetime="${a.date}">${a.date}</time> · ${esc(ui.categories[a.category])}</p>
${image}
<h2>${esc(ui.takeaways)}</h2><ul>${a.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
${body}
<h2>${esc(ui.sources)}</h2><ul>${refs}</ul></article>`
}

const articleList = (list: Article[], lang: Lang) =>
  `<ul>${list
    .map(
      (a) =>
        `<li><a href="${blogPath(lang, a.slug)}">${esc(a.title)}</a>: ${esc(a.description)}</li>`,
    )
    .join('')}</ul>`

type Page = {
  path: string
  lang: Lang
  title: string
  description: string
  html: string
  ld: object[]
  /** the same page in every language, for hreflang links and the sitemap */
  alternates?: Record<Lang, string>
  image?: string
  lastmod?: string
}

const pages: Page[] = Object.entries(PAGES_META).map(([path, meta]) => {
  let html = `<h1>${esc(meta.title || SITE.name)}</h1><p>${esc(meta.description)}</p>`
  let ld: object[] = [
    {
      '@type': 'WebPage',
      name: fullTitle(meta.title),
      url: url(path),
      description: meta.description,
    },
  ]
  if (path === '/') {
    html += `<h2>Latest articles</h2>${articleList(ARTICLES.slice(0, 6), 'en')}`
    ld = [
      ORG,
      {
        '@type': 'WebSite',
        name: SITE.name,
        url: url('/'),
        description: meta.description,
        publisher: { '@id': ORG['@id'] },
        inLanguage: LANGS,
      },
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
  return { path, lang: 'en', title: meta.title, description: meta.description, html, ld }
})

const alternatesFor = (slug?: string) =>
  Object.fromEntries(LANGS.map((l) => [l, blogPath(l, slug)])) as Record<Lang, string>

for (const lang of LANGS) {
  const ui = UI[lang]
  const articles = ARTICLES.map((a) => localize(a, lang))
  const index = blogPath(lang)

  pages.push({
    path: index,
    lang,
    title: ui.blogMetaTitle,
    description: ui.blogMetaDescription,
    html: `<h1>${esc(ui.blogTitle)}</h1><p>${esc(ui.blogIntro(articles.length))}</p>${articleList(articles, lang)}`,
    alternates: alternatesFor(),
    ld: [
      {
        '@type': 'Blog',
        name: `${SITE.name}: ${ui.blogMetaTitle}`,
        url: url(index),
        description: ui.blogMetaDescription,
        inLanguage: lang,
        blogPost: articles.map((a) => ({
          '@type': 'BlogPosting',
          headline: a.title,
          url: url(blogPath(lang, a.slug)),
        })),
      },
      crumbs([
        ['Home', '/'],
        [ui.blogEyebrow, index],
      ]),
    ],
  })

  for (const a of articles) {
    const path = blogPath(lang, a.slug)
    const image = a.image && url(`/blog/${a.slug}.jpg`)
    pages.push({
      path,
      lang,
      title: a.title,
      description: a.description,
      html: articleHtml(a, lang),
      alternates: alternatesFor(a.slug),
      image,
      lastmod: a.date,
      ld: [
        {
          '@type': 'BlogPosting',
          headline: a.title,
          description: a.description,
          url: url(path),
          mainEntityOfPage: url(path),
          datePublished: a.date,
          dateModified: a.date,
          articleSection: ui.categories[a.category],
          inLanguage: lang,
          about: PSORIASIS,
          ...(lang !== 'en' && { translationOfWork: { '@id': url(blogPath('en', a.slug)) } }),
          ...(a.image && {
            image: {
              '@type': 'ImageObject',
              url: image,
              width: a.image.width,
              height: a.image.height,
              creditText: a.image.author,
              license: a.image.licenseUrl ?? undefined,
              acquireLicensePage: a.image.source,
            },
          }),
          author: { '@id': ORG['@id'] },
          publisher: { '@id': ORG['@id'] },
          citation: a.refs.map((r) => r.url),
        },
        ORG,
        crumbs([
          ['Home', '/'],
          [ui.blogEyebrow, index],
          [a.title, path],
        ]),
      ],
    })
  }
}

const OG_LOCALE: Record<Lang, string> = {
  en: 'en_GB',
  fr: 'fr_FR',
  de: 'de_DE',
  no: 'nb_NO',
  da: 'da_DK',
}

for (const page of pages) {
  const ui = UI[page.lang]
  const title = esc(fullTitle(page.title))
  const description = esc(page.description)
  const alternates = page.alternates
  const hreflang = alternates
    ? [
        ...LANGS.map(
          (l) => `<link rel="alternate" hreflang="${l}" href="${url(alternates[l])}" />`,
        ),
        `<link rel="alternate" hreflang="x-default" href="${url(alternates.en)}" />`,
      ]
    : []
  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url(page.path)}" />`,
    ...hreflang,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url(page.path)}" />`,
    `<meta property="og:type" content="${page.path.includes('/blog/') ? 'article' : 'website'}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[page.lang]}" />`,
    ...(page.image
      ? [
          `<meta property="og:image" content="${page.image}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
        ]
      : [`<meta name="twitter:card" content="summary" />`]),
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': page.ld,
    }).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')

  const nav = [
    ['/', 'Home'],
    ['/guide', ui.nav.guide],
    ['/food', ui.nav.food],
    [blogPath(page.lang), ui.nav.blog],
    ['/about', ui.nav.about],
    ['/contact', ui.nav.contact],
  ]
    .map(([href, label]) => `<a href="${href}">${esc(label)}</a>`)
    .join(' · ')

  const html = template
    .replace('<html lang="en">', `<html lang="${page.lang}">`)
    .replace(/<title>[\s\S]*<!-- \/meta -->/, head)
    .replace(
      '<div id="root"></div>',
      `<div id="root"><nav>${nav}</nav><main>${page.html}</main><p>${esc(ui.footerDisclaimer)}</p></div>`,
    )

  // With `cleanUrls`, Vercel serves /fr/blog/x from fr/blog/x.html.
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map((p) => {
    const alternates = p.alternates
    const links = alternates
      ? LANGS.map(
          (l) =>
            `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${url(alternates[l])}" />`,
        ).join('')
      : ''
    return `  <url>\n    <loc>${url(p.path)}</loc>\n    <lastmod>${p.lastmod ?? lastmod}</lastmod>${links}\n  </url>`
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

Educational information about psoriasis, written in plain language and based on dermatology guidelines and peer-reviewed research. Not medical advice. The articles are available in ${LANGS.map((l) => UI[l].name).join(', ')}.

## Guides

${['/guide', '/food']
  .map((p) => `- [${PAGES_META[p].title}](${url(p)}): ${PAGES_META[p].description}`)
  .join('\n')}

## Articles

${ARTICLES.map((a) => `- [${a.title}](${url(blogPath('en', a.slug))}): ${a.description}`).join('\n')}

## Translations

${LANGS.filter((l) => l !== 'en')
  .map((l) => `- [${UI[l].blogMetaTitle} (${UI[l].name})](${url(blogPath(l))})`)
  .join('\n')}

## About

- [About](${url('/about')}): ${PAGES_META['/about'].description}
- [Medical disclaimer](${url('/medical-disclaimer')})
`,
)

console.log(`prerendered ${pages.length} pages, sitemap.xml and llms.txt`)
