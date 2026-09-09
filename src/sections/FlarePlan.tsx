import { Accordion, Stack, Text } from '@mantine/core'
import { FLARE_PLAN } from '../data/clinical'
import { Lede } from '../components/ui'

export function FlarePlan() {
  return (
    <Stack gap="md">
      <Lede>A flare is data, not failure. Run through these in order, and log what came before it.</Lede>
      <Accordion variant="separated" defaultValue={FLARE_PLAN[0][0]} radius="md">
        {FLARE_PLAN.map(([title, body], i) => (
          <Accordion.Item key={title} value={title}>
            <Accordion.Control>
              <Text fw={600} size="sm">
                {i + 1}. {title}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text c="dimmed" size="sm" lh={1.5}>
                {body}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  )
}
