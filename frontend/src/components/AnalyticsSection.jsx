import { CheckCircle2 } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

export default function AnalyticsSection() {
  return (
    <section className="sec anly" id="resources" data-testid="analytics-section">
      <div className="section-shell">
        <SecHead
          eyebrow="ANALYTICS & REPORTING"
          title={<>Turn network data<br /><em>into decisions.</em></>}
          copy="Transform real-time connectivity data into intuitive dashboards, reports and operational intelligence."
        />
        <div className="an-board">
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
          <Reveal className="an-panel an-third" delay={0.05}>
            <h3>Weekly trend</h3>
            <small>ACTIVE SESSIONS</small>
            <div className="an-bars">
              {[44, 62, 52, 76, 68, 88, 80].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${-i * 0.4}s` }} />)}
            </div>
          </Reveal>
          <Reveal className="an-panel an-third" delay={0.1}>
            <h3>AI insights</h3>
            <small>GENERATED FROM LIVE DATA</small>
            <div className="an-feed">
              <p><CheckCircle2 />Network issue detected — root cause identified</p>
              <p><CheckCircle2 />Coverage improvement opportunity in mesh zone B</p>
              <p><CheckCircle2 />Auto-resolution applied to recurring dropouts</p>
            </div>
          </Reveal>
          <Reveal className="an-panel an-third" delay={0.15}>
            <h3>Alert summary</h3>
            <small>BY SEVERITY</small>
            <div className="an-feed">
              <p><i style={{ width: 8, height: 8, borderRadius: "50%", background: "#e2684f", marginTop: 4 }} />Critical — resolved within minutes</p>
              <p><i style={{ width: 8, height: 8, borderRadius: "50%", background: "#e6b052", marginTop: 4 }} />Warnings — trending down week over week</p>
              <p><i style={{ width: 8, height: 8, borderRadius: "50%", background: "#00c7a5", marginTop: 4 }} />Informational — logged for reporting</p>
            </div>
          </Reveal>
        </div>
        <p className="ops-note">ILLUSTRATIVE ANALYTICS DATA</p>
      </div>
    </section>
  );
}
