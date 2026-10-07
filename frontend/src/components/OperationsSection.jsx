import { CheckCircle2, ShieldCheck } from "lucide-react";
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
          copy="Monitoring, alerts, gateway telemetry, security and analytics — one operational environment for the entire connected ecosystem."
        />

        <Reveal className="secflow" data-testid="security-flow">
          <b><ShieldCheck />INTEGRATED SECURITY</b>
          <div className="flow">
            <span className="flow-step">NETWORK ACTIVITY</span><span className="flow-arrow" />
            <span className="flow-step">DETECTION</span><span className="flow-arrow" />
            <span className="flow-step">ALERT</span><span className="flow-arrow" />
            <span className="flow-step hot">ACTION</span>
          </div>
        </Reveal>

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
            <div className="fcard-vis vis-ink op-vis">
              <div className="meters" style={{ color: "#8fb5ae" }}>
                {[["SIGNAL", 70], ["WAN", 86], ["WI-FI", 62], ["UPTIME", 96], ["PERF", 78]].map(([label, h], i) => (
                  <div className="meter" key={label}><i style={{ height: `${h}%`, animationDelay: `${-i * 0.6}s` }} /><small>{label}</small></div>
                ))}
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">EVERY GATEWAY</span>
              <h3>Gateway Telemetry</h3>
              <p>Health, connectivity, performance and telemetry from every gateway, live.</p>
            </div>
          </Reveal>

          <Reveal className="fcard" delay={0}>
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
              <div className="op-alerts">
                <div className="op-alert"><i className="crit" />Suspicious activity flagged<small>LIVE</small></div>
                <div className="op-alert"><i className="warn" />Traffic anomaly — investigating<small>LIVE</small></div>
                <div className="op-alert"><i className="ok" />Threat contained automatically<small>4 MIN</small></div>
              </div>
            </div>
            <div className="fcard-body">
              <span className="fcard-tag">ALWAYS-ON PROTECTION</span>
              <h3>Threat Detection</h3>
              <p>Suspicious behaviour and network anomalies are surfaced and acted on as they emerge.</p>
            </div>
          </Reveal>
        </div>

        <div className="an-board" id="resources" data-testid="analytics-board">
          <Reveal className="an-panel an-wide">
            <h3>Network performance</h3>
            <small>LAST 24 HOURS · DOWNLOAD / UPLOAD</small>
            <svg className="an-chart" viewBox="0 0 560 190" aria-hidden="true">
              {[40, 80, 120, 160].map((y) => <line key={y} className="grid-line" x1="0" y1={y} x2="560" y2={y} />)}
              <polyline className="line-b" points="0,130 60,118 120,126 180,100 240,110 300,88 360,98 420,74 480,84 560,60" />
              <polyline className="line-a" points="0,150 60,140 120,148 180,126 240,134 300,112 360,122 420,100 480,108 560,86" />
            </svg>
          </Reveal>
          <Reveal className="an-panel an-side" delay={0.08}>
            <h3>Device distribution</h3>
            <small>BY CONNECTION TYPE</small>
            <div className="an-donut">
              <svg viewBox="0 0 110 110" aria-hidden="true">
                <circle cx="55" cy="55" r="42" stroke="#e6efec" />
                <circle cx="55" cy="55" r="42" stroke="#00c7a5" strokeDasharray="111 264" />
                <circle cx="55" cy="55" r="42" stroke="#0d2b2e" strokeDasharray="48 264" strokeDashoffset="-111" />
                <circle cx="55" cy="55" r="42" stroke="#7fdcc9" strokeDasharray="58 264" strokeDashoffset="-159" />
                <circle cx="55" cy="55" r="42" stroke="#b9cec9" strokeDasharray="47 264" strokeDashoffset="-217" />
              </svg>
              <div className="an-legend">
                <span><i style={{ background: "#00c7a5" }} />Wi-Fi 7</span>
                <span><i style={{ background: "#0d2b2e" }} />5G</span>
                <span><i style={{ background: "#7fdcc9" }} />Mesh</span>
                <span><i style={{ background: "#b9cec9" }} />Others</span>
              </div>
            </div>
          </Reveal>
        </div>
        <p className="ops-note">ILLUSTRATIVE OPERATIONAL DATA</p>
      </div>
    </section>
  );
}
