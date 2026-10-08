import { CloudCog, Cpu, Radio, Share2, Signal, Smartphone, Sparkles, Wifi } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const CAPS = [
  { Icon: Radio, title: "5G Connectivity", text: "High-performance cellular connectivity." },
  { Icon: Cpu, title: "eSIM", text: "Flexible network provisioning and activation.", isNew: true },
  { Icon: Wifi, title: "Wi-Fi 7", text: "Next-generation wireless performance.", isNew: true },
  { Icon: Signal, title: "Tri-Band", text: "Greater capacity and reliable wireless coverage.", isNew: true },
  { Icon: Share2, title: "EasyMesh", text: "Seamless network expansion and consistent coverage." },
  { Icon: CloudCog, title: "Cloud Managed", text: "Remote configuration, monitoring and lifecycle management." },
  { Icon: Smartphone, title: "End User Mobile App", text: "A customer-facing mobile experience for managing connectivity and devices." },
];

export default function HardwareSection() {
  return (
    <section className="sec hard" id="connectivity" data-testid="hardware-section">
      <div className="section-shell">
        <SecHead
          eyebrow="THE HARDWARE"
          title={<>Connectivity built<br />for <em>what&rsquo;s next.</em></>}
          copy="A portable gateway combining 5G, eSIM, Wi-Fi 7, Tri-Band and EasyMesh with cloud-managed intelligence."
        />
        <div className="gw-grid">
          <Reveal className="gw-visual">
            <div className="gw-ring" />
            <img className="gw-img" src="/assets/gateway-device.png" alt="TonAer 5G Wi-Fi 7 smart gateway with LED indicators and pair button" data-testid="gateway-image" />
            <span className="gw-pill gp-1">5G</span>
            <span className="gw-pill gp-2">WI-FI 7</span>
            <span className="gw-pill gp-3">TRI-BAND</span>
            <span className="gw-pill gp-4">eSIM</span>
          </Reveal>
          <div className="gw-list" id="devices" data-testid="hardware-capability-cards">
            {CAPS.map(({ Icon, title, text, isNew }, i) => (
              <Reveal key={title} className="gw-item" delay={i * 0.05}>
                {isNew && (
                  <span className="gw-new" style={{ animationDelay: `${0.4 + i * 0.1}s` }} data-testid={`new-badge-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                    <Sparkles />NEW
                  </span>
                )}
                <div className="gw-ico"><Icon /></div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
