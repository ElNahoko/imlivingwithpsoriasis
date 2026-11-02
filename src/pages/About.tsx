import { Button, Card, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import { Link } from '../lib/router'
import { SITE } from '../data/site'
import { PageHeader } from './SiteLayout'

const IS = [
  'Plain answers to the questions people actually ask',
  'Free, open source, no account, no ads',
  'Built on clinical guidance, with every source listed',
]

const IS_NOT = [
  'A diagnosis, or a replacement for your dermatologist',
  'A place that sells creams, supplements or cures',
  'A tracker that sends your data anywhere',
]

export function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="Why this exists">
        Psoriasis gets explained badly almost everywhere: a wall of clinical text, or a stock photo
        of an elbow. This is an attempt at something kinder.
      </PageHeader>

      <Container size="md">
        <Stack gap={48}>
          <Stack gap="sm">
            <Title order={2} fz={28} fw={800}>
              My story
            </Title>
            {SITE.story.map((p) => (
              <Text key={p} fz={18} lh={1.7}>
                {p}
              </Text>
            ))}
          </Stack>

          <Card radius="lg" padding="xl" bg="brand.0" withBorder={false}>
            <Text tt="uppercase" fw={700} size="sm" c="brand.7" lts="0.06em">
              Mission
            </Text>
            <Text fz={{ base: 22, md: 26 }} fw={700} lh={1.35} mt={8}>
              A body you can turn around, plaques you can tap, and plain answers: why here, what
              sets it off, what to eat, what to tell your partner, and what to ask your doctor next
              week.
            </Text>
          </Card>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            <Card radius="lg" padding="xl">
              <Title order={3} fz={20} fw={800} mb="sm">
                What this site is
              </Title>
              <Stack gap={8}>
                {IS.map((x) => (
                  <Text key={x} c="ink.7">
                    {x}
                  </Text>
                ))}
              </Stack>
            </Card>
            <Card radius="lg" padding="xl">
              <Title order={3} fz={20} fw={800} mb="sm">
                What it is not
              </Title>
              <Stack gap={8}>
                {IS_NOT.map((x) => (
                  <Text key={x} c="ink.7">
                    {x}
                  </Text>
                ))}
              </Stack>
            </Card>
          </SimpleGrid>

          <Button
            component={Link}
            href="/guide"
            size="lg"
            radius="xl"
            w="fit-content"
            rightSection={<IconArrowRight size={18} />}
          >
            Explore the 3D body guide
          </Button>
        </Stack>
      </Container>
    </>
  )
}
