import { useState } from 'react'
import { Alert, Chip, Group, Stack, Text, Title } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { TYPES } from '../data/clinical'
import { LabelledFact, Lede, Panel } from '../components/ui'

export function Types() {
  const [index, setIndex] = useState(0)
  const type = TYPES[index]

  return (
    <Stack gap="md">
      <Lede>
        Most people have plaque psoriasis, but the same immune misfire can show up in very different
        ways. You can have more than one type at once.
      </Lede>

      <Group gap="xs">
        {TYPES.map((t, i) => (
          <Chip
            key={t.name}
            checked={i === index}
            onChange={() => setIndex(i)}
            variant={i === index ? 'filled' : 'outline'}
            size="sm"
          >
            {t.name}
          </Chip>
        ))}
      </Group>

      <Panel>
        <Group justify="space-between" align="flex-start">
          <Title order={3}>{type.name} psoriasis</Title>
          <Text ff="heading" fw={600} fz={24} c="brand.7">
            {type.share}
          </Text>
        </Group>
        <Text size="xs" c="dimmed" mt={-8}>
          of people with psoriasis
        </Text>
        <Stack gap="sm" mt="xs">
          <LabelledFact label="Looks like">{type.looks}</LabelledFact>
          <LabelledFact label="Where">{type.where}</LabelledFact>
          <LabelledFact label="Who">{type.who}</LabelledFact>
        </Stack>
        {type.flag && (
          <Alert color="red" variant="light" icon={<IconAlertTriangle size={18} />} mt="xs">
            {type.flag}
          </Alert>
        )}
      </Panel>
    </Stack>
  )
}
