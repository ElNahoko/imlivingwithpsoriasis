import { Card, Group, RingProgress, Stack, Switch, Text, Title } from '@mantine/core'
import { TRIGGERS, riskLevel } from '../data/triggers'
import { useStore } from '../store'
import { Lede, Panel, TipList } from '../components/ui'

export function Triggers() {
  const active = useStore((s) => s.activeTriggers)
  const toggle = useStore((s) => s.toggleTrigger)
  const score = Math.min(100, active.reduce((sum, i) => sum + TRIGGERS[i].weight, 0))
  const level = riskLevel(score)
  const topHelp = [...active]
    .sort((a, b) => TRIGGERS[b].weight - TRIGGERS[a].weight)
    .slice(0, 3)
    .map((i) => `${TRIGGERS[i].label}. ${TRIGGERS[i].help}`)

  return (
    <Stack gap="md">
      <Card>
        <Group wrap="nowrap" align="center">
          <RingProgress
            size={110}
            thickness={10}
            roundCaps
            sections={[{ value: score, color: level.color }]}
            label={
              <Text ta="center" ff="Lexend" fw={600} fz={26} c={level.color}>
                {score}
              </Text>
            }
          />
          <Stack gap={2}>
            <Text fw={600} c={level.color} tt="capitalize">
              Flare risk: {level.label}
            </Text>
            <Text size="sm" c="dimmed">
              {level.advice}
            </Text>
          </Stack>
        </Group>
      </Card>

      <Lede>
        Flares rarely come from one thing; they stack. Switch on what is true for you this week. The
        numbers are relative weights, not a medical score.
      </Lede>

      <Stack gap={6}>
        {TRIGGERS.map((trigger, i) => {
          const on = active.includes(i)
          return (
            <Card
              key={trigger.label}
              padding="sm"
              style={{
                borderColor: on ? 'var(--mantine-color-red-6)' : undefined,
                background: on ? 'var(--mantine-color-red-0)' : undefined,
                cursor: 'pointer',
              }}
              onClick={() => toggle(i)}
            >
              <Group wrap="nowrap" gap="sm">
                <Switch checked={on} onChange={() => toggle(i)} color="red" size="sm" />
                <div>
                  <Text fw={600} size="sm">
                    {trigger.label}
                    <Text span c="dimmed" size="xs" ml={6}>
                      +{trigger.weight}
                    </Text>
                  </Text>
                  <Text size="sm" c="dimmed" lh={1.4}>
                    {trigger.what}
                  </Text>
                </div>
              </Group>
            </Card>
          )
        })}
      </Stack>

      {topHelp.length > 0 && (
        <Panel title="What would help most this week">
          <TipList items={topHelp} />
        </Panel>
      )}
      <Title order={4} c="dimmed" fz="sm" fw={500}>
        Weights are drawn from published trigger studies and are meant for reflection, not diagnosis.
      </Title>
    </Stack>
  )
}
