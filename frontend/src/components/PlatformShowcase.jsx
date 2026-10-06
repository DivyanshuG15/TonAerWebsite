import { motion } from "framer-motion";
import { SecHead } from "./SecHead";
import "./home.css";

export default function PlatformShowcase() {
  return (
    <section className="sec pshow" id="platform" data-testid="platform-section">
      <div className="section-shell">
        <SecHead
          eyebrow="THE OPERATOR PLATFORM"
          title={<>One platform.<br /><em>Complete visibility.</em></>}
          copy="Manage your network, devices, users and operations through one intelligent cloud platform."
        />
        <motion.div
          className="ps-frame"
          initial={{ opacity: 0, y: 70, rotateX: 16 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1400 }}
        >
          <div className="ps-bar">
            <span className="ps-dots"><i /><i /><i /></span>
            <span className="ps-url">cloud.tonaer.com / overview</span>
            <span className="ps-live"><i />LIVE</span>
          </div>
          <img src="/assets/dashboard-ui.png" alt="TonAer network management dashboard — system overview, gateway telemetry, AI insights and recent alerts" data-testid="platform-dashboard-image" />
          <div className="ps-chip ps-chip-a"><b>98.7%</b><span>NETWORK HEALTH</span></div>
          <div className="ps-chip ps-chip-b"><b>12,482</b><span>CONNECTED DEVICES</span></div>
          <div className="ps-chip ps-chip-c"><b>0</b><span>ACTIVE THREATS</span></div>
        </motion.div>
      </div>
    </section>
  );
}
