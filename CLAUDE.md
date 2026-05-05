# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (defaults to :3000, falls back to :3001)
npm run build    # production build — run this to catch type + lint errors before finishing
npm run lint     # ESLint via next lint
npm start        # serve production build
```

There are no tests. The build (`npm run build`) is the primary correctness check — it runs TypeScript and ESLint together.

## Environment variables

Create a `.env.local` at the project root:

```
NEXT_PUBLIC_API_BASE_URL=<api origin>
NEXT_PUBLIC_API_KEY=<key>
```

Both are required. The app will throw at runtime if either is missing.

## Architecture

**Next.js 14 App Router** — everything lives in `app/`. No `src/` directory. `app/page.tsx` is the homepage; it imports and composes section components in order.

**Fonts** — `Instrument Serif` (variable `--font-instrument-serif`) for headings, `Inter` (variable `--font-inter`) for body. Loaded via `next/font/google` in `app/layout.tsx`. Use `font-serif` / `font-sans` Tailwind utilities — do not reference font variables directly in components.

**Color tokens** — defined in `tailwind.config.ts` under `theme.extend.colors.brand`. Use these everywhere instead of raw hex:

| Token | Hex | Role |
|---|---|---|
| `brand-bg` | `#FAFAF8` | page background |
| `brand-ink` | `#1A1A1A` | primary text |
| `brand-saffron` | `#F5A623` | accent / CTA / highlights |
| `brand-teal` | `#1B6B5A` | secondary accent |
| `brand-muted` | `#E8E4DC` | card backgrounds, dividers |
| `brand-muted-2` | `#D4CFC5` | borders |

**Data layer** — the app talks to a REST API (POST requests with `application/x-www-form-urlencoded`). All API functions live in `lib/api/tours.ts`. Data fetching uses **TanStack Query v5** — hooks are in `hooks/useTours.ts`. `QueryProvider` wraps the app in `app/layout.tsx`.

Key API endpoints:
- `POST /meta-cities` — returns `City[]` for a given `CountryID`
- `POST /tours-list` — paginated tour list for a city; returns `[Tour[], [{TotalRecordCount}]]`

**Scroll animations** — `hooks/useScrollAnimation.ts` returns a `ref` that adds a `reveal` CSS class when the element enters the viewport. Attach it to the outer element of any new section. The `reveal` / `reveal.visible` classes are defined in `globals.css`.

**Static assets** — all images are in `public/Assets/`:
- `Assets/Screens/` — actual app screenshots (use for UI mockups)
- `Assets/Amy_Style_Assets/` + `Assets/Amy_Style_Assets/Widgets/` — styled app screenshots
- `Assets/LeWalk_style_Assets/` — Indian landmark photos and decorative elements (`asset-01.png` through `asset-11.png`)
- `Assets/Logo.png` — app logo

Always use `next/image` (`<Image>`) for these, never `<img>`.

**Reusable CSS classes** (defined in `globals.css`):
- `.section-label` — small all-caps label above section headings
- `.section-headline` — large serif heading
- `.pill-btn` — base for rounded pill buttons (add color classes on top)
- `.marquee-track` — infinite horizontal scroll container
