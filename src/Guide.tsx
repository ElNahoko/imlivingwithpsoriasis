import { useEffect, useState } from 'react'
import { Anchor, Box, Group, Kbd, Modal, Paper, Stack, Text } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useProgress } from '@react-three/drei'
import { BodyScene } from './components/BodyScene'
import { TopBar } from './components/TopBar'
import { NavRail } from './components/NavRail'
import { SectionPanel } from './components/SectionPanel'
import { Tour } from './components/Tour'
import { LogoMark, Wordmark } from './components/Logo'
import { useStore } from './store'

const CONTROLS: [string, string][] = [
  ['Rotate the body', 'drag'],
  ['Zoom in and out', 'scroll or pinch'],
  ['Learn about a site', 'click a plaque'],
  ['Reset the view', 'R'],
  ['Close a panel', 'Esc'],
]

function LoadingVeil() {
  const { active } = useProgress()
  return (
    <Box
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'grid',
        placeItems: 'center',
        background: '#F4F7FA',
        opacity: active ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity .8s',
      }}
    >
      <Stack align="center" gap="sm">
        <LogoMark size={64} />
        <Wordmark size={26} />
        <Text c="dimmed" size="sm">
          125 million of us. You are not alone.
        </Text>
      </Stack>
    </Box>
  )
}

/** The full-screen 3D guide at /guide. */
export function Guide() {
  const compact = useMediaQuery('(max-width: 900px)') ?? false
  const [helpOpen, help] = useDisclosure(false)
  const [tourDismissed, setTourDismissed] = useState(false)
  const section = useStore((s) => s.section)
  const closePanel = useStore((s) => s.closePanel)
  const selectSite = useStore((s) => s.selectSite)
  const setTourVisible = useStore((s) => s.setTourVisible)

  useEffect(() => {
    document.body.classList.add('guide')
    return () => document.body.classList.remove('guide')
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === 'Escape') closePanel()
      if (e.key.toLowerCase() === 'r') selectSite(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closePanel, selectSite])

  return (
    <>
      <BodyScene compact={compact} />
      <div className="grid-backdrop" />
      <LoadingVeil />

      <TopBar
        compact={compact}
        onHelp={help.open}
        onTour={() => {
          setTourVisible(true)
          setTourDismissed(false)
        }}
      />
      <NavRail compact={compact} />
      <SectionPanel compact={compact} />
      {/* On a phone the panel covers the guide, so it steps aside. */}
      <Tour compact={compact} hidden={tourDismissed || (compact && !!section)} />

      {!compact && !section && (
        <Paper
          withBorder
          px="md"
          py={8}
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 24,
            zIndex: 15,
            borderRadius: 999,
            background: 'rgba(255,255,255,.84)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Group gap="lg">
            <Text size="sm" c="dimmed">
              <Text span fw={600} c="ink.9" inherit>
                Drag
              </Text>{' '}
              to rotate
            </Text>
            <Text size="sm" c="dimmed">
              <Text span fw={600} c="ink.9" inherit>
                Scroll
              </Text>{' '}
              to zoom
            </Text>
            <Text size="sm" c="dimmed">
              <Text span fw={600} c="ink.9" inherit>
                Click a plaque
              </Text>{' '}
              to learn about that site
            </Text>
          </Group>
        </Paper>
      )}

      <Modal
        opened={helpOpen}
        onClose={help.close}
        title="Moving around the body"
        radius="lg"
        centered
      >
        <Stack gap="sm">
          {CONTROLS.map(([what, how]) => (
            <Group key={what} justify="space-between">
              <Text size="sm" c="dimmed">
                {what}
              </Text>
              <Kbd>{how}</Kbd>
            </Group>
          ))}
          <Text size="xs" c="dimmed" mt="sm">
            Body model:{' '}
            <Anchor
              href="http://www.makehumancommunity.org/"
              target="_blank"
              rel="noopener noreferrer"
              inherit
            >
              MakeHuman
            </Anchor>{' '}
            base mesh, CC0. This app is an educational guide and not medical advice.
          </Text>
        </Stack>
      </Modal>
    </>
  )
}
