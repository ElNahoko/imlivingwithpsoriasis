import { useState } from 'react'
import { Box, Card, Group, SegmentedControl, Stack, Text, UnstyledButton } from '@mantine/core'
import { SkinCrossSection } from '../components/SkinCrossSection'
import { SKIN_LAYERS, TURNOVER_DAYS, type LayerId, type SkinMode } from '../data/skinLayers'
import { MECHANISM, MECHANISM_TAKEAWAYS } from '../data/clinical'
import { Lede, NumberedFact, Panel, TipList } from '../components/ui'

export function HowItWorks() {
  const [mode, setMode] = useState<SkinMode>('healthy')
  const [highlight, setHighlight] = useState<LayerId | null>(null)
  const selected = SKIN_LAYERS.find((layer) => layer.id === highlight)
  const psoriatic = mode === 'psoriasis'

  return (
    <Stack gap="md">
      <Lede>
        Skin is a production line. Cells are born at the bottom, mature on the way up, flatten, and
        fall off the top. Psoriasis does not change the line, it changes the speed, and everything
        downstream goes wrong because of it.
      </Lede>

      <SegmentedControl
        fullWidth
        value={mode}
        onChange={(value) => setMode(value as SkinMode)}
        data={[
          { label: 'Healthy skin', value: 'healthy' },
          { label: 'Psoriasis', value: 'psoriasis' },
        ]}
      />

      <Card padding={0} style={{ overflow: 'hidden' }}>
        <SkinCrossSection mode={mode} highlight={highlight} onHighlight={setHighlight} />
        <Group justify="space-between" p="sm" wrap="nowrap">
          <div>
            <Text size="xs" c="dimmed">
              Time from birth to shedding
            </Text>
            <Group gap={6} align="baseline">
              <Text ff="Lexend" fw={600} fz={26} c={psoriatic ? 'red.7' : 'teal.7'}>
                {psoriatic ? '3 to 4' : TURNOVER_DAYS.healthy}
              </Text>
              <Text size="sm" c="dimmed">
                days
              </Text>
            </Group>
          </div>
          <Text size="xs" c="dimmed" ta="right" maw={230}>
            {psoriatic
              ? 'Seven times too fast. Cells arrive at the surface unfinished and cannot let go of each other.'
              : 'Slow enough for every cell to mature, seal the barrier and shed invisibly.'}
          </Text>
        </Group>
      </Card>

      <Text size="xs" c="dimmed" ta="center" mt={-8}>
        Drag to look around. Tap a layer to read what it does.
      </Text>

      <Panel eyebrow="The layers" title={selected ? selected.name : 'Pick a layer'}>
        {selected ? (
          <>
            <Text c="dimmed">{selected.role}</Text>
            {psoriatic && (
              <Text c="red.7" size="sm" fw={500} lh={1.5}>
                {selected.inPsoriasis}
              </Text>
            )}
          </>
        ) : (
          <Text c="dimmed">
            Tap a band in the model, or a colour below, to see what that layer is for and what
            psoriasis does to it.
          </Text>
        )}
        <Stack gap={4} mt="xs">
          {[...SKIN_LAYERS].reverse().map((layer) => {
            const active = highlight === layer.id
            const thickness = layer.height[mode] / layer.height.healthy
            return (
              <UnstyledButton
                key={layer.id}
                onClick={() => setHighlight(active ? null : layer.id)}
                p={6}
                style={{
                  borderRadius: 8,
                  background: active ? 'var(--mantine-color-green-0)' : undefined,
                }}
              >
                <Group gap="xs" wrap="nowrap">
                  <Box
                    w={14}
                    h={14}
                    style={{ borderRadius: 4, background: layer.color, flex: 'none' }}
                  />
                  <Text size="sm" fw={active ? 600 : 400} style={{ flex: 1 }}>
                    {layer.name}
                  </Text>
                  {layer.id !== 'dermis' && thickness !== 1 && (
                    <Text size="xs" c={thickness > 1 ? 'red.7' : 'dimmed'} fw={500}>
                      {thickness > 1 ? `${thickness.toFixed(1)}× thicker` : 'nearly gone'}
                    </Text>
                  )}
                </Group>
              </UnstyledButton>
            )
          })}
        </Stack>
      </Panel>

      <Panel title="What is actually going wrong">
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
