import { useState } from "react";
import { motion } from "framer-motion";
import { Box, CloudCog, Cpu, GitMerge, Radar, Radio, Router, Share2, Signal, SlidersHorizontal, Smartphone, Users, Wifi } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";
import "./ecosystem.css";

const CAPS = [
  { Icon: Radio, title: "5G Connectivity", text: "High-performance cellular connectivity." },
  { Icon: Cpu, title: "eSIM", text: "Flexible network provisioning and activation." },
  { Icon: Wifi, title: "Wi-Fi 7", text: "Next-generation wireless performance." },
  { Icon: Signal, title: "Tri-Band", text: "Greater capacity and reliable wireless coverage." },
  { Icon: Share2, title: "EasyMesh", text: "Seamless network expansion and consistent coverage." },
  { Icon: CloudCog, title: "Cloud Managed", text: "Remote configuration, monitoring and lifecycle management." },
  { Icon: Smartphone, title: "End User Mobile App", text: "A customer-facing mobile experience for managing connectivity and devices." },
];

const FEATURES = [
  { id: "5g", label: "5G", x: 28, y: 13, text: "High-performance 5G for reliable, always-on connectivity." },
  { id: "esim", label: "eSIM", x: 27, y: 31, text: "Built-in eSIM for flexible, remote network provisioning." },
  { id: "easymesh", label: "EASYMESH", x: 27, y: 48, text: "Seamless whole-home mesh connectivity with easy expansion." },
  { id: "wifi7", label: "WI-FI 7", x: 73, y: 13, text: "Next-generation wireless with higher speed, lower latency and greater capacity." },
  { id: "triband", label: "TRI-BAND", x: 72, y: 32, text: "2.4 GHz + 5 GHz + 6 GHz for wider coverage, higher capacity and better performance." },
  { id: "cloud", label: "CLOUD MANAGED", x: 72, y: 51, text: "Manage, monitor and update devices remotely through the TonAer platform." },
  { id: "app", label: "MOBILE APP", x: 75, y: 64, text: "An intuitive app for end users to manage their home network, devices and connectivity." },
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
  const [active, setActive] = useState(null);
  const current = FEATURES.find((f) => f.id === active);
  const spot = current ? { "--sx": `${current.x}%`, "--sy": `${current.y}%` } : {};

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
            <img className="gw-img" src="/assets/gateway.png" alt="TonAer 5G Wi-Fi 7 smart gateway" data-testid="gateway-image" />
            <span className="gw-pill gp-1">5G</span>
            <span className="gw-pill gp-2">WI-FI 7</span>
            <span className="gw-pill gp-3">TRI-BAND</span>
            <span className="gw-pill gp-4">eSIM</span>
          </Reveal>
          <div className="gw-list" data-testid="hardware-capability-cards">
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

        <div className="sub-head" id="devices">
          <p className="eyebrow teal">ONE GATEWAY — AN ENTIRE CONNECTED ECOSYSTEM</p>
          <h3>Every capability, <em>working as one system.</em></h3>
          <p>5G, eSIM, Wi-Fi 7, Tri-Band and EasyMesh working together to deliver a seamless connected experience — hover any capability to see where it lives.</p>
        </div>
        <motion.div
          className="eco-stage"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eco-frame" onMouseLeave={() => setActive(null)}>
            <img src="/assets/ecosystem.png" alt="TonAer smart home network ecosystem — 5G, eSIM, EasyMesh, Wi-Fi 7, Tri-Band, cloud managed with end user mobile app" data-testid="ecosystem-image" />
            <div className={`eco-dim ${current ? "on" : ""}`} style={spot} />
            {current && <div className="eco-ring" style={spot} aria-hidden="true"><i /></div>}
            {FEATURES.map((f) => (
              <button
                key={f.id}
                className={`eco-dot ${active === f.id ? "on" : ""}`}
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
                onMouseEnter={() => setActive(f.id)}
                onFocus={() => setActive(f.id)}
                onClick={() => setActive(f.id)}
                aria-label={f.label}
                data-testid={`eco-hotspot-${f.id}`}
              />
            ))}
            {current && (
              <div className={`eco-tip ${current.x > 50 ? "left" : "right"}`} style={spot} data-testid="eco-tooltip">
                <b>{current.label}</b>
                <span>{current.text}</span>
              </div>
            )}
            <span className="eco-badge">INTERACTIVE — HOVER TO EXPLORE</span>
          </div>
          <div className="eco-rail" data-testid="eco-feature-rail">
            {FEATURES.map((f) => (
              <button
                key={f.id}
                className={`eco-chip ${active === f.id ? "on" : ""}`}
                onMouseEnter={() => setActive(f.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(f.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(f.id)}
                data-testid={`eco-chip-${f.id}`}
              >
                <i />
                {f.label}
              </button>
            ))}
          </div>
          <p className="eco-desc" data-testid="eco-description">
            {current ? current.text : "One gateway, one platform, one intelligent home network — every capability working as a single system."}
          </p>
        </motion.div>

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
