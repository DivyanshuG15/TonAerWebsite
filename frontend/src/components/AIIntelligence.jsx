import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, Eye, Lightbulb, Router, Share2, ShieldAlert, Signal, Siren, Smartphone, TrendingUp, Wrench, Zap } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const SCENARIOS = [
  {
    q: "Why is this customer's Wi-Fi performance degrading?",
    lines: [
      { crit: true, text: "Issue detected — high latency identified on the mesh path" },
      { text: "Likely root cause: mesh node instability" },
      { text: "Affected devices: 4" },
    ],
    action: "Recommended action: reconfigure mesh path",
    trace: [
      { Icon: Smartphone, label: "CUSTOMER" },
      { Icon: Router, label: "GATEWAY" },
      { Icon: Share2, label: "MESH NODE" },
      { Icon: Siren, label: "ISSUE", issue: true },
    ],
  },
  {
    q: "Is there any security risk on this account right now?",
    lines: [
      { crit: true, text: "Network anomaly detected — unusual outbound traffic pattern" },
      { text: "Potential vulnerability: outdated gateway firmware" },
      { text: "Affected gateways: 2" },
    ],
    action: "Recommended action: schedule firmware update",
    trace: [
      { Icon: Smartphone, label: "CUSTOMER" },
      { Icon: Router, label: "GATEWAY" },
      { Icon: ShieldAlert, label: "ANOMALY" },
      { Icon: Siren, label: "ISSUE", issue: true },
    ],
  },
  {
    q: "Will this site stay healthy over the next two weeks?",
    lines: [
      { text: "Forecast generated from live telemetry" },
      { crit: true, text: "Watch condition — rising latency trend detected" },
      { text: "Predicted impact: peak-hour degradation" },
    ],
    action: "Recommended action: optimize channel allocation",
    trace: [
      { Icon: Router, label: "GATEWAY" },
      { Icon: Signal, label: "CHANNELS" },
      { Icon: TrendingUp, label: "CONGESTION" },
      { Icon: Siren, label: "RISK", issue: true },
    ],
  },
];

const AI_CARDS = [
  { Icon: Wrench, title: "Real-time Troubleshooting", text: "Understand and diagnose issues as they happen." },
  { Icon: Zap, title: "AI Optimization", text: "Continuously identify opportunities to improve connectivity." },
  { Icon: TrendingUp, title: "Forecasting", text: "Anticipate changes in network and account health." },
  { Icon: Eye, title: "Predictive Insights", text: "Identify potential problems before they impact users." },
  { Icon: Crosshair, title: "Root Cause Analysis", text: "Move from symptoms to likely causes faster." },
  { Icon: Lightbulb, title: "Intelligent Recommendations", text: "Turn insights into actionable next steps." },
];

export default function AIIntelligence() {
  const [index, setIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (manual || hover) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % SCENARIOS.length), 7000);
    return () => clearInterval(timer);
  }, [manual, hover]);

  const scenario = SCENARIOS[index];
  const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } };

  return (
    <section className="sec sec-dark aint" id="ai" data-testid="ai-section">
      <div className="section-shell">
        <SecHead
          eyebrow="AI INTELLIGENCE"
          title={<>From reactive troubleshooting<br /><em>to real-time intelligence.</em></>}
          copy="Ask questions in natural language, understand what is happening across the network, identify root causes and act before connectivity problems become customer problems."
        />

        <Reveal className="copilot" data-testid="ai-copilot">
          <div className="cop-head">
            <img src="/assets/favicon.png" alt="" />
            TONAER AI COPILOT
            <span className="cop-live"><i />{manual || hover ? "PAUSED" : "LIVE ANALYSIS"}</span>
          </div>
          <div className="cop-grid" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="cop-chat">
              <AnimatePresence mode="wait">
                <motion.div key={index} className="cop-chat-inner" {...fade}>
                  <div className="cop-q">
                    &ldquo;{scenario.q}&rdquo;
                    <small>NETWORK OPERATOR · JUST NOW</small>
                  </div>
                  <div className="cop-a">
                    <b>TONAER AI</b>
                    {scenario.lines.map((line) => (
                      <p className="cop-line" key={line.text}><i className={`dot ${line.crit ? "crit" : ""}`} />{line.text}</p>
                    ))}
                    <p className="cop-line action"><Zap />{scenario.action}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="cop-side">
              <div className="cop-panel">
                <h4>ACCOUNT HEALTH FORECAST <small>ILLUSTRATIVE</small></h4>
                <div className="fc-track" data-testid="ai-forecast">
                  <div className="fc-bar" />
                  <div className="fc-steps">
                    <div className="fc-step"><i className="ok" /><b>Healthy</b><small>TODAY</small></div>
                    <div className="fc-step"><i className="watch" /><b>Watch</b><small>+7 DAYS</small></div>
                    <div className="fc-step"><i className="risk" /><b>Risk</b><small>+14 DAYS</small></div>
                  </div>
                </div>
              </div>
              <div className="cop-panel">
                <h4>REAL-TIME INTELLIGENCE</h4>
                <div className="cop-intel">
                  <p className="warn-i"><Siren />Network anomaly detected</p>
                  <p className="warn-i"><ShieldAlert />Potential vulnerability detected</p>
                  <p><Crosshair />Root cause identified</p>
                  <p><Lightbulb />Recommended action available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cop-trace" data-testid="ai-trace">
            <AnimatePresence mode="wait">
              <motion.span key={index} className="cop-trace-inner" {...fade}>
                {scenario.trace.map((node, i) => (
                  <span key={node.label} style={{ display: "contents" }}>
                    <span className={`trace-node ${node.issue ? "issue" : ""}`}><node.Icon />{node.label}</span>
                    {i < scenario.trace.length - 1 && <span className="trace-link" />}
                  </span>
                ))}
              </motion.span>
            </AnimatePresence>
            <div className="cop-dots" data-testid="copilot-scenario-dots">
              {SCENARIOS.map((s, i) => (
                <button
                  key={s.q}
                  className={i === index ? "on" : ""}
                  onClick={() => { setIndex(i); setManual(true); }}
                  aria-label={`Copilot scenario ${i + 1}`}
                  data-testid={`copilot-scenario-${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="ai2-cards" data-testid="ai-capability-cards">
          {AI_CARDS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} className="ai2-card" delay={i * 0.05}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
        <p className="ai-note">ILLUSTRATIVE AI INTERACTION — NOT REAL CUSTOMER DATA</p>
      </div>
    </section>
  );
}
