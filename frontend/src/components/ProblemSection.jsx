import { ArrowDown, ArrowRight, FlaskConical } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const VENDOR_COLS = [
  { title: "NETWORK PLATFORM", items: ["Operations", "Analytics", "Monitoring"] },
  { title: "DEVICE VENDOR", items: ["Gateways", "Firmware", "Hardware"] },
  { title: "CONNECTIVITY SERVICES", items: ["SIM / eSIM", "Provisioning", "5G"] },
];

const COSTS = ["MULTIPLE VENDORS", "MULTIPLE PLATFORMS", "INTEGRATION OVERHEAD", "SEPARATE SUPPORT & UPDATES", "MORE OPERATIONAL COMPLEXITY"];

const UNIFIED = [
  { label: "GATEWAY & DEVICES", x: 200, y: 24 },
  { label: "SIM / eSIM", x: 62, y: 74 },
  { label: "5G CONNECTIVITY", x: 338, y: 74 },
  { label: "WI-FI 7", x: 42, y: 208 },
  { label: "EASYMESH", x: 358, y: 208 },
  { label: "AI OPERATIONS", x: 118, y: 276 },
  { label: "ANALYTICS", x: 282, y: 276 },
];

export default function ProblemSection() {
  return (
    <section className="sec prob" data-testid="problem-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="THE OPERATIONS PROBLEM"
          title={<>Your network shouldn&rsquo;t need<br /><em>multiple vendors</em> to stay connected.</>}
          copy="From gateway management and connectivity to SIM/eSIM, EasyMesh, analytics and AI-powered troubleshooting, operators shouldn&rsquo;t have to stitch together separate platforms to manage one connected experience."
        />

        <Reveal className="ba-compare" data-testid="problem-comparison">
          <div className="ba-panel ba-today" data-testid="problem-today">
            <span className="ba-tag">TODAY — THE TYPICAL SETUP</span>
            <div className="t-operator">OPERATOR</div>
            <div className="t-cols">
              {VENDOR_COLS.map((col) => (
                <div className="t-col" key={col.title}>
                  <b>{col.title}</b>
                  {col.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              ))}
            </div>
            <div className="t-extra">
              <span>EASYMESH</span>
              <span>AI TROUBLESHOOTING</span>
              <span>SEPARATE CONTRACTS</span>
            </div>
            <div className="t-legacy">
              <b>LEGACY DEVICES</b>
              <em>+</em>
              <b>NEW-GENERATION DEVICES</b>
              <ArrowRight size={13} />
              <span>Separate management — more to manage</span>
            </div>
            <div className="t-cost">
              {COSTS.map((cost, i) => (
                <span key={cost} style={{ display: "contents" }}>
                  <span className="t-cost-chip"><i />{cost}</span>
                  {i < COSTS.length - 1 && <span className="t-cost-arrow">↓</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="ba-transition" aria-hidden="true">
            <span>MULTIPLE<br />VENDORS</span>
            <div className="ba-line"><ArrowRight size={16} /></div>
            <span className="ba-to">ONE<br />PLATFORM</span>
          </div>

          <div className="ba-panel ba-tonaer" data-testid="problem-tonaer">
            <span className="ba-tag teal">TONAER</span>
            <p className="ba-sub">ONE PLATFORM. <b>ONE OPERATIONAL LAYER.</b></p>
            <div className="u-hub-wrap">
              <svg className="u-svg" viewBox="0 0 400 300" aria-hidden="true">
                {UNIFIED.map((c, i) => (
                  <g key={c.label}>
                    <path className="u-line" d={`M200 148 L${c.x} ${c.y}`} />
                    <circle className="u-pulse" r="2.6">
                      <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={`M200 148 L${c.x} ${c.y}`} />
                    </circle>
                  </g>
                ))}
              </svg>
              <div className="u-hub">
                <img src="/assets/favicon.png" alt="" />
                <b>TonAer</b>
                <small>PLATFORM</small>
              </div>
              {UNIFIED.map((c) => (
                <span key={c.label} className="u-chip" style={{ left: `${c.x / 4}%`, top: `${c.y / 3}%` }}>{c.label}</span>
              ))}
            </div>
            <div className="u-evolve">
              <b><FlaskConical size={14} />BUILT TO EVOLVE</b>
              <p>Continuous product innovation from TonAer R&amp;D — one platform that evolves with new technologies, devices and operational requirements.</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="ba-final" delay={0.1}>
          <h3>FROM MULTIPLE VENDORS<br /><em>TO ONE INTELLIGENT PLATFORM.</em></h3>
          <p>One connected operational layer across devices, connectivity and AI-powered network management.</p>
          <ArrowDown className="ba-final-arrow" />
        </Reveal>
      </div>
    </section>
  );
}
