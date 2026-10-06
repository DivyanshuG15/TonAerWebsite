import { BarChart3, Building2, Network, Router, Settings2, Sparkles, Users } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const LAYERS = [
  { label: "MSO / ISP", Icon: Building2 },
  { label: "NETWORK", Icon: Network },
  { label: "DEVICES", Icon: Router },
  { label: "USERS", Icon: Users },
  { label: "OPERATIONS", Icon: Settings2 },
  { label: "ANALYTICS", Icon: BarChart3 },
  { label: "AI", Icon: Sparkles },
];

export default function LayeredPlatform() {
  return (
    <section className="sec layr" data-testid="layered-platform">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="ONE PLATFORM FOR EVERY OPERATION"
          title={<>One view.<br /><em>Every layer of your operation.</em></>}
          copy="The TonAer platform brings every operational layer together — from multi-operator management down to the intelligence running underneath."
        />
        <div className="ly-stack" data-testid="layer-stack">
          {LAYERS.map(({ label, Icon }, i) => (
            <Reveal key={label} className="ly-plate" delay={i * 0.05} style={{ width: `${44 + i * 7}%` }}>
              <span style={{ display: "contents" }}>
                <Icon />
                {label}
              </span>
            </Reveal>
          ))}
          <div className="ly-join" />
          <Reveal className="ly-base" delay={0.4}>
            <span style={{ display: "contents" }}>
              <img src="/assets/favicon.png" alt="" />
              <span>
                <b>TonAer Platform</b>
                <small>EVERY LAYER · ONE VIEW</small>
              </span>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
