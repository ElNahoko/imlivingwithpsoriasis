import { Box, Card, Group, List, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconAlertTriangle, IconCheck } from '@tabler/icons-react'
import type { ReactNode } from 'react'

export function Lede({ children }: { children: ReactNode }) {
  return (
    <Text c="dimmed" size="md" lh={1.55}>
      {children}
    </Text>
  )
}

export function Panel({
  title,
  eyebrow,
  children,
}: {
  title?: string
  eyebrow?: string
  children: ReactNode
}) {
  return (
    <Card>
      <Stack gap="xs">
        {eyebrow && (
          <Text tt="uppercase" fw={600} size="xs" c="brand.7" lts="0.06em">
            {eyebrow}
          </Text>
        )}
        {title && <Title order={3}>{title}</Title>}
        {children}
      </Stack>
    </Card>
  )
}

export function TipList({ items, tone = 'good' }: { items: string[]; tone?: 'good' | 'warn' }) {
  const good = tone === 'good'
  return (
    <List
      spacing={9}
      icon={
        <ThemeIcon color={good ? 'green' : 'red'} variant="light" size={20} radius="xl">
          {good ? <IconCheck size={13} stroke={3} /> : <IconAlertTriangle size={12} />}
        </ThemeIcon>
      }
    >
      {items.map((item) => (
        <List.Item key={item}>
          <Text size="md" lh={1.45}>
            {item}
          </Text>
        </List.Item>
      ))}
    </List>
  )
}

export function NumberedFact({
  index,
  title,
  children,
}: {
  index: number
  title: string
  children: ReactNode
}) {
  return (
    <Group align="flex-start" gap="sm" wrap="nowrap">
      <ThemeIcon variant="light" color="brand" size={34} radius="md">
        <Text fw={600} size="sm">
          {index}
        </Text>
      </ThemeIcon>
      <Box>
        <Text fw={600}>{title}</Text>
        <Text c="dimmed" size="sm" lh={1.45}>
          {children}
        </Text>
      </Box>
    </Group>
  )
}

export function LabelledFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box>
      <Text fw={600}>{label}</Text>
      <Text c="dimmed" size="sm" lh={1.45}>
        {children}
      </Text>
    </Box>
  )
}
