import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Group,
  SegmentedControl,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { useStore, todayKey, type DiaryEntry } from '../store'
import { average, lastDays } from '../lib/dates'
import { Lede, Panel, TipList } from '../components/ui'

const FLARE_LABELS = ['Calm', 'Mild', 'Moderate', 'Severe']
const FLARE_COLORS = [
  'var(--mantine-color-green-6)',
  'var(--mantine-color-teal-5)',
  'var(--mantine-color-yellow-6)',
  'var(--mantine-color-red-6)',
]

export function Diary() {
  const diary = useStore((s) => s.diary)
  const save = useStore((s) => s.saveDiary)
  const existing = diary[todayKey()]
  const [entry, setEntry] = useState<DiaryEntry>(
    existing ?? { itch: 3, flare: 0, sleep: 7, note: '' },
  )
  const [saved, setSaved] = useState(false)

  const days = lastDays(14)
  const entries = days.map((d) => diary[d])
  const week = lastDays(7)
    .map((d) => diary[d])
    .filter(Boolean)
  const show = (values: number[]) => average(values)?.toFixed(1) ?? '–'
  const roughDays = entries.filter((e) => e && e.flare >= 2).length

  return (
    <Stack gap="md">
      <Lede>
        Twenty seconds a day. After a few weeks, patterns appear that no single appointment can see.
        Everything stays on this device.
      </Lede>

      <Panel eyebrow="Today">
        <Group justify="space-between">
          <Text fw={600}>Itch</Text>
          <Text ff="Lexend" fw={600} fz={22}>
            {entry.itch}
            <Text span size="sm" c="dimmed">
              {' '}
              / 10
            </Text>
          </Text>
        </Group>
        <Slider
          value={entry.itch}
          onChange={(itch) => setEntry({ ...entry, itch })}
          min={0}
          max={10}
          label={null}
        />

        <Text fw={600} mt="sm">
          Skin today
        </Text>
        <SegmentedControl
          fullWidth
          value={String(entry.flare)}
          onChange={(v) => setEntry({ ...entry, flare: Number(v) as DiaryEntry['flare'] })}
          data={FLARE_LABELS.map((label, i) => ({ label, value: String(i) }))}
        />

        <Group justify="space-between" mt="sm">
          <Text fw={600}>Sleep</Text>
          <Text ff="Lexend" fw={600} fz={22}>
            {entry.sleep}
            <Text span size="sm" c="dimmed">
              {' '}
              hours
            </Text>
          </Text>
        </Group>
        <Slider
          value={entry.sleep}
          onChange={(sleep) => setEntry({ ...entry, sleep })}
          min={3}
          max={11}
          step={0.5}
          label={null}
        />

        <TextInput
          mt="sm"
          maxLength={80}
          placeholder="Anything notable? A sore throat, a stressful day, a new cream…"
          value={entry.note}
          onChange={(e) => setEntry({ ...entry, note: e.currentTarget.value })}
        />
        <Button
          mt="sm"
          onClick={() => {
            save(entry)
            setSaved(true)
            window.setTimeout(() => setSaved(false), 1800)
          }}
        >
          {saved ? 'Saved' : 'Save today'}
        </Button>
      </Panel>

      <Panel title="Last 14 days">
        <Group gap={5} align="flex-end" h={96} wrap="nowrap">
          {days.map((day, i) => {
            const e = entries[i]
            const height = e ? 8 + e.itch * 8.2 : 3
            return (
              <Tooltip
                key={day}
                label={
                  e
                    ? `${day}: itch ${e.itch}, ${FLARE_LABELS[e.flare].toLowerCase()}, ${e.sleep} h${e.note ? `, ${e.note}` : ''}`
                    : `${day}: no entry`
                }
                withArrow
              >
                <Box
                  style={{
                    flex: 1,
                    height: `${height}%`,
                    minHeight: 3,
                    borderRadius: '4px 4px 2px 2px',
                    background: e ? FLARE_COLORS[e.flare] : 'var(--mantine-color-gray-3)',
                    outline:
                      day === todayKey() ? '2px solid var(--mantine-color-green-6)' : undefined,
                    outlineOffset: 2,
                    transition: 'height .4s',
                  }}
                />
              </Tooltip>
            )
          })}
        </Group>
        <SimpleGrid cols={3} spacing="xs" mt="lg">
          <Card padding="xs">
            <Text ff="Lexend" fw={600} fz={22}>
              {show(week.map((e) => e!.itch))}
            </Text>
            <Text size="xs" c="dimmed">
              Average itch, 7 days
            </Text>
          </Card>
          <Card padding="xs">
            <Text ff="Lexend" fw={600} fz={22}>
              {roughDays}
            </Text>
            <Text size="xs" c="dimmed">
              Moderate or severe days, 14 days
            </Text>
          </Card>
          <Card padding="xs">
            <Text ff="Lexend" fw={600} fz={22}>
              {show(week.map((e) => e!.sleep))}
            </Text>
            <Text size="xs" c="dimmed">
              Average sleep, hours
            </Text>
          </Card>
        </SimpleGrid>
      </Panel>

      <Panel title="Reading your own patterns">
        <TipList
          items={[
            'Itch rising for two or three days before a flare is common. That is your window to step up treatment.',
            'Short sleep and high itch feed each other. Fix the sleep first.',
            'Bring this chart to appointments. It replaces “I think it was worse last month”.',
          ]}
        />
      </Panel>
    </Stack>
  )
}
