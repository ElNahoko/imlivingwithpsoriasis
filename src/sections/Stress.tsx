import { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, Group, Stack, Text } from '@mantine/core'
import { STRESS_CHAIN, STRESS_EVIDENCE, STRESS_QUICK } from '../data/clinical'
import { Lede, NumberedFact, Panel, TipList } from '../components/ui'

const PHASES = [
  { label: 'Breathe in', ms: 4000, scale: 1 },
  { label: 'Hold', ms: 1000, scale: 1 },
  { label: 'Breathe out', ms: 6000, scale: 0.62 },
] as const

/** Four seconds in, one hold, six out: a long exhale is what calms the nervous system. */
function BreathingCircle() {
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState(0)
  const [left, setLeft] = useState(120)
  const timer = useRef<number>(0)

  useEffect(() => {
    if (!running) return
    const advance = () => {
      setPhase((p) => p + 1)
      timer.current = window.setTimeout(advance, PHASES[(phase + 1) % 3].ms)
    }
    timer.current = window.setTimeout(advance, PHASES[phase % 3].ms)
    const tick = window.setInterval(() => {
      setLeft((remaining) => {
        if (remaining <= 1) setRunning(false)
        return Math.max(0, remaining - 1)
      })
    }, 1000)
    return () => {
      window.clearTimeout(timer.current)
      window.clearInterval(tick)
    }
  }, [running, phase])

  const current = PHASES[phase % 3]
  return (
    <Card>
      <Stack align="center" gap="xs">
        <Text tt="uppercase" fw={600} size="xs" c="brand.7" lts="0.06em">
          Two minutes
        </Text>
        <Text fw={600} ff="heading" fz="lg">
          Breathe with the circle
        </Text>
        <Text c="dimmed" size="sm" ta="center">
          Four seconds in, one hold, six out. Slow exhalation switches on the calming branch of the
          nervous system. Do it before applying your cream, so the two habits pair up.
        </Text>
        <Box
          style={{
            width: 130,
            height: 130,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            margin: '8px auto',
            background:
              'radial-gradient(circle at 40% 35%, #fff, var(--mantine-color-brand-0) 60%, var(--mantine-color-brand-2))',
            transform: `scale(${running ? current.scale : 0.7})`,
            transition: `transform ${running ? current.ms : 600}ms ease-in-out`,
            color: 'var(--mantine-color-brand-7)',
            fontFamily: 'var(--mantine-font-family-headings)',
            fontWeight: 600,
          }}
        >
          {running ? current.label : left === 0 ? 'Done' : 'Ready'}
        </Box>
        <Group>
          <Button
            onClick={() => {
              if (running) {
                setRunning(false)
              } else {
                setLeft(120)
                setPhase(0)
                setRunning(true)
              }
            }}
          >
            {running ? 'Stop' : left === 0 ? 'Again' : 'Start two minutes'}
          </Button>
          {running && (
            <Text size="sm" c="dimmed">
              {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')} left
            </Text>
          )}
        </Group>
      </Stack>
    </Card>
  )
}

export function Stress() {
  return (
    <Stack gap="md">
      <Lede>
        Stress is the trigger people with psoriasis report most, and the one most often dismissed.
        It is not in your head: it is a measurable pathway from brain to skin.
      </Lede>
      <Panel title="How stress reaches the skin">
        <Stack gap="sm">
          {STRESS_CHAIN.map(([title, body], i) => (
            <NumberedFact key={title} index={i + 1} title={title}>
              {body}
            </NumberedFact>
          ))}
        </Stack>
      </Panel>
      <BreathingCircle />
      <Panel title="What actually has evidence">
        <TipList items={STRESS_EVIDENCE} />
      </Panel>
      <Panel title="Small things that help in the moment">
        <TipList items={STRESS_QUICK} />
      </Panel>
    </Stack>
  )
}
