import { Box, Button, Card, Checkbox, Group, Stack, Text } from '@mantine/core'
import { HABITS, shieldMessage } from '../data/habits'
import { useStore, useTodayHabits } from '../store'
import { Lede } from '../components/ui'

/** A shield that fills up: the visual promise is protection, not a score to chase. */
function Shield({ percent }: { percent: number }) {
  const path = 'M38 4 L70 15 V42 C70 62 55 76 38 82 C21 76 6 62 6 42 V15 Z'
  return (
    <svg viewBox="0 0 76 86" width={76} height={86} aria-hidden="true">
      <defs>
        <clipPath id="shield-clip">
          <path d={path} />
        </clipPath>
      </defs>
      <path d={path} fill="rgba(18,42,61,.05)" stroke="var(--mantine-color-gray-4)" />
      <rect
        x={0}
        y={86 - (86 * percent) / 100}
        width={76}
        height={86}
        fill="var(--mantine-color-teal-6)"
        clipPath="url(#shield-clip)"
        style={{ transition: 'y .5s' }}
      />
      <path d={path} fill="none" stroke="var(--mantine-color-green-6)" opacity={0.6} />
    </svg>
  )
}

export function Habits() {
  const habits = useTodayHabits()
  const toggle = useStore((s) => s.toggleHabit)
  const reset = useStore((s) => s.resetHabits)
  const score = HABITS.reduce((sum, h, i) => sum + (habits.includes(i) ? h.points : 0), 0)

  return (
    <Stack gap="md">
      <Card>
        <Group wrap="nowrap" align="center" gap="lg">
          <Shield percent={score} />
          <Box>
            <Text ff="Lexend" fw={600} fz={30}>
              {score}%
            </Text>
            <Text c="dimmed" size="sm">
              {shieldMessage(score)}
            </Text>
          </Box>
        </Group>
      </Card>

      <Lede>
        Treatment does the heavy lifting; habits decide how often you need it. Tick what you have
        done today. It resets every morning and stays on this device only.
      </Lede>

      <Stack gap={6}>
        {HABITS.map((habit, i) => {
          const done = habits.includes(i)
          return (
            <Card
              key={habit.label}
              padding="sm"
              onClick={() => toggle(i)}
              style={{
                cursor: 'pointer',
                borderColor: done ? 'var(--mantine-color-green-6)' : undefined,
                background: done ? 'var(--mantine-color-green-0)' : undefined,
              }}
            >
              <Group wrap="nowrap" align="flex-start" gap="sm">
                <Checkbox checked={done} onChange={() => toggle(i)} mt={2} />
                <div>
                  <Text fw={600} size="sm">
                    {habit.label}
                    <Text span c="dimmed" size="xs" ml={6}>
                      +{habit.points}
                    </Text>
                  </Text>
                  <Text size="sm" c="dimmed">
                    {habit.why}
                  </Text>
                </div>
              </Group>
            </Card>
          )
        })}
      </Stack>

      <Button variant="default" onClick={reset}>
        Reset for a new day
      </Button>
    </Stack>
  )
}
