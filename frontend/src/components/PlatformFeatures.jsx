import { BarChart3, BrainCircuit, Building2, CloudCog, Network, Router, ShieldAlert, Smartphone } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const METERS = [
  ["SIGNAL", 70], ["WAN", 86], ["WI-FI", 62], ["UPTIME", 96], ["PERF", 78],
];

export default function PlatformFeatures() {
  return (
    <section className="sec pfeat" data-testid="platform-features">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="PLATFORM CAPABILITIES"
          title={<>Everything your network needs.<br /><em>In one intelligent platform.</em></>}
          copy="From real-time telemetry to AI-driven troubleshooting, TonAer gives operators the visibility and control to manage the connected experience end to end."
        />
        <div className="pf-grid">
          <Reveal className="fcard pf-a" delay={0}>
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
              <p>Manage multiple operators, tenants, sites, customers and network environments from one unified platform.</p>
            </div>
          </Reveal>

          <Reveal className="fcard pf-b" delay={0.07}>
            <div className="fcard-vis vis-ink">
              <div className="meters" style={{ color: "#8fb5ae" }}>
                {METERS.map(([label, h], i) => (
                  <div className="meter" key={label}>
                    <i style={{ height: `${h}%`, animationDelay: `${-i * 0.5}s` }} />
                    <small>{label}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">LIVE TELEMETRY</span>
              <h3>Real-time Gateway Telemetry</h3>
              <p>Monitor gateway health, connectivity, performance and telemetry in real time for instant operational visibility.</p>
            </div>
          </Reveal>

          <Reveal className="fcard pf-c" delay={0.05}>
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
              <p>Securely access, configure, diagnose and manage devices remotely without physical intervention.</p>
            </div>
          </Reveal>

          <Reveal className="fcard pf-d" delay={0.1}>
            <div className="fcard-vis vis-ink">
              <BrainCircuit className="vis-icon" />
              <div className="flow">
                <span className="flow-step">DETECT</span><span className="flow-arrow" />
                <span className="flow-step">ANALYZE</span><span className="flow-arrow" />
                <span className="flow-step">ROOT CAUSE</span><span className="flow-arrow" />
                <span className="flow-step hot">RECOMMENDATION</span>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">NETWORK INTELLIGENCE</span>
              <h3>AI Forecasting &amp; Troubleshooting</h3>
              <p>Use AI-powered forecasting, intelligent diagnostics and root-cause analysis to identify problems earlier and improve network performance.</p>
            </div>
          </Reveal>

          <Reveal className="fcard pf-e" delay={0.06}>
            <div className="fcard-vis vis-paper">
              <ShieldAlert className="vis-icon" />
              <div className="flow">
                <span className="flow-step" style={{ background: "rgba(4,80,68,.08)", borderColor: "rgba(0,167,142,.4)", color: "#0b3d36" }}>NETWORK</span><span className="flow-arrow" style={{ background: "rgba(0,167,142,.5)" }} />
                <span className="flow-step" style={{ background: "rgba(4,80,68,.08)", borderColor: "rgba(0,167,142,.4)", color: "#0b3d36" }}>DETECTION</span><span className="flow-arrow" style={{ background: "rgba(0,167,142,.5)" }} />
                <span className="flow-step" style={{ background: "rgba(4,80,68,.08)", borderColor: "rgba(0,167,142,.4)", color: "#0b3d36" }}>ALERT</span><span className="flow-arrow" style={{ background: "rgba(0,167,142,.5)" }} />
                <span className="flow-step hot">PROTECTION</span>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">ALWAYS-ON SECURITY</span>
              <h3>Advanced Threat Detection</h3>
              <p>Continuously monitor network activity and surface suspicious behaviour or potential security threats.</p>
            </div>
          </Reveal>

          <Reveal className="fcard pf-f" delay={0.12}>
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
              <h3>Real-time Reports &amp; Dashboards</h3>
              <p>Transform live network and device data into actionable reports, dashboards and operational insights.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
