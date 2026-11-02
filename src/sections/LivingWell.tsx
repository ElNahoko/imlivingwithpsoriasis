import { Accordion, Group, Stack, Text } from '@mantine/core'
import { HEALTH_CHECKS, SEASONS, TALKING_POINTS } from '../data/clinical'
import { Lede, Panel, TipList } from '../components/ui'

export function LivingWell() {
  return (
    <Stack gap="md">
      <Lede>
        Psoriasis is a whole-body condition. Looking after the rest of you is part of treating the
        skin.
      </Lede>

      <Panel title="Checks worth keeping up">
        <Stack gap="sm">
          {HEALTH_CHECKS.map(([what, when, why]) => (
            <div key={what}>
              <Group gap="xs" align="baseline">
                <Text fw={600}>{what}</Text>
                <Text size="xs" fw={600} c="brand.7">
                  {when}
                </Text>
              </Group>
              <Text size="sm" c="dimmed" lh={1.45}>
                {why}
              </Text>
            </div>
          ))}
        </Stack>
      </Panel>

      <Panel title="Your mind counts">
        <Text c="dimmed">
          Depression and anxiety are about twice as common with psoriasis, and low mood makes itch
          feel worse. This is biology, not weakness: the same inflammatory signals act on the brain.
        </Text>
        <TipList
          items={[
            'Treating the skin well often lifts mood on its own. If it does not, say so to your doctor; it is a normal part of the consultation.',
            'Ten minutes a day of anything that lowers your heart rate is treatment, not indulgence.',
            'Peer support works: national psoriasis associations run groups, online and in person.',
          ]}
        />
      </Panel>

      <Panel title="Talking about it">
        <Text c="dimmed" size="sm">
          Words you can borrow.
        </Text>
        <Accordion variant="separated" radius="md">
          {TALKING_POINTS.map(([who, line]) => (
            <Accordion.Item key={who} value={who}>
              <Accordion.Control>
                <Text fw={600} size="sm">
                  {who}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text c="dimmed" size="sm" fs="italic" lh={1.5}>
                  “{line}”
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Panel>

      <Panel title="Sun, seasons and travel">
        <TipList items={SEASONS} />
      </Panel>
    </Stack>
  )
}
