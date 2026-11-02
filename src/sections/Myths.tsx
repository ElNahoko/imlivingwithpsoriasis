import { useState } from 'react'
import { Alert, Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { MYTHS } from '../data/clinical'
import { Lede } from '../components/ui'

export function Myths() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<boolean | null>(null)

  const done = index >= MYTHS.length
  const myth = done ? null : MYTHS[index]
  const correct = answered !== null && myth !== null && answered === myth.answer

  const answer = (value: boolean) => {
    if (answered !== null || !myth) return
    setAnswered(value)
    if (value === myth.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (done) {
      setIndex(0)
      setScore(0)
    } else {
      setIndex((i) => i + 1)
    }
    setAnswered(null)
  }

  return (
    <Stack gap="md">
      <Lede>Eight statements people with psoriasis hear all the time. True or false?</Lede>
      <Card>
        <Group justify="space-between" mb="sm">
          <Text tt="uppercase" fw={600} size="xs" c="brand.7" lts="0.06em">
            Myth check
          </Text>
          <Text size="xs" c="dimmed">
            {done ? 'Done' : `${index + 1} of ${MYTHS.length}`}
          </Text>
        </Group>

        {done ? (
          <Stack gap="sm">
            <Title order={3}>
              You scored {score} of {MYTHS.length}
            </Title>
            <Text c="dimmed">
              {score >= 6
                ? 'Strong. Those last two trip most people up.'
                : 'Run it again; the explanations are the point.'}
            </Text>
            <Button onClick={next}>Run again</Button>
          </Stack>
        ) : (
          <Stack gap="sm">
            <Text fw={600} fz="lg" lh={1.4} mih={52}>
              {myth!.statement}
            </Text>
            <Group grow>
              <Button variant="default" disabled={answered !== null} onClick={() => answer(true)}>
                True
              </Button>
              <Button variant="default" disabled={answered !== null} onClick={() => answer(false)}>
                False
              </Button>
            </Group>
            {answered !== null && (
              <>
                <Alert
                  color={correct ? 'green' : 'red'}
                  variant="light"
                  title={correct ? 'Correct' : 'Not quite'}
                >
                  {myth!.explanation}
                </Alert>
                <Button onClick={next}>
                  {index === MYTHS.length - 1 ? 'See my score' : 'Next'}
                </Button>
              </>
            )}
          </Stack>
        )}
      </Card>
    </Stack>
  )
}
