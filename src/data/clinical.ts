export type PsoriasisType = {
  name: string
  share: string
  looks: string
  where: string
  who: string
  flag?: string
}

export const TYPES: PsoriasisType[] = [
  {
    name: 'Plaque',
    share: '80 to 90%',
    looks:
      'Raised, well-defined red patches with silvery scale, usually symmetrical. Itching, cracking and bleeding are common.',
    where: 'Elbows, knees, scalp, lower back',
    who: 'Any age, with peaks at 15 to 25 and 50 to 60',
  },
  {
    name: 'Guttate',
    share: 'About 10%',
    looks:
      'A sudden shower of small, drop-shaped spots across the trunk and limbs, often 2 to 3 weeks after a strep throat. Can clear on its own or turn into plaque psoriasis.',
    where: 'Trunk, arms, legs',
    who: 'Mostly children and adults under 30',
  },
  {
    name: 'Inverse',
    share: '3 to 7%',
    looks:
      'Smooth, shiny, bright red patches with no scale, where skin touches skin. Sweat and friction make it worse; often misdiagnosed as a fungal infection.',
    where: 'Armpits, groin, under the breasts, buttock crease',
    who: 'More common with higher body weight',
  },
  {
    name: 'Scalp',
    share: 'About 50%',
    looks:
      'From fine flaking to thick crusted plaques across the whole scalp. Frequently the first sign of the disease.',
    where: 'Hairline, behind the ears, back of the neck',
    who: 'All ages',
  },
  {
    name: 'Nail',
    share: 'About 50%',
    looks:
      'Pitting, oil-drop spots, crumbling and lifting of the nail. Up to 80% of people with psoriatic arthritis have nail changes.',
    where: 'Fingernails more than toenails',
    who: 'Usually alongside skin plaques',
    flag: 'Ask about joint screening',
  },
  {
    name: 'Pustular',
    share: 'About 3%',
    looks:
      'Sterile white pustules on red skin, either limited to the palms and soles or, rarely, spread across the body with fever.',
    where: 'Palms and soles, or widespread',
    who: 'Adults; smoking is a strong link',
    flag: 'Widespread pustules with fever: go to hospital',
  },
  {
    name: 'Erythrodermic',
    share: 'Under 2%',
    looks:
      'Fiery redness and shedding over nearly the whole body, with pain, chills and a racing heart. Often triggered by stopping strong steroids abruptly.',
    where: 'The entire skin surface',
    who: 'People with unstable plaque disease',
    flag: 'Emergency: go to hospital',
  },
  {
    name: 'Psoriatic arthritis',
    share: 'About 30%',
    looks:
      'The same inflammation in joints and tendons: stiff, swollen fingers or toes, heel pain, morning back stiffness that eases with movement. Untreated, it permanently damages joints.',
    where: 'Fingers, toes, heels, spine, knees',
    who: 'Typically 5 to 10 years after skin symptoms, but it can come first',
    flag: 'Joint pain plus psoriasis: see a rheumatologist',
  },
]

export type TreatmentStep = { severity: string; name: string; what: string; examples: string[] }

export const TREATMENTS: TreatmentStep[] = [
  {
    severity: 'Mild, under 3% of skin',
    name: 'Creams and ointments',
    what: 'Applied to the plaque itself. The first step for almost everyone, and often enough.',
    examples: [
      'Corticosteroid creams and ointments, in strengths matched to the site',
      'Vitamin D analogues such as calcipotriol, often combined with a steroid',
      'Salicylic acid or urea to lift thick scale first',
      'Coal tar, or a calcineurin inhibitor for the face and folds',
    ],
  },
  {
    severity: 'Moderate',
    name: 'Phototherapy',
    what: 'Controlled ultraviolet light in a clinic, two or three times a week for 8 to 12 weeks.',
    examples: [
      'Narrowband UVB is the standard and is safe in pregnancy',
      'Excimer laser for stubborn single plaques',
      'PUVA, psoralen plus UVA, in selected cases',
    ],
  },
  {
    severity: 'Moderate to severe',
    name: 'Tablets',
    what: 'Whole-body medicines that calm the immune system. They need regular blood tests.',
    examples: [
      'Methotrexate once a week, with folic acid',
      'Apremilast, a PDE4 inhibitor, with fewer blood tests',
      'Deucravacitinib, a newer TYK2 inhibitor',
      'Ciclosporin or acitretin for short courses',
    ],
  },
  {
    severity: 'Severe or resistant',
    name: 'Biologics',
    what: 'Injections that block one specific immune signal. Often the most effective and best tolerated option.',
    examples: [
      'IL-17 blockers: secukinumab, ixekizumab, bimekizumab',
      'IL-23 blockers: guselkumab, risankizumab, tildrakizumab',
      'IL-12/23: ustekinumab',
      'TNF blockers: adalimumab, etanercept, which also treat joints',
    ],
  },
]

export const MECHANISM: [string, string][] = [
  [
    'Something flips the switch',
    'Genes such as HLA-Cw6 load the gun. Stress, an infection, an injury or a medicine pulls the trigger.',
  ],
  [
    'Skin sentinels raise the alarm',
    'Dendritic cells release IL-23 and TNF, which call immune T-cells into the skin.',
  ],
  [
    'T-cells flood the skin with IL-17',
    'IL-17 is the master signal that tells skin cells to multiply far too fast.',
  ],
  [
    'The skin over-builds',
    'Blood vessels widen, which is the redness. Cells stack up, which is the thickness. Immature cells shed, which is the scale.',
  ],
]

export const MECHANISM_TAKEAWAYS = [
  'It is an immune condition, like asthma or rheumatoid arthritis. It is not caused by hygiene, diet, or anything you did.',
  'It is chronic, which means it comes and goes. The goal of treatment is long calm stretches, not a one-time cure.',
  'Modern treatments block the exact signals above, which is why clear or almost-clear skin is now a realistic aim.',
]

export const FLARE_PLAN: [string, string][] = [
  [
    'Do not panic, do not scrub',
    'A flare is inflammation, not dirt. Scrubbing, exfoliating or hot water spreads it. Shorten showers, switch to ointment, and stop any skincare product you started in the last month.',
  ],
  [
    'Step up treatment the way you agreed',
    'Most dermatologists give a written step-up plan, for example weekend-only steroid moving to daily for two weeks. If you do not have one, ask for one at your next visit. Never borrow someone else’s prescription.',
  ],
  [
    'Log the three weeks before',
    'Infections, sore throats, new medicines, alcohol, stress events, injuries, travel, weather. Patterns only appear after three or four logged flares. The skin diary in this app is enough.',
  ],
  [
    'Protect the skin from more injury',
    'Loose cotton, no tight straps, gloves for cleaning, sunscreen. New plaques appear on injured skin one to three weeks later, so preventing injury now shortens the flare later.',
  ],
  [
    'Manage itch without your nails',
    'Cold compress, moisturiser kept in the fridge, menthol or pramoxine cream, a night-time antihistamine if itch wakes you. Itch peaks in the evening, so plan for it.',
  ],
  [
    'Know the red flags',
    'Call your clinic the same day for redness over most of your body, pustules spreading with fever or chills, sudden joint swelling, or a painful red eye. These are not "wait and see" symptoms.',
  ],
  [
    'Tell one person',
    'Flares affect mood as much as skin. Depression is twice as common in psoriasis. Saying "I am flaring and I feel low" to one person is part of the plan, not an optional extra.',
  ],
]

export const STRESS_CHAIN: [string, string][] = [
  [
    'The alarm system fires',
    'Stress activates the HPA axis. In short bursts cortisol calms inflammation, but under chronic stress skin cells stop responding to it and inflammation runs unchecked.',
  ],
  [
    'Nerves talk to immune cells',
    'Skin nerves release substance P and CGRP. These wake mast cells and T-cells in the skin, which raises itch and feeds the IL-17 loop.',
  ],
  [
    'Behaviour piles on',
    'Stressed weeks mean less sleep, more alcohol, more scratching and missed treatment. Each of those is a trigger on its own.',
  ],
  [
    'The loop closes',
    'A flare is visible and itchy, which is stressful, which feeds the flare. Breaking the loop anywhere helps.',
  ],
]

export const STRESS_EVIDENCE = [
  'Structured programmes such as cognitive behavioural therapy and mindfulness-based stress reduction reduce severity and itch modestly in trials, and improve how much the disease bothers you by more.',
  'Sleep is the cheapest anti-inflammatory you own. Protect seven hours before anything else.',
  'Regular exercise lowers inflammatory markers and stress hormones at once. Sweat is fine, just shower lukewarm afterwards.',
  'Social support changes outcomes. Peer groups run by psoriasis associations are free.',
  'If low mood lasts more than two weeks, tell your doctor. Treating depression improves skin outcomes too.',
]

export const STRESS_QUICK = [
  'Name it: saying "this is a flare and I am stressed" lowers the alarm on its own.',
  'Cold water on the wrists or face for thirty seconds resets the nervous system.',
  'A ten-minute walk outside beats ten minutes of scrolling, for both mood and skin.',
  'Keep your emollient in the fridge: cooling stops the itch-scratch-stress loop physically.',
]

export const HEALTH_CHECKS: [string, string, string][] = [
  [
    'Blood pressure',
    'Every year',
    'Psoriasis roughly doubles cardiovascular risk. High blood pressure is silent and treatable.',
  ],
  [
    'Weight and waist',
    'Every visit',
    'Fat tissue drives inflammation. A smaller waist means milder skin and better response to biologics.',
  ],
  [
    'Cholesterol and blood sugar',
    'Every 1 to 2 years',
    'Metabolic syndrome and type 2 diabetes are more common. Catching them early changes the outcome.',
  ],
  [
    'Joints',
    'Every visit',
    'Ask about stiff mornings, swollen fingers and heel pain. Untreated psoriatic arthritis damages joints permanently.',
  ],
  [
    'Mood',
    'Every visit',
    'Depression and anxiety are twice as common. Two questions from your doctor are enough to screen.',
  ],
  [
    'Liver',
    'As your medicine requires',
    'Fatty liver is more common in psoriasis, and methotrexate and alcohol both add to the load.',
  ],
  [
    'Eyes',
    'If red, painful or blurry',
    'Uveitis, an inflammation inside the eye, runs with psoriatic disease and needs prompt treatment.',
  ],
]

export const TALKING_POINTS: [string, string][] = [
  [
    'To a new partner',
    'I have psoriasis. It is an immune condition, like asthma or eczema. It is not contagious, it is not an infection, and it is not about hygiene. Some weeks it is quieter than others. If you have questions, ask me anything.',
  ],
  [
    'To a colleague who stares',
    'That is psoriasis, an autoimmune skin condition. You cannot catch it. It flares with stress, so a quiet week helps more than you would think.',
  ],
  [
    'To a child',
    'My skin has a mix-up: it makes new skin too fast, so it gets red and flaky. It does not hurt much, you cannot catch it, and the cream helps it calm down.',
  ],
  [
    'To yourself on a bad day',
    'This is a flare, not a failure. It will settle. I know what to do, and I do not have to do it alone.',
  ],
]

export const SEASONS = [
  'Most people improve in summer with short, regular sun and no burning. Sunburn does the opposite.',
  'Winter is the hard season: humidifier, thicker ointment, and do not skip treatment when skin looks better.',
  'Travelling: pack more emollient than you think, keep medicines in hand luggage, and carry a doctor’s note for injectables.',
  'Swimming is fine and chlorine rarely bothers plaques. Rinse and moisturise straight after.',
]

export type Myth = { statement: string; answer: boolean; explanation: string }

export const MYTHS: Myth[] = [
  {
    statement: 'Psoriasis is contagious.',
    answer: false,
    explanation:
      'It is immune-mediated, not an infection. Touch, towels, pools, sex: none of them pass it on.',
  },
  {
    statement: 'Poor hygiene causes psoriasis.',
    answer: false,
    explanation: 'It is genetic and immune-driven. Over-washing actually makes it worse.',
  },
  {
    statement: 'Psoriasis can affect the joints.',
    answer: true,
    explanation: 'About 30% develop psoriatic arthritis. Nail changes are an early warning sign.',
  },
  {
    statement: 'A sore throat can set off a flare.',
    answer: true,
    explanation: 'Strep throat is the classic trigger, especially for guttate psoriasis.',
  },
  {
    statement: 'Hours of sunbathing is a good treatment.',
    answer: false,
    explanation:
      'Short, controlled UV helps. Sunburn is an injury that triggers plaques and raises skin cancer risk.',
  },
  {
    statement: 'Stopping a strong steroid suddenly is safe once skin looks clear.',
    answer: false,
    explanation:
      'Abrupt withdrawal is a leading cause of severe rebound flares. Taper as agreed with your doctor.',
  },
  {
    statement: 'Losing excess weight can make treatment work better.',
    answer: true,
    explanation: '5 to 10% weight loss improves severity scores and biologic response in trials.',
  },
  {
    statement: 'Psoriasis only affects the skin.',
    answer: false,
    explanation:
      'It is linked with heart disease, diabetes, depression and inflammatory bowel disease, which is why good care checks more than skin.',
  },
]

export const DOCTOR_CHECKLIST_BASE = [
  'Which step of the treatment ladder am I on, and what would move me to the next one?',
  'What should I do at the first sign of a flare? Can I have that in writing?',
  'How long should I use this steroid, and how do I taper it?',
  'Is phototherapy an option for me?',
  'Should my blood pressure, weight, cholesterol and blood sugar be checked, and by whom?',
]

export const BRING_TO_APPOINTMENT = [
  'Photos of flares at their worst, with dates. Skin is often calmer on the day of the appointment.',
  'A list of every medicine and supplement, including creams and anything bought online.',
  'Your skin diary chart, or a note of good and bad weeks.',
  'One sentence on what bothers you most: itch, appearance, pain, sleep or mood. It steers the whole plan.',
]
