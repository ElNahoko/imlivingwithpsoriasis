import { useState } from 'react'
import { Box, Card, Chip, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  formatDate,
  readingMinutes,
  type Article,
} from '../data/articles'
import { UI, blogPath, localize, type Lang } from '../data/i18n'
import { Link } from '../lib/router'
import { PageHeader } from './SiteLayout'

/** The article's cover photo; cards use the 800px copy. */
export function Cover({
  article,
  large,
  eager,
}: {
  article: Article
  large?: boolean
  eager?: boolean
}) {
  if (!article.image) return null
  const { alt, width, height } = article.image
  return (
    <img
      className="cover"
      src={`/blog/${article.slug}${large ? '' : '-800'}.jpg`}
      srcSet={`/blog/${article.slug}-800.jpg 800w, /blog/${article.slug}.jpg ${width}w`}
      sizes={large ? '(min-width: 1100px) 1100px, 100vw' : '(min-width: 900px) 400px, 100vw'}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

function Meta({ article, lang }: { article: Article; lang: Lang }) {
  return (
    <Text c="ink.5" size="xs" fw={500}>
      {formatDate(article.date, UI[lang].locale)} · {UI[lang].minRead(readingMinutes(article))}
    </Text>
  )
}

function Category({ article, lang }: { article: Article; lang: Lang }) {
  return (
    <Text tt="uppercase" fw={700} size="xs" c="brand.7" lts="0.06em">
      {UI[lang].categories[article.category]}
    </Text>
  )
}

export function ArticleCard({ article, lang = 'en' }: { article: Article; lang?: Lang }) {
  return (
    <Card
      component={Link}
      href={blogPath(lang, article.slug)}
      radius="lg"
      padding="lg"
      className="article-card"
    >
      <Card.Section className="cover-frame" style={{ aspectRatio: '16 / 9' }}>
        <Cover article={article} />
      </Card.Section>
      <Stack gap={8} mt="md" style={{ flex: 1 }}>
        <Category article={article} lang={lang} />
        <Title order={3} fz={19} fw={800} lh={1.3}>
          {article.title}
        </Title>
        <Text c="ink.6" size="sm" lineClamp={3}>
          {article.description}
        </Text>
      </Stack>
      <Box mt="md">
        <Meta article={article} lang={lang} />
      </Box>
    </Card>
  )
}

function FeaturedCard({ article, lang }: { article: Article; lang: Lang }) {
  return (
    <Card
      component={Link}
      href={blogPath(lang, article.slug)}
      radius="xl"
      padding={0}
      className="article-card"
      mb={40}
    >
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
        <Box className="cover-frame" mih={{ base: 220, md: 380 }}>
          <Cover article={article} large eager />
        </Box>
        <Stack gap="sm" p={{ base: 'lg', md: 40 }} justify="center">
          <Group gap="xs">
            <Text size="xs" fw={700} c="white" bg="brand.6" px={10} py={3} className="pill">
              {UI[lang].featured}
            </Text>
            <Category article={article} lang={lang} />
          </Group>
          <Title order={2} fz={{ base: 26, md: 34 }} fw={800} lh={1.15}>
            {article.title}
          </Title>
          <Text c="ink.6" fz={{ base: 16, md: 18 }}>
            {article.description}
          </Text>
          <Meta article={article} lang={lang} />
        </Stack>
      </SimpleGrid>
    </Card>
  )
}

export function Blog({ lang }: { lang: Lang }) {
  const ui = UI[lang]
  const [category, setCategory] = useState('All')
  const articles = ARTICLES.map((a) => localize(a, lang)).filter(
    (a) => category === 'All' || a.category === category,
  )
  const [featured, ...rest] = articles

  return (
    <>
      <PageHeader eyebrow={ui.blogEyebrow} title={ui.blogTitle}>
        {ui.blogIntro(ARTICLES.length)}
      </PageHeader>

      <Container size="lg">
        <Chip.Group value={category} onChange={(v) => setCategory(v as string)}>
          <Group gap="xs" mb="xl" className="chip-row">
            {['All', ...ARTICLE_CATEGORIES].map((c) => (
              <Chip key={c} value={c} radius="xl" size="md">
                {c === 'All' ? ui.all : ui.categories[c as Article['category']]}
              </Chip>
            ))}
          </Group>
        </Chip.Group>

        {featured && <FeaturedCard article={featured} lang={lang} />}

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} lang={lang} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
