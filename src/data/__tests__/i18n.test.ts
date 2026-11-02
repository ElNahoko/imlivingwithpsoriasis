import { describe, expect, it } from 'vitest'
import { ARTICLES, parseBody } from '../articles'
import { LANGS, blogPath, langFromPath, loadLang, localize } from '../i18n'

// A translation that drops a heading, a list item or a takeaway would still
// render, so compare its shape with the English original.
const shape = (body: string) =>
  parseBody(body).map((b) => (b.type === 'ul' ? `ul${b.items.length}` : b.type))

describe.each(LANGS.filter((l) => l !== 'en'))('%s articles', (lang) => {
  it('translate every article with the same structure as the English', async () => {
    await loadLang(lang)
    for (const article of ARTICLES) {
      const t = localize(article, lang)
      expect(t.title, article.slug).not.toBe(article.title)
      expect(t.takeaways, article.slug).toHaveLength(article.takeaways.length)
      expect(shape(t.body), article.slug).toEqual(shape(article.body))
      if (article.guideLabel) expect(t.guideLabel, article.slug).toBeTruthy()
    }
  })
})

describe('blog paths', () => {
  it('round-trip through langFromPath', () => {
    for (const lang of LANGS) expect(langFromPath(blogPath(lang, 'x'))).toBe(lang)
    expect(blogPath('en')).toBe('/blog')
    expect(langFromPath('/food')).toBe('en')
  })
})
