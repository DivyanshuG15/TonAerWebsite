import { Layers, TimerReset, Unplug, Workflow } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const CARDS = [
  { Icon: Unplug, tag: "VISIBILITY GAP", title: "Fragmented Management", text: "Devices, users, networks and operations often live across different systems.", span: "pr-w7" },
  { Icon: TimerReset, tag: "REACTIVE MODE", title: "Reactive Troubleshooting", text: "Issues are discovered only after customers experience poor connectivity.", span: "pr-w5" },
  { Icon: Workflow, tag: "SILOED HARDWARE", title: "Disconnected Ecosystems", text: "Gateways, mesh devices and services need to work as one connected environment.", span: "pr-w5" },
  { Icon: Layers, tag: "STACK OVERHEAD", title: "Multiple Vendor Complexity", text: "Managing separate hardware and software ecosystems creates operational overhead.", span: "pr-w7" },
];

export default function ProblemSection() {
  return (
    <section className="sec prob" data-testid="problem-section">
      <div className="section-shell">
        <SecHead
          eyebrow="THE OPERATOR PROBLEM"
          title={<>Modern networks are connected.<br /><em>Network operations shouldn&rsquo;t be fragmented.</em></>}
          copy="Customers expect seamless connectivity. Operators need visibility, intelligence and control across devices, users, networks and operations — from one place."
        />
        <div className="pr-grid">
          {CARDS.map(({ Icon, tag, title, text, span }, i) => (
            <Reveal key={title} className={`fcard pr-card ${span}`} delay={i * 0.08}>
              <span className="pr-pulse" />
              <div className="fcard-vis vis-paper">
                <div className="pr-icon"><Icon /></div>
              </div>
              <div className="fcard-body">
                <span className="fcard-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
