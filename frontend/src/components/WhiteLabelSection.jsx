import { ArrowUpRight, Fingerprint, Smartphone } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

export default function WhiteLabelSection({ onContact }) {
  return (
    <section className="sec wlbl" id="about" data-testid="white-label-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="WHITE-LABEL"
          title={<>Your network. Your brand.<br /><em>Our intelligence.</em></>}
          copy="Deliver a branded connectivity experience powered by TonAer technology across devices, platform services and customer experiences."
        />
        <Reveal className="wl-flow" data-testid="white-label-flow">
          <div className="wl-node">
            <Fingerprint />
            <b>Operator Brand</b>
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
            <Smartphone />
            <b>Customer Experience</b>
            <small>YOUR CUSTOMERS</small>
          </div>
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <button className="button button-teal" onClick={onContact} data-testid="white-label-talk-button">
            Talk to TonAer <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
