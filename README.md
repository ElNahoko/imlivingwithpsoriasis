# I'm living with psoriasis

An interactive guide for the 125 million people who live with psoriasis, and for
the people who love them.

Psoriasis is explained badly almost everywhere. Either it is a wall of clinical
text, or it is a stock photo of an elbow. This is an attempt at something
kinder: a body you can turn around, plaques you can tap, and plain answers to
the questions people actually ask. Why here? What sets it off? What should I
eat? What do I say to my partner? What do I tell my doctor next week?

It is free, open source, and it never sends your data anywhere. The skin diary
and your daily habits stay in your own browser.

## What's inside

- **A body you can explore.** A real 3D anatomical model with the eight places
  psoriasis appears most. Tap a plaque to learn what it looks like there, why
  that spot in particular, and what actually helps.
- **How it works.** Two skin clocks side by side: 28 days on healthy skin, four
  on psoriasis. Then the immune chain from trigger to plaque.
- **Flare triggers.** Twelve weighted switches. Turn on your week, see the risk.
- **Stress and skin.** The brain-to-skin pathway, and a two-minute breathing
  exercise for when you need it.
- **Food and drink.** Sixty foods across ten categories, each with the reasoning,
  plus a plate guide, a weekly rhythm and eight honest swaps.
- **Daily habits, treatments and a flare plan.** The routine, the ladder from
  creams to biologics, and what to do in the first hours of a flare.
- **A skin diary and doctor visit prep.** Twenty seconds a day becomes the chart
  and the summary your dermatologist actually wants to see.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To build for production: `npm run build`. The output in `dist/` is a static
site. It deploys to Vercel, Netlify or GitHub Pages with no configuration and no
server.

## Built with

React and TypeScript, [Vite](https://vite.dev), [Mantine](https://mantine.dev)
for the interface, and [React Three
Fiber](https://docs.pmnd.rs/react-three-fiber) with
[three.js](https://threejs.org) for the body. The 3D model is the
[MakeHuman](http://www.makehumancommunity.org/) base mesh, released as CC0.

```
src/
  data/         the content: sites, triggers, foods, clinical notes, sources
  components/   the 3D scene and the app chrome
  sections/     one file per section of the guide
```

The medical content is written from the sources listed inside the app, under
*Sources and credits*: the WHO global report, The Lancet and BMJ reviews, NICE
and American Academy of Dermatology guidance, and the published work on diet,
weight, smoking, stress and comorbidity.

## Please read this part

This is an educational guide. It is not medical advice, it cannot examine you,
and it does not know your history. Nothing here should be used to start, stop or
change a medicine. If your skin, your joints or your mood are getting worse,
please talk to a doctor.

If something in here is wrong, or reads unkindly to someone who has this
condition, open an issue. That kind of correction is the most useful thing you
can contribute.

## Licence

MIT. Use it, fork it, translate it, put it in front of people who need it.
