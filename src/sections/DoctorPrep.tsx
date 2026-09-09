import { Button, Checkbox, CopyButton, Group, Stack, Text } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { BRING_TO_APPOINTMENT } from '../data/clinical'
import { buildDoctorSummary, buildQuestions } from '../lib/summary'
import { useStore, useTodayHabits } from '../store'
import { Lede, Panel, TipList } from '../components/ui'

export function DoctorPrep() {
  const exploredSites = useStore((s) => s.exploredSites)
  const activeTriggers = useStore((s) => s.activeTriggers)
  const bsa = useStore((s) => s.bsa)
  const diary = useStore((s) => s.diary)
  const habits = useTodayHabits()

  const summary = buildDoctorSummary({ exploredSites, activeTriggers, bsa, diary, habits })
  const questions = buildQuestions({ exploredSites, activeTriggers, bsa })

  return (
    <Stack gap="md">
      <Lede>
        Appointments are short. This turns what you have logged in the app into a summary you can
        read out or hand over.
      </Lede>

      <Panel title="Your summary">
        <Text
          component="pre"
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
            fontSize: 15,
            lineHeight: 1.6,
            userSelect: 'text',
            margin: 0,
            background: 'var(--mantine-color-gray-0)',
            border: '1px solid var(--mantine-color-gray-2)',
            borderRadius: 12,
            padding: 14,
          }}
        >
          {summary}
        </Text>
        <Group>
          <CopyButton value={summary}>
            {({ copied, copy }) => (
              <Button
                variant={copied ? 'filled' : 'default'}
                leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                onClick={copy}
              >
                {copied ? 'Copied' : 'Copy summary'}
              </Button>
            )}
          </CopyButton>
        </Group>
      </Panel>

      <Panel title="Questions worth asking">
        <Stack gap="xs">
          {questions.map((question) => (
            <Checkbox
              key={question}
              label={question}
              styles={{ label: { fontSize: 15, lineHeight: 1.45 } }}
            />
          ))}
        </Stack>
      </Panel>

      <Panel title="Bring with you">
        <TipList items={BRING_TO_APPOINTMENT} />
      </Panel>
    </Stack>
  )
}
