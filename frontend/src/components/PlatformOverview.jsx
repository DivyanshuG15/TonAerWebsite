import { BarChart3, Building2, Network, Router, Settings2, Sparkles, Users } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const CX = 500, CY = 280;
const NODES = [
  { id: "mso", label: "MSO / ISP", Icon: Building2, x: 130, y: 120 },
  { id: "network", label: "NETWORK", Icon: Network, x: 500, y: 64 },
  { id: "ai", label: "AI", Icon: Sparkles, x: 870, y: 120 },
  { id: "operations", label: "OPERATIONS", Icon: Settings2, x: 110, y: 440 },
  { id: "devices", label: "DEVICES", Icon: Router, x: 360, y: 496 },
  { id: "users", label: "USERS", Icon: Users, x: 640, y: 496 },
  { id: "analytics", label: "ANALYTICS", Icon: BarChart3, x: 890, y: 440 },
];

export default function PlatformOverview() {
  return (
    <section className="sec sec-dark pov" data-testid="platform-overview">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="THE TONAER ANSWER"
          title={<>One intelligent platform.<br /><em>One connected ecosystem.</em></>}
          copy="TonAer unifies devices, networks, users, operations and intelligence in one connected environment."
        />
        <Reveal className="hub-wrap" delay={0.1}>
          <svg className="hub-svg" viewBox="0 0 1000 560" aria-hidden="true">
            {NODES.map((n, i) => (
              <g key={n.id}>
                <path className="hub-line" d={`M${CX} ${CY} L${n.x} ${n.y}`} />
                <circle className="hub-pulse" r="3.5">
                  <animateMotion dur={`${2.6 + i * 0.35}s`} repeatCount="indefinite" path={`M${CX} ${CY} L${n.x} ${n.y}`} />
                </circle>
              </g>
            ))}
          </svg>
          <div className="hub-core" data-testid="platform-hub">
            <img src="/assets/favicon.png" alt="" />
            <b>TonAer</b>
            <small>PLATFORM</small>
          </div>
          {NODES.map(({ id, label, Icon, x, y }) => (
            <div key={id} className="hub-node" style={{ left: `${x / 10}%`, top: `${y / 5.6}%` }} data-testid={`hub-node-${id}`}>
              <Icon />
              {label}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
