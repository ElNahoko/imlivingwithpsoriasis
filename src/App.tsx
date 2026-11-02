import { Button, Container, Stack, Text, Title } from '@mantine/core'
import { Guide } from './Guide'
import { Link } from './lib/router'
import { usePageMeta, usePath } from './lib/nav'
import { articleFromPath, isBlogIndex, metaFor } from './data/seo'
import { langFromPath } from './data/i18n'
import { SiteLayout } from './pages/SiteLayout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { Contact } from './pages/Contact'
import { Legal } from './pages/Legal'
import { ArticlePage } from './pages/ArticlePage'
import { FoodPage } from './pages/FoodPage'

const PAGES: Record<string, () => React.JSX.Element> = {
  '/': Home,
  '/about': About,
  '/food': FoodPage,
  '/contact': Contact,
  '/privacy': () => <Legal path="/privacy" />,
  '/terms': () => <Legal path="/terms" />,
  '/medical-disclaimer': () => <Legal path="/medical-disclaimer" />,
}

function NotFound() {
  return (
    <Container size="sm" py={96}>
      <Stack align="flex-start" gap="md">
        <Title order={1} fw={800}>
          This page does not exist
        </Title>
        <Text c="ink.6">
          It may have moved. The guide and everything else start from the home page.
        </Text>
        <Button component={Link} href="/" radius="xl">
          Go to the home page
        </Button>
      </Stack>
    </Container>
  )
}

export function App() {
  const path = usePath().replace(/\/+$/, '') || '/'
  usePageMeta(metaFor(path), path)
  if (path === '/guide') return <Guide />
  const Page = PAGES[path]
  const article = articleFromPath(path)
  const lang = langFromPath(path)
  return (
    <SiteLayout>
      {Page ? (
        <Page />
      ) : article ? (
        <ArticlePage key={path} article={article} lang={lang} />
      ) : isBlogIndex(path) ? (
        <Blog lang={lang} />
      ) : (
        <NotFound />
      )}
    </SiteLayout>
  )
}
