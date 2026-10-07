# TonAer Homepage Product Brief

## Original problem statement
Create a completely new TonAer homepage from scratch for a premium global telecom + AI + connectivity technology company. Light-theme, video-first, editorial, responsive; story arc from connected world → operator complexity → one intelligent platform → device/network management → 5G/eSIM/Wi-Fi 7/Tri-Band → EasyMesh → telemetry → AI troubleshooting/optimization/forecasting → threat detection → analytics → white-label → better operator + customer experience. V3: real product assets (dashboard, ecosystem art) as large interactive storytelling elements, centered video hero, no generic card grids, high information density, alternating light/dark-teal rhythm.

## Architecture decisions
- React single-page experience; every homepage section is its own component under `src/components/` (Hero, Header, Statement, ProblemSection, PlatformOverview, PlatformShowcase, PlatformFeatures, GatewaySection, EcosystemSection, EasyMeshSection, EcosystemIntegration, AIIntelligence, OperationsSection, SecuritySection, AnalyticsSection, LayeredPlatform, WhiteLabelSection, BusinessValue, AdvantageSection, FinalCTA, ContactModal) with a shared design system in `components/home.css`.
- Hero plays the final user-supplied TonAer brand film (`HERO_VIDEO_URL` in Hero.jsx) with poster + error fallback; hero/header are approved — do not redesign.
- Real TonAer logo art processed into transparent horizontal lockups (dark + white) + favicon; dashboard and ecosystem PNGs stored locally in `frontend/public/assets/` (`dashboard.png` full composition, `dashboard-ui.png` clean UI crop, `ecosystem.png`, `gateway.png` product crop).
- Motion: framer-motion scroll reveals + lenis smooth scrolling with anchor delegation.
- FastAPI `POST /api/contact` stores validated leads in MongoDB.

## Implemented
- 2026-10-07 (V4 structural correction — 10 major sections, per user spec):
  - Hero (approved, untouched) → BrandStatement → OperatorProblem (4 cards) → PlatformSection (dark: large real dashboard + 6 capability cards with micro-visuals, one environment) → HardwareSection (gateway render + 7 capability items + interactive ecosystem spotlight explorer + EasyMesh path & cards, all one section) → EcosystemIntegration (7-step journey) → AIIntelligence (dark: conversational TonAer AI Copilot — operator question → AI analysis with root cause + recommended action, account health forecast timeline Healthy→Watch→Risk, real-time intelligence panel, network trace Customer→Gateway→Mesh→Issue, 6 compact AI cards; marked illustrative) → OperationsSection (integrated security flow + 6 live-look cards + analytics board, one section) → BusinessSection (white-label flow in dark inner panel + 4 business-value cards) → FinalCTA.
  - Section padding tightened to 96px/64px; no repeated dark bands, no cards-as-sections, duplicates removed (dropped standalone hub-spoke, layered stack, advantage formula, separate security/analytics/gateway/ecosystem sections).
  - Fixed Reveal component to forward data-testid/rest props.
- Earlier: hero video integration, ecosystem interactivity, contact modal with API + failure states.
- Verified: every section screenshotted desktop + 375px mobile; hero video playing; contact API 200 post-rebuild.

## Prioritized backlog
- P1: Gateway product render cleanup (current crop retains faint artwork wave edges) — replace with a dedicated render if supplied.
- P1: Connect contact leads to CRM/email workflow once destination is chosen.
- P2: Resources content destination (nav item currently anchors to analytics).
- P2: Reduced-motion fallbacks for marquee/animations.
