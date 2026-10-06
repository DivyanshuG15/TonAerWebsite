import { ArrowUpRight, Boxes, Eye, TrendingUp, Zap } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const CARDS = [
  { Icon: Boxes, title: "Unified Management", text: "One platform across devices, users, networks and operations." },
  { Icon: Zap, title: "Faster Resolution", text: "Identify and address issues faster." },
  { Icon: Eye, title: "Better Visibility", text: "Real-time intelligence across the connected ecosystem." },
  { Icon: TrendingUp, title: "Scalable Experience", text: "Extend services across customers, devices and locations." },
];

export default function BusinessValue() {
  return (
    <section className="sec bval" data-testid="business-value">
      <div className="section-shell">
        <SecHead
          eyebrow="BUSINESS VALUE"
          title={<>Less complexity.<br /><em>More control.</em></>}
          copy="TonAer turns operational overhead into operational advantage."
        />
        <div className="bv-grid">
          {CARDS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} className="bv-card" delay={i * 0.07}>
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
