import landmarks from './landmarks.json'

export type SiteId =
  | 'scalp' | 'face' | 'elbow' | 'lowback' | 'nails' | 'folds' | 'knee' | 'soles'

export type Landmark = { p: [number, number, number]; n: [number, number, number] }

export type Site = {
  id: SiteId
  name: string
  /** how often this site is involved, as a percentage */
  frequency: number
  /** radius of the plaque decal projected on the mesh, in metres */
  plaqueSize: number
  /** pixels to offset the floating label, to clear small body parts */
  labelOffset?: number
  looks: string
  why: string
  care: string[]
  watch: string
  points: Landmark[]
}

const lm = landmarks.landmarks as Record<SiteId, Landmark[]>

export const SITES: Site[] = [
  {
    id: 'scalp',
    name: 'Scalp',
    frequency: 50,
    plaqueSize: 0.15,
    points: lm.scalp,
    looks:
      'Anything from fine, dandruff-like flakes to thick, crusted plaques that spread past the hairline onto the forehead and neck. It is frequently the very first sign.',
    why:
      'The scalp is rich in oil glands and covered by hair that traps scale, so plaques thicken instead of shedding. Combing, scratching and tight hairstyles add the small daily injuries that keep the immune signal switched on.',
    care: [
      'Use a medicated shampoo (coal tar or salicylic acid) and leave it on for 5 minutes before rinsing',
      'Apply a steroid scalp solution or foam to the skin, not the hair',
      'Soften thick scale overnight with oil, then comb gently before washing',
      'Do not pick: picking causes the hair loss, the psoriasis itself rarely does',
    ],
    watch:
      'Hair coming out in patches, or scale so thick it hurts, means it is time for stronger treatment than shampoo.',
  },
  {
    id: 'face',
    name: 'Face & ears',
    frequency: 30,
    plaqueSize: 0.06,
    points: lm.face,
    looks:
      'Red, slightly scaly patches on the eyebrows, upper forehead, the crease beside the nose, and in or behind the ears. Facial skin is thin, so plaques look milder but feel more exposed.',
    why:
      'Plaques cluster where oil glands are densest: the eyebrows, the sides of the nose, the ears. That is why facial psoriasis often overlaps with seborrhoeic dermatitis. This skin is thin and sun-exposed, so it reacts quickly to injury and burn.',
    care: [
      'Only mild steroids or a calcineurin inhibitor here; strong steroids thin facial skin within weeks',
      'Fragrance-free moisturiser morning and night',
      'Mineral sunscreen every day: a sunburn is an injury, and injury triggers plaques',
      'Ask about ear-drop formulations if it sits inside the ear canal',
    ],
    watch:
      'Painful red eyes or blurred vision alongside facial psoriasis needs same-week attention: eye inflammation runs with this disease.',
  },
  {
    id: 'elbow',
    name: 'Elbows',
    frequency: 65,
    plaqueSize: 0.09,
    points: lm.elbow,
    looks:
      'The classic thick, well-defined plaque with silvery scale on the point of the elbow. Usually symmetrical: if one elbow has it, the other usually does too.',
    why:
      'The elbow is an extensor surface: skin stretched tight over a bony joint, bent thousands of times a day, leaned on and knocked. Each small injury can seed a new plaque, which is called the Koebner phenomenon, and this skin has few oil glands, so it is naturally dry.',
    care: [
      'A thick ointment at night, covered with a cotton sleeve, roughly doubles absorption',
      'Long sleeves cut the friction from desks and tables that keeps plaques active',
      'Keep a small tub of emollient where you work and moisturise mid-day',
      'Never scrub scale off; soften it with salicylic acid or urea first',
    ],
    watch:
      'Cracks that bleed, or plaques still spreading after two weeks of steroid cream, mean it is time to step up treatment.',
  },
  {
    id: 'lowback',
    name: 'Lower back',
    frequency: 55,
    plaqueSize: 0.17,
    points: lm.lowback,
    looks:
      'A large, stubborn plaque over the sacrum, exactly where waistbands sit and where you lean into chairs. Often one of the thickest plaques on the body.',
    why:
      'The sacrum takes pressure and friction every time you sit or lean back, and waistbands rub the same line all day. Skin over the bony sacrum is under constant tension, which is exactly the kind of low-grade injury psoriasis responds to.',
    care: [
      'Loose, soft waistbands; nothing that rubs the same line all day',
      'Ask someone to help apply treatment, or use a long-handled applicator',
      'A humidifier in the bedroom helps large dry plaques through winter',
      'Phototherapy works particularly well on the trunk',
    ],
    watch:
      'Morning stiffness in the lower back that eases with movement and lasts more than 30 minutes can be psoriatic arthritis of the spine.',
  },
  {
    id: 'nails',
    name: 'Nails',
    frequency: 50,
    plaqueSize: 0.025,
    labelOffset: 34,
    points: lm.nails,
    looks:
      'Small pits like the surface of a thimble, yellow-brown "oil drop" patches, crumbling, thickening, or the nail lifting off its bed.',
    why:
      'The nail is made by skin cells in the matrix under the cuticle, so the same over-production shows up as pits, ridges and crumbling. The nail root is anchored to the tendon of the finger joint, which is why nail disease and psoriatic arthritis travel together.',
    care: [
      'Keep nails short and filed smooth; trauma to the nail makes changes worse',
      'Gloves for washing up, cleaning products and gardening',
      'Avoid aggressive manicures and cleaning under the nail',
      'Nail changes respond slowly: expect 6 months before you see improvement',
    ],
    watch:
      'Nail psoriasis plus any joint pain or a swollen finger is a strong signal to be screened for psoriatic arthritis.',
  },
  {
    id: 'folds',
    name: 'Skin folds & genitals',
    frequency: 35,
    plaqueSize: 0.08,
    labelOffset: 30,
    points: lm.folds,
    looks:
      'Smooth, shiny, bright red patches with no scale, in the armpits, under the breasts, the groin and the buttock crease. The fold stays moist, so scale never forms. Genital psoriasis is common and rarely mentioned to doctors.',
    why:
      'Skin folds are warm, moist and covered, and skin rubs on skin with every movement. Moisture stops scale forming, so patches look smooth and red instead of silvery, and yeast or bacteria can settle on top and worsen it.',
    care: [
      'Gentle wash, pat dry, breathable cotton underwear',
      'Only mild steroids or a calcineurin inhibitor in folds; strong steroids cause stretch marks here',
      'A barrier cream helps against sweat and friction',
      'It is not an infection and not sexually transmitted. Saying that out loud to a partner helps both of you',
    ],
    watch:
      'If the patch is very itchy, spreading at the edge or weeping, ask for a swab: a fungal or bacterial infection often sits on top of inverse psoriasis.',
  },
  {
    id: 'knee',
    name: 'Knees',
    frequency: 65,
    plaqueSize: 0.1,
    points: lm.knee,
    looks:
      'Thick plaques over the kneecap, often the most heavily scaled on the body because the knee bends thousands of times a day.',
    why:
      'Like the elbow, the kneecap is an extensor surface over a joint that bends constantly, kneels on hard floors and gets knocked. Tight, dry skin plus repeated micro-injury is the perfect invitation for a thick plaque.',
    care: [
      'Ointment under cling film for a few hours softens very thick plaques before treatment',
      'Knee pads for floor work, gardening or prayer',
      'Lukewarm showers only; hot water strips the little oil this skin has',
      'Weight loss, if relevant, reduces friction and inflammation at once',
    ],
    watch: 'A swollen, warm, stiff knee is a joint problem, not a skin one. Mention it.',
  },
  {
    id: 'soles',
    name: 'Palms & soles',
    frequency: 14,
    plaqueSize: 0.07,
    labelOffset: 30,
    points: lm.soles,
    looks:
      'Thick, cracked, painful skin or crops of sterile yellow pustules on the palms and soles. A small area of skin with a huge effect on walking and working.',
    why:
      'Palms and soles carry the thickest skin on the body and take constant pressure and friction. The pustular form here has its own genetics, around IL-36 signalling, and a strong link with smoking, which is why it can behave differently from plaques elsewhere.',
    care: [
      'Urea 20 to 40% cream to soften, then a steroid ointment under cotton gloves or socks overnight',
      'Cushioned shoes, and no barefoot walking on hard floors',
      'Smoking is strongly linked to the pustular form; stopping helps',
      'This site often needs phototherapy or a systemic medicine even when the area is tiny',
    ],
    watch: 'Pustules spreading beyond the hands and feet with fever or chills is an emergency.',
  },
]

export const siteById = (id: SiteId) => SITES.find((s) => s.id === id)!
