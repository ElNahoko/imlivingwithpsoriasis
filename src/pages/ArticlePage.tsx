import { Anchor, Box, Button, Card, Container, List, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import { ARTICLES, formatDate, parseBody, readingMinutes, type Article } from '../data/articles'
import type { SectionId } from '../sections/registry'
import { Link } from '../lib/router'
import { useStore } from '../store'
import { ArticleCard } from './Blog'

export function ArticlePage({ article }: { article: Article }) {
  const openSection = useStore((s) => s.openSection)
  const related = ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug,
  ).slice(0, 3)

  return (
    <Box component="article">
      <Box bg="ink.0" py={{ base: 40, md: 64 }} mb={{ base: 32, md: 48 }}>
        <Container size="sm">
          <Anchor component={Link} href="/blog" size="sm" fw={600}>
            Blog
          </Anchor>
          <Text span size="sm" c="ink.5">
            {' / '}
            {article.category}
          </Text>
          <Title
            order={1}
            fz={{ base: 32, md: 44 }}
            fw={800}
            lh={1.1}
            mt="sm"
            style={{ letterSpacing: '-0.03em' }}
          >
            {article.title}
          </Title>
          <Text fz={{ base: 17, md: 19 }} c="ink.6" mt="md">
            {article.description}
          </Text>
          <Text size="sm" c="ink.5" mt="md">
            <time dateTime={article.date}>{formatDate(article.date)}</time> ·{' '}
            {readingMinutes(article)} min read
          </Text>
        </Container>
      </Box>

      <Container size="sm">
        <Stack gap="lg">
          {parseBody(article.body).map((block, i) =>
            block.type === 'h2' ? (
              <Title key={i} order={2} fz={{ base: 22, md: 26 }} fw={800} mt="md">
                {block.text}
              </Title>
            ) : block.type === 'ul' ? (
              <List key={i} spacing={8} fz={18} lh={1.6}>
                {block.items.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            ) : (
              <Text key={i} fz={18} lh={1.75}>
                {block.text}
              </Text>
            ),
          )}

          {article.guide && (
            <Card radius="lg" padding="xl" bg="brand.0" withBorder={false} mt="md">
              <Text fw={800} fz={19}>
                Go deeper in the 3D guide
              </Text>
              <Button
                component={Link}
                href="/guide"
                onClick={() => openSection(article.guide as SectionId)}
                radius="xl"
                mt="sm"
                w="fit-content"
                rightSection={<IconArrowRight size={16} />}
              >
                {article.guideLabel}
              </Button>
            </Card>
          )}

          <Box mt="md">
            <Title order={2} fz={18} fw={800} mb="xs">
              Sources
            </Title>
            <List spacing={6} size="sm">
              {article.refs.map((ref) => (
                <List.Item key={ref.url}>
                  <Anchor href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.label}
                  </Anchor>
                </List.Item>
              ))}
            </List>
            <Text size="sm" c="ink.5" mt="md">
              General information, not medical advice. Talk to your doctor or dermatologist before
              changing your treatment.
            </Text>
          </Box>
        </Stack>
      </Container>

      {related.length > 0 && (
        <Container size="lg" mt={72}>
          <Title order={2} fz={26} fw={800} mb="lg">
            More on {article.category.toLowerCase()}
          </Title>
          <Box
            style={{
              display: 'grid',
              gap: 20,
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            }}
          >
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </Box>
        </Container>
      )}
    </Box>
  )
}
