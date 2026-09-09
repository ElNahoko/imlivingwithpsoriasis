export type Trigger = { label: string; weight: number; what: string; help: string }

export const TRIGGERS: Trigger[] = [
  {
    label: 'A high-stress week',
    weight: 22,
    what: 'Cortisol and nerve signals feed the same inflammatory loop. Stress is the trigger people report most.',
    help: 'Ten minutes a day of anything that lowers your heart rate counts as treatment.',
  },
  {
    label: 'A sore throat or infection',
    weight: 20,
    what: 'Strep throat is the classic trigger, especially for guttate flares. Any infection primes the immune system.',
    help: 'Get a sore throat swabbed early; treating strep can shorten the flare.',
  },
  {
    label: 'Missed treatment',
    weight: 18,
    what: 'Skipped topicals or a late biologic dose let the signal rebuild. Stopping steroids abruptly can rebound hard.',
    help: 'Set a recurring alarm. Taper steroids with your doctor, never stop cold.',
  },
  {
    label: 'A skin injury',
    weight: 14,
    what: 'Cuts, scrapes, sunburn, tattoos, tight straps, even scratching. New plaques appear on injured skin 1 to 3 weeks later.',
    help: 'Treat small injuries seriously: clean, moisturise, cover.',
  },
  {
    label: 'More than 1 or 2 drinks',
    weight: 14,
    what: 'Heavy drinking is linked with more severe disease and poorer response to treatment, and is unsafe with methotrexate.',
    help: 'Alcohol-free days work better than cutting down a little every day.',
  },
  {
    label: 'Smoking',
    weight: 14,
    what: 'Doubles the risk of developing psoriasis and is strongly linked to palmoplantar pustular disease.',
    help: 'Quitting is the single habit with the largest measured effect on severity.',
  },
  {
    label: 'A new medicine',
    weight: 12,
    what: 'Lithium, beta-blockers, antimalarials, some blood-pressure drugs and anti-inflammatories can trigger or worsen psoriasis.',
    help: 'Tell every prescriber you have psoriasis. Never stop a heart medicine alone; ask for an alternative.',
  },
  {
    label: 'Cold, dry weather',
    weight: 10,
    what: 'Low humidity and indoor heating strip moisture; less sunlight removes natural UV therapy.',
    help: 'Humidifier at night, ointment instead of lotion, moisturise within 3 minutes of showering.',
  },
  {
    label: 'Poor sleep, under 6 hours',
    weight: 10,
    what: 'Short sleep raises inflammatory markers and makes itch feel worse; itch then wrecks sleep. A loop.',
    help: 'Cool room, moisturise before bed, a night-time antihistamine if itch wakes you.',
  },
  {
    label: 'Weight gain',
    weight: 10,
    what: 'Fat tissue itself releases inflammatory signals. Higher weight means more severe disease and weaker biologic response.',
    help: 'Even 5% weight loss measurably improves severity scores.',
  },
  {
    label: 'A hormonal shift',
    weight: 8,
    what: 'Puberty, the months after birth and menopause often bring flares. Pregnancy frequently improves things.',
    help: 'Plan ahead: discuss pregnancy-safe treatment before it is needed.',
  },
  {
    label: 'Hot showers or harsh soap',
    weight: 8,
    what: 'Strips the lipid barrier, dries the plaque, increases itch and cracking.',
    help: 'Lukewarm, under 10 minutes, fragrance-free wash, pat dry.',
  },
]

export const riskLevel = (score: number) => {
  if (score === 0)
    return {
      label: 'calm',
      color: 'teal',
      advice:
        'Nothing switched on. This is your baseline: keep moisturising and keep your treatment routine.',
    }
  if (score < 25)
    return {
      label: 'low',
      color: 'teal',
      advice: 'One or two pressures. Skin usually copes if the routine holds.',
    }
  if (score < 50)
    return {
      label: 'elevated',
      color: 'yellow',
      advice:
        'Pressures are stacking. This is the week to be strict with routine and gentle with your skin.',
    }
  if (score < 75)
    return {
      label: 'high',
      color: 'red',
      advice:
        'A flare is likely within days to weeks. Switch off what you can, and warn your clinic if you are already unstable.',
    }
  return {
    label: 'very high',
    color: 'red',
    advice:
      'Several heavy triggers at once. If you already have widespread disease, contact your clinic before it escalates.',
  }
}
