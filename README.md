# Neuro Tank · AI Automation Studio

A world-class futuristic website for **Neuro Tank** — an AI automation agency that
builds WhatsApp bots, website AI assistants, lead-gen systems, CRM automations
and AI sales agents for businesses.

Built with **React + Vite + Tailwind CSS v4 + Three.js (R3F + Drei) + Framer Motion + GSAP + Lenis**.

---

## Quickstart

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build (outputs to /dist)
npm run preview   # serve the production build locally
npm run lint      # lint with ESLint
```

> Requires Node 20+. Tested on Node 22.

---

## Tech Stack

| Layer        | Choice                                              |
|--------------|------------------------------------------------------|
| Framework    | React 19 + Vite 8 (rolldown bundler)                 |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite` plugin)         |
| 3D           | Three.js · `@react-three/fiber` · `@react-three/drei`|
| Motion       | Framer Motion · GSAP · Lenis (smooth scrolling)      |
| Routing      | React Router v7                                      |
| Icons        | `react-icons` (Hi2 + Fa6)                            |
| Language     | JavaScript (JSX)                                     |

---

## Folder Structure

```
src/
├── App.jsx                       # router + page transitions (lazy)
├── main.jsx                      # ReactDOM entry
├── index.css                     # Tailwind v4 theme + utilities + animations
│
├── components/
│   ├── common/                   # primitives reused everywhere
│   │   ├── AmbientBackdrop.jsx   # animated gradient + grid + scanlines
│   │   ├── Badge.jsx
│   │   ├── Button.jsx            # primary/ghost/outline + magnetic + shine
│   │   ├── Container.jsx
│   │   ├── GlassCard.jsx         # glassmorphism + gradient border + glow
│   │   ├── Logo.jsx              # animated neuro-tank brand mark
│   │   ├── PageHeader.jsx        # inner-page header pattern
│   │   ├── PageLoader.jsx        # route fallback loader
│   │   ├── Reveal.jsx            # scroll-into-view animation wrapper
│   │   ├── Section.jsx           # standardized spacing wrapper
│   │   └── SectionHeader.jsx     # eyebrow + title + description
│   │
│   ├── layout/                   # global chrome
│   │   ├── Footer.jsx            # newsletter + social + giant wordmark
│   │   ├── Layout.jsx            # mounts Lenis + Navbar + Footer
│   │   └── Navbar.jsx            # floating glass nav + animated active pill
│   │
│   ├── sections/                 # composable page sections
│   │   ├── Hero.jsx              # 3D neural core + headline + CTAs + marquee
│   │   ├── Services.jsx
│   │   ├── Industries.jsx
│   │   ├── HowItWorks.jsx        # scroll-driven timeline
│   │   ├── LiveDemo.jsx          # animated WhatsApp phone mockup
│   │   ├── WhyUs.jsx             # comparison table + stat cards
│   │   ├── Testimonials.jsx      # auto-rotating carousel + logos
│   │   ├── Pricing.jsx           # 3 plans with billing toggle
│   │   ├── FAQ.jsx               # animated accordion
│   │   └── FinalCTA.jsx          # cinematic conversion section
│   │
│   ├── three/                    # 3D scenes (lazy-loaded)
│   │   ├── SceneCanvas.jsx       # shared R3F Canvas wrapper
│   │   ├── HeroScene.jsx         # composes NeuralCore + lighting + env
│   │   ├── NeuralCore.jsx        # the holographic AI orb centerpiece
│   │   ├── AmbientParticles.jsx  # background particle field
│   │   └── FloatingOrb.jsx       # small decorative orb
│   │
│   └── ui/                       # complex UI building blocks
│       ├── ChatPhone.jsx         # animated 3D phone with typed convo
│       ├── ServiceCard.jsx       # tilt + glow + bullets
│       └── IndustryCard.jsx      # animated industry tile
│
├── pages/                        # route components
│   ├── Home.jsx
│   ├── ServicesPage.jsx
│   ├── IndustriesPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   └── NotFound.jsx
│
├── data/                         # single source of truth for content
│   ├── navigation.js             # nav links + company info
│   ├── services.js               # the 8 service offerings
│   ├── industries.js
│   ├── process.js                # "how it works" steps
│   ├── demo.js                   # live chatbot conversations
│   ├── testimonials.js
│   ├── pricing.js
│   ├── faqs.js
│   └── stats.js                  # comparison + numbers
│
├── hooks/                        # reusable React hooks
│   ├── useLenisScroll.js         # mounts Lenis smooth scroll
│   ├── useMagnetic.js            # subtle magnetic hover for buttons
│   ├── useMediaQuery.js          # + useIsMobile / usePrefersReducedMotion
│   └── useTilt.js                # 3D tilt on hover for cards
│
└── utils/
    └── cn.js                     # clsx-based className helper
```

---

## Design System (`src/index.css`)

Everything is centralized in `index.css` using Tailwind v4's `@theme` block, so the brand can be retuned in one place:

- **Color tokens**: `ink-*` (deep neural-grey base) + `neon-*` cyan + `violet-*` + `magenta-*` + `lime-*`
- **Fonts**: `font-sans` (Inter), `font-display` (Space Grotesk), `font-mono` (JetBrains Mono)
- **Animations**: `float`, `pulseGlow`, `orbit`, `shimmer`, `gradient`, `scan`, `marquee`, `blink`
- **Utilities**: `.glass`, `.glass-strong`, `.gradient-border`, `.shine`, `.text-gradient`, `.bg-grid`, `.bg-dot`, `.mask-fade-y`, `.mask-fade-x`, `.scrollbar-hide`, `.preserve-3d`
- **Honors `prefers-reduced-motion`** globally

---

## Performance Optimizations

- **Code splitting**: Three.js (~960KB) is in its own chunk and only loads when 3D scenes mount.
- **Lazy routes**: Every page is a lazy import; only the Home shell loads on first hit.
- **Conditional 3D**: Hero and Final CTA detect `prefers-reduced-motion` and mobile breakpoints and gracefully degrade to pure CSS / blurred gradient fallbacks.
- **Adaptive DPR + PerformanceMonitor** (drei) automatically scales down pixel density on weaker GPUs.
- **Suspense boundaries** keep the layout stable while 3D loads.
- **Vite manual chunks** isolate `three`, `fiber`, `motion`, and `router` so navigations don't re-download common deps.

---

## Accessibility

- Keyboard focus rings on all interactive elements
- `aria-label` on icon-only buttons
- `aria-expanded` on disclosure widgets (FAQ, mobile menu)
- `prefers-reduced-motion` honored at the CSS level for every keyframe + Lenis is skipped
- Semantic HTML throughout (`header`, `nav`, `main`, `section`, `footer`, `figure`, `blockquote`)
- Color contrast on body text passes WCAG AA

---

## Sections Map (Home)

1. **Hero** — 3D neural core, dual CTAs, floating holographic tags, marquee trust strip.
2. **Services** — 8 service cards with tilt, glow, gradient borders, bullet lists.
3. **Industries** — 8 industry tiles with orbiting 3D dot + workflow chips.
4. **How It Works** — scroll-driven timeline with center progress line.
5. **Live Demo** — interactive WhatsApp phone with typed-out conversations across 4 industries.
6. **Why Us** — stat cards + comparison table (Traditional vs Neuro Tank).
7. **Testimonials** — auto-rotating carousel + animated logo marquee.
8. **Pricing** — 3 plans, monthly/yearly toggle, highlighted "Most Popular".
9. **FAQ** — 8 animated accordion items.
10. **Final CTA** — cinematic background with ambient particle field + dual CTAs.

---

## Customization Cheat-Sheet

- Rebrand colors: edit `@theme` block in `src/index.css`.
- Replace copy/content: edit files in `src/data/`.
- Add a new section: drop a component in `src/components/sections/` and import in `Home.jsx`.
- Add a new page: create `src/pages/MyPage.jsx`, add a route in `App.jsx`, add a link in `data/navigation.js`.

---

© Neuro Tank — All rights reserved.
