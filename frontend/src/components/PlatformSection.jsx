import { motion } from "framer-motion";
import { BarChart3, BellRing, BrainCircuit, Building2, CloudCog, Network, Router, Smartphone } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const METERS = [["SIGNAL", 70], ["WAN", 86], ["WI-FI", 62], ["UPTIME", 96], ["PERF", 78]];

export default function PlatformSection() {
  return (
    <section className="sec sec-dark plat" id="platform" data-testid="platform-section">
      <div className="section-shell">
        <SecHead
          eyebrow="ONE INTELLIGENT PLATFORM"
          title={<>One platform.<br /><em>Complete visibility.</em></>}
          copy="Manage your network, devices, users and operations through one intelligent cloud platform built for ISPs, MSOs and telecom operators."
        />
        <motion.div
          className="ps-frame"
          initial={{ opacity: 0, y: 70, rotateX: 14 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1400 }}
        >
          <div className="ps-bar">
            <span className="ps-dots"><i /><i /><i /></span>
            <span className="ps-url">cloud.tonaer.com / overview</span>
            <span className="ps-live"><i />LIVE</span>
          </div>
          <img src="/assets/dashboard-ui.png" alt="TonAer network management dashboard — system overview, gateway telemetry, AI insights and recent alerts" data-testid="platform-dashboard-image" />
          <div className="ps-chip ps-chip-a"><b>98.7%</b><span>NETWORK HEALTH</span></div>
          <div className="ps-chip ps-chip-b"><b>12,482</b><span>CONNECTED DEVICES</span></div>
          <div className="ps-chip ps-chip-c"><b>0</b><span>ACTIVE THREATS</span></div>
        </motion.div>

        <div className="pf-grid plat-cards" data-testid="platform-capability-cards">
          <Reveal className="fcard fcard-dark pf-a" delay={0}>
            <div className="fcard-vis vis-teal">
              <Building2 className="vis-icon" />
              <div className="chain">
                <span className="chain-node"><Building2 />MSO</span><span className="chain-link" />
                <span className="chain-node"><Network />ISP</span><span className="chain-link" />
                <span className="chain-node">SITES</span><span className="chain-link" />
                <span className="chain-node">CUSTOMERS</span><span className="chain-link" />
                <span className="chain-node"><Router />DEVICES</span>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">MULTI-TENANT OPERATIONS</span>
              <h3>ISP / MSO Management</h3>
              <p>Manage multiple operators, tenants, sites, customers and network environments from one platform.</p>
            </div>
          </Reveal>

          <Reveal className="fcard fcard-dark pf-b" delay={0.07}>
            <div className="fcard-vis vis-ink">
              <div className="meters" style={{ color: "#8fb5ae" }}>
                {METERS.map(([label, h], i) => (
                  <div className="meter" key={label}><i style={{ height: `${h}%`, animationDelay: `${-i * 0.5}s` }} /><small>{label}</small></div>
                ))}
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">LIVE TELEMETRY</span>
              <h3>Real-time Gateway Telemetry</h3>
              <p>See gateway health, connectivity, performance and telemetry in real time.</p>
            </div>
          </Reveal>

          <Reveal className="fcard fcard-dark pf-c" delay={0.05}>
            <div className="fcard-vis vis-mint">
              <CloudCog className="vis-icon" />
              <div className="chain">
                <span className="chain-node"><CloudCog />CLOUD</span><span className="chain-link" />
                <span className="chain-node"><Router />GATEWAY</span><span className="chain-link" />
                <span className="chain-node"><Smartphone />DEVICE</span>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">ZERO TOUCH</span>
              <h3>Remote Device Management</h3>
              <p>Securely access, configure, diagnose and manage devices remotely.</p>
            </div>
          </Reveal>

          <Reveal className="fcard fcard-dark pf-d" delay={0.1}>
            <div className="fcard-vis vis-ink">
              <BrainCircuit className="vis-icon" />
              <div className="flow">
                <span className="flow-step">DETECT</span><span className="flow-arrow" />
                <span className="flow-step">ANALYZE</span><span className="flow-arrow" />
                <span className="flow-step">ROOT CAUSE</span><span className="flow-arrow" />
                <span className="flow-step hot">RECOMMEND</span>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">NETWORK INTELLIGENCE</span>
              <h3>AI Troubleshooting</h3>
              <p>Detect issues, understand symptoms and accelerate root-cause analysis.</p>
            </div>
          </Reveal>

          <Reveal className="fcard fcard-dark pf-e" delay={0.06}>
            <div className="fcard-vis vis-paper">
              <div className="op-alerts">
                <div className="op-alert"><i className="crit" />High latency detected<small>2 MIN</small></div>
                <div className="op-alert"><i className="warn" />Mesh node unstable<small>9 MIN</small></div>
                <div className="op-alert"><i className="ok" />New device connected<small>14 MIN</small></div>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">ALWAYS WATCHING</span>
              <h3>Real-time Alerts &amp; Monitoring</h3>
              <p>Surface important events instantly and maintain visibility across the network.</p>
            </div>
          </Reveal>

          <Reveal className="fcard fcard-dark pf-f" delay={0.12}>
            <div className="fcard-vis vis-teal">
              <BarChart3 className="vis-icon" />
              <svg className="mini-chart" viewBox="0 0 300 120" aria-hidden="true">
                {[34, 52, 44, 66, 58, 80, 72].map((h, i) => (
                  <rect key={i} className={`bar ${i === 5 ? "hi" : ""}`} x={14 + i * 40} y={104 - h} width="20" height={h} rx="3" />
                ))}
                <polyline points="24,70 64,52 104,60 144,38 184,46 224,24 264,32" />
              </svg>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">OPERATIONAL INSIGHT</span>
              <h3>Reports &amp; Analytics</h3>
              <p>Transform real-time network and device data into operational insights.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
