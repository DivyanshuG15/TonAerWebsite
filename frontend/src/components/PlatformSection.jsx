import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const VIEWS = [
  {
    id: "network",
    label: "Network",
    cat: "NETWORK OPERATIONS",
    title: "See your entire network at a glance.",
    desc: "Monitor network health, connected devices, gateway status, traffic and operational performance from one unified dashboard.",
    type: "img",
    src: "/assets/dashboard-ui.png",
    alt: "TonAer network dashboard — network health, connected devices, gateway status and AI insights",
  },
  {
    id: "devices",
    label: "Devices",
    cat: "DEVICE MANAGEMENT",
    title: "Every device. One view.",
    desc: "Manage master and satellite devices across models, monitor status, firmware, connectivity and device health from a single interface.",
    type: "img",
    src: "/assets/product-devices.png",
    alt: "TonAer device management — all devices, online and offline status, firmware and gateway information",
  },
  {
    id: "analytics",
    label: "Analytics",
    cat: "REAL-TIME ANALYTICS",
    title: "See what's happening in real time.",
    desc: "Turn live telemetry into actionable visibility across connectivity, signal quality, throughput, utilization and device performance.",
    type: "img",
    src: "/assets/product-analytics.png",
    alt: "TonAer real-time analytics — Wi-Fi chip temperature and load average telemetry",
  },
  {
    id: "reports",
    label: "Reports",
    cat: "REPORTS & INSIGHTS",
    title: "Turn network data into decisions.",
    desc: "Transform operational data into clear reports across usage, device activity, activations, network performance and customer trends.",
    type: "img",
    src: "/assets/product-reports.png",
    alt: "TonAer reports — network overview, usage, trends and device information",
  },
  {
    id: "copilot",
    label: "Copilot",
    cat: "TONAER COPILOT",
    title: "Ask your network. Get intelligent answers.",
    desc: "Use natural language to investigate issues, understand network behavior, identify root causes and discover the next best action.",
    type: "video",
    src: "/assets/ai-intelligence.mp4",
    poster: "/assets/ai-poster.jpg",
    flow: ["ASK", "UNDERSTAND", "DIAGNOSE", "ACT"],
  },
  {
    id: "qoe",
    label: "QoE",
    cat: "CONNECTED DEVICE QoE",
    title: "See the experience behind the connection.",
    desc: "Understand how connected devices are actually experiencing the network — from signal quality and throughput to connectivity, performance and overall Quality of Experience.",
    type: "scroll",
    src: "/assets/product-qoe.png",
    alt: "TonAer connected device QoE — quality of experience, signal quality, RSSI, data consumption, channel utilization and throughput",
  },
];

export default function PlatformSection() {
  const [active, setActive] = useState("network");
  const view = VIEWS.find((v) => v.id === active);

  return (
    <section className="sec plat" id="platform" data-testid="platform-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="ONE INTELLIGENT PLATFORM"
          title={<>One platform.<br /><em>Complete visibility.</em></>}
          copy="Everything your network needs to operate, evolve and perform — from network and device management to real-time intelligence, reporting and customer experience."
        />

        <Reveal className="px-explore">
          <span className="px-label">EXPLORE THE PLATFORM</span>
          <div className="px-tabs" role="tablist" data-testid="platform-tabs">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={active === v.id}
                className={`px-tab ${active === v.id ? "on" : ""}`}
                onClick={() => setActive(v.id)}
                data-testid={`platform-tab-${v.id}`}
              >
                <i />
                {v.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="px-frame" delay={0.08} data-testid="platform-viewport">
          <div className="px-bar">
            <span className="ps-dots"><i /><i /><i /></span>
            <span className="ps-url">cloud.tonaer.com / {view.id}</span>
            <span className="ps-live"><i />LIVE</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={view.id}
              className={`px-screen ${view.type === "scroll" ? "is-scroll" : ""}`}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {view.type === "video" && (
                <video src={view.src} poster={view.poster} autoPlay muted loop playsInline preload="metadata" data-testid="platform-video" />
              )}
              {view.type === "img" && <img src={view.src} alt={view.alt} data-testid="platform-image" />}
              {view.type === "scroll" && (
                <div className="px-scroll" data-testid="platform-scroll-view">
                  <img src={view.src} alt={view.alt} />
                  <span className="px-scroll-hint">SCROLL TO EXPLORE TELEMETRY ↓</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={view.id}
            className="px-info"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-testid="platform-view-info"
          >
            <span className="px-cat">{view.cat}</span>
            <h3>{view.title}</h3>
            <p>{view.desc}</p>
            {view.flow && (
              <div className="px-flow" data-testid="copilot-flow">
                {view.flow.map((step, i) => (
                  <span key={step} style={{ display: "contents" }}>
                    <span className="px-flow-step">{step}</span>
                    {i < view.flow.length - 1 && <span className="px-flow-arrow">→</span>}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <Reveal className="px-closer" delay={0.05}>
          <h4>One platform. <em>Every layer of your network.</em></h4>
          <p>DEVICES · CONNECTIVITY · OPERATIONS · INTELLIGENCE · ANALYTICS · EXPERIENCE</p>
        </Reveal>
      </div>
    </section>
  );
}
