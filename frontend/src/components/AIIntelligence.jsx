import { useState } from "react";
import { ArrowRight, Crosshair, MessageSquare, Radar, TrendingUp, Zap } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const AI_VIDEO = "/assets/ai-intelligence.mp4";
const AI_POSTER = "/assets/ai-poster.jpg";

const CARDS = [
  { Icon: Radar, stage: "01", label: "DETECT", title: "See Problems as They Happen", text: "Detect anomalies before they become customer-impacting issues." },
  { Icon: Crosshair, stage: "02", label: "DIAGNOSE", title: "Find the Root Cause Faster", text: "Connect network signals to uncover what's actually causing the issue." },
  { Icon: MessageSquare, stage: "03", label: "UNDERSTAND", title: "Ask Your Network Anything", text: "Use natural language to turn complex network data into clear answers." },
  { Icon: TrendingUp, stage: "04", label: "PREDICT", title: "Know What's Coming Next", text: "Forecast network health and emerging risks before they become problems." },
  { Icon: Zap, stage: "05", label: "OPTIMIZE", title: "Continuously Improve Performance", text: "Identify opportunities to improve connectivity, stability and efficiency." },
  { Icon: ArrowRight, stage: "06", label: "ACT", title: "Get the Next Best Action", text: "Turn AI insights into clear, actionable recommendations." },
];

export default function AIIntelligence() {
  const [videoFailed, setVideoFailed] = useState(false);

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

        <div className="aic-grid" data-testid="ai-capability-cards">
          {CARDS.map(({ Icon, stage, label, title, text }, i) => (
            <Reveal key={label} className="aic-card" delay={i * 0.06} data-testid={`ai-card-${label.toLowerCase()}`}>
              <div className="aic-top">
                <span className="aic-stage">{stage}</span>
                {i < CARDS.length - 1 && <ArrowRight className="aic-flow-arrow" />}
              </div>
              <div className="aic-icon"><Icon /></div>
              <span className="aic-label">{label}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
