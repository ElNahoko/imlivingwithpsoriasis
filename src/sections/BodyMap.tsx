import { Badge, Chip, Group, Progress, Slider, Stack, Text } from '@mantine/core'
import { SITES, siteById } from '../data/sites'
import { useStore } from '../store'
import { Lede, Panel, TipList } from '../components/ui'

const severity = (bsa: number) =>
  bsa < 3
    ? { label: 'Mild: under 3%', color: 'green' }
    : bsa <= 10
      ? { label: 'Moderate: 3 to 10%', color: 'yellow' }
      : { label: 'Severe: over 10%', color: 'red' }

export function BodyMap() {
  const selectedSite = useStore((s) => s.selectedSite)
  const selectSite = useStore((s) => s.selectSite)
  const explored = useStore((s) => s.exploredSites)
  const bsa = useStore((s) => s.bsa)
  const setBsa = useStore((s) => s.setBsa)
  const site = selectedSite ? siteById(selectedSite) : null
  const level = severity(bsa)

  return (
    <Stack gap="md">
      {site ? (
        <>
          <Panel eyebrow="Selected site" title={site.name}>
            <Group justify="space-between" gap="xs">
              <Text size="sm" c="dimmed">
                How often this site is involved
              </Text>
              <Text size="sm" fw={600}>
                about {site.frequency}%
              </Text>
            </Group>
            <Progress value={site.frequency} color="red" size="sm" radius="xl" />
            <Text c="dimmed">{site.looks}</Text>
          </Panel>
          <Panel eyebrow="Why here" title="Why psoriasis likes this spot">
            <Text c="dimmed">{site.why}</Text>
          </Panel>
          <Panel title="Care that works here">
            <TipList items={site.care} />
          </Panel>
          <Panel title="See a doctor if">
            <TipList items={[site.watch]} tone="warn" />
          </Panel>
        </>
      ) : (
        <Lede>
          Psoriasis prefers skin that is stretched, rubbed, knocked or dry. Click any plaque on the
          body, or choose a site below, to see what it looks like there and what helps.
        </Lede>
      )}

      <Panel eyebrow={site ? 'Other sites' : 'Sites'}>
        <Group gap="xs">
          {SITES.map((s) => (
            <Chip
              key={s.id}
              checked={s.id === selectedSite}
              onChange={() => selectSite(s.id)}
              variant={s.id === selectedSite ? 'filled' : 'outline'}
              color={explored.includes(s.id) ? 'brand' : 'gray'}
              size="sm"
            >
              {s.name}
            </Chip>
          ))}
        </Group>
      </Panel>

      <Panel eyebrow="How much skin is affected" title="Measure with your palm">
        <Text c="dimmed">
          Dermatologists use your own hand as the ruler: one flat palm, fingers included, is about
          1% of your body surface area. Slide to count the palms your plaques would cover.
        </Text>
        <Slider
          value={bsa}
          onChange={setBsa}
          min={0}
          max={30}
          label={(v) => `${v}%`}
          marks={[
            { value: 3, label: '3%' },
            { value: 10, label: '10%' },
          ]}
          mb="md"
        />
        <Group justify="space-between" align="center" mt="sm">
          <Text ff="heading" fz={30} fw={600}>
            {bsa}%
          </Text>
          <Badge color={level.color} variant="light" size="lg">
            {level.label}
          </Badge>
        </Group>
      </Panel>
    </Stack>
  )
}
