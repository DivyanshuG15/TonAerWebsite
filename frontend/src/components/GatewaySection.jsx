import { CloudCog, Cpu, Radio, Share2, Signal, Smartphone, Wifi } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

const CAPS = [
  { Icon: Radio, title: "5G Connectivity", text: "High-performance cellular connectivity." },
  { Icon: Cpu, title: "eSIM", text: "Flexible provisioning and network activation." },
  { Icon: Wifi, title: "Wi-Fi 7", text: "Next-generation wireless performance." },
  { Icon: Signal, title: "Tri-Band", text: "High-capacity multi-band wireless connectivity." },
  { Icon: Share2, title: "EasyMesh", text: "Seamless mesh expansion and coverage." },
  { Icon: CloudCog, title: "Cloud Managed", text: "Remote management, monitoring and configuration." },
  { Icon: Smartphone, title: "End User Mobile App", text: "A simple customer-facing experience for managing connectivity and devices." },
];

export default function GatewaySection() {
  return (
    <section className="sec gway" id="connectivity" data-testid="gateway-section">
      <div className="section-shell">
        <SecHead
          eyebrow="THE HARDWARE"
          title={<>Connectivity built<br />for <em>what&rsquo;s next.</em></>}
          copy="A powerful portable gateway bringing cellular connectivity, next-generation Wi-Fi and cloud-managed intelligence together in one device."
        />
        <div className="gw-grid">
          <Reveal className="gw-visual">
            <div className="gw-ring" />
            <img className="gw-img" src="/assets/gateway.png" alt="TonAer 5G Wi-Fi 7 smart gateway" data-testid="gateway-image" />
            <span className="gw-pill gp-1">5G</span>
            <span className="gw-pill gp-2">WI-FI 7</span>
            <span className="gw-pill gp-3">TRI-BAND</span>
            <span className="gw-pill gp-4">eSIM</span>
          </Reveal>
          <div className="gw-list">
            {CAPS.map(({ Icon, title, text }, i) => (
              <Reveal key={title} className="gw-item" delay={i * 0.06}>
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
