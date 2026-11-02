import { ActionIcon, Box, Button, Group, Paper, Progress, Text, Tooltip } from '@mantine/core'
import { IconHelp, IconRoute } from '@tabler/icons-react'
import { SITES } from '../data/sites'
import { useStore } from '../store'
import { Link } from '../lib/router'
import { LogoMark, Wordmark } from './Logo'

export function TopBar({
  compact,
  onHelp,
  onTour,
}: {
  compact: boolean
  onHelp: () => void
  onTour: () => void
}) {
  const explored = useStore((s) => s.exploredSites.length)

  return (
    <Group
      justify="space-between"
      align="center"
      wrap="nowrap"
      style={{
        position: 'fixed',
        top: compact ? 10 : 20,
        left: compact ? 12 : 22,
        right: compact ? 12 : 22,
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <Link href="/" style={{ pointerEvents: 'auto', color: 'inherit', textDecoration: 'none' }}>
        <Group gap="sm" wrap="nowrap">
          <LogoMark size={compact ? 36 : 44} />
          <Box>
            <Wordmark size={compact ? 15 : 20} />
            {!compact && (
              <Text size="sm" c="dimmed">
                125 million of us live with it. You are not alone.
              </Text>
            )}
          </Box>
        </Group>
      </Link>

      <Group gap="xs" wrap="nowrap" style={{ pointerEvents: 'auto' }}>
        <Paper
          withBorder
          p="xs"
          px="sm"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,.84)' }}
        >
          {!compact && (
            <Text tt="uppercase" fw={600} size="xs" c="dimmed" lts="0.06em">
              Body sites explored
            </Text>
          )}
          <Group gap={4} align="baseline" wrap="nowrap" style={{ whiteSpace: 'nowrap' }}>
            <Text ff="heading" fw={600} fz={compact ? 16 : 19}>
              {explored}
            </Text>
            <Text size="sm" c="dimmed">
              of {SITES.length}
            </Text>
          </Group>
          {!compact && (
            <Progress
              value={(explored / SITES.length) * 100}
              size="xs"
              mt={5}
              radius="xl"
              w={130}
            />
          )}
        </Paper>

        {compact ? (
          <Tooltip label="Guided tour">
            <ActionIcon
              variant="default"
              size={38}
              radius="md"
              onClick={onTour}
              aria-label="Guided tour"
            >
              <IconRoute size={18} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Button variant="default" leftSection={<IconRoute size={18} />} onClick={onTour} h={42}>
            Guided tour
          </Button>
        )}

        <ActionIcon
          variant="default"
          size={compact ? 38 : 42}
          radius="md"
          onClick={onHelp}
          aria-label="How to use this"
        >
          <IconHelp size={18} />
        </ActionIcon>
      </Group>
    </Group>
  )
}
