import { Boxes, MonitorCheck, Plug, Settings2, SlidersHorizontal, TrendingUp } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const STEPS = [
  { label: "Existing Ecosystem", text: "Your current gateways, nodes and services", Icon: Boxes },
  { label: "Connect", text: "Link devices into the TonAer environment", Icon: Plug },
  { label: "Configure", text: "Apply network and service policies", Icon: Settings2 },
  { label: "TonAer Platform", text: "One unified management layer", hub: true },
  { label: "Manage", text: "Devices, users and services centrally", Icon: SlidersHorizontal },
  { label: "Monitor", text: "Live telemetry, health and alerts", Icon: MonitorCheck },
  { label: "Optimize", text: "AI-driven improvements over time", Icon: TrendingUp },
];

export default function EcosystemIntegration() {
  return (
    <section className="sec integ" id="solutions" data-testid="integration-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="EXISTING ECOSYSTEM CONFIGURATION"
          title={<>Bring your existing ecosystem.<br /><em>Connect it to intelligence.</em></>}
          copy="Connect and configure your existing ecosystem into the TonAer platform, helping operators move toward unified management without creating another fragmented technology stack."
        />
        <Reveal className="int-track" data-testid="integration-journey">
          {STEPS.map(({ label, text, Icon, hub }) => (
            <div key={label} className={`int-step ${hub ? "hub" : ""}`} data-testid={hub ? "integration-hub-step" : undefined}>
              <div className="int-dot">{hub ? <img src="/assets/favicon.png" alt="" style={{ width: 28, height: 28 }} /> : <Icon />}</div>
              <div>
                <b>{label}</b>
                <br />
                <span>{text}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
