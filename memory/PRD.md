# TONAER — B2B White-Label Connectivity Platform Website

## Original Problem Statement
Build the TonAer (formerly "Xunison") B2B technology website as an interactive technology experience: a cinematic WebGL/3D scroll-driven homepage, a full product catalog with gateway comparison, an interactive white-label brand preview, and a complete Careers portal. Premium Apple-launch-meets-NVIDIA feel on a dark enterprise palette.

## Brand Rules (STRICT)
- Company name: **TonAer** — never "Xunison" anywhere (UI, metadata, code labels).
- Primary accent: **Signal Green `#00D084`** (Tailwind token `brand`). Backgrounds stay dark navy / near-black — green is an accent only, never a background wash.
- 3D hardware assets are procedural stand-ins, swappable for real GLB/GLTF via config (no scene rebuild).

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + GSAP ScrollTrigger + Lenis; Three.js via @react-three/fiber v9 + drei. Single fixed WebGL canvas on homepage; hero intelligence hub only.
- Backend: FastAPI + MongoDB (leads) + Emergent Object Storage for resume uploads (NEVER local /uploads — blocked).
- Key data: `/frontend/src/data/catalog.js` (series/products/specs/filters), `/frontend/src/data/careersConfig.js`, `/backend/careers_data.py` (job + application models, demo seeder).

## Key API Endpoints
- `POST /api/leads`, `GET /api/leads` — demo request capture (no auth, demo only)
- `GET /api/jobs`, `GET /api/jobs/{slug}` — careers listings
- `POST /api/applications` — multipart form + resume file → Emergent Object Storage
- `GET /api/health`, `GET /api/status`

## Implemented Features (current state, July 2026)

### Cinematic 3D Homepage
- Hero: abstract intelligence hub (glowing core, orbit rings, nodes, particles) on dark navy; copy "Build Your Network. Own Your Brand." / WHITE-LABEL CONNECTIVITY PLATFORM
- Section flow: HERO → ECOSYSTEM → WHITE-LABEL → PORTFOLIO → CLOUD → INTELLIGENCE → INDUSTRIES → TRUSTED BY → CAPABILITIES → WHY US → REQUEST DEMO → FOOTER
- Full cinematic scroll chapters (Wi-Fi / Network / Telemetry / Cloud / AI / Environment / Ecosystem scenes) remain in `/src/experience/` for a future R&D page — removed from homepage per client IA
- Two-level navigation (Solutions / Products / Technology / Company / Resources dropdowns + Products mega menu + Request Demo CTA), mobile accordion menu
- Loading screen, glass pill nav with scroll progress, lead form → MongoDB (verified e2e)

### Product Catalog & Comparison (`/product`)
- Series tabs (D/M/Q/O) → model cards (mD60, D71, D72, M20, M40, Q20, Q10, O10, O20 — non-D71 names are PLACEHOLDERS) → overview with live-render media viewer (FRONT/SIDE/REAR/DETAIL) → per-model capabilities → expandable 7-group spec table (✓ / — honest values) → compare → related products → CTA
- Comparison 4-step flow: technology filters (AND) + search → matches grouped by series → explicit selection (max 4) → sticky tray → Compare Now reveals categorized table; no-match state with closest matches
- **Highlight Differences toggle** (July 2026): dims identical spec rows, differing rows get subtle Signal Green row highlight; only shown when 2+ gateways compared
- **Dedicated Compare Gateways page `/products/compare`** (July 2026): same `CompareSection` component (single source of truth) shared with /product; deep links `?product=D71` / `?products=D71,M40` preselect valid ids (max 4); View Product links navigate to `/product?series&model`; Products nav dropdown has real Compare Gateways link (Product Selector removed); product page CTA "Compare This Gateway" deep-links to the dedicated page
- `/series/:id` redirects to `/product?series=:id`; URL params make views shareable

### White-Label Brand Preview (homepage)
- 4-step interactive preview: 01 select model (D/M/Q/O) → live 3D turntable → 02 upload logo (PNG/SVG/JPG ≤3MB, decal via alphaTest opaque pass) → 03 device finish → B2B CTAs
- **Per-model casing colors** (July 2026): finishes configurable per series in `BrandPreview.jsx` — D & M: White/Black; Q: Black only; O: none (fixed industrial finish, shows "not available" note). Model switch resets finish to Standard.

### About Page (`/about`, July 2026)
- 12-section editorial company page: hero (masked-line headline + abstract signal-ring evolution visual), Our Story, Our Evolution (5-stage timeline, no invented dates), 6 Values cards, Engineering Mindset (discipline chips), "See the Whole System" (DEVICE→…→EXPERIENCE stack with animated flow connectors), Customer Partnership, TonAer Difference (6), Culture, Vision (large statement), Road Ahead loop, final brand statement with Talk to TonAer / Explore Our Story CTAs
- Nav Company > About Us now routes to /about; CompanyPage about section links to it ("Read our full story"); new CSS utilities `flow-y`, `spin-slow` in index.css

### Light Homepage Redesign (July 2026)
- Homepage rebuilt LIGHT (white/off-white/#F8FAFC rhythm, Signal Green accent): simplified hero ("Every Device. One Intelligent Platform." + D71 render with status chips; WebGL canvas + loading screen removed) → Ecosystem flow → Portfolio showcase (series pills, flagship map d71/m40/q20/o10) → Hardware→Software pipeline → Cloud Platform (illustrative dashboard, marked DEMO DATA) → dark Network Intelligence section → White-Label intro (interactive tool moved to product Look & Feel tab) → Solutions (3 personas + workflow pills) → Why TonAer (5) → TrustedBy (light) → Testimonials (SAMPLE-marked demo data) → Insights teaser → final CTA + lead form
- Nav is theme-aware: light glass on / + /support, dark pill elsewhere; mobile drawer themed too; shrinks on scroll
- Product Detail now 5 tabs (sticky bar, ?tab= param): Overview | Features | Specifications | Compare | Look & Feel — BrandPreview gained fixedSeries prop (no model step, Reset Preview, finish reset on series change, goContact falls back to /#contact)
- MediaViewer min-w-0 mobile fix; design blueprint in /app/design_guidelines.json

### Chapter-Based Homepage v2 (July 2026)
- Full redesign into 12 numbered visual chapters (shared Chapter shell + Kicker "NN / LABEL", max-w-[1240px] grid, py-24/32 rhythm): 01 cinematic hero (dominant D71 render + animated data-flow lines to CLOUD/DATA nodes, video-ready via HERO_VIDEO_URL) → 02 Ecosystem (6-node aligned architecture, animated pulses) → 03 Hardware (big render + real catalog annotations) → 04 Connectivity bridge (dark Gateway→Network→Cloud) → 05 Software (large dashboard + hairline caps) → 06 signature "From Hardware to Intelligence" flow (spine + traveling pulse) → 07 Intelligence (one dark chapter, editorial selectors + DATA→ACTION strip) → 08 Business Value editorial rows (Connect/Manage/Understand/Grow) → 09 Solutions rows + dark white-label band → 10 Proof (TrustedBy + video-first testimonial placeholders "Coming Soon", no fabricated quotes) → 11 Insights editorial teaser → 12 Let's Connect (two-col premium RequestDemoForm: first/last/email/company/phone?/message → POST /api/leads)
- Backend LeadCreate extended: optional phone, message. LeadForm.jsx deleted (replaced by RequestDemoForm)
- Footer reorganized (Products/Technology/Company/Resources). prefers-reduced-motion disables all flow animations (longhands). All grids use grid-cols-1 base (no overflow 320-1920px)

### Design Correction Pass 3 (July 2026)
- ALL kicker labels removed from homepage — every chapter opens directly with its strong navy H2 (Kicker component deleted from Chapter shell). Section padding tightened to py-14/md:py-20, internal margins reduced; TrustedBy strip py-12, proof chapter pt-8 — continuous rhythm, no dead gaps
- Hero main visual is now a LARGE premium video player (16/8 desktop, 16/10 mobile): Sora 2-generated 8s cinematic loop (white gateway, green LED, emerald data rising into cloud) at /videos/hero-connectivity.webm (VP9 first) + .mp4 (H.264) fallback; falls back to 3D HeroStage if both 404. Generation script: /app/backend/generate_hero_video.py. Replace the files with real TonAer footage anytime
- Hero headline has no kicker; green only on "Platform."

### Design Correction Pass 2 (July 2026)
- Hero rethought: copy block top + large full-width cinematic stage (bare close-camera D71 render on technical grid, vertical NETWORK→CLOUD→INTELLIGENCE journey with traveling pulse, TELEMETRY·LIVE marker), video-ready
- Header scaled up (pill py-3.5→2.5 on scroll, text-sm menus, bigger logo/CTA). ALL numeric kicker prefixes removed (green line + 13px semibold uppercase). Green H2 words removed everywhere except hero "Platform." and intelligence "Into Action."
- Dark intelligence chapter = one unified IntelligenceMoment (5-stage spine: Network Data→Analytics→Insights→Intelligence→Action with SVG mini-viz); IntelligenceShowcase.jsx deleted. Connectivity bridge uses real gateway render. Ecosystem nodes simplified (plain icons, no boxes). BrandPreview step labels de-numbered

### Insights / Blog (`/resources/blog`, July 2026)
- Editorial insight hub: compact hero, FEATURED article ("What Comes After Faster Wi-Fi?"), Explore by Topic tiles (map to category filter + scroll), search (title/excerpt/category/tags/author), category chips (AND-combined with search), Latest Insights grid (9 + Load More), Most Read (3 curated via `mostRead` flag, no fake metrics), newsletter in DEMO state (toast, no storage, no POST), final CTA
- Article pages `/resources/blog/:slug`: author byline (TonAer team names only), share (copy link / LinkedIn / X), generative SVG cover per category (CoverVisual.jsx, no stock photos), structured body (Key Concepts / Under the Hood / callout / Business / Practical / Takeaway), tags, related insights (category+tag scoring), 404 state
- Content store `/data/insights.js`: 13 SAMPLE articles (isDemo: true, SAMPLE badges + demo note), status field (published/draft/archived) for future CMS; SEO via `/hooks/useSEO.js` (title, meta description, canonical, OG, JSON-LD Article)
- Nav Resources > Insights / Blog → /resources/blog; Footer Insights link; Support insights card links to blog

### Careers Portal (`/careers`)- Hero, culture/areas sections, searchable + filterable job list (department, category), job detail pages (`/careers/:slug`)
- Application form with resume upload → Emergent Object Storage; reference number returned
- 8 SAMPLE/DEMO jobs seeded with `isDemo: True` → "DEMO POSITION" badge, demo applications flagged and excluded from real recruitment routing
- Intelligent Operations showcase: 4 clickable capability cards with looping animated SVG demos

## Verified
- Rebrand to TonAer + Signal Green confirmed by user (July 2026)
- Careers demo flow verified (8 demo jobs, badges, application POST)
- curl: /api/health, POST+GET /api/leads OK
- Screenshot-tested: homepage, product catalog, comparison flow, brand preview, careers, mobile 390px

## Backlog
- P0: Official D71 GLB drop-in (architecture ready)
- P1: Admin recruitment panel — HR create/edit/close jobs, review applications (backend mock exists; user deferred)
- P1: Deeper mobile choreography, touch tweaks; prefers-reduced-motion section-skip
- P2: Saved shortlist (persist comparison selection via localStorage) — approved, after P1 work
- P2: Branded PDF datasheet download per model (verified specs + TonAer branding) — approved, after core catalog/admin work
- P2: Compare share links (user deferred)
- P2: Bloom/DOF post-processing behind quality gate; leads admin with auth; i18n/SEO/OG/sitemap

## Next Tasks
1. Test casing colors + highlight-differences (this round)
2. Saved shortlist persistence
3. PDF datasheet generation
4. Admin recruitment panel (when user re-prioritizes)
