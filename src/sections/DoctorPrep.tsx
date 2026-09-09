import { Button, Checkbox, CopyButton, Group, Stack, Text } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { siteById } from '../data/sites'
import { TRIGGERS } from '../data/triggers'
import { HABITS } from '../data/habits'
import { BRING_TO_APPOINTMENT, DOCTOR_CHECKLIST_BASE } from '../data/clinical'
import { useStore, useTodayHabits } from '../store'
import { lastDays } from './Diary'
import { Lede, Panel, TipList } from '../components/ui'

/** Turns everything logged in the app into something you can read out in two minutes. */
function useSummary() {
  const { exploredSites, activeTriggers, bsa, diary } = useStore()
  const habits = useTodayHabits()

  const sites = exploredSites.map((id) => siteById(id).name.toLowerCase())
  const triggers = activeTriggers.map((i) => TRIGGERS[i].label.toLowerCase())
  const week = lastDays(7)
    .map((d) => diary[d])
    .filter(Boolean)
  const averageItch = week.length
    ? (week.reduce((sum, e) => sum + e!.itch, 0) / week.length).toFixed(1)
    : null
  const roughDays = lastDays(14).filter((d) => diary[d] && diary[d].flare >= 2).length
  const shield = HABITS.reduce((sum, h, i) => sum + (habits.includes(i) ? h.points : 0), 0)
  const extent = bsa < 3 ? 'mild' : bsa <= 10 ? 'moderate' : 'severe'

  return [
    `Psoriasis summary, ${new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}`,
    `Sites affected: ${sites.length ? sites.join(', ') : 'not logged yet (tap the plaques on the body map)'}.`,
    `Extent: about ${bsa} palm${bsa === 1 ? '' : 's'} of skin, roughly ${bsa}% of body surface area, which is ${extent}.`,
    `Likely triggers this month: ${triggers.length ? triggers.join(', ') : 'none switched on in the flare simulator'}.`,
    averageItch
      ? `Skin diary, last 7 days: average itch ${averageItch} out of 10, with ${roughDays} moderate-or-severe day${roughDays === 1 ? '' : 's'} in the last 14.`
      : 'Skin diary: no entries yet.',
    `Daily routine today: ${shield}% of the habit shield (${habits.includes(0) ? 'moisturised' : 'not yet moisturised'}, ${habits.includes(1) ? 'treatment taken' : 'treatment not yet taken'}).`,
    'What bothers me most: ________________',
  ].join('\n')
}

function useQuestions() {
  const { exploredSites, activeTriggers, bsa } = useStore()
  const questions = [...DOCTOR_CHECKLIST_BASE]
  if (exploredSites.includes('nails') || exploredSites.includes('lowback'))
    questions.push('I have nail or lower-back involvement. Should I be screened for psoriatic arthritis?')
  if (bsa > 10) questions.push('With more than 10% of my skin involved, is a tablet or a biologic appropriate?')
  if (exploredSites.includes('folds') || exploredSites.includes('face'))
    questions.push('For my face and folds, which non-steroid options are safe long term?')
  if (activeTriggers.some((i) => TRIGGERS[i].label === 'A new medicine'))
    questions.push('Could one of my other medicines be worsening my psoriasis? Can we review the list?')
  if (activeTriggers.includes(0)) questions.push('Stress is a trigger for me. What support is available?')
  return questions
}

export function DoctorPrep() {
  const summary = useSummary()
  const questions = useQuestions()

  return (
    <Stack gap="md">
      <Lede>
        Appointments are short. This page turns what you have logged in the app into a summary you
        can read out or hand over.
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
          {questions.map((q) => (
            <Checkbox key={q} label={q} styles={{ label: { fontSize: 15, lineHeight: 1.45 } }} />
          ))}
        </Stack>
      </Panel>

      <Panel title="Bring with you">
        <TipList items={BRING_TO_APPOINTMENT} />
      </Panel>
    </Stack>
  )
}
