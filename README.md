# Kaelix — Site

The full Kaelix site: an immersive, scroll-driven 3D entrance that assembles
KAELIX out of chaos, flowing continuously into a CoMinVi-style narrative of
sections (About, Services, Materials, Capabilities, Work, Clients, Contact).

Brand: obsidian + Kaelix green, Clash Display / Satoshi / IBM Plex Mono.

Stack: React + Vite, Three.js (R3F + drei + postprocessing), GSAP ScrollTrigger,
Lenis smooth scroll.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints and scroll.

```bash
npm run build
npm run preview
```

## Structure

```
src/
  App.jsx                     Entrance + all sections
  entrance/                   The scroll-driven 3D entrance
    core.js                   shared progress + math + field
    letterTargets.js          samples KAELIX glyphs into 3D points
    Particles.jsx             chaos stream → assembles the KAELIX letters
    NetworkLines.jsx          wires the glyphs as order emerges
    Structures.jsx            impossible architecture (beams/slabs/monoliths)
    CameraController.jsx       weaving scroll-driven camera arc
    EntranceScene.jsx          fog, lights, systems, post
    Entrance.jsx              fixed canvas + scroll rig + handoff to site
    entrance.css
  components/                  the site sections + nav/cursor/grain/smooth-scroll
  styles/global.css           brand tokens
public/fonts/                 ArchivoBlack (entrance wordmark), Anton (spare)
```

## Tuning the entrance

- Length / pace: `ENTRANCE_VH` in `entrance/Entrance.jsx` (560 ≈ ~10s).
- Phase timing (where chaos flips to order): `computeField` in `entrance/core.js`.
- Camera journey: the `CAM` keyframes in `entrance/CameraController.jsx`.
- Breakthrough drama: fog `far` range in `entrance/EntranceScene.jsx`.
- KAELIX size / legibility: `worldWidth`/`worldHeight` in the `sampleWord` call
  in `Entrance.jsx`, and the `0.64` letter/ambient split in `Particles.jsx`.

## Notes

- Clash Display + Satoshi load from Fontshare; IBM Plex Mono from Google Fonts.
- The entrance canvas pauses when scrolled past and fades to a faint backdrop
  so the hand-off into the site reads continuous (no cut / fade-to-black).
- Reduced-motion users get a calm static KAELIX masthead, then the site.
- The large JS chunk is expected (Three.js + postprocessing).
