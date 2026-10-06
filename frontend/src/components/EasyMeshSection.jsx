import { Box, GitMerge, Radar, Router, SlidersHorizontal, Users } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const PATH = [
  { label: "GATEWAY", Icon: Router, x: 10 },
  { label: "MESH NODE", Icon: Box, x: 37 },
  { label: "MESH NODE", Icon: Box, x: 63 },
  { label: "USERS", Icon: Users, x: 90 },
];

const CARDS = [
  { Icon: GitMerge, tag: "GROW ANYWHERE", title: "Seamless Expansion", text: "Add mesh nodes and extend coverage without new wiring or complex setup — the network grows as the space does." },
  { Icon: Radar, tag: "EVERY CORNER", title: "Consistent Coverage", text: "Devices move between nodes without drops, keeping the connected experience stable across the entire home or site." },
  { Icon: SlidersHorizontal, tag: "ONE SYSTEM", title: "Intelligent Management", text: "Every node is monitored and managed from the same TonAer platform — one view, one policy, one network." },
];

export default function EasyMeshSection() {
  return (
    <section className="sec sec-dark emesh" data-testid="easymesh-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="EASYMESH"
          title={<>One network.<br /><em>Seamless everywhere.</em></>}
          copy="Extend coverage intelligently with a robust mesh ecosystem designed to work together as one connected network."
        />
        <Reveal className="em-path" data-testid="easymesh-path">
          <svg className="em-svg" viewBox="0 0 960 130" preserveAspectRatio="none" aria-hidden="true">
            <path className="em-line" d="M96 65 L864 65" />
            <circle className="em-pulse" r="4"><animateMotion dur="3.2s" repeatCount="indefinite" path="M96 65 L864 65" /></circle>
            <circle className="em-pulse" r="4"><animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path="M96 65 L864 65" /></circle>
          </svg>
          {PATH.map(({ label, Icon, x }) => (
            <div key={label + x} className="em-node" style={{ left: `${x}%` }}>
              <div className="em-dot"><Icon /></div>
              <small>{label}</small>
            </div>
          ))}
        </Reveal>
        <div className="em-cards">
          {CARDS.map(({ Icon, tag, title, text }, i) => (
            <Reveal key={title} className="fcard fcard-dark" delay={i * 0.08}>
              <div className="fcard-body" style={{ padding: "30px 30px 32px" }}>
                <Icon style={{ width: 26, height: 26, color: "#2fe4c4" }} />
                <span className="fcard-tag" style={{ marginTop: 18 }}>{tag}</span>
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
