import { Reveal } from "./SecHead";
import "./home.css";

const ITEMS = ["5G", "eSIM", "WI-FI 7", "TRI-BAND", "EASYMESH", "GATEWAY", "CLOUD PLATFORM", "AI", "ANALYTICS", "MOBILE APP", "OPERATIONS"];

export default function AdvantageSection() {
  return (
    <section className="sec sec-dark advt" data-testid="advantage-section">
      <div className="section-shell">
        <Reveal>
          <p className="eyebrow teal">THE TONAER ADVANTAGE</p>
          <div className="ad-formula" data-testid="advantage-formula">
            {ITEMS.map((item, i) => (
              <span key={item} style={{ display: "contents" }}>
                <span className="ad-chip">{item}</span>
                {i < ITEMS.length - 1 && <span className="ad-sep">+</span>}
              </span>
            ))}
          </div>
          <h2 className="ad-eq">= <em>TONAER</em></h2>
          <p className="ad-tag">HARDWARE · SOFTWARE · INTELLIGENCE — ONE CONNECTED ECOSYSTEM</p>
        </Reveal>
      </div>
    </section>
  );
}
