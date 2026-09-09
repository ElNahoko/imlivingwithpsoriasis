import { useEffect } from 'react'
import { Box, Button, Group, Paper, Stack, Text } from '@mantine/core'
import { useStore } from '../store'
import { TOUR } from '../lib/tour'

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
            background:
              'linear-gradient(135deg, var(--mantine-color-teal-6), var(--mantine-color-green-6))',
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
            <Button
              size="xs"
              variant="subtle"
              color="gray"
              ml="auto"
              onClick={() => setVisible(false)}
            >
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
