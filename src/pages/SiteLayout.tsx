import type { ReactNode } from 'react'
import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Menu,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconArrowRight, IconCheck, IconLanguage } from '@tabler/icons-react'
import { Link } from '../lib/router'
import { usePath } from '../lib/nav'
import { LogoMark, Wordmark } from '../components/Logo'
import { SITE } from '../data/site'
import { LANGS, UI, blogPath, langFromPath, type Lang } from '../data/i18n'
import { isBlogIndex } from '../data/seo'

function useNav() {
  const path = usePath()
  const lang = langFromPath(path)
  const { nav } = UI[lang]
  return {
    path,
    lang,
    // Only the blog is translated, so it is the only page that keeps its language.
    nav: [
      { href: '/guide', label: nav.guide },
      { href: '/food', label: nav.food },
      { href: blogPath(lang), label: nav.blog },
      { href: '/about', label: nav.about },
      { href: '/contact', label: nav.contact },
    ],
    // /fr/blog/x -> x, so the switcher can link to the same article in another language
    blogSlug: isBlogIndex(path) ? '' : path.match(/\/blog\/([^/]+)$/)?.[1],
  }
}

/** Switches the blog between languages. Plain links: each language is its own page. */
function LanguageMenu({ lang, slug }: { lang: Lang; slug: string }) {
  return (
    <Menu position="bottom-end" shadow="md" radius="md">
      <Menu.Target>
        <Button
          variant="default"
          radius="xl"
          size="compact-md"
          leftSection={<IconLanguage size={16} />}
          aria-label={UI[lang].language}
        >
          {lang.toUpperCase()}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {LANGS.map((l) => (
          <Menu.Item
            key={l}
            component="a"
            href={blogPath(l, slug || undefined)}
            hrefLang={l}
            lang={l}
            rightSection={l === lang ? <IconCheck size={14} /> : null}
          >
            {UI[l].name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

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
  const { path, lang, nav, blogSlug } = useNav()
  const ui = UI[lang]
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
            <Group gap="sm" wrap="nowrap">
              {blogSlug !== undefined && <LanguageMenu lang={lang} slug={blogSlug} />}
              <Burger
                opened={menu}
                onClick={toggle}
                aria-label={menu ? 'Close menu' : 'Open menu'}
              />
            </Group>
          ) : (
            <Group component="nav" aria-label="Main" gap={28} wrap="nowrap">
              {nav.slice(1).map((item) => (
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
                {ui.openGuide}
              </Button>
              {blogSlug !== undefined && <LanguageMenu lang={lang} slug={blogSlug} />}
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
          {nav.map((item) => (
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
  const { lang, nav } = useNav()
  const ui = UI[lang]
  return (
    <Box component="footer" bg="ink.9" c="gray.4" mt={96} py={56}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={40}>
          <Stack gap="xs">
            <Text c="white" fw={700}>
              {SITE.name}
            </Text>
            <Text size="sm">{ui.footerTagline}</Text>
          </Stack>
          <Stack gap={8}>
            <Text c="white" fw={700} size="sm">
              {ui.explore}
            </Text>
            {nav.map((item) => (
              <Anchor key={item.href} component={Link} href={item.href} c="gray.3" size="sm">
                {item.label}
              </Anchor>
            ))}
          </Stack>
          <Stack gap={8}>
            <Text c="white" fw={700} size="sm">
              {ui.legal}
            </Text>
            {LEGAL.map((item) => (
              <Anchor key={item.href} component={Link} href={item.href} c="gray.3" size="sm">
                {item.label}
              </Anchor>
            ))}
            <Anchor href={SITE.repo} target="_blank" rel="noopener noreferrer" c="gray.3" size="sm">
              {ui.sourceCode}
            </Anchor>
          </Stack>
        </SimpleGrid>
        <Text size="xs" mt={40} pt={24} style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}>
          {ui.footerDisclaimer}
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
