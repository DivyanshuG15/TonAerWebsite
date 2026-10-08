import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Crosshair, MessageSquare, Radar, TrendingUp, Zap } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const AI_VIDEO = "/assets/ai-intelligence.mp4";
const AI_POSTER = "/assets/ai-poster.jpg";

const STAGES = [
  {
    id: "detect", num: "01", label: "DETECT", Icon: Radar,
    title: "See Problems as They Happen",
    desc: "Detect anomalies before they become customer-impacting issues.",
    example: "alerts",
  },
  {
    id: "diagnose", num: "02", label: "DIAGNOSE", Icon: Crosshair,
    title: "Find the Root Cause Faster",
    desc: "Connect network signals to uncover what's actually causing the issue.",
    example: "converge",
  },
  {
    id: "understand", num: "03", label: "UNDERSTAND", Icon: MessageSquare,
    title: "Ask Your Network Anything",
    desc: "Use natural language to turn complex network data into clear answers.",
    example: "qa",
  },
  {
    id: "predict", num: "04", label: "PREDICT", Icon: TrendingUp,
    title: "Know What's Coming Next",
    desc: "Forecast network health and emerging risks before they become problems.",
    example: "forecast",
  },
  {
    id: "optimize", num: "05", label: "OPTIMIZE", Icon: Zap,
    title: "Continuously Improve Performance",
    desc: "Identify opportunities to improve connectivity, stability and efficiency.",
    example: "optimize",
  },
  {
    id: "act", num: "06", label: "ACT", Icon: ArrowRight,
    title: "Get the Next Best Action",
    desc: "Turn AI insights into clear, actionable recommendations.",
    example: "act",
  },
];

function StageVisual({ kind }) {
  if (kind === "alerts") {
    return (
      <div className="op-alerts" style={{ maxWidth: 260 }}>
        <div className="op-alert"><i className="crit" />Elevated latency detected<small>LIVE</small></div>
        <div className="op-alert"><i className="warn" />3 gateways affected<small>LIVE</small></div>
      </div>
    );
  }
  if (kind === "converge") {
    return (
      <div className="aiw-converge">
        <div className="aiw-signals">
          <span>LATENCY</span><span>PACKET LOSS</span><span>RSSI DROP</span>
        </div>
        <span className="aiw-converge-arrow">↓</span>
        <span className="aiw-cause">ROOT CAUSE — CHANNEL CONGESTION</span>
      </div>
    );
  }
  if (kind === "qa") {
    return (
      <div className="aiw-qa">
        <div className="aiw-q">&ldquo;Why is this customer experiencing slow Wi-Fi?&rdquo;</div>
        <div className="aiw-a">Elevated latency detected on Mesh Node 02.</div>
      </div>
    );
  }
  if (kind === "forecast") {
    return (
      <div className="aiw-fc-track">
        <div className="aiw-fc-bar" />
        <div className="aiw-fc-steps">
          <div className="aiw-fc-step"><i style={{ background: "#00c7a5" }} /><b>Healthy</b><small>TODAY</small></div>
          <div className="aiw-fc-step"><i style={{ background: "#e6b052" }} /><b>Watch</b><small>+7 DAYS</small></div>
          <div className="aiw-fc-step"><i style={{ background: "#e2684f" }} /><b>Risk</b><small>+14 DAYS</small></div>
        </div>
      </div>
    );
  }
  if (kind === "optimize") {
    return (
      <div className="aiw-bars">
        <div className="aiw-bar"><small>CHANNEL UTILIZATION — BEFORE</small><div><i style={{ width: "82%" }} /></div></div>
        <div className="aiw-bar"><small>AFTER OPTIMIZATION</small><div><i style={{ width: "34%" }} /></div></div>
        <span className="aiw-cause">CHANNEL OPTIMIZATION RECOMMENDED</span>
      </div>
    );
  }
  return (
    <div className="aiw-act">
      <div className="aiw-act-row">
        <CheckCircle2 />
        <div>
          <b>Optimize channel allocation</b>
          <span>Mesh Node 02 · 4 devices affected</span>
        </div>
      </div>
      <span className="aiw-act-btn">RECOMMENDED ACTION AVAILABLE</span>
    </div>
  );
}

export default function AIIntelligence() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [stage, setStage] = useState("detect");
  const current = STAGES.find((s) => s.id === stage);

  return (
    <section className="sec aint" id="ai" data-testid="ai-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="AI INTELLIGENCE"
          title={<>From reactive troubleshooting<br /><em>to real-time intelligence.</em></>}
        />
        <Reveal className="aiv-actions" delay={0.1}>
          {["Ask.", "Understand.", "Predict.", "Act."].map((word) => (
            <span className="aiv-chip" key={word}>{word}</span>
          ))}
        </Reveal>
        <Reveal delay={0.16}>
          <p className="aiv-copy">Your network doesn&rsquo;t just report what happened. TonAer helps you understand what&rsquo;s happening, why it matters, and what to do next.</p>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="aiv-line">FROM NETWORK DATA <span>→</span> TO ACTIONABLE INTELLIGENCE</p>
          <div className="aiv-frame" data-testid="ai-video-frame">
            {!videoFailed ? (
              <video
                src={AI_VIDEO}
                poster={AI_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                data-testid="ai-video"
              />
            ) : (
              <img src={AI_POSTER} alt="TonAer AI intelligence in action" data-testid="ai-video-poster" />
            )}
          </div>
        </Reveal>

        <Reveal className="sub-head center" delay={0.05}>
          <h3>One AI engine. <em>Six ways to work smarter.</em></h3>
        </Reveal>

        <Reveal className="aiw" data-testid="ai-workflow">
          <div className="aiw-track" role="tablist" data-testid="ai-stage-track">
            {STAGES.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={stage === s.id}
                className={`aiw-stage ${stage === s.id ? "on" : ""}`}
                onClick={() => setStage(s.id)}
                data-testid={`ai-stage-${s.id}`}
              >
                <i>{s.num}</i>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="aiw-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              data-testid="ai-stage-panel"
            >
              <div>
                <div className="aiw-ico"><current.Icon /></div>
                <span className="aiw-label">{current.num} — {current.label}</span>
                <h4>{current.title}</h4>
                <p>{current.desc}</p>
              </div>
              <div className="aiw-vis" data-testid="ai-stage-visual">
                <StageVisual kind={current.example} />
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
