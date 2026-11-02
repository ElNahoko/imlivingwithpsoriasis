import type { ReactNode } from 'react'
import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconArrowRight } from '@tabler/icons-react'
import { Link } from '../lib/router'
import { usePath } from '../lib/nav'
import { LogoMark, Wordmark } from '../components/Logo'
import { SITE } from '../data/site'

const NAV = [
  { href: '/guide', label: '3D body guide' },
  { href: '/food', label: 'Food' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const LEGAL = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/medical-disclaimer', label: 'Medical disclaimer' },
]

/** The title block every inner page opens with. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <Box bg="ink.0" py={{ base: 40, md: 64 }} mb={{ base: 32, md: 48 }}>
      <Container size="md">
        <Text tt="uppercase" fw={700} size="sm" c="brand.7" lts="0.06em">
          {eyebrow}
        </Text>
        <Title
          order={1}
          fz={{ base: 34, md: 46 }}
          fw={800}
          mt={6}
          style={{ letterSpacing: '-0.03em' }}
        >
          {title}
        </Title>
        {children && (
          <Text fz={{ base: 17, md: 19 }} c="ink.6" mt="sm" maw={640}>
            {children}
          </Text>
        )}
      </Container>
    </Box>
  )
}

function Header() {
  const path = usePath()
  const compact = useMediaQuery('(max-width: 760px)') ?? false
  const [menu, { toggle, close }] = useDisclosure(false)

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--mantine-color-gray-2)',
      }}
    >
      <Container size="lg" h={compact ? 64 : 72}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Group gap={10} wrap="nowrap">
              <LogoMark size={compact ? 34 : 38} />
              <Wordmark size={compact ? 15 : 17} />
            </Group>
          </Link>

          {compact ? (
            <Burger opened={menu} onClick={toggle} aria-label={menu ? 'Close menu' : 'Open menu'} />
          ) : (
            <Group component="nav" aria-label="Main" gap={28} wrap="nowrap">
              {NAV.slice(1).map((item) => (
                <Anchor
                  key={item.href}
                  component={Link}
                  href={item.href}
                  c={path === item.href ? 'brand.7' : 'ink.9'}
                  fw={path === item.href ? 700 : 500}
                  aria-current={path === item.href ? 'page' : undefined}
                  underline="never"
                >
                  {item.label}
                </Anchor>
              ))}
              <Button
                component={Link}
                href="/guide"
                radius="xl"
                rightSection={<IconArrowRight size={16} />}
              >
                Open the 3D guide
              </Button>
            </Group>
          )}
        </Group>
      </Container>

      <Drawer
        opened={menu}
        onClose={close}
        position="top"
        size="auto"
        withCloseButton={false}
        offset={0}
        padding="md"
        styles={{ inner: { top: 64 } }}
      >
        <Stack component="nav" aria-label="Main" gap={0}>
          {NAV.map((item) => (
            <Anchor
              key={item.href}
              component={Link}
              href={item.href}
              onClick={close}
              c="ink.9"
              fw={600}
              fz={19}
              py={14}
              underline="never"
              aria-current={path === item.href ? 'page' : undefined}
              style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
            >
              {item.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </Box>
  )
}

function Footer() {
  return (
    <Box component="footer" bg="ink.9" c="gray.4" mt={96} py={56}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={40}>
          <Stack gap="xs">
            <Text c="white" fw={700}>
              {SITE.name}
            </Text>
            <Text size="sm">
              A free, open-source guide for the 125 million people who live with psoriasis.
            </Text>
          </Stack>
          <Stack gap={8}>
            <Text c="white" fw={700} size="sm">
              Explore
            </Text>
            {NAV.map((item) => (
              <Anchor key={item.href} component={Link} href={item.href} c="gray.3" size="sm">
                {item.label}
              </Anchor>
            ))}
          </Stack>
          <Stack gap={8}>
            <Text c="white" fw={700} size="sm">
              Legal
            </Text>
            {LEGAL.map((item) => (
              <Anchor key={item.href} component={Link} href={item.href} c="gray.3" size="sm">
                {item.label}
              </Anchor>
            ))}
            <Anchor href={SITE.repo} target="_blank" rel="noopener noreferrer" c="gray.3" size="sm">
              Source code
            </Anchor>
          </Stack>
        </SimpleGrid>
        <Text size="xs" mt={40} pt={24} style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}>
          This site is for education only and is not medical advice. Always talk to your doctor or
          dermatologist. In an emergency, call your local emergency number.
        </Text>
      </Container>
    </Box>
  )
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
