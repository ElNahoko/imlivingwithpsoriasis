import { ActionIcon, Drawer, Group, Paper, ScrollArea, Stack, Text, Title } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { sectionById } from '../sections/registry'
import { useStore } from '../store'

export function SectionPanel({ compact }: { compact: boolean }) {
  const id = useStore((s) => s.section)
  const close = useStore((s) => s.closePanel)
  const section = id ? sectionById(id) : null

  const body = section ? <section.Component /> : null

  if (compact) {
    return (
      <Drawer
        opened={!!section}
        onClose={close}
        position="bottom"
        size="66%"
        radius="lg"
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.15 }}
        styles={{ body: { padding: 0, height: '100%' } }}
      >
        {section && (
          <Stack gap={0} h="100%">
            <Group justify="space-between" align="flex-start" p="md" pb="sm">
              <div>
                <Text tt="uppercase" fw={600} size="xs" c="green.7" lts="0.06em">
                  {section.group}
                </Text>
                <Title order={2}>{section.title}</Title>
              </div>
              <ActionIcon variant="default" onClick={close} aria-label="Close">
                <IconX size={18} />
              </ActionIcon>
            </Group>
            <ScrollArea style={{ flex: 1 }} px="md" pb="xl">
              {body}
            </ScrollArea>
          </Stack>
        )}
      </Drawer>
    )
  }

  return (
    <Paper
      withBorder
      style={{
        position: 'fixed',
        right: 22,
        top: 92,
        bottom: 22,
        width: 'min(470px, calc(100vw - 44px))',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'rgba(255,255,255,.97)',
        backdropFilter: 'blur(20px)',
        transform: section ? 'none' : 'translateX(calc(100% + 40px))',
        transition: 'transform .45s cubic-bezier(.2,.8,.2,1)',
        pointerEvents: section ? 'auto' : 'none',
      }}
    >
      {section && (
        <>
          <Group
            justify="space-between"
            align="flex-start"
            p="lg"
            pb="sm"
            style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
          >
            <div>
              <Text tt="uppercase" fw={600} size="xs" c="green.7" lts="0.06em">
                {section.group}
              </Text>
              <Title order={2}>{section.title}</Title>
            </div>
            <ActionIcon variant="default" size="lg" onClick={close} aria-label="Close panel">
              <IconX size={18} />
            </ActionIcon>
          </Group>
          <ScrollArea style={{ flex: 1 }} p="lg">
            {body}
          </ScrollArea>
        </>
      )}
    </Paper>
  )
}
