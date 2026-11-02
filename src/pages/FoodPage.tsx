import { Anchor, Container, Stack, Text, Title } from '@mantine/core'
import { Food } from '../sections/Food'
import { ARTICLES } from '../data/articles'
import { Link } from '../lib/router'
import { PageHeader } from './SiteLayout'

const FOOD_ARTICLES = ARTICLES.filter((a) => a.category === 'Food & lifestyle')

export function FoodPage() {
  return (
    <>
      <PageHeader eyebrow="Food guide" title="What to eat with psoriasis">
        Over 60 everyday foods rated for psoriasis, with the reason for each.
      </PageHeader>
      <Container size="md">
        <Food />
        <Stack gap="sm" mt={56}>
          <Title order={2} fz={24} fw={800}>
            Read more about food and lifestyle
          </Title>
          {FOOD_ARTICLES.map((a) => (
            <Anchor key={a.slug} component={Link} href={`/blog/${a.slug}`} fw={600} fz={17}>
              {a.title}
            </Anchor>
          ))}
          <Text size="sm" c="ink.5" mt="sm">
            Based on the US National Psoriasis Foundation&apos;s dietary recommendations and
            research on the Mediterranean diet. General information, not medical advice.
          </Text>
        </Stack>
      </Container>
    </>
  )
}
