import { useMemo, useState } from 'react'
import {
  Box, Card, Chip, Collapse, Group, SegmentedControl, Stack, Text, TextInput, Title,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import {
  CATEGORY_LABELS, FOODS, RHYTHM, SWAPS, VERDICT_COLORS, VERDICT_LABELS,
  type FoodCategory, type Verdict,
} from '../data/foods'
import { Lede, Panel } from '../components/ui'

const PLATE = [
  { color: 'var(--mantine-color-green-6)', label: 'Half vegetables, salad and fruit' },
  { color: 'var(--mantine-color-yellow-6)', label: 'A quarter whole grains or legumes' },
  { color: 'var(--mantine-color-blue-6)', label: 'A quarter protein: fish, poultry, tofu, eggs' },
  { color: '#8C6A3F', label: 'Olive oil as the fat, water as the drink' },
]

function FoodCard({ food }: { food: (typeof FOODS)[number] }) {
  const [open, setOpen] = useState(false)
  const color = `var(--mantine-color-${VERDICT_COLORS[food.verdict]}-6)`
  return (
    <Card
      padding="sm"
      onClick={() => setOpen((o) => !o)}
      style={{ cursor: 'pointer', borderLeft: `4px solid ${color}` }}
    >
      <Text fz={20} lh={1}>
        {food.emoji}
      </Text>
      <Text fw={600}>{food.name}</Text>
      <Text size="xs" fw={600} c={VERDICT_COLORS[food.verdict]}>
        {VERDICT_LABELS[food.verdict]}
      </Text>
      <Collapse expanded={open}>
        <Text size="sm" c="dimmed" mt={6} lh={1.5}>
          {food.why}
        </Text>
      </Collapse>
    </Card>
  )
}

export function Food() {
  const [verdict, setVerdict] = useState<Verdict | 'all'>('all')
  const [category, setCategory] = useState<FoodCategory | 'all'>('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FOODS.filter(
      (f) =>
        (verdict === 'all' || f.verdict === verdict) &&
        (category === 'all' || f.category === category) &&
        (!q || `${f.name} ${f.why}`.toLowerCase().includes(q)),
    )
  }, [verdict, category, query])

  return (
    <Stack gap="md">
      <Lede>
        No food cures psoriasis and no single food causes it. But a Mediterranean-style pattern is
        linked with milder disease, and losing excess weight measurably improves treatment response.
        Browse by category and tap any food for the reasoning.
      </Lede>

      <Card>
        <Group wrap="nowrap" align="center" gap="lg">
          <Box
            style={{
              width: 120,
              height: 120,
              flex: 'none',
              borderRadius: '50%',
              border: '1px solid var(--mantine-color-gray-3)',
              background:
                'conic-gradient(var(--mantine-color-green-2) 0 50%, var(--mantine-color-yellow-2) 50% 75%, var(--mantine-color-blue-2) 75% 100%)',
            }}
          />
          <Stack gap={8}>
            <Title order={3}>Your plate, most days</Title>
            {PLATE.map((row) => (
              <Group key={row.label} gap="xs" wrap="nowrap">
                <Box
                  style={{ width: 12, height: 12, borderRadius: 3, background: row.color, flex: 'none' }}
                />
                <Text size="sm">{row.label}</Text>
              </Group>
            ))}
          </Stack>
        </Group>
      </Card>

      <SegmentedControl
        fullWidth
        value={verdict}
        onChange={(v) => setVerdict(v as Verdict | 'all')}
        data={[
          { label: 'All', value: 'all' },
          { label: 'Eat freely', value: 'eat' },
          { label: 'Moderate', value: 'moderate' },
          { label: 'Limit', value: 'limit' },
        ]}
      />

      <Group gap={6} wrap="wrap">
        <Chip checked={category === 'all'} onChange={() => setCategory('all')} size="xs">
          All categories
        </Chip>
        {(Object.keys(CATEGORY_LABELS) as FoodCategory[]).map((key) => (
          <Chip key={key} checked={category === key} onChange={() => setCategory(key)} size="xs">
            {CATEGORY_LABELS[key]}
          </Chip>
        ))}
      </Group>

      <TextInput
        placeholder="Search a food: salmon, cheese, tomato…"
        leftSection={<IconSearch size={16} />}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />

      {visible.length === 0 ? (
        <Text c="dimmed">Nothing matches. Try “fish”, “sugar” or “cheese”.</Text>
      ) : (
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 8 }}>
          {visible.map((food) => (
            <FoodCard key={food.name} food={food} />
          ))}
        </Box>
      )}

      <Panel title="A weekly rhythm to aim for">
        <Stack gap={6}>
          {RHYTHM.map(([what, howOften]) => (
            <Group key={what} justify="space-between" wrap="nowrap">
              <Text size="sm">{what}</Text>
              <Text size="sm" fw={600} ta="right">
                {howOften}
              </Text>
            </Group>
          ))}
        </Stack>
      </Panel>

      <Panel title="Smart swaps">
        <Text c="dimmed" size="sm">
          Change the default, not the occasion.
        </Text>
        <Stack gap={6}>
          {SWAPS.map(([from, to]) => (
            <Group key={from} justify="space-between" wrap="nowrap" gap="xs">
              <Text size="sm" c="red.7" td="line-through">
                {from}
              </Text>
              <Text size="sm" c="dimmed">
                →
              </Text>
              <Text size="sm" fw={600} c="green.7" ta="right">
                {to}
              </Text>
            </Group>
          ))}
        </Stack>
      </Panel>
    </Stack>
  )
}
