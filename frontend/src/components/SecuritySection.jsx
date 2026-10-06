import { Eye, ScanLine, ShieldAlert, ShieldCheck, Siren } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const CARDS = [
  { Icon: ShieldAlert, title: "Threat Detection", text: "Suspicious behaviour and potential security threats are surfaced as they emerge." },
  { Icon: ScanLine, title: "Network Anomaly Detection", text: "Unusual patterns across traffic, devices and sessions are flagged automatically." },
  { Icon: Eye, title: "Security Monitoring", text: "Continuous watch over the connected environment — gateways, mesh and users." },
  { Icon: Siren, title: "Alerting & Response", text: "Prioritized alerts help teams respond before issues become incidents." },
];

export default function SecuritySection() {
  return (
    <section className="sec sec-dark secu" data-testid="security-section">
      <div className="section-shell">
        <SecHead
          eyebrow="ADVANCED SECURITY"
          title={<>Intelligent visibility.<br /><em>Stronger network protection.</em></>}
          copy="Continuously monitor the connected environment and surface suspicious activity, potential threats and network anomalies."
        />
        <div className="secu-grid">
          <Reveal className="secu-visual" data-testid="security-visual">
            <div className="secu-sweep" />
            <span className="secu-node" style={{ left: "18%", top: "26%" }} />
            <span className="secu-node" style={{ left: "78%", top: "22%" }} />
            <span className="secu-node threat" style={{ left: "70%", top: "66%" }} />
            <span className="secu-node" style={{ left: "24%", top: "72%" }} />
            <span className="secu-tag" style={{ left: "10%", top: "18%" }}>GATEWAY · ONLINE</span>
            <span className="secu-tag" style={{ right: "8%", top: "60%", borderColor: "rgba(226,104,79,.6)", color: "#f0b3a4" }}>ANOMALY · FLAGGED</span>
            <span className="secu-tag" style={{ left: "14%", bottom: "10%" }}>MESH · MONITORED</span>
            <div className="secu-shield"><ShieldCheck /></div>
          </Reveal>
          <div className="secu-cards">
            {CARDS.map(({ Icon, title, text }, i) => (
              <Reveal key={title} className="ai2-card" delay={i * 0.06}>
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
