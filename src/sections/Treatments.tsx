import { Alert, Card, List, Stack, Text, Title } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { TREATMENTS } from '../data/clinical'
import { Lede } from '../components/ui'

export function Treatments() {
  return (
    <Stack gap="md">
      <Lede>
        Treatment is matched to how much skin is involved, where it is, and how much it affects your
        life. Many people combine steps, and it is normal to move up or down over the years.
      </Lede>

      {TREATMENTS.map((step, i) => (
        <Card key={step.name} style={{ borderLeft: '5px solid var(--mantine-color-brand-6)' }}>
          <Text tt="uppercase" fw={600} size="xs" c="brand.7" lts="0.06em">
            Step {i + 1} · {step.severity}
          </Text>
          <Title order={3} mt={4}>
            {step.name}
          </Title>
          <Text c="dimmed" size="sm" mb="xs">
            {step.what}
          </Text>
          <List size="sm" spacing={4}>
            {step.examples.map((example) => (
              <List.Item key={example}>{example}</List.Item>
            ))}
          </List>
        </Card>
      ))}

      <Alert
        color="yellow"
        variant="light"
        icon={<IconInfoCircle size={18} />}
        title="Not medical advice"
      >
        This explains the options so you can have a better conversation with your doctor. Never
        start, stop or change a medicine because of a website. Stopping strong steroids abruptly can
        itself trigger a severe flare.
      </Alert>
    </Stack>
  )
}
