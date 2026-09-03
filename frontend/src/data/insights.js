// TonAer Insights — content store.
// All current entries are SAMPLE / DEMONSTRATION content (isDemo: true).
// Real editorial content can replace these without changing page structure:
// set status: 'published' and isDemo: false. Only 'published' articles render publicly.

export const CATEGORIES = [
    'Connectivity',
    'Wi-Fi',
    'Networking',
    'Network Intelligence',
    'Cloud & SaaS',
    'AI & Intelligence',
    'IoT',
    'Product & Engineering',
    'Industry',
    'Company',
];

// Topic tiles on the listing page — each maps to a category filter.
export const TOPICS = [
    { id: 'wifi-wireless', label: 'Wi-Fi & Wireless', category: 'Wi-Fi' },
    { id: 'network-intelligence', label: 'Network Intelligence', category: 'Network Intelligence' },
    { id: 'cloud-device-management', label: 'Cloud & Device Management', category: 'Cloud & SaaS' },
    { id: 'ai-automation', label: 'AI & Automation', category: 'AI & Intelligence' },
    { id: 'iot', label: 'IoT', category: 'IoT' },
    { id: 'connectivity-engineering', label: 'Connectivity Engineering', category: 'Product & Engineering' },
    { id: 'industry-insights', label: 'Industry Insights', category: 'Industry' },
    { id: 'product-technology', label: 'Product & Technology', category: 'Connectivity' },
];

export const ARTICLES = [
    {
        id: 'featured-after-faster-wifi',
        slug: 'what-comes-after-faster-wifi',
        title: 'What Comes After Faster Wi-Fi?',
        subtitle: 'Why the next evolution of connectivity is defined by intelligence, not only speed.',
        category: 'Connectivity',
        excerpt:
            'The next evolution of connectivity is not only about speed. Networks are becoming more observable, intelligent and responsive — changing how service providers manage devices and deliver connected experiences.',
        author: 'TonAer Technology Team',
        date: 'September 2026',
        readingTime: 8,
        tags: ['Connectivity', 'Network Intelligence', 'Wi-Fi'],
        featured: true,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'For two decades, the connectivity conversation has been dominated by one metric: speed. Each Wi-Fi generation has promised more of it, and each has delivered. But as multi-gigabit access becomes normal, speed alone is no longer the differentiator it once was.',
            concepts: [
                'Throughput is table stakes — experience quality is the new battleground',
                'Observability turns the network from a black box into a managed system',
                'Intelligence moves operations from reactive to proactive',
            ],
            technical: [
                'Modern gateways already produce a continuous stream of operational telemetry: channel utilization, client behavior, interference patterns, retry rates. Historically, most of that data stayed on the device. The shift now underway is toward networks that collect, interpret and act on this data centrally.',
                'This changes the architecture question. Instead of asking "how fast is the link?", engineering teams increasingly ask "how well do we understand what the link is doing?" Wi-Fi standards will keep evolving, but the platforms around them — telemetry pipelines, analytics, automated optimization — are where meaningful differentiation is emerging.',
            ],
            callout: 'Speed gets a connection established. Intelligence keeps it good.',
            business:
                'For service providers, this shift has a direct operational consequence: fewer truck rolls, faster root-cause analysis, and support conversations that start with evidence instead of guesswork. Providers who treat the network as an observable system can compete on reliability and experience — not just on headline bandwidth.',
            practical: [
                'Evaluate gateways on the telemetry they expose, not only their radio specs',
                'Plan for centralized management before device counts force the issue',
                'Treat Wi-Fi upgrades as an opportunity to modernize operations, not just throughput',
            ],
            conclusion:
                'What comes after faster Wi-Fi is smarter connectivity: networks that see themselves, explain themselves and increasingly heal themselves. That is the direction TonAer is building toward.',
        },
    },
    {
        id: 'a01',
        slug: 'wi-fi-7-next-generation-connected-networks',
        title: 'Wi-Fi 7: What It Means for the Next Generation of Connected Networks',
        subtitle: 'Understanding the technologies and deployment considerations shaping the next generation of wireless connectivity.',
        category: 'Wi-Fi',
        excerpt:
            'Wi-Fi 7 introduces new capabilities designed to improve throughput, latency and network efficiency. Here\'s what connectivity providers should understand as the technology moves into broader deployments.',
        author: 'TonAer Technology Team',
        date: 'September 2026',
        readingTime: 8,
        tags: ['Wi-Fi 7', 'Connectivity', 'Networking'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Wi-Fi 7 (802.11be) is more than an incremental speed upgrade. It introduces a set of capabilities — wider channels, Multi-Link Operation, more efficient modulation — that change how wireless networks behave under load.',
            concepts: [
                '320 MHz channels in the 6 GHz band double the spectral width of Wi-Fi 6E',
                'Multi-Link Operation (MLO) lets devices use multiple bands simultaneously',
                '4096-QAM increases data density when signal conditions allow',
            ],
            technical: [
                'MLO is arguably the most significant change. Rather than associating with a single band, a client can aggregate or rapidly switch across 2.4, 5 and 6 GHz links. For latency-sensitive traffic — video calls, gaming, industrial control — this reduces jitter in ways raw throughput never could.',
                'Wider channels come with a caveat: 320 MHz operation depends on clean 6 GHz spectrum, which varies by regulatory domain and environment. Deployments need spectrum awareness, not just capable hardware.',
            ],
            callout: 'Wi-Fi 7\'s real promise is consistency under load — not just peak speed in ideal conditions.',
            business:
                'For connectivity providers, Wi-Fi 7 creates a credible premium tier and future-proofs high-value deployments. It also raises the bar on gateway design: thermal headroom, antenna architecture and firmware quality all matter more when radios work harder.',
            practical: [
                'Confirm 6 GHz regulatory availability in target markets before committing to tri-band designs',
                'Prioritize MLO-capable client ecosystems in deployment planning',
                'Validate real-world performance in dense environments, not only lab throughput',
            ],
            conclusion:
                'Wi-Fi 7 rewards providers who plan beyond the spec sheet. The winners will be deployments designed around spectrum, clients and operations together.',
        },
    },
    {
        id: 'a02',
        slug: 'from-network-data-to-network-intelligence',
        title: 'From Network Data to Network Intelligence',
        subtitle: 'Turning operational telemetry into decisions network teams can act on.',
        category: 'Network Intelligence',
        excerpt:
            'Modern gateways generate valuable operational data. The next challenge is turning that data into actionable insight for network teams.',
        author: 'TonAer R&D',
        date: 'August 2026',
        readingTime: 6,
        tags: ['Network Analytics', 'AI', 'Telemetry'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Every connected gateway is a sensor. It observes signal quality, client behavior, interference and failures around the clock. Yet in many deployments, that data is never collected — let alone used.',
            concepts: [
                'Telemetry is raw observation; intelligence is interpretation',
                'Value comes from correlation across devices, not isolated readings',
                'Insight must arrive in a form operations teams can act on',
            ],
            technical: [
                'A telemetry pipeline for connectivity fleets typically involves three stages: standardized data models on the device (such as TR-369/USP), transport and storage that can handle fleet-scale volume, and an analytics layer that detects patterns — recurring interference windows, degrading backhaul, abnormal client churn.',
                'The analytics layer is where data becomes intelligence. Baselines are learned per deployment, and deviations are surfaced with context: what changed, where, and what it likely means.',
            ],
            callout: 'Data you never look at is not an asset. Intelligence you can act on is.',
            business:
                'Operators who invest in the data-to-insight path reduce mean time to resolution and can shift support from reactive tickets to proactive outreach — a measurable change in both cost and customer satisfaction.',
            practical: [
                'Start with a small set of high-value metrics rather than collecting everything',
                'Standardize on open data models to avoid vendor lock-in later',
                'Design alerts around outcomes ("degraded experience") rather than raw thresholds',
            ],
            conclusion:
                'Network intelligence is not a single feature — it is a pipeline discipline. Fleets that build it early compound the advantage with every device they add.',
        },
    },
    {
        id: 'a03',
        slug: 'can-ai-make-network-troubleshooting-proactive',
        title: 'Can AI Make Network Troubleshooting Proactive?',
        subtitle: 'Moving from "the customer called" to "the network told us first."',
        category: 'AI & Intelligence',
        excerpt:
            'Traditional troubleshooting often begins after a customer reports a problem. Intelligent network systems can help identify abnormal behavior before it becomes a customer-facing issue.',
        author: 'TonAer R&D',
        date: 'August 2026',
        readingTime: 7,
        tags: ['AI', 'Troubleshooting', 'Network Operations'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Most network troubleshooting still starts the same way: a subscriber notices something is wrong and calls. By that point, the problem has already cost experience — and often, trust.',
            concepts: [
                'Anomaly detection finds deviations from learned baselines',
                'Proactive operations surface issues before customers notice',
                'Automation closes the loop from detection to resolution',
            ],
            technical: [
                'Proactive systems build behavioral baselines per device, per household, per cell of the network. When latency distributions shift, retry rates climb, or channel conditions degrade in an unusual pattern, the system flags it — often hours or days before a user-visible failure.',
                'The engineering challenge is not detection alone; it is precision. False positives erode operator trust quickly, which is why practical systems rank anomalies by confidence and customer impact rather than flooding dashboards with alerts.',
            ],
            callout: 'The best support ticket is the one that never gets created.',
            business:
                'Proactive troubleshooting changes the economics of support: fewer inbound calls, shorter calls when they happen, and a support organization that can prove reliability instead of apologizing for its absence.',
            practical: [
                'Begin with a narrow, high-confidence anomaly set and expand gradually',
                'Measure alert precision as carefully as detection rate',
                'Give support teams the "why" behind every flag, not just the flag',
            ],
            conclusion:
                'AI will not replace network engineers — but engineers equipped with proactive intelligence will consistently outperform those waiting for the phone to ring.',
        },
    },
    {
        id: 'a04',
        slug: 'why-gateway-becoming-more-than-router',
        title: 'Why the Gateway Is Becoming More Than a Router',
        subtitle: 'The most important device in the connected home is quietly changing roles.',
        category: 'Connectivity',
        excerpt:
            "Today's gateway sits at the intersection of connectivity, security, device management and customer experience.",
        author: 'TonAer Technology Team',
        date: 'July 2026',
        readingTime: 6,
        tags: ['Gateway', 'Wi-Fi', 'Connected Devices'],
        featured: false,
        mostRead: true,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'For years, the gateway was a simple promise: internet in, Wi-Fi out. That description no longer fits. The modern gateway has become the operational heart of the connected home and small business.',
            concepts: [
                'The gateway is the permanent, always-on presence in every deployment',
                'Security, management and experience functions are converging onto it',
                'Its software now matters as much as its radios',
            ],
            technical: [
                'Gateways now terminate WAN connections, manage dozens of clients, enforce security policy, run containerized services and stream telemetry to cloud platforms — often simultaneously. That convergence demands more from embedded software architecture: updatable firmware, service isolation, and remote manageability as first-class requirements.',
                'It also makes the gateway the natural sensing point for network intelligence. Everything the household experiences crosses it.',
            ],
            callout: 'The gateway is no longer the end of the network. It is the beginning of the service.',
            business:
                'Providers who recognize the gateway as a platform — not a cost item — can layer services on top of connectivity: managed Wi-Fi, security, smart-home features. Each one increases the value of the same deployed hardware.',
            practical: [
                'Evaluate gateways on software lifecycle support, not only hardware specs',
                'Require remote management capability from day one',
                'Plan headroom for services you have not launched yet',
            ],
            conclusion:
                'Calling a modern gateway a router undersells it. It is infrastructure, sensor and service platform in one — and it deserves to be engineered that way.',
        },
    },
    {
        id: 'a05',
        slug: 'managing-connected-devices-at-scale',
        title: 'Managing Connected Devices at Scale',
        subtitle: 'Why cloud management becomes non-negotiable as fleets grow.',
        category: 'Cloud & SaaS',
        excerpt:
            'As device deployments grow, centralized cloud management becomes essential for visibility, configuration, monitoring and operational efficiency.',
        author: 'TonAer Product Team',
        date: 'July 2026',
        readingTime: 7,
        tags: ['Cloud', 'Device Management', 'SaaS'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Managing fifty gateways is a task. Managing fifty thousand is a system design problem. Somewhere between those numbers, every connectivity business crosses the line where device-by-device administration stops working.',
            concepts: [
                'Centralized management replaces per-device configuration',
                'Visibility at fleet level reveals problems invisible per device',
                'Automation is what turns scale from a liability into leverage',
            ],
            technical: [
                'Fleet management rests on a few pillars: a standardized management protocol between device and cloud, bulk operations (configuration templates, staged firmware rollouts), and monitoring that aggregates health across thousands of endpoints without drowning operators in noise.',
                'Rollout strategy deserves special attention. Staged deployments with automatic rollback protect the fleet from bad firmware — the difference between an incident and a non-event.',
            ],
            callout: 'At scale, the question is never "can we configure it?" It is "can we configure ten thousand of them safely, tonight?"',
            business:
                'Cloud-managed fleets reduce operational cost per device as deployments grow — the economics actually improve with scale. They also shorten the path from product decision to field deployment from weeks to hours.',
            practical: [
                'Adopt standard protocols (TR-369/USP) to keep platform options open',
                'Design firmware rollout policy before you need it',
                'Instrument fleet health dashboards for operations, not just engineering',
            ],
            conclusion:
                'Scale does not have to mean complexity. With the right cloud platform, a larger fleet can be easier to run than a small unmanaged one.',
        },
    },
    {
        id: 'a06',
        slug: 'understanding-role-of-mesh-modern-wifi',
        title: 'Understanding the Role of Mesh in Modern Wi-Fi',
        subtitle: 'Coverage is a design problem, and mesh is one of its best tools — when used deliberately.',
        category: 'Networking',
        excerpt:
            'Mesh networking can help extend reliable wireless coverage across complex environments. But effective mesh deployment requires more than simply adding additional nodes.',
        author: 'TonAer Engineering',
        date: 'June 2026',
        readingTime: 6,
        tags: ['Mesh', 'Wi-Fi', 'Network Design'],
        featured: false,
        mostRead: true,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Dead zones are the most visible Wi-Fi failure a customer experiences. Mesh networking exists to solve them — but mesh done carelessly can trade dead zones for congestion and inconsistent performance.',
            concepts: [
                'Mesh extends coverage by relaying traffic through cooperating nodes',
                'Node placement determines backhaul quality, and backhaul determines experience',
                'Self-organizing behavior still benefits from intelligent guidance',
            ],
            technical: [
                'In a mesh system, nodes communicate over wireless (or wired) backhaul and steer clients toward the best node and band. Standards like EasyMesh define interoperability, but real-world quality comes from the algorithms: path selection, band steering, and how the system reacts when a link degrades.',
                'Placement is the multiplier. A node installed at the edge of coverage relays a weak signal; a node placed where backhaul is still strong extends real capacity. This is why placement guidance — increasingly data-driven — matters as much as node count.',
            ],
            callout: 'Adding nodes adds coverage. Placing nodes well adds performance.',
            business:
                'For providers, mesh is both a retention tool and a revenue line: managed whole-home Wi-Fi is one of the clearest premium services a connectivity business can offer. Intelligent placement support reduces install time and repeat visits.',
            practical: [
                'Prefer systems that recommend node placement from measured signal data',
                'Use wired backhaul wherever the building allows it',
                'Test roaming behavior with real client devices, not only coverage maps',
            ],
            conclusion:
                'Mesh is mature technology — but great mesh outcomes are still engineered, not bought. The difference is in placement, backhaul and software.',
        },
    },
    {
        id: 'a07',
        slug: 'growing-role-of-gateways-iot-connectivity',
        title: 'The Growing Role of Gateways in IoT Connectivity',
        subtitle: 'The bridge between devices, local networks and the cloud is getting busier.',
        category: 'IoT',
        excerpt:
            'Gateways increasingly serve as the bridge between connected devices, local networks and cloud services.',
        author: 'TonAer Product Team',
        date: 'June 2026',
        readingTime: 5,
        tags: ['IoT', 'Gateway', 'Cloud'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'IoT devices rarely speak internet natively. Sensors, locks, meters and appliances rely on the gateway to translate, secure and transport their traffic — a role that grows more important with every device added to the network.',
            concepts: [
                'Gateways aggregate constrained devices onto managed networks',
                'Local intelligence reduces latency and cloud dependence',
                'Security boundaries for IoT are enforced at the gateway',
            ],
            technical: [
                'The gateway\'s IoT role spans three functions: onboarding (getting devices onto the network safely), transport (moving their data to cloud services reliably), and policy (segmenting untrusted devices from critical systems). Increasingly, gateways also run local logic so essential automation survives an internet outage.',
                'Segmentation deserves emphasis: IoT devices are notoriously uneven in security quality. Treating them as a separate trust zone at the gateway limits the blast radius of any single compromised device.',
            ],
            callout: 'Every IoT device is only as safe as the gateway that guards it.',
            business:
                'IoT readiness is becoming a selection criterion for connectivity platforms. Providers offering secure, managed IoT connectivity open doors to smart-home, energy and safety services beyond access alone.',
            practical: [
                'Require network segmentation support for IoT device classes',
                'Plan for local processing where latency or privacy demands it',
                'Track device-count growth per household — it drives gateway requirements',
            ],
            conclusion:
                'The gateway has quietly become the most important IoT device in the building — the one that makes all the others usable, manageable and safe.',
        },
    },
    {
        id: 'a08',
        slug: 'what-it-takes-build-reliable-wifi-gateway',
        title: 'What It Takes to Build a Reliable Wi-Fi Gateway',
        subtitle: 'Reliability is decided long before the device reaches the field.',
        category: 'Product & Engineering',
        excerpt:
            'Reliable connectivity begins long before a device reaches the field. Hardware, firmware, radio performance, thermal design and software all contribute to the final experience.',
        author: 'TonAer Engineering',
        date: 'May 2026',
        readingTime: 8,
        tags: ['Engineering', 'Hardware', 'Firmware', 'Wi-Fi'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Customers experience reliability as a feeling: the network that simply works. Engineering teams know it as a hundred decisions made months earlier — in silicon selection, antenna layout, thermal design and firmware discipline.',
            concepts: [
                'Radio performance is set by antenna design and board layout, not just the chipset',
                'Thermal behavior determines sustained performance, not benchmark peaks',
                'Firmware quality defines how the device ages in the field',
            ],
            technical: [
                'Two gateways with identical chipsets can perform very differently. Antenna isolation, PCB stack-up, power integrity and shielding decide how much of the silicon\'s capability survives into the real world. Thermal design decides for how long — radios throttle when heat builds, and sustained throughput is a cooling problem as much as a silicon one.',
                'Then there is firmware: the update mechanism, the watchdog strategy, the memory discipline over months of uptime. Field reliability is mostly software reliability.',
            ],
            callout: 'Peak performance is a spec. Sustained performance is engineering.',
            business:
                'Reliability is the cheapest feature to want and the most expensive to retrofit. Products engineered for it generate fewer support calls, longer deployment lifetimes and stronger brand trust — advantages that compound over the life of a fleet.',
            practical: [
                'Ask vendors for thermal and sustained-throughput testing, not only peak figures',
                'Review firmware update and rollback architecture before committing',
                'Treat regulatory and environmental testing as design inputs, not afterthoughts',
            ],
            conclusion:
                'Reliable gateways are not discovered in testing — they are designed, decision by decision, by teams who respect how unforgiving the field can be.',
        },
    },
    {
        id: 'a09',
        slug: 'network-telemetry-seeing-what-network-really-doing',
        title: 'Network Telemetry: Seeing What Your Network Is Really Doing',
        subtitle: 'Visibility is the first step from reactive support to proactive operations.',
        category: 'Network Intelligence',
        excerpt:
            'Visibility into device behavior, network health and connection quality can help operators move from reactive support toward proactive operations.',
        author: 'TonAer R&D',
        date: 'May 2026',
        readingTime: 6,
        tags: ['Telemetry', 'Monitoring', 'Network Analytics'],
        featured: false,
        mostRead: true,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Ask most operators what is happening inside a subscriber\'s home network and the honest answer is: we find out when they call. Telemetry changes that relationship with the network.',
            concepts: [
                'Telemetry provides continuous visibility into device and link behavior',
                'Health signals matter more than raw counters',
                'Visibility is the prerequisite for every form of proactive operation',
            ],
            technical: [
                'Useful telemetry focuses on experience-relevant signals: per-client throughput and retries, channel utilization, interference indicators, WAN quality, uptime and reboot history. Collected at intervals and aggregated centrally, these build a living picture of network health.',
                'The design tension is resolution versus cost. High-frequency collection catches transient issues but multiplies transport and storage. Mature pipelines adapt — quiet when healthy, detailed when a device starts to struggle.',
            ],
            callout: 'You cannot fix what you cannot see — and you cannot see what you never measured.',
            business:
                'Telemetry-first operations shorten every support interaction. Agents see the home\'s actual history instead of asking customers to describe blinking lights — cutting handle time and improving first-contact resolution.',
            practical: [
                'Define a minimal health metric set every device must report',
                'Use adaptive collection: baseline cadence normally, deep capture on anomalies',
                'Make telemetry visible to support teams, not just engineering',
            ],
            conclusion:
                'Telemetry is not a feature to add later — it is the foundation every intelligent network capability is built on.',
        },
    },
    {
        id: 'a10',
        slug: 'changing-role-of-isps-connected-home',
        title: 'The Changing Role of ISPs in the Connected Home',
        subtitle: 'From bandwidth supplier to technology platform for the home.',
        category: 'Industry',
        excerpt:
            'Connectivity providers are increasingly becoming technology platforms for the connected home, with opportunities extending beyond internet access.',
        author: 'TonAer Product Team',
        date: 'April 2026',
        readingTime: 7,
        tags: ['ISP', 'Connected Home', 'Technology'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'The ISP\'s historical role was simple: deliver bandwidth to the door. What happens inside the home was someone else\'s problem — until customers made it clear they hold their provider responsible for everything.',
            concepts: [
                'Customers judge providers on in-home experience, not access speed',
                'The deployed gateway is a platform position, not just equipment',
                'Services beyond access are the growth story for connectivity businesses',
            ],
            technical: [
                'The shift is enabled by infrastructure already in place: a managed gateway in every home, a cloud platform that sees the fleet, and increasingly a branded app in the customer\'s pocket. Together they form a delivery channel for services — managed Wi-Fi, security, parental controls, IoT features — without new hardware.',
                'This is why white-label platforms matter: they let providers own the customer relationship and the service layer, while the underlying technology comes from a partner built to support exactly that model.',
            ],
            callout: 'The provider who manages the experience owns the relationship.',
            business:
                'Every service layered onto the connection raises switching costs and average revenue per household. Providers that remain pure bandwidth suppliers compete on price; providers that become platforms compete on value.',
            practical: [
                'Audit what your installed gateway fleet could already support',
                'Launch one managed service well rather than several poorly',
                'Keep the customer-facing experience under your own brand',
            ],
            conclusion:
                'The connected home needs a platform operator. ISPs are better positioned than anyone to fill that role — if they choose to step into it.',
        },
    },
    {
        id: 'a11',
        slug: 'anomaly-detection-to-automated-network-optimization',
        title: 'From Anomaly Detection to Automated Network Optimization',
        subtitle: 'Detection tells you something is wrong. Optimization does something about it.',
        category: 'AI & Intelligence',
        excerpt:
            'The future of network operations is moving toward systems that can detect, understand and respond to changing network conditions.',
        author: 'TonAer R&D',
        date: 'March 2026',
        readingTime: 7,
        tags: ['AI', 'Optimization', 'Network Operations'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Finding problems is only half the story. The trajectory of intelligent networking runs from detection, through diagnosis, to response — networks that adjust themselves when conditions change.',
            concepts: [
                'Detection identifies abnormal behavior; diagnosis explains it; response fixes it',
                'Safe automation starts with reversible, low-risk actions',
                'Human oversight scales through policies, not manual approval of every action',
            ],
            technical: [
                'A practical optimization loop looks like this: telemetry reveals degraded channel conditions on a gateway; analysis correlates it with neighboring interference; the system selects a cleaner channel, applies the change during a low-activity window, and verifies improvement afterward. Detection, decision, action, validation — all without a ticket.',
                'The hard engineering work is in guardrails: which actions may run autonomously, which require approval, and how every automated change is logged and reversible.',
            ],
            callout: 'Automation you cannot explain or undo is not optimization — it is risk.',
            business:
                'Automated optimization compounds with fleet size: improvements that would require thousands of manual interventions happen continuously in the background. Operational cost flattens even as service quality climbs.',
            practical: [
                'Automate reversible actions first — channel changes, band steering, power adjustment',
                'Require validation after every automated change, with automatic rollback',
                'Keep a complete audit trail; trust in automation is earned through transparency',
            ],
            conclusion:
                'The destination is not a network without humans — it is a network where humans set intent and intelligent systems handle the continuous work of keeping conditions optimal.',
        },
    },
    {
        id: 'a12',
        slug: 'building-connectivity-experiences-around-the-customer',
        title: 'Building Connectivity Experiences Around the Customer',
        subtitle: 'Operational efficiency and customer experience are the same problem viewed from two sides.',
        category: 'Industry',
        excerpt:
            'Technology decisions ultimately shape the experience subscribers have with their connectivity provider. The most effective platforms connect operational efficiency with customer experience.',
        author: 'TonAer Product Team',
        date: 'February 2026',
        readingTime: 6,
        tags: ['Customer Experience', 'ISP', 'Connectivity'],
        featured: false,
        status: 'published',
        isDemo: true,
        content: {
            intro: 'Customers do not experience networks — they experience outcomes. A video call that holds, an installation that works first time, a support call that ends quickly. Every one of those outcomes is shaped by technology choices made far upstream.',
            concepts: [
                'Experience is the product of network quality, tools and processes together',
                'The same telemetry that drives operations can drive customer-facing features',
                'Self-service succeeds when it is built on real network intelligence',
            ],
            technical: [
                'Customer-facing experience layers — branded apps, self-diagnostics, proactive notifications — draw from the same platform capabilities as internal operations: fleet telemetry, remote configuration, device management. When built on shared foundations, a customer checking their own Wi-Fi health and an agent troubleshooting it are looking at the same truth.',
                'This alignment is what makes self-service credible. An app that can actually see and fix the network reduces support volume; one that merely displays marketing copy increases it.',
            ],
            callout: 'The best customer experience is usually just internal network intelligence, thoughtfully surfaced.',
            business:
                'Experience-led connectivity businesses see it in the metrics that matter: lower churn, higher satisfaction scores, and support costs that fall as customers solve simple issues themselves with tools that actually work.',
            practical: [
                'Build customer-facing features on the same platform your operations team uses',
                'Start with transparency — showing network status honestly builds trust',
                'Measure self-service success by tickets avoided, not app downloads',
            ],
            conclusion:
                'Technology decisions are customer experience decisions. Providers who internalize that build platforms their customers can feel — even when they cannot see them.',
        },
    },
];

export const publishedArticles = () => ARTICLES.filter((a) => a.status === 'published');
export const articleBySlug = (slug) => publishedArticles().find((a) => a.slug === slug);
export const featuredArticle = () => publishedArticles().find((a) => a.featured);

export function relatedArticles(article, count = 3) {
    return publishedArticles()
        .filter((a) => a.id !== article.id)
        .map((a) => ({
            a,
            score: (a.category === article.category ? 2 : 0) + a.tags.filter((t) => article.tags.includes(t)).length,
        }))
        .filter((x) => x.score > 0)
        .sort((x, y) => y.score - x.score)
        .slice(0, count)
        .map((x) => x.a);
}

export function filterArticles(list, { category = 'All', query = '' } = {}) {
    const q = query.trim().toLowerCase();
    return list.filter(
        (a) =>
            (category === 'All' || a.category === category) &&
            (!q ||
                `${a.title} ${a.excerpt} ${a.category} ${a.author} ${a.tags.join(' ')}`.toLowerCase().includes(q))
    );
}
