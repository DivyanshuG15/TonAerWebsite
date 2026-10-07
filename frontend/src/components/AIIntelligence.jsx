import { Crosshair, Eye, Lightbulb, Router, Share2, ShieldAlert, Siren, Smartphone, TrendingUp, Wrench, Zap } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const AI_CARDS = [
  { Icon: Wrench, title: "Real-time Troubleshooting", text: "Understand and diagnose issues as they happen." },
  { Icon: Zap, title: "AI Optimization", text: "Continuously identify opportunities to improve connectivity." },
  { Icon: TrendingUp, title: "Forecasting", text: "Anticipate changes in network and account health." },
  { Icon: Eye, title: "Predictive Insights", text: "Identify potential problems before they impact users." },
  { Icon: Crosshair, title: "Root Cause Analysis", text: "Move from symptoms to likely causes faster." },
  { Icon: Lightbulb, title: "Intelligent Recommendations", text: "Turn insights into actionable next steps." },
];

export default function AIIntelligence() {
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
            <span className="cop-live"><i />LIVE ANALYSIS</span>
          </div>
          <div className="cop-grid">
            <div className="cop-chat">
              <div className="cop-q">
                &ldquo;Why is this customer&rsquo;s Wi-Fi performance degrading?&rdquo;
                <small>NETWORK OPERATOR · JUST NOW</small>
              </div>
              <div className="cop-a">
                <b>TONAER AI</b>
                <p className="cop-line"><i className="dot crit" />Issue detected — high latency identified on the mesh path</p>
                <p className="cop-line"><i className="dot" />Likely root cause: mesh node instability</p>
                <p className="cop-line"><i className="dot" />Affected devices: 4</p>
                <p className="cop-line action"><Zap />Recommended action: reconfigure mesh path</p>
              </div>
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
            <span className="trace-node"><Smartphone />CUSTOMER</span>
            <span className="trace-link" />
            <span className="trace-node"><Router />GATEWAY</span>
            <span className="trace-link" />
            <span className="trace-node"><Share2 />MESH NODE</span>
            <span className="trace-link" />
            <span className="trace-node issue"><Siren />ISSUE</span>
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
