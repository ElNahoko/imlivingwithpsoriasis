# I'm living with psoriasis

An interactive guide for the 125 million people who live with psoriasis, and for
the people who love them.

Psoriasis gets explained badly almost everywhere. Either it is a wall of
clinical text, or it is a stock photo of an elbow. This is an attempt at
something kinder: a body you can turn around, plaques you can tap, and plain
answers to the questions people actually ask. Why here? What sets it off? What
should I eat? What do I say to my partner? What do I tell my doctor next week?

It is free, it is open source, and nothing you enter leaves your browser.

## What's inside

**A body you can explore.** A real anatomical model with the eight places
psoriasis appears most often. Tap a plaque to read what it looks like there, why
that spot in particular, and what actually helps. Sites you have visited get
marked on the skin.

**A skin cross-section you can turn around.** The disease is a speed problem, so
the app shows it as one: cells born at the basal layer, rising, flattening,
losing their nucleus, shedding. Switch to psoriasis and the same block rebuilds
in four days instead of twenty-eight, the spinous layer swells, the granular
layer nearly vanishes, capillaries climb and dilate, and scale piles up on top.

**The rest of it.** Twelve weighted flare triggers, the stress pathway with a
breathing exercise, sixty foods across ten categories with the reasoning for
each, a daily habit routine, the treatment ladder from creams to biologics, a
flare plan, the whole-body checks worth keeping up, a skin diary, and a doctor
visit prep sheet built from whatever you have logged.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | dev server with hot reload          |
| `npm run build`     | typechecks, then builds into `dist` |
| `npm test`          | unit tests                          |
| `npm run lint`      | ESLint                              |
| `npm run typecheck` | TypeScript, no emit                 |

`dist` is a static site. It deploys to Vercel, Netlify or GitHub Pages with no
configuration and no server.

## How it is put together

```
src/
  data/         content: body sites, triggers, foods, skin layers, clinical notes, sources
  lib/          pure logic: dates, seeded randomness, the doctor summary, tour steps
  components/   the two 3D scenes and the app chrome
  sections/     one file per section, wired together by a registry
  store.ts      app state, with the diary and habits persisted locally
```

Content lives in `data/` as typed modules, so adding a food or a body site is a
data change rather than a component change. Anything with real logic in it lives
in `lib/` as a pure function, which is why the doctor summary and the date
handling can be unit tested without rendering anything.

Both 3D scenes are declarative React Three Fiber. Randomness is seeded, so a
render is reproducible and the components stay pure. The camera in each scene
frames itself from the actual geometry rather than from hand-tuned constants,
because a psoriatic skin block is nearly twice as tall as a healthy one and
would otherwise grow straight out of frame.

Built with React, TypeScript, [Vite](https://vite.dev),
[Mantine](https://mantine.dev), [React Three
Fiber](https://docs.pmnd.rs/react-three-fiber) and
[three.js](https://threejs.org). The human model is the
[MakeHuman](http://www.makehumancommunity.org/) base mesh, released as CC0.

A note on versions: TypeScript is pinned to 5.x rather than 7, because
typescript-eslint refuses to run under 7 and working lint rules are worth more
here than being early.

## Where the medical content comes from

The sources are listed in the app itself, under _Sources and credits_: the WHO
global report on psoriasis, reviews in The Lancet and the BMJ, NICE and American
Academy of Dermatology guidance, and the published work on diet, weight,
smoking, stress and comorbidity. Figures are rounded, and the app says so.

## Please read this part

This is an educational guide. It is not medical advice, it cannot examine you,
and it does not know your history. Nothing here should be used to start, stop or
change a medicine. If your skin, your joints or your mood are getting worse,
talk to a doctor.

If something in here is wrong, or reads unkindly to someone who has this
condition, please open an issue. That correction is the most useful thing anyone
can contribute.

## Licence

MIT. Use it, fork it, translate it, put it in front of people who need it.
