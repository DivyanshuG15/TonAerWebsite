import { CheckCircle2 } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

export default function OperationsSection() {
  return (
    <section className="sec ops" data-testid="operations-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="REAL-TIME OPERATIONS"
          title={<>See everything.<br /><em>The moment it happens.</em></>}
          copy="Gateway telemetry, network health, alerts, devices, performance, connectivity and user experience — streaming into one operational view."
        />
        <div className="ops-grid">
          <Reveal className="fcard" delay={0}>
            <div className="fcard-vis vis-paper op-vis">
              <svg className="op-ecg" viewBox="0 0 280 90" aria-hidden="true">
                <polyline points="0,52 30,52 44,30 58,70 72,44 96,52 130,52 144,22 158,74 172,48 200,52 234,52 248,34 262,64 280,52" />
              </svg>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">LIVE STREAM</span>
              <h3>Real-time Monitoring</h3>
              <p>Gateway telemetry and connectivity signals update continuously across the entire fleet.</p>
            </div>
          </Reveal>

          <Reveal className="fcard" delay={0.06}>
            <div className="fcard-vis vis-paper op-vis">
              <div className="op-alerts">
                <div className="op-alert"><i className="crit" />High latency detected<small>2 MIN</small></div>
                <div className="op-alert"><i className="warn" />Device offline<small>9 MIN</small></div>
                <div className="op-alert"><i className="ok" />New device connected<small>14 MIN</small></div>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">INSTANT SIGNALS</span>
              <h3>Real-time Alerts</h3>
              <p>Operational events surface the moment they occur — not after customers call.</p>
            </div>
          </Reveal>

          <Reveal className="fcard" delay={0.12}>
            <div className="fcard-vis vis-paper op-vis">
              <div className="op-gauge">
                <svg viewBox="0 0 110 110" aria-hidden="true">
                  <circle className="track" cx="55" cy="55" r="42" />
                  <circle className="val" cx="55" cy="55" r="42" />
                  <text x="55" y="52" textAnchor="middle">96%</text>
                  <text x="55" y="68" textAnchor="middle" style={{ font: "500 7px 'DM Mono',monospace", letterSpacing: 1, fill: "#8ba39e" }}>HEALTHY</text>
                </svg>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">FLEET CONDITION</span>
              <h3>Device Health</h3>
              <p>Every gateway and mesh node reports its condition, uptime and status continuously.</p>
            </div>
          </Reveal>

          <Reveal className="fcard" delay={0}>
            <div className="fcard-vis vis-ink op-vis">
              <div className="meters" style={{ color: "#8fb5ae" }}>
                {[["DL", 82], ["UL", 64], ["LAT", 38], ["JIT", 46], ["LOSS", 22]].map(([label, h], i) => (
                  <div className="meter" key={label}><i style={{ height: `${h}%`, animationDelay: `${-i * 0.6}s` }} /><small>{label}</small></div>
                ))}
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">THROUGHPUT</span>
              <h3>Network Performance</h3>
              <p>Throughput, latency, jitter and loss tracked live across every connected site.</p>
            </div>
          </Reveal>

          <Reveal className="fcard" delay={0.06}>
            <div className="fcard-vis vis-mint op-vis">
              <div className="op-qoe">
                <b>A</b>
                <span>Quality-of-experience scoring across sessions, devices and locations.</span>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">EXPERIENCE LAYER</span>
              <h3>QoE Visibility</h3>
              <p>See connectivity the way customers experience it, not just how the network reports it.</p>
            </div>
          </Reveal>

          <Reveal className="fcard" delay={0.12}>
            <div className="fcard-vis vis-paper op-vis">
              <div className="op-feed">
                <p><CheckCircle2 />Mesh node reconnected automatically</p>
                <p><CheckCircle2 />Configuration applied to 24 gateways</p>
                <p><CheckCircle2 />Firmware rollout completed on schedule</p>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">ACTIONABLE FEED</span>
              <h3>Operational Insights</h3>
              <p>Events roll up into insights operations teams can act on immediately.</p>
            </div>
          </Reveal>
        </div>
        <p className="ops-note">ILLUSTRATIVE OPERATIONAL DATA</p>
      </div>
    </section>
  );
}
