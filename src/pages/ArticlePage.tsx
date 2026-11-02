import {
  Anchor,
  Box,
  Button,
  Card,
  Container,
  CopyButton,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { IconArrowRight, IconCheck, IconLink } from '@tabler/icons-react'
import { ARTICLES, formatDate, parseBody, readingMinutes, type Article } from '../data/articles'
import { UI, blogPath, localize, type Lang } from '../data/i18n'
import type { SectionId } from '../sections/registry'
import { Link } from '../lib/router'
import { useStore } from '../store'
import { ArticleCard, Cover } from './Blog'

const headingId = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9æøå]+/g, '-')
    .replace(/^-|-$/g, '')

export function ArticlePage({ article, lang }: { article: Article; lang: Lang }) {
  const ui = UI[lang]
  const openSection = useStore((s) => s.openSection)
  const blocks = parseBody(article.body)
  const headings = blocks.flatMap((b) => (b.type === 'h2' ? [b.text] : []))
  // Same topic first, then the rest, so every article ends with three to read next.
  const related = [
    ...ARTICLES.filter((a) => a.category === article.category),
    ...ARTICLES.filter((a) => a.category !== article.category),
  ]
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map((a) => localize(a, lang))

  return (
    <Box component="article">
      <div className="read-progress" aria-hidden />

      <Container size="md" pt={{ base: 32, md: 56 }}>
        <Text size="sm" fw={600}>
          <Anchor component={Link} href={blogPath(lang)}>
            {ui.blogEyebrow}
          </Anchor>
          <Text span c="ink.5">
            {' / '}
            {ui.categories[article.category]}
          </Text>
        </Text>
        <Title
          order={1}
          fz={{ base: 32, md: 50 }}
          fw={800}
          lh={1.08}
          mt="sm"
          style={{ letterSpacing: '-0.03em' }}
        >
          {article.title}
        </Title>
        <Text fz={{ base: 18, md: 21 }} c="ink.6" mt="md" lh={1.5}>
          {article.description}
        </Text>
        <Text size="sm" c="ink.5" mt="md" fw={500}>
          <time dateTime={article.date}>{formatDate(article.date, ui.locale)}</time> ·{' '}
          {ui.minRead(readingMinutes(article))}
        </Text>
      </Container>

      {article.image && (
        <Container size="lg" mt={{ base: 28, md: 40 }}>
          <Box component="figure" m={0}>
            <Box className="cover-frame article-cover">
              <Cover article={article} large eager />
            </Box>
            <Text component="figcaption" size="xs" c="ink.5" mt={8}>
              {ui.photo}: {article.image.author},{' '}
              {article.image.licenseUrl ? (
                <Anchor href={article.image.licenseUrl} target="_blank" rel="noopener" inherit>
                  {article.image.license}
                </Anchor>
              ) : (
                article.image.license
              )}
              , via{' '}
              <Anchor href={article.image.source} target="_blank" rel="noopener" inherit>
                Wikimedia Commons
              </Anchor>
            </Text>
          </Box>
        </Container>
      )}

      <Container size="lg" mt={{ base: 32, md: 48 }}>
        <div className="article-layout">
          <Stack gap="lg" className="article-body">
            <Card radius="lg" padding="xl" bg="brand.0" withBorder={false}>
              <Text fw={800} fz={17} mb="sm">
                {ui.takeaways}
              </Text>
              <Stack gap={10}>
                {article.takeaways.map((t) => (
                  <Box key={t} style={{ display: 'flex', gap: 12 }}>
                    <ThemeIcon size={22} radius="xl" mt={2} style={{ flexShrink: 0 }}>
                      <IconCheck size={14} />
                    </ThemeIcon>
                    <Text fz={16} lh={1.55}>
                      {t}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Card>

            {blocks.map((block, i) =>
              block.type === 'h2' ? (
                <Title
                  key={i}
                  id={headingId(block.text)}
                  order={2}
                  fz={{ base: 23, md: 28 }}
                  fw={800}
                  mt="lg"
                  className="article-h2"
                >
                  {block.text}
                </Title>
              ) : block.type === 'ul' ? (
                <List key={i} spacing={10} fz={18} lh={1.65} className="article-list">
                  {block.items.map((item) => (
                    <List.Item key={item}>{item}</List.Item>
                  ))}
                </List>
              ) : (
                <Text
                  key={i}
                  fz={i === 0 ? { base: 19, md: 21 } : 18}
                  lh={1.75}
                  c={i === 0 ? 'ink.9' : undefined}
                  fw={i === 0 ? 500 : undefined}
                >
                  {block.text}
                </Text>
              ),
            )}

            {article.guide && (
              <Card radius="lg" padding="xl" bg="ink.9" c="white" withBorder={false} mt="md">
                <Text fw={800} fz={20}>
                  {ui.goDeeper}
                </Text>
                {ui.guideEnglish && (
                  <Text size="sm" c="gray.4" mt={4}>
                    {ui.guideEnglish}
                  </Text>
                )}
                <Button
                  component={Link}
                  href="/guide"
                  onClick={() => openSection(article.guide as SectionId)}
                  radius="xl"
                  mt="md"
                  w="fit-content"
                  rightSection={<IconArrowRight size={16} />}
                >
                  {article.guideLabel}
                </Button>
              </Card>
            )}

            <Box mt="md" pt="lg" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
              <Title order={2} fz={18} fw={800} mb="xs">
                {ui.sources}
              </Title>
              {ui.sourcesNote && (
                <Text size="sm" c="ink.5" mb="xs">
                  {ui.sourcesNote}
                </Text>
              )}
              <List spacing={6} size="sm" type="ordered">
                {article.refs.map((ref) => (
                  <List.Item key={ref.url}>
                    <Anchor href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.label}
                    </Anchor>
                  </List.Item>
                ))}
              </List>
              <Text size="sm" c="ink.5" mt="md">
                {ui.disclaimer}
              </Text>
            </Box>
          </Stack>

          <Box component="aside" className="article-aside">
            <Text tt="uppercase" fw={700} size="xs" c="ink.5" lts="0.06em" mb="sm">
              {ui.onThisPage}
            </Text>
            <Stack component="nav" gap={10} aria-label={ui.onThisPage}>
              {headings.map((h) => (
                <Anchor key={h} href={`#${headingId(h)}`} c="ink.7" size="sm" lh={1.4}>
                  {h}
                </Anchor>
              ))}
            </Stack>
            <CopyButton value={typeof window === 'undefined' ? '' : window.location.href}>
              {({ copied, copy }) => (
                <Button
                  onClick={copy}
                  variant="light"
                  radius="xl"
                  size="xs"
                  mt="xl"
                  leftSection={copied ? <IconCheck size={14} /> : <IconLink size={14} />}
                >
                  {copied ? ui.copied : ui.share}
                </Button>
              )}
            </CopyButton>
          </Box>
        </div>
      </Container>

      <Container size="lg" mt={80}>
        <Title order={2} fz={26} fw={800} mb="lg">
          {ui.moreOn}
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} lang={lang} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
