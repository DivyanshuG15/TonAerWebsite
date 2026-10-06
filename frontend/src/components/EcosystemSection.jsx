import { useState } from "react";
import { motion } from "framer-motion";
import "./ecosystem.css";

const FEATURES = [
  { id: "5g", label: "5G", x: 28, y: 13, text: "High-performance 5G for reliable, always-on connectivity." },
  { id: "esim", label: "eSIM", x: 27, y: 31, text: "Built-in eSIM for flexible, remote network provisioning." },
  { id: "easymesh", label: "EASYMESH", x: 27, y: 48, text: "Seamless whole-home mesh connectivity with easy expansion." },
  { id: "wifi7", label: "WI-FI 7", x: 73, y: 13, text: "Next-generation wireless with higher speed, lower latency and greater capacity." },
  { id: "triband", label: "TRI-BAND", x: 72, y: 32, text: "2.4 GHz + 5 GHz + 6 GHz for wider coverage, higher capacity and better performance." },
  { id: "cloud", label: "CLOUD MANAGED", x: 72, y: 51, text: "Manage, monitor and update devices remotely through the TonAer platform." },
  { id: "app", label: "MOBILE APP", x: 75, y: 64, text: "An intuitive app for end users to manage their home network, devices and connectivity." },
];

export default function EcosystemSection() {
  const [active, setActive] = useState(null);
  const current = FEATURES.find((f) => f.id === active);
  const spot = current ? { "--sx": `${current.x}%`, "--sy": `${current.y}%` } : {};

  return (
    <section className="eco" id="devices" data-testid="ecosystem-section">
      <div className="section-shell split-heading">
        <div>
          <p className="eyebrow teal">ONE CONNECTED ECOSYSTEM / 05</p>
          <h2>From device<br />to <em>digital experience.</em></h2>
        </div>
        <p>Premium hardware and a powerful platform experience, connected by intelligence. Every layer is designed to work as one — hover any capability to see where it lives.</p>
      </div>

      <motion.div
        className="eco-stage section-shell"
        initial={{ opacity: 0, y: 34, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="eco-frame" onMouseLeave={() => setActive(null)}>
          <img src="/assets/ecosystem.png" alt="TonAer smart gateway ecosystem — 5G, eSIM, EasyMesh, Wi-Fi 7, Tri-Band, cloud managed with end user mobile app" data-testid="ecosystem-image" />
          <div className={`eco-dim ${current ? "on" : ""}`} style={spot} />
          {current && (
            <div className="eco-ring" style={spot} aria-hidden="true">
              <i />
            </div>
          )}
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
    </section>
  );
}
