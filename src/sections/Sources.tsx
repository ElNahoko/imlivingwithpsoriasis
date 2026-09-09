import { Anchor, Stack, Text } from '@mantine/core'
import { SOURCES } from '../data/sources'
import { Lede, Panel } from '../components/ui'

export function Sources() {
  return (
    <Stack gap="md">
      <Lede>
        Figures in this guide are approximate and rounded. They come from the sources below, which
        are the ones a dermatologist would point you to. Nothing here replaces advice from a
        clinician who has examined you.
      </Lede>
      {SOURCES.map((group) => (
        <Panel key={group.title} title={group.title}>
          <Stack gap="sm">
            {group.items.map((item) => (
              <div key={item.url}>
                <Anchor href={item.url} target="_blank" rel="noopener noreferrer" fw={600} size="sm">
                  {item.label}
                </Anchor>
                <Text size="xs" c="dimmed" style={{ wordBreak: 'break-all' }}>
                  {item.url.replace(/^https?:\/\//, '')}
                </Text>
              </div>
            ))}
          </Stack>
        </Panel>
      ))}
    </Stack>
  )
}
