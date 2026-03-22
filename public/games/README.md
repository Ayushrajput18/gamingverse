# Game Media Assets

## Required files per game

Each game folder should contain:

```
public/games/{slug}/
├── cover.jpg          # 1200×900px minimum — used in game hero + cards
├── hero.jpg           # 1920×1080px — full-screen game hero background
├── og.jpg             # 1200×630px — social share card
└── trailer.mp4        # optional — 15-30s looping atmospheric clip
```

## Wiring up

In `src/lib/data.ts`, add to each game object:
```ts
imageSrc: '/games/ember-throne/hero.jpg',
videoSrc: '/games/ember-throne/trailer.mp4',  // optional
```

MediaBackground will automatically:
- Use video if provided (falls back to image on autoplay block)
- Use image if no video
- Fall back to CSS gradient if neither exists

## Recommended tools
- Midjourney / DALL-E 3 for concept art
- Canva / Figma for OG cards
- HandBrake to compress .mp4 to web-safe size (< 10MB for trailer)
