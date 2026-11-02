// Kept free of imports: the build script reads this file directly with Node to
// prerender each article for search engines and AI crawlers.

export type ArticleCategory =
  'Understanding psoriasis' | 'Treatments' | 'Skin care' | 'Food & lifestyle' | 'Mind & mood'

export type Ref = { label: string; url: string }

export type Article = {
  slug: string
  title: string
  description: string
  category: ArticleCategory
  date: string
  /** a section of the 3D guide to send readers to next */
  guide?: string
  guideLabel?: string
  refs: Ref[]
  /** paragraphs separated by blank lines; "## " starts a heading, "- " a list item */
  body: string
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'Understanding psoriasis',
  'Treatments',
  'Skin care',
  'Food & lifestyle',
  'Mind & mood',
]

const REF = {
  nhs: { label: 'NHS. Psoriasis.', url: 'https://www.nhs.uk/conditions/psoriasis/' },
  nhsPsa: {
    label: 'NHS. Psoriatic arthritis.',
    url: 'https://www.nhs.uk/conditions/psoriatic-arthritis/',
  },
  aad: {
    label: 'American Academy of Dermatology. Psoriasis resource centre.',
    url: 'https://www.aad.org/public/diseases/psoriasis',
  },
  npf: {
    label: 'National Psoriasis Foundation. About psoriasis.',
    url: 'https://www.psoriasis.org/about-psoriasis/',
  },
  nice: {
    label: 'NICE guideline CG153. Psoriasis: assessment and management.',
    url: 'https://www.nice.org.uk/guidance/cg153',
  },
  aadGuide: {
    label: 'AAD and NPF joint guidelines of care for psoriasis.',
    url: 'https://www.aad.org/member/clinical-quality/guidelines/psoriasis',
  },
  lancet: {
    label: 'Griffiths CEM et al. Psoriasis. The Lancet, 2021.',
    url: 'https://doi.org/10.1016/S0140-6736(20)32549-6',
  },
  who: {
    label: 'World Health Organization. Global report on psoriasis, 2016.',
    url: 'https://www.who.int/publications/i/item/9789241565189',
  },
  diet: {
    label:
      'Ford AR et al. Dietary recommendations for adults with psoriasis or psoriatic arthritis. JAMA Dermatology, 2018.',
    url: 'https://doi.org/10.1001/jamadermatol.2018.1412',
  },
  med: {
    label: 'Phan C et al. Mediterranean diet and severity of psoriasis. JAMA Dermatology, 2018.',
    url: 'https://doi.org/10.1001/jamadermatol.2018.2127',
  },
  weight: {
    label:
      'Jensen P et al. Effect of weight loss on the severity of psoriasis: a randomized clinical trial. JAMA Dermatology, 2013.',
    url: 'https://doi.org/10.1001/jamadermatol.2013.722',
  },
  smoking: {
    label:
      'Armstrong AW et al. Psoriasis and smoking: a systematic review and meta-analysis. British Journal of Dermatology, 2014.',
    url: 'https://doi.org/10.1111/bjd.12670',
  },
  stress: {
    label:
      'Snast I et al. Psychological stress and psoriasis: a systematic review and meta-analysis. British Journal of Dermatology, 2018.',
    url: 'https://doi.org/10.1111/bjd.16116',
  },
  mood: {
    label:
      'Dowlatshahi EA et al. Depressive symptoms and clinical depression in psoriasis. Journal of Investigative Dermatology, 2014.',
    url: 'https://doi.org/10.1038/jid.2013.508',
  },
  comorbid: {
    label:
      'Takeshita J et al. Psoriasis and comorbid diseases: epidemiology. Journal of the American Academy of Dermatology, 2017.',
    url: 'https://doi.org/10.1016/j.jaad.2016.07.064',
  },
} satisfies Record<string, Ref>

const PUBLISHED = '2026-11-02'

export const ARTICLES: Article[] = [
  {
    slug: 'what-is-psoriasis',
    title: 'What psoriasis actually is, and what it is not',
    description:
      'Psoriasis is an immune condition that speeds up skin renewal from about a month to a few days. A plain-language explanation of what happens in the skin and why it matters for the rest of the body.',
    category: 'Understanding psoriasis',
    date: PUBLISHED,
    guide: 'how',
    guideLabel: 'See the skin rebuild in 3D',
    refs: [REF.lancet, REF.who, REF.comorbid],
    body: `
Psoriasis is not a skin infection, an allergy, or a sign of poor hygiene. It is a long-term condition of the immune system that shows up most visibly on the skin.

## A speed problem

Healthy skin renews itself slowly. New cells are made in the deepest layer, rise to the surface, flatten, and are shed, a journey that takes roughly four weeks. In psoriasis, immune signals tell the skin to make cells far too fast, so the same journey takes only a few days. Cells pile up before they can mature properly. The result is the thickened, raised patch with silvery or grey scale known as a plaque.

## The immune signals behind it

Certain white blood cells, T cells, become overactive in the skin. They release messenger proteins such as TNF, IL-17 and IL-23 that keep inflammation switched on. Most modern treatments, from creams to biologic injections, work by quieting one or more of these signals.

## Why some people get it

Psoriasis runs in families, and dozens of genes are linked to it, but genes alone are not enough. Something usually sets it off: an infection such as strep throat, an injury to the skin, a stressful period, certain medicines, smoking or heavy drinking. That is why it can appear at any age and come and go in flares.

## More than skin deep

Because the inflammation is not limited to the skin, psoriasis is linked with other conditions:

- Psoriatic arthritis, which affects the joints
- Heart and blood vessel disease, especially with more severe psoriasis
- Type 2 diabetes, raised blood pressure and fatty liver
- Depression and anxiety

None of this means you will develop these conditions. It means regular check-ups are worth keeping up, and that treating psoriasis well is good for the whole body, not just the surface.

## What it is not

It is not contagious. You cannot catch it from touching someone, sharing a towel or swimming in the same pool. It is not caused by something you did wrong, and it is not a cosmetic problem. It is a medical condition, and it deserves proper treatment.
`,
  },
  {
    slug: 'types-of-psoriasis',
    title: 'The main types of psoriasis, and how to tell them apart',
    description:
      'Plaque, guttate, inverse, pustular and erythrodermic psoriasis look and behave differently. What each type looks like, where it appears, and which signs need urgent care.',
    category: 'Understanding psoriasis',
    date: PUBLISHED,
    guide: 'types',
    guideLabel: 'Compare the types in the guide',
    refs: [REF.npf, REF.aad, REF.nhs],
    body: `
Psoriasis is one condition with several faces. Knowing which type you have helps you and your doctor choose the right treatment, and some people have more than one type at once.

## Plaque psoriasis

By far the most common form, affecting around 8 or 9 in 10 people with psoriasis. It causes raised, well-defined patches with scale, usually on the elbows, knees, scalp and lower back. Plaques are often symmetrical and can itch, crack and bleed.

## Guttate psoriasis

A sudden shower of small, drop-shaped spots across the chest, back, arms and legs. It often appears two to three weeks after a sore throat caused by streptococcal bacteria, and is most common in children and young adults. It can clear by itself within months, or turn into plaque psoriasis.

## Inverse psoriasis

Also called flexural psoriasis. It appears in skin folds: the armpits, under the breasts, the groin, between the buttocks. Because these areas are warm and moist, the patches are smooth and shiny rather than scaly, which means they are often mistaken for a fungal infection.

## Pustular psoriasis

Small, sterile pus-filled spots on top of inflamed skin. The pus is not an infection. The localised form affects the palms and soles and is strongly linked with smoking. A rare generalised form spreads across the body.

## Erythrodermic psoriasis

Rare but serious: inflamed skin over most of the body, with shedding, intense itch or pain, and problems controlling body temperature.

## When to get help urgently

- Widespread redness covering most of the skin
- Pustules spreading beyond the hands and feet
- Fever, chills or feeling generally unwell alongside a flare

These need same-day medical care. For everything else, a photo diary of how your skin changes helps your doctor confirm the type.
`,
  },
  {
    slug: 'is-psoriasis-contagious',
    title: 'Is psoriasis contagious? No, and here is why',
    description:
      'Psoriasis cannot be caught or passed on by touch, towels, swimming pools or intimacy. Why the myth persists, and simple ways to answer the question when someone asks.',
    category: 'Understanding psoriasis',
    date: PUBLISHED,
    guide: 'myths',
    guideLabel: 'Test yourself with the myth check',
    refs: [REF.npf, REF.nhs, REF.who],
    body: `
It is one of the most common questions people with psoriasis hear, and one of the most hurtful. The answer is simple: psoriasis is not contagious.

## Why it cannot spread

Psoriasis is caused by the body's own immune system, not by a germ. There is no virus, bacterium or fungus to pass on. You cannot catch it by touching a plaque, sharing a towel, swimming in the same pool, kissing or having sex.

## Why people think it is

Visible skin conditions have long been treated with suspicion, and red, scaly or flaking skin looks like it might be an infection. The World Health Organization has pointed to stigma as one of the biggest burdens of the disease, sometimes heavier than the physical symptoms.

## What can look like spreading

- Psoriasis can appear where the skin is injured, such as a scratch, a tattoo or a sunburn. This is called the Koebner phenomenon, and it is your own immune response, not transmission.
- Guttate psoriasis can follow a strep throat. The throat infection can be passed on; the psoriasis that follows cannot.
- Skin folds affected by psoriasis can pick up a fungal infection on top. The fungus is treatable; the psoriasis underneath is still not contagious.

## Answering the question

A short, calm answer usually works best: "It's an immune condition, like a faulty alarm in my skin. You can't catch it." Some people find it easier to say this early, before anyone has to wonder.

If you are a parent, letting your child's school know, with a short note from your doctor if needed, can save your child from having to explain it alone.
`,
  },
  {
    slug: 'psoriatic-arthritis-early-signs',
    title: 'Psoriatic arthritis: the early signs worth mentioning',
    description:
      'Up to about one in three people with psoriasis develop psoriatic arthritis. The early signs, why catching it early protects your joints, and how screening works.',
    category: 'Understanding psoriasis',
    date: PUBLISHED,
    guide: 'living',
    guideLabel: 'See the whole-body checks',
    refs: [REF.nhsPsa, REF.nice, REF.comorbid],
    body: `
Psoriatic arthritis is inflammation of the joints and the places where tendons attach to bone. It affects up to about one in three people with psoriasis, usually years after the skin first appears, though occasionally before.

## Why early matters

Untreated inflammation can permanently damage joints. Treatments started early can protect them, so noticing the first signs and mentioning them makes a real difference.

## Signs to look out for

- Morning stiffness that lasts more than about 30 minutes and eases as you move
- A whole finger or toe that swells up like a sausage, called dactylitis
- Pain at the back of the heel or the sole of the foot, where tendons attach
- Pain and stiffness in the lower back or buttocks, worse after rest
- Swollen, warm or tender joints, often on one side only
- Nail changes such as pits or lifting, which are strongly linked with joint disease
- Unusual tiredness

## Screening

In the UK, NICE recommends that people with psoriasis are screened for psoriatic arthritis at least once a year, using a short questionnaire called PEST. If you are not asked, you can ask. Elsewhere, mention joint symptoms at every dermatology appointment.

## What happens next

If psoriatic arthritis is suspected, you should be referred to a rheumatologist. Blood tests and scans help rule out other kinds of arthritis. Several treatments, including some biologics, treat both the skin and the joints at once, which is one reason it helps to have the full picture.

Joint pain is easy to dismiss as getting older or overdoing it at the gym. With psoriasis, it is worth taking seriously.
`,
  },
  {
    slug: 'psoriasis-on-darker-skin',
    title: 'How psoriasis looks on darker skin',
    description:
      'On brown and Black skin, psoriasis is often purple, grey or dark brown rather than red, and it can leave marks after it clears. What to look for and how to make sure it is not missed.',
    category: 'Understanding psoriasis',
    date: PUBLISHED,
    guide: 'body',
    guideLabel: 'Explore where it appears',
    refs: [REF.aad, REF.npf],
    body: `
Most textbook photos of psoriasis show pink or red plaques on light skin. On darker skin it can look quite different, which means it is sometimes recognised late or its severity is underestimated.

## What it can look like

- Plaques that are violet, purple, grey or dark brown rather than red
- Scale that looks thick and silvery-grey and stands out more than the colour
- Scalp psoriasis that is very common and can be mistaken for dry scalp or dandruff
- Inflammation that is harder to see, even when the skin feels hot, itchy or tight

## After a plaque clears

As psoriasis heals, it can leave darker patches (hyperpigmentation) or lighter patches (hypopigmentation). These marks are not active psoriasis and usually fade over months, but they can be distressing. Treating flares early and protecting the skin from sun helps limit them.

## Making sure it is not missed

- Describe how the skin feels, not only how it looks: itch, heat, tightness, pain
- Take photos in natural daylight during a flare, so your doctor can see it at its worst
- Mention scalp scaling that does not respond to ordinary anti-dandruff shampoo
- Ask about the marks that remain after clearing; they are part of how psoriasis affects you

## Treatment works the same

The treatments are the same on every skin tone. Some, such as coal tar or strong steroids, can change skin colour in a small area, so ask your dermatologist how to use them on your skin, and say if any colour change worries you.
`,
  },
  {
    slug: 'psoriasis-treatment-ladder',
    title: 'From creams to biologics: how psoriasis treatment steps up',
    description:
      'Psoriasis treatment works like a ladder: creams first, then light therapy, then tablets or injections. What each step is, how long it takes to work, and when to ask to move up.',
    category: 'Treatments',
    date: PUBLISHED,
    guide: 'treatments',
    guideLabel: 'See the treatment ladder',
    refs: [REF.nice, REF.aadGuide, REF.lancet],
    body: `
There is no cure for psoriasis yet, but there are more effective treatments than ever. Most guidelines use a stepped approach: start with what is simplest and safest, and move up if it is not enough.

## Step 1: treatments on the skin

Topical treatments are the first choice for mild psoriasis and are often used alongside other treatments.

- Corticosteroid creams and ointments reduce inflammation quickly
- Vitamin D analogues such as calcipotriol slow skin cell growth, often combined with a steroid in one product
- Coal tar, salicylic acid and urea soften and lift scale
- Calcineurin inhibitors are used on the face and in skin folds, where skin is thin

## Step 2: phototherapy

Controlled ultraviolet light, usually narrowband UVB, is given in a hospital or clinic two or three times a week for several weeks. It works well when psoriasis covers larger areas.

## Step 3: tablets

Systemic treatments act on the whole body. Methotrexate, ciclosporin and acitretin have been used for decades; newer tablets such as apremilast and deucravacitinib target specific immune pathways. They need regular blood tests or monitoring.

## Step 4: biologics

Biologics are injected or infused medicines that block one immune messenger, such as TNF, IL-17 or IL-23. For moderate to severe psoriasis, many people see their skin become clear or almost clear.

## When to ask to step up

- Psoriasis still affects your sleep, work, relationships or mood
- It covers a large area, or sensitive areas such as the face, hands, feet or genitals
- Creams have not worked well enough after a fair trial, usually a few weeks
- You have signs of psoriatic arthritis

How much psoriasis affects your life counts as much as how much skin it covers. Say so clearly.
`,
  },
  {
    slug: 'steroid-creams-safely',
    title: 'Using steroid creams well: how much, how long, and when to stop',
    description:
      'Topical steroids work best when you use enough, in the right place, for the right length of time. The fingertip unit, potency, breaks between courses, and how to avoid side effects.',
    category: 'Treatments',
    date: PUBLISHED,
    guide: 'treatments',
    guideLabel: 'Open treatments in the guide',
    refs: [REF.nice, REF.aad],
    body: `
Steroid creams and ointments are the most widely used treatment for psoriasis. Many people under-use them out of fear of side effects, and then they do not work. Used well, they are effective and safe.

## How much: the fingertip unit

One fingertip unit is the amount of cream squeezed from a standard tube along the last segment of an adult index finger, about half a gram. It is enough to cover an area the size of two adult palms, fingers included. Thinking in fingertip units stops you using too little.

## Potency matters

Steroids range from mild to very potent. Strong ones are used on thick plaques on the body and scalp. Mild ones, or non-steroid alternatives, are used on the face, in skin folds and on the genitals, where skin is thinner and absorbs more.

## How long

UK guidance suggests not using a very potent steroid continuously on one area for more than four weeks, or a potent one for more than eight weeks, and aiming for a break of about four weeks between courses. Your doctor may suggest a different plan, such as using a product only at weekends to keep psoriasis away once it has cleared.

## Getting the most out of it

- Apply to the plaque only, not the surrounding healthy skin
- Ointments are greasier but often work better on thick, dry plaques
- Leave a gap, often around 30 minutes, between a moisturiser and the steroid; ask your pharmacist which goes first
- Do not stop a strong steroid abruptly after long use; ask how to reduce it gradually

## Side effects to watch for

Thinning skin, stretch marks, easy bruising or small visible blood vessels where you apply it. These are mostly avoidable with the right strength and breaks. If psoriasis returns quickly and badly each time you stop, tell your doctor: that is a sign to change treatment, not to use more.
`,
  },
  {
    slug: 'phototherapy-explained',
    title: 'Phototherapy explained: what narrowband UVB is like',
    description:
      'Light therapy uses controlled ultraviolet light to calm psoriasis. What a course involves, how quickly it works, the risks, and why sunbeds are not a substitute.',
    category: 'Treatments',
    date: PUBLISHED,
    guide: 'treatments',
    guideLabel: 'Where phototherapy fits',
    refs: [REF.nice, REF.aadGuide],
    body: `
Many people notice their psoriasis improves in summer. Phototherapy uses that effect in a controlled, measured way.

## How it works

Ultraviolet B light slows the over-production of skin cells and calms the immune cells in the skin. Narrowband UVB uses a very specific wavelength that is effective while limiting the dose of other ultraviolet light.

## What a course involves

- Sessions in a hospital or clinic, usually two or three times a week
- Each session lasts from seconds to a few minutes, in a cabinet lined with lamps
- The dose is increased gradually as your skin tolerates it
- A course typically runs for several weeks, and improvement often starts after a few weeks

You wear goggles to protect your eyes, and men usually cover the genitals. Your skin type and any medicines that make skin sensitive to light are checked first.

## Side effects

Mild redness like sunburn is the most common. Over the long term, ultraviolet light raises the risk of skin cancer, so clinics keep a record of how many treatments you have had over your lifetime.

## PUVA

An older form combines UVA light with a medicine called psoralen. It can work when UVB has not, but carries a higher long-term risk, so it is used more selectively.

## Why sunbeds are not the same

Commercial sunbeds mainly give out UVA, not the narrowband UVB that treats psoriasis, and they are not dosed or monitored. Dermatology organisations advise against using them as a treatment.

The practical challenge is time: getting to clinic two or three times a week. If that is hard for you, say so, as some services offer flexible hours or home units under supervision.
`,
  },
  {
    slug: 'biologics-questions-to-ask',
    title: 'Biologics: questions to ask before you start',
    description:
      'Biologics have transformed moderate to severe psoriasis. How they work, what screening involves, how long they take, and the questions worth bringing to your appointment.',
    category: 'Treatments',
    date: PUBLISHED,
    guide: 'doctor',
    guideLabel: 'Build your appointment checklist',
    refs: [REF.aadGuide, REF.nice, REF.lancet],
    body: `
Biologics are medicines made from living cells that block one specific messenger in the immune system. For many people with moderate to severe psoriasis, they bring skin that is clear or nearly clear.

## The main families

- TNF blockers, the oldest group
- IL-17 blockers
- IL-23 blockers, and IL-12/23 blockers

Each family works a little differently. Your dermatologist chooses based on your skin, your joints, other health conditions and practical things such as how often you would inject.

## Before you start

You will usually be screened for tuberculosis and hepatitis, because biologics can wake up a dormant infection. Your vaccinations are checked, as live vaccines are generally avoided during treatment.

## How long it takes

Many people notice a change within weeks, but the full effect is usually judged at around three to four months. If one biologic does not work well enough, switching to another often does.

## Questions to ask

- How often will I inject, and can I do it at home?
- What results should I expect, and by when?
- What are the most common side effects of this one?
- What should I do if I get an infection or need surgery?
- Is this safe if I am planning a pregnancy, now or later?
- Will it help my joints too?
- What happens if I miss a dose or travel?
- Is there a biosimilar, and does it make a difference to me?

## Living with it

Most people on biologics live normal lives. Keep a note of when you inject, store the medicine as instructed, usually in the fridge, and tell any doctor or dentist that you take it.
`,
  },
  {
    slug: 'scalp-psoriasis-routine',
    title: 'Scalp psoriasis: a routine that actually works',
    description:
      'Around half of people with psoriasis have it on the scalp. A step-by-step routine for softening scale, using medicated shampoos and treatments, and protecting your hair.',
    category: 'Treatments',
    date: PUBLISHED,
    guide: 'body',
    guideLabel: 'See the scalp in 3D',
    refs: [REF.aad, REF.nice, REF.nhs],
    body: `
The scalp is one of the most common and most frustrating places for psoriasis. Hair traps the scale, treatments are messy, and flakes on dark clothing can feel very public.

## Step 1: soften the scale

Thick scale stops treatments reaching the skin. Apply an oil or a scale-softening product containing salicylic acid or urea to the scalp, not the hair, and leave it on for a few hours or overnight under a shower cap. Then comb gently to lift loose scale. Do not scrape or pick.

## Step 2: medicated shampoo

Use a coal tar or salicylic acid shampoo. Massage it into the scalp and leave it for about five minutes before rinsing, so it has time to work. Ordinary shampoo can be used afterwards if you dislike the smell.

## Step 3: active treatment

Steroid scalp lotions, foams or gels, sometimes combined with a vitamin D analogue, are applied directly to the scalp, parting the hair in sections. Foams and gels are easier to use with long or thick hair than creams.

## Protecting your hair

- Use a wide-toothed comb and avoid tight hairstyles that pull at the scalp
- Keep hair dryers on a cool setting
- Avoid harsh colouring or chemical treatments during a flare
- Hair loss from psoriasis is usually temporary and grows back once the scalp is calmer; picking and scratching make it worse

## When to step up

If scale stays thick or painful after a few weeks of a consistent routine, or hair is coming out in patches, ask about stronger treatment. Scalp psoriasis that resists topical treatment can be a reason to consider phototherapy or a systemic medicine.
`,
  },
  {
    slug: 'moisturising-routine',
    title: 'Moisturising for psoriasis: the routine that matters most',
    description:
      'Emollients are the foundation of every psoriasis treatment plan. Which kind to choose, when to apply it, how much to use, and how to fit it around your other treatments.',
    category: 'Skin care',
    date: PUBLISHED,
    guide: 'habits',
    guideLabel: 'Build a daily routine',
    refs: [REF.nice, REF.aad, REF.nhs],
    body: `
Moisturisers, often called emollients, do not cure psoriasis, but they make every other treatment work better. Dry skin cracks, itches and is more easily injured, and injury can trigger new plaques.

## Choosing one

- Ointments are greasy but the most effective at locking in moisture, ideal for thick plaques and night-time
- Creams are lighter and better for daytime and larger areas
- Lotions are thin and best for hairy areas
- Choose fragrance-free products to avoid irritation
- Products with urea or salicylic acid help soften scale

The best emollient is the one you will actually use. It is worth trying a few.

## When to apply

The most useful moment is within a few minutes of bathing or showering, while the skin is still slightly damp. Pat dry rather than rubbing. Apply again whenever skin feels dry or tight, which may be several times a day.

## How to apply

Smooth it on in the direction of hair growth rather than rubbing it in hard, which can block hair follicles. Use generous amounts: emollients are meant to be used liberally.

## Around your other treatments

Leave a gap between your emollient and an active treatment such as a steroid, often around 30 minutes, so you do not dilute it. Ask your pharmacist which order suits your products.

## Bath time

- Keep water lukewarm rather than hot
- Limit soaking to about 15 minutes
- Use an emollient soap substitute instead of ordinary soap or bubble bath
- Take care: greasy products make baths and showers slippery

A small pot at your desk, in your bag and by the bed makes it much easier to keep up.
`,
  },
  {
    slug: 'winter-flares',
    title: 'Why psoriasis gets worse in winter, and what to do',
    description:
      'Less sunlight, dry indoor air, infections and seasonal stress all push psoriasis in the colder months. Practical steps to protect your skin through winter.',
    category: 'Skin care',
    date: PUBLISHED,
    guide: 'triggers',
    guideLabel: 'Check your flare triggers',
    refs: [REF.aad, REF.npf, REF.nhs],
    body: `
Many people find their psoriasis is at its worst from late autumn to early spring. Several things change at once.

## Why winter is harder

- Less sunlight: ultraviolet light naturally calms psoriasis, and there is far less of it
- Dry air: cold air outside and central heating inside pull moisture out of the skin
- Infections: colds, flu and especially strep throat can set off flares, including guttate psoriasis
- Holidays: more alcohol, rich food, late nights and stress
- Hot showers and baths: tempting in the cold, but they strip the skin's oils

## What helps

- Moisturise more often than in summer, and switch to a thicker ointment at night
- Use a humidifier in the bedroom
- Keep showers lukewarm and short
- Wear soft layers, with cotton next to the skin and wool on top, as wool directly on the skin can itch
- Treat sore throats promptly and ask a doctor if one does not settle
- Ask whether the seasonal flu vaccine is recommended for you, especially if you take medicine that affects the immune system
- Plan alcohol-free days through the holiday season

## Plan ahead

If your skin reliably flares every winter, talk to your dermatologist in autumn, not in January. Some people start a course of phototherapy or adjust their treatment ahead of the season.

A skin diary over a full year shows your own pattern, which is often more useful than general advice.
`,
  },
  {
    slug: 'nail-psoriasis',
    title: 'Nail psoriasis: pits, lifting and what helps',
    description:
      'About half of people with psoriasis have nail changes. What the signs mean, why they are linked with psoriatic arthritis, how they are treated, and day-to-day nail care.',
    category: 'Skin care',
    date: PUBLISHED,
    guide: 'body',
    guideLabel: 'See nails in the body map',
    refs: [REF.aad, REF.nice, REF.nhsPsa],
    body: `
Nail psoriasis is common and often overlooked. It can be painful, make fine tasks harder, and is a useful signal about the joints.

## What it looks like

- Pitting: small dents in the nail surface, like a thimble
- Oil-drop or salmon patches: yellow-brown discolouration under the nail
- Onycholysis: the nail lifting away from the nail bed, starting at the tip
- Thickening, crumbling and ridges
- Small dark lines under the nail from tiny bleeds

## Why it matters

Nail changes are strongly associated with psoriatic arthritis, because the nail is anchored close to the finger's end joint. If you have nail psoriasis and any joint pain or swelling, mention both together.

## Rule out fungus

A fungal nail infection can look very similar and can sit on top of nail psoriasis. A clipping sent to the lab tells them apart, which matters because the treatments are different.

## Treatment

- Steroid or vitamin D products applied to the nail fold and under the free edge
- Steroid injections into the nail fold for a few stubborn nails
- Systemic medicines and biologics for widespread or severe nail disease, which can work very well

Nails grow slowly, so expect around six months before you can judge whether a treatment is working. Photos taken monthly make progress easier to see.

## Day-to-day care

- Keep nails short and filed smooth so they do not catch and lift further
- Wear gloves for washing up, cleaning and gardening
- Avoid pushing back cuticles or cleaning hard under the nail
- Be gentle with manicures; nail polish is fine, but avoid acrylics on affected nails
`,
  },
  {
    slug: 'psoriasis-diet-evidence',
    title: 'What to eat with psoriasis: what the evidence says',
    description:
      'No single food causes or cures psoriasis, but diet still matters. What dermatologists recommend, what the research supports, and which popular claims have little evidence.',
    category: 'Food & lifestyle',
    date: PUBLISHED,
    guide: 'food',
    guideLabel: 'Browse the food guide',
    refs: [REF.diet, REF.med, REF.weight],
    body: `
Food is one of the most searched topics for people with psoriasis, and one of the most crowded with myths. Here is what the evidence actually supports.

## What has good evidence

In 2018, the medical board of the US National Psoriasis Foundation reviewed the research and published dietary recommendations. The strongest was for weight loss: for people who are overweight, a reduced-calorie diet improves psoriasis and can help treatments work better.

## A Mediterranean pattern

A large French study found that people who ate closest to a Mediterranean diet were less likely to have severe psoriasis. This kind of study shows a link rather than proof, but the diet is also good for the heart, which matters because psoriasis raises cardiovascular risk.

- Plenty of vegetables, fruit, legumes and whole grains
- Olive oil as the main fat
- Oily fish two or three times a week
- Nuts and seeds
- Little red and processed meat, and few sweets and refined foods

## Gluten

A gluten-free diet is only recommended for people who have coeliac disease or test positive for gluten sensitivity. For everyone else, there is no good evidence that it helps psoriasis.

## Supplements

The 2018 review found no strong evidence that taking fish oil, vitamin D, selenium or vitamin B12 as supplements improves psoriasis in most people. If a blood test shows you are low in something, correcting it is sensible for your general health.

## Alcohol

Alcohol is linked with more severe psoriasis and can interact with some treatments. Cutting down is one of the most useful changes you can make.

## The bottom line

Diet supports treatment; it does not replace it. Be wary of anyone selling a diet, product or supplement that promises a cure.
`,
  },
  {
    slug: 'mediterranean-week',
    title: 'A Mediterranean week: simple meals for calmer skin',
    description:
      'A practical, flexible week of Mediterranean-style meals for people with psoriasis: easy swaps, a weekly rhythm, and a shopping list that does not require special foods.',
    category: 'Food & lifestyle',
    date: PUBLISHED,
    guide: 'food',
    guideLabel: 'See every food explained',
    refs: [REF.med, REF.diet],
    body: `
The Mediterranean way of eating is not a strict diet. It is a pattern: mostly plants, olive oil as the main fat, fish often, meat rarely. This is one way to put it on the table without special ingredients.

## The weekly rhythm

- Oily fish: two to three times a week
- Beans, lentils or chickpeas: three or more times a week
- Vegetables: at every meal, aiming for five portions a day
- Olive oil: every day, as the main cooking and dressing fat
- Red meat: once a week at most
- Processed meat: as rarely as possible
- Sweets and pastries: no more than twice a week

## Easy swaps

- Butter in the pan for extra-virgin olive oil
- White bread for whole-grain or sourdough
- Crisps for a handful of nuts
- Deli meat for tinned fish or leftover roast chicken
- Sugary drinks for sparkling water with lemon
- Frying for baking, grilling or steaming

## A sample week

- Monday: lentil and vegetable soup with whole-grain bread
- Tuesday: baked salmon, roasted vegetables and new potatoes
- Wednesday: chickpea and spinach curry with brown rice
- Thursday: whole-wheat pasta with tomato, garlic, olive oil and a big salad
- Friday: sardines on toast with a tomato and cucumber salad
- Saturday: chicken and vegetable traybake with herbs
- Sunday: bean and vegetable stew, or a vegetable omelette

Breakfasts can be plain yoghurt with berries and nuts, or porridge with fruit. Lunches can be leftovers.

## Shopping basics

Tinned fish, tinned beans and lentils, tomatoes, frozen vegetables and berries, oats, whole-grain pasta and rice, nuts, olive oil, garlic, onions and lemons. Most are cheap and keep well.

Change one thing at a time. A pattern you can keep matters far more than a perfect week.
`,
  },
  {
    slug: 'alcohol-and-psoriasis',
    title: 'Alcohol and psoriasis: what drinking does to your skin',
    description:
      'Alcohol is linked with more severe psoriasis, weaker treatment response and risks with some medicines. Why, how much it matters, and practical ways to cut down.',
    category: 'Food & lifestyle',
    date: PUBLISHED,
    guide: 'triggers',
    guideLabel: 'See how alcohol scores as a trigger',
    refs: [REF.diet, REF.nice, REF.comorbid],
    body: `
Alcohol is one of the lifestyle factors most consistently linked with psoriasis. It is also one of the easier ones to change.

## What the link looks like

People who drink heavily tend to have more severe and more widespread psoriasis. Alcohol can also make treatments less effective and is associated with a higher risk of liver disease, which people with psoriasis already face more often.

## Why it matters for treatment

- Methotrexate and alcohol both strain the liver, so your doctor will give you a limit, or advise none
- Acitretin: women who could become pregnant must avoid alcohol during treatment and for a period afterwards, because alcohol changes how the drug is stored in the body; ask your doctor for the exact advice
- Heavy drinking makes it harder to keep up a daily treatment routine

## Practical ways to cut down

- Set alcohol-free days, aiming for most days of the week
- Swap to alcohol-free beer, wine or other drinks at social events
- Alternate each alcoholic drink with water
- Smaller glasses, and buying less to keep at home
- Notice when you drink to cope with itch, low mood or stress, and look for another outlet

## Getting support

If cutting down is hard, that is common, and help is available through your doctor and national alcohol support services. Being honest about how much you drink helps your dermatologist choose the safest treatment for you.
`,
  },
  {
    slug: 'smoking-and-psoriasis',
    title: 'Smoking and psoriasis: why quitting helps your skin',
    description:
      'Smokers are more likely to develop psoriasis and to have more severe disease, and smoking is strongly tied to pustular psoriasis on the hands and feet. The evidence, and how to get help to quit.',
    category: 'Food & lifestyle',
    date: PUBLISHED,
    guide: 'triggers',
    guideLabel: 'See your trigger score',
    refs: [REF.smoking, REF.comorbid, REF.nhs],
    body: `
Of all the lifestyle factors linked with psoriasis, smoking has some of the clearest evidence.

## What the research shows

A large review of studies found that people who smoke are more likely to develop psoriasis, and the risk rises with how much and how long they smoke. Smokers also tend to have more severe psoriasis.

## Hands and feet

Pustular psoriasis on the palms and soles, called palmoplantar pustulosis, is very strongly linked with smoking. Most people with this form smoke or have smoked. Stopping can help it settle and makes treatment more likely to work.

## Why it matters beyond the skin

Psoriasis already raises the risk of heart disease. Smoking adds to that risk substantially, so stopping protects your heart as well as your skin.

## Getting help to quit

- Ask your doctor or pharmacist about stop-smoking services, which greatly improve your chances
- Nicotine replacement, such as patches, gum or sprays, is safe for most people with psoriasis
- Prescription medicines can reduce cravings
- Set a quit date and tell people around you
- Expect cravings to peak in the first weeks, then ease

## If you slip

Most people try several times before they stop for good. A lapse is not failure; it is part of the process. Every smoke-free day counts for your skin and your health.
`,
  },
  {
    slug: 'weight-and-psoriasis',
    title: 'Weight, inflammation and psoriasis',
    description:
      'Body fat produces inflammatory signals that feed psoriasis, and a clinical trial showed weight loss can reduce its severity. What the evidence says, without blame.',
    category: 'Food & lifestyle',
    date: PUBLISHED,
    guide: 'habits',
    guideLabel: 'Start small daily habits',
    refs: [REF.weight, REF.diet, REF.comorbid],
    body: `
Talking about weight can feel loaded, and nobody with psoriasis needs more blame. But the link between weight and psoriasis is biological, and understanding it can be useful.

## The connection

Fat tissue, especially around the waist, is not just stored energy. It releases inflammatory messengers, including some of the same ones involved in psoriasis, such as TNF. Higher body weight is linked with more severe psoriasis.

## What the evidence shows

In a randomised trial in Denmark, people with psoriasis who were overweight followed a low-calorie diet for several weeks. Their psoriasis became less severe and their quality of life improved compared with people who kept their usual diet. The US National Psoriasis Foundation's medical board gives weight loss its strongest dietary recommendation for people who are overweight.

## How it affects treatment

- Some treatments work less well at higher body weight
- Doses of some biologics are based on weight
- Skin folds rub more, which can worsen inverse psoriasis

## Approaches that help

- Small, sustainable changes beat strict diets
- A Mediterranean-style eating pattern supports both weight and heart health
- Movement you enjoy, walking, swimming or cycling, counts; choose clothing and activities that do not rub sore skin
- Ask your doctor about support programmes or medical treatment if it is hard to make progress alone

## A note on fairness

Psoriasis itself can make exercise harder: painful skin, sore joints, feeling self-conscious in changing rooms. Those barriers are real. Any change, however small, is worth recognising.
`,
  },
  {
    slug: 'stress-and-flares',
    title: 'Stress and flares: breaking the itch–stress loop',
    description:
      'Stress is one of the most commonly reported psoriasis triggers, and psoriasis itself causes stress. How the loop works, and practical techniques that calm both skin and mind.',
    category: 'Mind & mood',
    date: PUBLISHED,
    guide: 'stress',
    guideLabel: 'Try the breathing exercise',
    refs: [REF.stress, REF.mood, REF.nice],
    body: `
Many people notice their psoriasis flares after a stressful period. A review of the research supports this: psychological stress is linked with psoriasis starting and with it getting worse.

## How stress reaches the skin

Stress activates the nervous system and hormone signals that can turn up inflammation in the skin. Nerve endings in the skin release substances that make plaques more inflamed and more itchy.

## The loop

Psoriasis is stressful in itself: itching, visible skin, broken sleep, worry about what others think. That stress feeds the next flare, and the flare feeds more stress. Breaking the loop at any point helps.

## Things that help

- Slow breathing: breathing out for longer than you breathe in, for a few minutes, calms the stress response
- Regular movement, even short walks
- Protecting sleep: a cool bedroom, a moisturiser by the bed, and cotton gloves if you scratch at night
- Psychological therapies such as cognitive behavioural therapy, which have helped some people with psoriasis cope better
- Mindfulness or relaxation recordings, if they suit you

## Itch without scratching

- Press, pat or hold something cool against the itch instead of scratching
- Keep nails short
- Keep a moisturiser in the fridge for a cooling effect

## Your mood counts

Depression and anxiety are more common with psoriasis. If you have felt low, hopeless or anxious for more than a couple of weeks, tell your doctor. It is a normal and important part of a psoriasis consultation, and treating your skin well often helps your mood too.
`,
  },
  {
    slug: 'talking-about-psoriasis',
    title: 'Talking about psoriasis: with partners, at work and with your doctor',
    description:
      'What to say, when to say it, and how to make an appointment count. Practical words for intimate relationships, the workplace, and getting the treatment you need.',
    category: 'Mind & mood',
    date: PUBLISHED,
    guide: 'doctor',
    guideLabel: 'Prepare for your next visit',
    refs: [REF.who, REF.nice, REF.mood],
    body: `
Psoriasis is visible, but it is rarely talked about. Finding words for it can make life easier in relationships, at work and in the consulting room.

## With a partner

Many people worry about the first time a partner sees their skin. Explaining before it comes up can take the pressure off: what psoriasis is, that it is not contagious, and what feels sore or sensitive.

- Psoriasis in the genital area is common and rarely mentioned. It is not a sexually transmitted infection
- A gentle lubricant and a barrier cream can make intimacy more comfortable
- It is fine to say what helps and what does not

## At work

You do not have to tell your employer, but some people find it helps.

- Practical adjustments can make a difference: breaks to apply treatment, flexible hours for phototherapy, cotton uniforms, or gloves for wet work
- In many countries, long-term conditions can qualify for workplace adjustments; your doctor or a patient organisation can explain your rights locally
- A short, matter-of-fact explanation usually works best

## With your doctor

Appointments are short. Preparing helps you say what matters.

- Bring photos of your skin at its worst
- Say how psoriasis affects your sleep, work, relationships and mood, not just where it is
- Mention any joint pain, stiffness or nail changes
- List the treatments you have tried, for how long, and what happened
- Ask directly: "Is there something stronger I could try?"

## With yourself

Living with a visible condition takes energy. Support groups, run online and in person by national psoriasis associations, connect you with people who understand without explanation.
`,
  },
]

export type Block = { type: 'p' | 'h2'; text: string } | { type: 'ul'; items: string[] }

/** Turns an article body into blocks. Shared by the page and the prerender script. */
export function parseBody(body: string): Block[] {
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((chunk): Block => {
      const c = chunk.trim()
      if (c.startsWith('## ')) return { type: 'h2', text: c.slice(3) }
      if (c.startsWith('- '))
        return { type: 'ul', items: c.split('\n').map((line) => line.replace(/^- /, '').trim()) }
      return { type: 'p', text: c.replace(/\s*\n\s*/g, ' ') }
    })
}

export const readingMinutes = (a: Article) =>
  Math.max(2, Math.round(a.body.split(/\s+/).length / 200))

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
