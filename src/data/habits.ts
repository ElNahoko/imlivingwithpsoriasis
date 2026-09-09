export type Habit = { label: string; points: number; why: string }

export const HABITS: Habit[] = [
  {
    label: 'Moisturised within 3 minutes of washing',
    points: 20,
    why: 'Ointment or cream, not lotion. It traps water in the skin before it evaporates.',
  },
  {
    label: 'Took or applied treatment as prescribed',
    points: 20,
    why: 'The biggest predictor of clear skin is consistency, not which product.',
  },
  {
    label: 'Lukewarm shower under 10 minutes',
    points: 10,
    why: 'Hot water strips lipids and raises itch for hours afterwards.',
  },
  {
    label: 'Did not scratch or pick',
    points: 10,
    why: 'Every scratch is a small injury that invites a new plaque. Press, cool or tap instead.',
  },
  {
    label: '10 to 15 minutes of gentle sun, no burn',
    points: 8,
    why: 'Natural UVB. Stop well before you go pink. Skip it on photosensitising medicines.',
  },
  {
    label: 'Zero or one alcoholic drink',
    points: 8,
    why: 'Alcohol-free days lower inflammation and protect your liver if you take methotrexate.',
  },
  {
    label: 'No cigarettes',
    points: 8,
    why: 'Smoking is the most modifiable severity factor after weight.',
  },
  {
    label: '7 or more hours of sleep',
    points: 6,
    why: 'Sleep restores the skin barrier and lowers itch signalling.',
  },
  {
    label: '30 minutes of movement',
    points: 5,
    why: 'Exercise lowers inflammatory markers and supports weight. Shower lukewarm afterwards.',
  },
  {
    label: 'One deliberate stress-down moment',
    points: 5,
    why: 'Breathing, a walk, music, prayer, journaling: anything that drops your heart rate.',
  },
]

export const shieldMessage = (score: number) => {
  if (score === 0)
    return 'Nothing ticked yet. Moisturising and taking treatment are 40 points on their own.'
  if (score < 40) return 'A start. Moisturising and treatment together are worth 40.'
  if (score < 75) return 'Solid. The rest is lifestyle, and it compounds over weeks.'
  if (score < 100) return 'Strong. This is the routine that keeps flares short and rare.'
  return 'Everything. A perfect skin day.'
}
