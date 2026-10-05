# TonAer Homepage Product Brief

## Original problem statement
Create a completely new TonAer homepage from scratch for a premium global telecom + AI + connectivity technology company. The page should be light-theme, video-first, editorial, responsive, and tell the story from connectivity complexity to TonAer’s unified intelligent ecosystem. It must include AI network intelligence, connectivity hardware, operator platform/dashboard, ecosystem, analytics, white-label value, final CTA, and an on-page Talk to Us contact form.

## Architecture decisions
- React single-page marketing experience with reusable `Logo` and `HeroVideo` components and semantic section anchors.
- Hero is architected as a media-first placeholder visual so an MP4/WebM source and poster can replace it without redesigning the content layout.
- FastAPI `POST /api/contact` stores validated lead submissions in MongoDB using the existing environment configuration.
- Visual system uses TonAer teal `#00C7A5`, light editorial surfaces, dark cinematic sections, CSS network visualizations, and the uploaded TonAer showcase asset.

## Implemented
- Premium responsive header with desktop navigation and mobile full-screen menu.
- Full-viewport cinematic hero placeholder with network topology, hero CTAs, and video-ready treatment.
- Editorial brand statement, AI intelligence visualization, connectivity hardware composition, large operator dashboard, ecosystem showcase, analytics visual, white-label operator section, final CTA, and footer.
- Talk to Us modal with required fields, API submission, success state, and visible failure state.
- Responsive mobile layout with no horizontal overflow.
- TonAer page title, description, color metadata, and accessible labels/test IDs.
- Browser and backend regression tests passed; production build and lint passed.

## Prioritized backlog
- P0: Replace the CSS hero placeholder with the final TonAer 18–20 second MP4/WebM video and poster/mobile source.
- P1: Add approved individual TonAer product renders, dashboard screenshot, and topology image as separate optimized assets.
- P1: Connect contact leads to the team’s CRM/email workflow after the destination is selected.
- P2: Add lightweight reveal/parallax motion and a Resources content destination.