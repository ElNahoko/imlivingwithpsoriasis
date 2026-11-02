import { Button, Container, Stack, Text, Title } from '@mantine/core'
import { Guide } from './Guide'
import { Link } from './lib/router'
import { usePageMeta, usePath } from './lib/nav'
import { articleFromPath, metaFor } from './data/seo'
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
  '/blog': Blog,
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
  return (
    <SiteLayout>
      {Page ? <Page /> : article ? <ArticlePage article={article} /> : <NotFound />}
    </SiteLayout>
  )
}
