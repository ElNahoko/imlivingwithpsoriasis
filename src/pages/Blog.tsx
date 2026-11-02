import { useState } from 'react'
import { Card, Chip, Container, Group, SimpleGrid, Text, Title } from '@mantine/core'
import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  formatDate,
  readingMinutes,
  type Article,
} from '../data/articles'
import { Link } from '../lib/router'
import { PageHeader } from './SiteLayout'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card
      component={Link}
      href={`/blog/${article.slug}`}
      radius="lg"
      padding="xl"
      className="article-card"
    >
      <Text tt="uppercase" fw={700} size="xs" c="brand.7" lts="0.06em">
        {article.category}
      </Text>
      <Title order={3} fz={20} fw={800} mt={8} lh={1.25}>
        {article.title}
      </Title>
      <Text c="ink.6" size="sm" mt="xs" lineClamp={3}>
        {article.description}
      </Text>
      <Text c="ink.5" size="xs" mt="md">
        {formatDate(article.date)} · {readingMinutes(article)} min read
      </Text>
    </Card>
  )
}

export function Blog() {
  const [category, setCategory] = useState('All')
  const articles = ARTICLES.filter((a) => category === 'All' || a.category === category)

  return (
    <>
      <PageHeader eyebrow="Blog" title="Psoriasis, explained plainly">
        {ARTICLES.length} articles on types, treatments, skin care, food and the emotional side of
        psoriasis. Every one lists its sources.
      </PageHeader>

      <Container size="lg">
        <Chip.Group value={category} onChange={(v) => setCategory(v as string)}>
          <Group gap="xs" mb="xl">
            {['All', ...ARTICLE_CATEGORIES].map((c) => (
              <Chip key={c} value={c} radius="xl" size="md">
                {c}
              </Chip>
            ))}
          </Group>
        </Chip.Group>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
