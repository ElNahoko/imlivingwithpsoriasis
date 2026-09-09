import { useEffect, useMemo, useState } from 'react'
import { Box, Card, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { MECHANISM, MECHANISM_TAKEAWAYS } from '../data/clinical'
import { Lede, NumberedFact, Panel, TipList } from '../components/ui'

/** Skin cells drifting up through the layers: slow on healthy skin, frantic on psoriasis. */
function SkinLayers({ speed, tone }: { speed: number; tone: 'healthy' | 'psoriasis' }) {
  const cells = useMemo(
    () =>
      Array.from({ length: tone === 'healthy' ? 14 : 26 }, (_, i) => ({
        left: `${(i / (tone === 'healthy' ? 14 : 26)) * 100}%`,
        size: 6 + Math.random() * 6,
        delay: -Math.random() * speed,
      })),
    [speed, tone],
  )
  return (
    <Box
      style={{
        position: 'relative',
        height: 78,
        borderRadius: 8,
        overflow: 'hidden',
        background:
          tone === 'healthy'
            ? 'linear-gradient(180deg,#F1D9CF,#E4B9AE)'
            : 'linear-gradient(180deg,#F2B2B4,#D9646B)',
      }}
    >
      {tone === 'psoriasis' && (
        <Box
          style={{
            position: 'absolute',
            insetInline: 0,
            top: 0,
            height: 16,
            background:
              'repeating-linear-gradient(90deg,rgba(255,255,255,.85) 0 5px,transparent 5px 10px)',
          }}
        />
      )}
      {cells.map((cell, i) => (
        <Box
          key={i}
          style={{
            position: 'absolute',
            bottom: -12,
            left: cell.left,
            width: cell.size,
            height: cell.size,
            borderRadius: '50%',
            background: 'rgba(255,255,255,.85)',
            animation: `rise ${speed}s linear ${cell.delay}s infinite`,
          }}
        />
      ))}
    </Box>
  )
}

export function HowItWorks() {
  const [day, setDay] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setDay((d) => (d + 1) % 29), 450)
    return () => window.clearInterval(id)
  }, [])

  return (
    <Stack gap="md">
      <style>{`@keyframes rise { to { transform: translateY(-100px); } }`}</style>
      <Lede>
        Healthy skin replaces itself in about a month. In psoriasis, misfiring immune cells order a
        rebuild every few days. Cells reach the surface still immature and sticky, and pile up
        instead of shedding.
      </Lede>

      <SimpleGrid cols={2} spacing="xs">
        <Card>
          <Text tt="uppercase" fw={600} size="xs" c="teal.7">
            Healthy skin
          </Text>
          <Title order={2} ff="Lexend" c="teal.7">
            {day}
            <Text span size="sm" c="dimmed" ml={4}>
              days
            </Text>
          </Title>
          <SkinLayers speed={12} tone="healthy" />
          <Text size="xs" c="dimmed" mt="xs">
            About a 28-day cycle, with invisible shedding
          </Text>
        </Card>
        <Card>
          <Text tt="uppercase" fw={600} size="xs" c="red.7">
            Psoriasis
          </Text>
          <Title order={2} ff="Lexend" c="red.7">
            {day}
            <Text span size="sm" c="dimmed" ml={4}>
              days
            </Text>
          </Title>
          <SkinLayers speed={1.8} tone="psoriasis" />
          <Text size="xs" c="dimmed" mt="xs">
            3 to 4 days: immature cells stack up as silvery scale
          </Text>
        </Card>
      </SimpleGrid>

      <Panel title="The chain of events">
        <Stack gap="sm">
          {MECHANISM.map(([title, body], i) => (
            <NumberedFact key={title} index={i + 1} title={title}>
              {body}
            </NumberedFact>
          ))}
        </Stack>
      </Panel>

      <Panel title="What this means for you">
        <TipList items={MECHANISM_TAKEAWAYS} />
      </Panel>
    </Stack>
  )
}
