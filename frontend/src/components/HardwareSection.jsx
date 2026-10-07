import { Box, CloudCog, Cpu, GitMerge, Radar, Radio, Router, Share2, Signal, SlidersHorizontal, Smartphone, Users, Wifi } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const CAPS = [
  { Icon: Radio, title: "5G Connectivity", text: "High-performance cellular connectivity." },
  { Icon: Cpu, title: "eSIM", text: "Flexible network provisioning and activation." },
  { Icon: Wifi, title: "Wi-Fi 7", text: "Next-generation wireless performance." },
  { Icon: Signal, title: "Tri-Band", text: "Greater capacity and reliable wireless coverage." },
  { Icon: Share2, title: "EasyMesh", text: "Seamless network expansion and consistent coverage." },
  { Icon: CloudCog, title: "Cloud Managed", text: "Remote configuration, monitoring and lifecycle management." },
  { Icon: Smartphone, title: "End User Mobile App", text: "A customer-facing mobile experience for managing connectivity and devices." },
];

const MESH_PATH = [
  { label: "GATEWAY", Icon: Router, x: 10 },
  { label: "MESH NODE", Icon: Box, x: 37 },
  { label: "MESH NODE", Icon: Box, x: 63 },
  { label: "USERS", Icon: Users, x: 90 },
];

const MESH_CARDS = [
  { Icon: GitMerge, tag: "GROW ANYWHERE", title: "Seamless Expansion", text: "Add mesh nodes and extend coverage without new wiring or complex setup — the network grows as the space does." },
  { Icon: Radar, tag: "EVERY CORNER", title: "Consistent Coverage", text: "Devices move between nodes without drops, keeping the connected experience stable across the entire home or site." },
  { Icon: SlidersHorizontal, tag: "ONE SYSTEM", title: "Intelligent Management", text: "Every node is monitored and managed from the same TonAer platform — one view, one policy, one network." },
];

export default function HardwareSection() {
  return (
    <section className="sec hard" id="connectivity" data-testid="hardware-section">
      <div className="section-shell">
        <SecHead
          eyebrow="THE HARDWARE"
          title={<>Connectivity built<br />for <em>what&rsquo;s next.</em></>}
          copy="A portable gateway combining 5G, eSIM, Wi-Fi 7, Tri-Band and EasyMesh with cloud-managed intelligence."
        />
        <div className="gw-grid">
          <Reveal className="gw-visual">
            <div className="gw-ring" />
            <img className="gw-img" src="/assets/gateway-device.png" alt="TonAer 5G Wi-Fi 7 smart gateway with LED indicators and pair button" data-testid="gateway-image" />
            <span className="gw-pill gp-1">5G</span>
            <span className="gw-pill gp-2">WI-FI 7</span>
            <span className="gw-pill gp-3">TRI-BAND</span>
            <span className="gw-pill gp-4">eSIM</span>
          </Reveal>
          <div className="gw-list" id="devices" data-testid="hardware-capability-cards">
            {CAPS.map(({ Icon, title, text }, i) => (
              <Reveal key={title} className="gw-item" delay={i * 0.05}>
                <div className="gw-ico"><Icon /></div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="sub-head">
          <p className="eyebrow teal">EASYMESH</p>
          <h3>One network. <em>Seamless everywhere.</em></h3>
          <p>Extend coverage intelligently with a robust mesh ecosystem designed to work together as one connected network.</p>
        </div>
        <Reveal className="em-path" data-testid="easymesh-path">
          <svg className="em-svg" viewBox="0 0 960 130" preserveAspectRatio="none" aria-hidden="true">
            <path className="em-line" d="M96 65 L864 65" />
            <circle className="em-pulse" r="4"><animateMotion dur="3.2s" repeatCount="indefinite" path="M96 65 L864 65" /></circle>
            <circle className="em-pulse" r="4"><animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path="M96 65 L864 65" /></circle>
          </svg>
          {MESH_PATH.map(({ label, Icon, x }) => (
            <div key={label + x} className="em-node" style={{ left: `${x}%` }}>
              <div className="em-dot"><Icon /></div>
              <small>{label}</small>
            </div>
          ))}
        </Reveal>
        <div className="em-cards">
          {MESH_CARDS.map(({ Icon, tag, title, text }, i) => (
            <Reveal key={title} className="fcard" delay={i * 0.07}>
              <div className="fcard-body" style={{ padding: "30px 30px 32px" }}>
                <Icon style={{ width: 26, height: 26, color: "#00a78e" }} />
                <span className="fcard-tag" style={{ marginTop: 18 }}>{tag}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
