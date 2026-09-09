import { useEffect } from 'react'
import { Box, Button, Group, Paper, Stack, Text } from '@mantine/core'
import { useStore } from '../store'
import type { SectionId } from '../sections/registry'

type Step = {
  message: string
  /** what "Show me" does */
  show: () => void
  /** the tour only advances once the person has actually done it */
  done: (s: ReturnType<typeof useStore.getState>) => boolean
}

const open = (id: SectionId) => () => useStore.getState().openSection(id)

export const TOUR: Step[] = [
  {
    message:
      'Hi, I’m Nova. Every red patch on this body is a place psoriasis likes to live. Click one to see what it looks like there and why it happens. Start with the scalp, the most common first sign.',
    show: () => useStore.getState().selectSite('scalp'),
    done: (s) => s.exploredSites.length > 0,
  },
  {
    message:
      'Now the why. “How it works” shows the same skin on two clocks: one rebuilding in 28 days, one in 4.',
    show: open('how'),
    done: (s) => s.visitedSections.includes('how'),
  },
  {
    message:
      'Flares rarely have one cause. In “Flare triggers”, switch on what is true for you this week and watch the risk move.',
    show: open('triggers'),
    done: (s) => s.visitedSections.includes('triggers'),
  },
  {
    message:
      'Stress is the trigger people report most. There is a two-minute breathing exercise waiting in “Stress & skin”.',
    show: open('stress'),
    done: (s) => s.visitedSections.includes('stress'),
  },
  {
    message:
      'Food cannot cure this, but it can calm it. “Food & drink” is organised by category; tap any food to read the reasoning.',
    show: open('food'),
    done: (s) => s.visitedSections.includes('food'),
  },
  {
    message:
      '“Daily habits” is the routine that keeps flares short. Tick what you already do; two habits carry most of the weight.',
    show: open('habits'),
    done: (s) => s.visitedSections.includes('habits'),
  },
  {
    message:
      'You do not need to memorise drug names. In “Treatments”, find the step you are on and read the one above it.',
    show: open('treatments'),
    done: (s) => s.visitedSections.includes('treatments'),
  },
  {
    message:
      'Last one. The “Skin diary” takes twenty seconds a day and turns into the chart your doctor actually wants to see.',
    show: open('diary'),
    done: (s) => s.visitedSections.includes('diary'),
  },
]

export function Tour({ compact, hidden }: { compact: boolean; hidden: boolean }) {
  const step = useStore((s) => s.tourStep)
  const visible = useStore((s) => s.tourVisible)
  const setStep = useStore((s) => s.setTourStep)
  const setVisible = useStore((s) => s.setTourVisible)

  // Advance on its own when the person does the thing, rather than nagging.
  useEffect(
    () =>
      useStore.subscribe((state) => {
        const current = TOUR[useStore.getState().tourStep]
        if (current && current.done(state)) setStep(useStore.getState().tourStep + 1)
      }),
    [setStep],
  )

  if (!visible || hidden) return null
  const done = step >= TOUR.length
  const current = TOUR[step]

  return (
    <Paper
      withBorder
      p="md"
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: compact ? 84 : 24,
        width: compact ? 'calc(100vw - 20px)' : 'min(520px, calc(100vw - 44px))',
        zIndex: 26,
        background: 'rgba(255,255,255,.97)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Group wrap="nowrap" align="flex-start" gap="md">
        <Box
          style={{
            width: 44,
            height: 44,
            flex: 'none',
            borderRadius: 14,
            background: 'linear-gradient(135deg, var(--mantine-color-teal-6), var(--mantine-color-green-6))',
            boxShadow: '0 8px 20px rgba(27,138,90,.28)',
          }}
        />
        <Stack gap={6} style={{ flex: 1 }}>
          <Group justify="space-between" wrap="nowrap">
            <Text fw={600} ff="Lexend" size="sm" c="green.7">
              Nova, your guide
            </Text>
            <Text size="sm" c="dimmed">
              {done ? 'Tour complete' : `Step ${step + 1} of ${TOUR.length}`}
            </Text>
          </Group>
          <Text size="md" lh={1.45}>
            {done
              ? 'That is the whole tour. Everything stays here: come back to the diary whenever you like, and use “Doctor visit prep” before your next appointment.'
              : current.message}
          </Text>
          <Group gap="xs">
            {!done && (
              <Button size="xs" onClick={current.show}>
                Show me
              </Button>
            )}
            <Button
              size="xs"
              variant="default"
              onClick={() => (done ? setVisible(false) : setStep(step + 1))}
            >
              {done ? 'Close' : 'Next step'}
            </Button>
            <Button size="xs" variant="subtle" color="gray" ml="auto" onClick={() => setVisible(false)}>
              {done ? 'Done' : 'Skip the tour'}
            </Button>
          </Group>
          {!compact && (
            <Group gap={4} mt={4}>
              {TOUR.map((_, i) => (
                <Box
                  key={i}
                  style={{
                    height: 3,
                    flex: 1,
                    borderRadius: 2,
                    background:
                      i < step ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-gray-3)',
                  }}
                />
              ))}
            </Group>
          )}
        </Stack>
      </Group>
    </Paper>
  )
}
