import { ArrowUpRight, Boxes, Eye, Fingerprint, Palette, Smartphone, TrendingUp, Zap } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const VALUE_CARDS = [
  { Icon: Boxes, title: "Unified Management", text: "Devices, users, networks and operations in one environment." },
  { Icon: Zap, title: "Faster Resolution", text: "Find and address issues faster." },
  { Icon: Eye, title: "Better Visibility", text: "Real-time intelligence across the connected ecosystem." },
  { Icon: TrendingUp, title: "Scalable Operations", text: "Support customers, devices and network environments at scale." },
];

export default function BusinessSection({ onContact }) {
  return (
    <section className="sec biz" id="about" data-testid="business-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="WHITE-LABEL"
          title={<>Your network. Your brand.<br /><em>Our intelligence.</em></>}
          copy="Deliver a branded connectivity experience across devices, platform services and customer-facing experiences."
        />
        <Reveal className="biz-dark">
          <div className="wl-flow" data-testid="white-label-flow">
            <div className="wl-node">
              <Fingerprint />
              <b>Operator</b>
              <small>YOUR IDENTITY</small>
            </div>
            <span className="wl-arrow" />
            <div className="wl-node core">
              <img src="/assets/favicon.png" alt="TonAer" />
              <b>TonAer Technology</b>
              <small>PLATFORM + INTELLIGENCE</small>
            </div>
            <span className="wl-arrow" />
            <div className="wl-node">
              <Palette />
              <b>Branded Experience</b>
              <small>YOUR LOOK AND FEEL</small>
            </div>
            <span className="wl-arrow" />
            <div className="wl-node">
              <Smartphone />
              <b>Customer</b>
              <small>YOUR CUSTOMERS</small>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <button className="button button-teal" onClick={onContact} data-testid="white-label-talk-button">
              Talk to TonAer <ArrowUpRight size={18} />
            </button>
          </div>
        </Reveal>

        <div className="sub-head center">
          <p className="eyebrow teal">BUSINESS VALUE</p>
          <h3>Less complexity. <em>More control.</em></h3>
        </div>
        <div className="bv-grid" data-testid="business-value-cards">
          {VALUE_CARDS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} className="bv-card" delay={i * 0.06}>
              <ArrowUpRight className="bv-go" />
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
