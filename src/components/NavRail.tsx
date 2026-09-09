import { Box, NavLink, Paper, ScrollArea, Stack, Text, UnstyledButton } from '@mantine/core'
import { GROUPS, SECTIONS } from '../sections/registry'
import { useStore } from '../store'

export function NavRail({ compact }: { compact: boolean }) {
  const section = useStore((s) => s.section)
  const visited = useStore((s) => s.visitedSections)
  const open = useStore((s) => s.openSection)
  const close = useStore((s) => s.closePanel)
  const toggle = (id: (typeof SECTIONS)[number]['id']) => (section === id ? close() : open(id))

  if (compact) {
    return (
      <Paper
        withBorder
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 30,
          borderRadius: '18px 18px 0 0',
          background: 'rgba(255,255,255,.92)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <ScrollArea type="never">
          <Box style={{ display: 'flex', gap: 2, padding: 6 }}>
            {SECTIONS.map(({ id, title, icon: Icon }) => {
              const active = section === id
              return (
                <UnstyledButton
                  key={id}
                  onClick={() => toggle(id)}
                  style={{
                    flex: 'none',
                    width: 78,
                    padding: '6px 2px',
                    borderRadius: 12,
                    display: 'grid',
                    justifyItems: 'center',
                    gap: 4,
                    background: active ? 'var(--mantine-color-green-6)' : undefined,
                    color: active ? '#fff' : 'var(--mantine-color-ink-9)',
                  }}
                >
                  <Icon size={22} stroke={1.7} />
                  <Text fz={11} lh={1.1} ta="center">
                    {title}
                  </Text>
                </UnstyledButton>
              )
            })}
          </Box>
        </ScrollArea>
      </Paper>
    )
  }

  return (
    <Paper
      withBorder
      p={10}
      style={{
        position: 'fixed',
        left: 22,
        top: 92,
        bottom: 22,
        width: 236,
        zIndex: 20,
        overflowY: 'auto',
        background: 'rgba(255,255,255,.84)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack gap={2}>
        {GROUPS.map((group) => (
          <Box key={group}>
            <Text tt="uppercase" fw={600} size="xs" c="dimmed" lts="0.08em" px={12} pt={12} pb={6}>
              {group}
            </Text>
            {SECTIONS.filter((s) => s.group === group).map(({ id, title, icon: Icon }) => (
              <NavLink
                key={id}
                active={section === id}
                label={title}
                leftSection={<Icon size={20} stroke={1.7} />}
                rightSection={
                  visited.includes(id) && section !== id ? (
                    <Box w={7} h={7} style={{ borderRadius: '50%', background: 'var(--mantine-color-green-6)' }} />
                  ) : null
                }
                onClick={() => toggle(id)}
                styles={{ root: { borderRadius: 11 }, label: { fontSize: 15 } }}
              />
            ))}
          </Box>
        ))}
      </Stack>
      <Text size="xs" c="dimmed" mt="auto" p={12} lh={1.4}>
        An educational guide, not medical advice. Always confirm with your dermatologist.
      </Text>
    </Paper>
  )
}
