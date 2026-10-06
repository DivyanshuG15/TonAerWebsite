import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { Reveal } from "./SecHead";
import "./home.css";

export default function FinalCTA({ onContact }) {
  const lenis = useLenis();
  return (
    <section className="sec fcta" data-testid="final-cta">
      <div className="section-shell">
        <Reveal>
          <p className="eyebrow teal">THE NEXT CONNECTION</p>
          <h2>The future of connectivity<br /><em>is intelligent.</em></h2>
          <p className="sec-copy">Connect smarter. Understand more. Operate with confidence.</p>
          <div className="fcta-actions">
            <button className="button button-teal" onClick={onContact} data-testid="final-talk-button">
              Talk to Us <ArrowUpRight size={18} />
            </button>
            <button className="fcta-ghost" onClick={() => lenis?.scrollTo("#platform", { offset: -60, duration: 1.6 })} data-testid="final-explore-button">
              Explore the Platform <ArrowDown size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
