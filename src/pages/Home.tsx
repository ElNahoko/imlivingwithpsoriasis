import { useEffect } from 'react'
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconArrowRight,
  IconHandClick,
  IconLock,
  IconBook2,
  IconStethoscope,
} from '@tabler/icons-react'
import { BodyScene } from '../components/BodyScene'
import { GROUPS, SECTIONS, type SectionGroup } from '../sections/registry'
import { SITES } from '../data/sites'
import { TRIGGERS } from '../data/triggers'
import { FOODS } from '../data/foods'
import { Link } from '../lib/router'
import { navigate } from '../lib/nav'
import { useStore } from '../store'
import { ARTICLES } from '../data/articles'
import { ArticleCard } from './Blog'

const GROUP_INTRO: Record<SectionGroup, string> = {
  Understand: 'What psoriasis is, where it shows up, and why.',
  Manage: 'Triggers, food, daily habits, treatments and a flare plan.',
  Live: 'A skin diary, doctor visit prep, and the myths worth dropping.',
  About: 'Where every figure in the guide comes from.',
}

const FEATURED = ['what-is-psoriasis', 'psoriasis-diet-evidence', 'stress-and-flares'].map((slug) =>
  ARTICLES.find((a) => a.slug === slug)!,
)

const STATS: [string, string][] = [
  ['125 million', 'people live with psoriasis worldwide'],
  [String(SITES.length), 'body areas explained in 3D'],
  [String(TRIGGERS.length), 'flare triggers, weighted'],
  [String(FOODS.length), 'foods reviewed, with reasons'],
]

const PROMISES = [
  {
    icon: IconLock,
    title: 'Private by design',
    text: 'No account. Your diary and habits stay in your browser and never leave it.',
  },
  {
    icon: IconBook2,
    title: 'Every figure sourced',
    text: 'Clinical guidance and peer-reviewed research, listed in Sources & credits.',
  },
  {
    icon: IconStethoscope,
    title: 'Made for your next visit',
    text: 'Turn what you log into a prep sheet to take to your dermatologist.',
  },
]

export function Home() {
  const compact = useMediaQuery('(max-width: 900px)') ?? false
  const closePanel = useStore((s) => s.closePanel)
  const openSection = useStore((s) => s.openSection)

  // Coming back from the guide, the hero starts from the whole body again.
  useEffect(() => closePanel(), [closePanel])

  return (
    <>
      <Container size="lg" pt={{ base: 32, md: 64 }}>
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing={{ base: 28, md: 56 }}
          style={{ alignItems: 'center' }}
        >
          <Stack gap="lg">
            <Badge variant="light" size="lg" radius="xl" w="fit-content" tt="none" fw={600}>
              Free, private, evidence-based
            </Badge>
            <Title
              order={1}
              fz={{ base: 38, md: 56 }}
              lh={1.05}
              fw={800}
              style={{ letterSpacing: '-0.03em' }}
            >
              Understand your psoriasis, one part of the body at a time.
            </Title>
            <Text fz={{ base: 17, md: 19 }} c="ink.6" maw={520}>
              Spin a real 3D body, tap a plaque, and get plain answers: what it looks like there,
              why it happens, what helps, and when to see a doctor.
            </Text>
            <Group gap="sm">
              <Button
                component={Link}
                href="/guide"
                size="lg"
                radius="xl"
                rightSection={<IconArrowRight size={18} />}
              >
                Explore the 3D body
              </Button>
              <Button component={Link} href="/about" size="lg" radius="xl" variant="default">
                Why I built this
              </Button>
            </Group>
          </Stack>

          <Box
            pos="relative"
            h={{ base: 440, md: 600 }}
            style={{
              borderRadius: 28,
              overflow: 'hidden',
              background:
                'radial-gradient(90% 70% at 50% 45%, #FFFFFF 0%, #F4F6F8 60%, #E6EDF4 100%)',
              border: '1px solid var(--mantine-color-gray-2)',
            }}
          >
            <BodyScene compact={compact} embedded onSelect={() => navigate('/guide')} />
            <Group
              gap={8}
              wrap="nowrap"
              px={14}
              py={8}
              style={{
                position: 'absolute',
                left: 16,
                bottom: 16,
                borderRadius: 999,
                background: 'rgba(255,255,255,.92)',
                border: '1px solid var(--mantine-color-gray-2)',
                pointerEvents: 'none',
              }}
            >
              <IconHandClick size={18} color="var(--mantine-color-brand-6)" />
              <Text size="sm" fw={600}>
                Tap a plaque to open it in the guide
              </Text>
            </Group>
          </Box>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md" mt={{ base: 40, md: 64 }}>
          {STATS.map(([value, label]) => (
            <Card key={label} radius="lg" padding="lg" bg="ink.0" withBorder={false}>
              <Text
                fz={{ base: 26, md: 32 }}
                fw={800}
                c="brand.7"
                style={{ letterSpacing: '-0.02em' }}
              >
                {value}
              </Text>
              <Text size="sm" c="ink.6">
                {label}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      <Container size="lg" mt={{ base: 64, md: 96 }}>
        <Stack gap={8} mb="xl" maw={640}>
          <Text tt="uppercase" fw={700} size="sm" c="brand.7" lts="0.06em">
            Inside the guide
          </Text>
          <Title order={2} fz={{ base: 28, md: 36 }} fw={800} style={{ letterSpacing: '-0.02em' }}>
            Everything in one place, built around your body
          </Title>
        </Stack>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {GROUPS.filter((g) => g !== 'About').map((group) => (
            <Card key={group} radius="lg" padding="xl">
              <Text fw={800} fz={20}>
                {group}
              </Text>
              <Text c="ink.6" size="sm" mt={4} mb="md">
                {GROUP_INTRO[group]}
              </Text>
              <Stack gap={4}>
                {SECTIONS.filter((s) => s.group === group).map(({ id, title, icon: Icon }) => (
                  <UnstyledButton
                    key={id}
                    component={Link}
                    href="/guide"
                    onClick={() => openSection(id)}
                    py={10}
                    px={12}
                    style={{ borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}
                    className="guide-link"
                  >
                    <ThemeIcon variant="light" size={36} radius="md">
                      <Icon size={20} stroke={1.8} />
                    </ThemeIcon>
                    <Text fw={600} style={{ flex: 1 }}>
                      {title}
                    </Text>
                    <IconArrowRight size={16} color="var(--mantine-color-ink-5)" />
                  </UnstyledButton>
                ))}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      <Container size="lg" mt={{ base: 64, md: 96 }}>
        <Group justify="space-between" align="flex-end" mb="xl">
          <Stack gap={8} maw={640}>
            <Text tt="uppercase" fw={700} size="sm" c="brand.7" lts="0.06em">
              From the blog
            </Text>
            <Title
              order={2}
              fz={{ base: 28, md: 36 }}
              fw={800}
              style={{ letterSpacing: '-0.02em' }}
            >
              Plain answers, with sources
            </Title>
          </Stack>
          <Group gap="sm">
            <Button component={Link} href="/food" variant="default" radius="xl">
              Food guide
            </Button>
            <Button
              component={Link}
              href="/blog"
              variant="light"
              radius="xl"
              rightSection={<IconArrowRight size={16} />}
            >
              All {ARTICLES.length} articles
            </Button>
          </Group>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {FEATURED.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </SimpleGrid>
      </Container>

      <Container size="lg" mt={{ base: 64, md: 96 }}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <Group key={title} align="flex-start" wrap="nowrap" gap="md">
              <ThemeIcon size={48} radius="md">
                <Icon size={24} />
              </ThemeIcon>
              <Box>
                <Text fw={700} fz={18}>
                  {title}
                </Text>
                <Text c="ink.6" size="sm" mt={4}>
                  {text}
                </Text>
              </Box>
            </Group>
          ))}
        </SimpleGrid>
      </Container>

      <Container size="lg" mt={{ base: 64, md: 96 }}>
        <Card radius={28} padding={0} bg="brand.6" withBorder={false}>
          <Stack align="center" ta="center" gap="md" px="lg" py={{ base: 40, md: 64 }}>
            <Title order={2} c="white" fz={{ base: 26, md: 34 }} fw={800} maw={620}>
              You are one of 125 million. Start with the part of you that bothers you most.
            </Title>
            <Button
              component={Link}
              href="/guide"
              size="lg"
              radius="xl"
              variant="white"
              rightSection={<IconArrowRight size={18} />}
            >
              Open the 3D body guide
            </Button>
          </Stack>
        </Card>
      </Container>
    </>
  )
}
