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
- 2026-10-06 (V3 full rebuild below hero, per user spec):
  - Hero (approved, untouched): video background, centered masked-reveal headline, intro moment, marquee, overlay.
  - S1 Brand statement with animated network lines; S2 Operator problem (4 varied editorial cards); S3 TonAer answer (dark hub-and-spoke with animated paths to MSO/ISP, Network, AI, Operations, Devices, Users, Analytics); S4 Platform showcase (real dashboard UI, large, perspective reveal, live browser chrome + floating KPI chips); S5 Six platform capability cards in varied bento sizes with micro-visuals (chains, meters, flows, charts); S6 Gateway product with real device render + 7 capability items; S7 Interactive smart-home ecosystem (spotlight hotspots + chip rail); S8 EasyMesh (dark, animated gateway→nodes→users path + 3 cards); S9 Existing-ecosystem integration journey (7-step connected flow, TonAer hub highlighted); S10 AI intelligence (dark, full dashboard composition + floating AI callouts + 6 AI cards); S11 Real-time operations (6 live-look mini dashboards, marked illustrative); S12 Security (dark radar visual + 4 cards); S13 Analytics board (charts, donut, trends, AI insights — illustrative); S14 Layered platform stack; S15 White-label flow (Operator → TonAer → Customer); S16 Business value (4 large cards); S17 TonAer advantage formula (= TONAER); Final CTA + footer.
  - Header nav now: Platform, AI, Connectivity, Devices, Solutions, Resources, About + Talk to Us; no numbered labels anywhere.
- Earlier: hero video integration, ecosystem interactivity, contact modal with API + failure states.
- Verified: all 18 sections screenshotted on desktop; key sections on 375px mobile; hero video confirmed playing; contact API 200 post-rebuild.

## Prioritized backlog
- P1: Gateway product render cleanup (current crop retains faint artwork wave edges) — replace with a dedicated render if supplied.
- P1: Connect contact leads to CRM/email workflow once destination is chosen.
- P2: Resources content destination (nav item currently anchors to analytics).
- P2: Reduced-motion fallbacks for marquee/animations.
