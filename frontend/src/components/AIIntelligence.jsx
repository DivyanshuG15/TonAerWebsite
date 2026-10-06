import { Crosshair, Eye, Lightbulb, TrendingUp, Wrench, Zap } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const AI_CARDS = [
  { Icon: Wrench, title: "AI-Based Troubleshooting", text: "Identify network issues and help determine root causes faster." },
  { Icon: Zap, title: "AI Optimization", text: "Identify opportunities to improve network performance." },
  { Icon: TrendingUp, title: "Forecasting", text: "Anticipate potential network and device performance changes." },
  { Icon: Eye, title: "Predictive Insights", text: "Surface issues before they become larger operational problems." },
  { Icon: Crosshair, title: "Intelligent Root Cause Analysis", text: "Trace network symptoms back to likely causes." },
  { Icon: Lightbulb, title: "Intelligent Recommendations", text: "Present actionable next steps to operators." },
];

export default function AIIntelligence() {
  return (
    <section className="sec sec-dark aint" id="ai" data-testid="ai-section">
      <div className="section-shell">
        <SecHead
          eyebrow="AI INTELLIGENCE"
          title={<>From reactive troubleshooting<br /><em>to real-time intelligence.</em></>}
          copy="TonAer brings AI into network operations to detect issues, identify root causes, forecast performance and help operators resolve problems faster."
        />
        <div className="ai2-grid">
          <Reveal className="ai2-frame" data-testid="ai-dashboard-frame">
            <span className="ai2-callout ai2-c1"><i />AI TROUBLESHOOTING</span>
            <span className="ai2-callout ai2-c2"><i />FORECASTING</span>
            <span className="ai2-callout ai2-c3"><i />ROOT-CAUSE ANALYSIS</span>
            <img src="/assets/dashboard.png" alt="TonAer platform with AI insights, threat detection and real-time network intelligence" />
          </Reveal>
          <div className="ai2-cards">
            {AI_CARDS.map(({ Icon, title, text }, i) => (
              <Reveal key={title} className="ai2-card" delay={i * 0.05}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
