# I'm living with psoriasis

An interactive, single-screen guide to understanding and managing psoriasis: a real 3D human body with clickable plaque sites, a skippable guided tour, flare triggers, food by category, daily habits, treatments, a flare plan, stress and breathing, a skin diary, doctor visit prep, and sources.

**This is an educational guide, not medical advice.** Always confirm with your dermatologist.

## Deploy

It is one static file, `index.html`, with no build step. On Vercel: import the repository, leave the framework preset as **Other**, and deploy.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Credits

- Body model: [MakeHuman](http://www.makehumancommunity.org/) base mesh, CC0
- 3D: [three.js](https://threejs.org/) (MIT), loaded from jsDelivr
- Typefaces: Lexend and Source Sans 3 via Google Fonts (OFL)
- Sources for the medical content are listed inside the app under *Sources & credits*
