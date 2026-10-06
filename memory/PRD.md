# TonAer Homepage Product Brief

## Original problem statement
Create a completely new TonAer homepage from scratch for a premium global telecom + AI + connectivity technology company. The page should be light-theme, video-first, editorial, responsive, and tell the story from connectivity complexity to TonAer’s unified intelligent ecosystem. It must include AI network intelligence, connectivity hardware, operator platform/dashboard, ecosystem, analytics, white-label value, final CTA, and an on-page Talk to Us contact form. Latest direction (V3): treat the two uploaded product assets as large interactive storytelling elements, center the hero, no generic card grids — executed in stages with user sign-off per section.

## Architecture decisions
- React single-page marketing experience; Hero, Header and ContactModal are isolated components under `src/components/` so the final brand video can drop in without restructuring.
- Hero is video-ready: `HERO_VIDEO_URL` constant in `Hero.jsx` swaps the animated cinematic placeholder for the final 15–20s TonAer film (poster already wired).
- Real TonAer logo art processed from the user-supplied master into transparent horizontal lockups (dark + white variants) and an SVG-quality PNG favicon, stored in `frontend/public/assets/`.
- Motion system: framer-motion (masked line-by-line hero reveal, intro wipe, micro-interactions) + lenis smooth momentum scrolling with anchor delegation.
- FastAPI `POST /api/contact` stores validated lead submissions in MongoDB using the existing environment configuration.
- Visual system uses TonAer teal `#00C7A5`, light editorial surfaces, dark cinematic sections.

## Implemented
- 2026-10-06 (V3 stage 1 — Hero + Header, user-approved scope):
  - Full-viewport cinematic hero: centered headline with masked line-by-line reveal, brand-film intro moment (signal mark pulse + wipe), photographic teal-graded backdrop with slow ken-burns, parallax on scroll, floating 5G/eSIM/Wi-Fi 7/MESH node pills, film grain, rgba(0,0,0,.35) overlay with stronger radial behind text, scroll hint, slow editorial marquee strip.
  - Premium header: real TonAer logo (white variant on dark hero, dark variant on scroll), no numbered prefixes, glass light state on scroll, full-screen staggered mobile menu.
  - Lenis smooth scrolling across the page; anchor links glide.
  - Favicon + apple-touch-icon from the real TonAer signal mark.
- Earlier (V1): header/nav, editorial statement, AI intelligence visualization, connectivity hardware composition, operator dashboard mock, ecosystem showcase, analytics visual, white-label section, final CTA, footer, Talk to Us modal (API submission, success + visible failure states), responsive layout, regression tests passed.

## Prioritized backlog
- P0 (awaiting hero approval, then next stage): AI/Platform section featuring `TonAer Smart Network Dashboard.png` large (60–75%) with floating indicators, connector lines, glow pulses, dark teal backdrop.
- P0: Connectivity/Devices section featuring `TonAer Smart Gateway Ecosystem.png` with positioned glow/spotlight hover highlights (5G, eSIM, Wi-Fi 7, Tri-Band, EasyMesh, Cloud Managed, End User Mobile App).
- P0: Drop in the final TonAer 15–20s brand film into `HERO_VIDEO_URL` when delivered.
- P1: Global density polish on remaining sections — pills, floating indicators, micro-panels; remove `/ 02`-style labels; Platform Capability Strip; dark Network Topology section with animated paths.
- P1: Connect contact leads to the team’s CRM/email workflow after the destination is selected.
- P2: Resources content destination.
