import { useEffect, useSyncExternalStore } from 'react'
import { SITE } from '../data/site'
import { fullTitle, type PageMeta } from '../data/seo'

// ponytail: a handful of flat routes needs pathname + history, not a router
// library. Reach for one when routes get params or nesting.

const subscribe = (onChange: () => void) => {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}

export const usePath = () => useSyncExternalStore(subscribe, () => window.location.pathname)

export function navigate(to: string) {
  if (to !== window.location.pathname) {
    window.history.pushState(null, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  window.scrollTo(0, 0)
}

/** Keeps the tab title, description, canonical and link-preview tags in step with the page. */
export function usePageMeta(meta: PageMeta, path: string) {
  useEffect(() => {
    const title = fullTitle(meta.title)
    const url = SITE.url + path
    document.title = title
    const set = (selector: string, attr: string, value: string) =>
      document.head.querySelector(selector)?.setAttribute(attr, value)
    set('meta[name="description"]', 'content', meta.description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', meta.description)
    set('meta[property="og:url"]', 'content', url)
    set('link[rel="canonical"]', 'href', url)
  }, [meta, path])
}
