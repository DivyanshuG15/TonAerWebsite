# XUNISON — 3D Technology Story Homepage

## Original Problem Statement
Build the Xunison homepage as an interactive technology experience (NOT a normal website): a continuous WebGL/3D scroll-driven narrative — D71 gateway → Wi-Fi → Connected Devices → Network → Telemetry → Cloud → AI → Environmental Intelligence → Ecosystem/CTA. Cinematic camera, purposeful particles, tri-band visualization, AI anomaly story (observe → understand → act), R&D environmental sensing (privacy-safe, no surveillance), dramatic zoom-out finale, loading experience, reduced-motion + mobile fallbacks, premium Apple-launch-meets-NVIDIA feel.

## User Choices (2026-08-29)
- No official D71 3D model — procedural premium stand-in built in code, swappable for GLB via `modelUrl` prop (no scene rebuild)
- Visual tone: follow brief exactly (white → soft blue → midnight navy → light)
- Performance: balanced, adaptive quality + strong mobile fallback
- Full nav with Product / Technology / Support pages
- Awwwards-level craft: masked line-by-line reveals, numbered chapters, editorial marquee, framer-motion + lenis

## Architecture
- Frontend: React 19 + @react-three/fiber v9 + drei + three; GSAP ScrollTrigger central progress (0..1) + Lenis momentum scroll; framer-motion UI reveals
- Single fixed WebGL canvas; all 8 scenes coexist at origin and crossfade via `useSceneFader(start, end)` driven by `scrollStore.progress`
- Camera: keyframed cinematic path (CameraRig) with smoothstep interpolation + damped lerp + subtle pointer parallax
- Background color interpolated from BG_STOPS per progress (canvas scene.background + body)
- Adaptive quality: device detection (mobile/reduced-motion) scales particle counts, DPR, shadows; runtime FPS monitor steps DPR down
- Backend: FastAPI + MongoDB — POST/GET /api/leads (demo requests), /api/health, /api/status
- Pages: / (experience), /product (live D71 render + specs), /technology, /support

## Key Files
- frontend/src/experience/: store.js, ScrollRig.jsx, ExperienceCanvas.jsx, CameraRig.jsx, D71.jsx, Particles.jsx, sceneUtils.js, HeroScene, WifiScene, NetworkScene, TelemetryScene, CloudScene, AIScene, EnvironmentScene, EcosystemScene
- frontend/src/components/: Nav, LoadingScreen, Chapter (MaskedLine/HudLabel), Marquee, LeadForm, Footer, ProductVisual
- frontend/src/pages/: HomePage, ProductPage, TechnologyPage, SupportPage

## Implemented (2026-08-30, update 4)
- Hero redesigned as centered immersive composition on dark navy: eyebrow "CONNECTED INTELLIGENCE", headline "Every Device. / One Intelligent Platform." (cyan accent on "Intelligent"), centered supporting copy, primary CTA "Explore the Platform" (smooth-scrolls into chapter 02), secondary CTA "Learn More" (→ /technology), minimal centered scroll cue
- Hero 3D scene replaced: abstract intelligence hub (glowing core, two slow orbit rings, 9 quiet nodes, faint links, ~300 dust particles, slow pulse) positioned lower-center behind/below content
- D71 product reveal moved into the Smart Wi-Fi chapter (field now emanates from the device on a light studio bg); hero camera changed to slow centered push-in; background timeline starts dark navy and dawns into light at the Wi-Fi chapter

## Implemented (2026-08-29, update 3)
- Dedicated series detail pages at /series/d, /series/m, /series/q, /series/o — each with its own live 3D device variant (parameterized body/panel/LED/logo colors, vent count, SIM tray on Q), full spec sheet (10 rows), feature trio, "Built to your market" CTA, and a cross-series lineup nav
- D71 device component now parameterized (bodyColor, panelColor, logoColor, vents, ports, simTray) — variants: D flagship white, M value grey, Q cellular green-LED + SIM tray, O ruggedized slate + amber LED
- SeriesGrid cards on Products page now link to their detail pages with EXPLORE affordance

## Implemented (2026-08-29, update 2)
- Product lineup expansion: D / M / Q / O series grid (D71 flagged as LATEST flagship), "Built to order" B2B customization section (e-SIM, physical SIM failover, FXS telephone port, regional band plans, operator firmware, casing/branding), TrustedBy client strip (Earthlink, Orangeburg IQ, Hitron, STC) on Product page + homepage after the experience
- Nav/Footer relabeled "Products"
- D71 spec grid extended with CELLULAR (e-SIM + SIM) and VOICE (FXS) rows

## Implemented (2026-08-29)
- Full 8-scene scroll experience with branded loading screen (XUNISON + signal pulse + counter)
- Procedural D71 (unibody, vents, ports, pulsing cyan LED, logo dot) with GLB swap architecture
- Tri-band Wi-Fi particle shells (amber/cyan/violet) + 5→20→50 device density growth + links
- Network topology with data pulses traveling device → D71 → cloud
- Telemetry point field morphing from noise into organized waveforms
- Cloud convergence vortex + core
- AI anomaly story: normal → rose anomaly pulse → analysis ring → neighbor analysis → emerald optimization path → heal
- Environmental R&D room: furniture, TV, mini D71 (green LED), moving silhouette, ripple-reactive sensing field, expanding rings
- Ecosystem zoom-out finale (49 home nodes → cloud) resolving to CTA + TODAY/NOW/NEXT manifesto
- Lead capture form → MongoDB (verified e2e with toast)
- Editorial marquee, glass pill nav with scroll progress bar, footer
- Product page live-render D71 studio visual; Technology numbered chapters; Support FAQ

## Verified
- curl: /api/health, POST+GET /api/leads OK
- Screenshots: hero, wifi, network, telemetry, cloud, AI, environment, ecosystem, finale, lead-form e2e, product page, mobile 390px hero+wifi
- Fixed: band() edge math (hero/ecosystem invisible), square→round particle sprites, additive wash-out on light bg, finale headline reveal (useInView), env room contrast/composition

## Backlog
- P0: Official D71 GLB drop-in when asset exists (architecture ready)
- P1: Interactive D71 hotspots (hover Wi-Fi 7 / Tri-Band / Smart Network callouts)
- P1: Deeper mobile choreography (shorter camera sequences), touch-specific tweaks
- P1: prefers-reduced-motion section-skip nav tabs
- P2: Depth of field / bloom post-processing pass on high-tier GPUs
- P2: Admin view for /api/leads with auth
- P2: i18n, SEO meta/OG tags, sitemap
- P2: WebGPU renderer probe when stable in three

## Next Tasks
1. Drop in official D71 GLB + hotspot callouts
2. Post-processing polish (bloom/DOF) behind quality gate
3. SEO + OG share card
4. Leads admin with auth
