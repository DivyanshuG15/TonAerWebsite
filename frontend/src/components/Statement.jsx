import { Reveal } from "./SecHead";
import "./home.css";

export default function Statement() {
  return (
    <section className="sec stmt" id="story" data-testid="editorial-statement">
      <svg className="stmt-lines" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20,120 C300,60 620,210 1460,90" />
        <path d="M-20,300 C360,220 760,380 1460,260" />
        <path d="M-20,440 C420,380 900,520 1460,420" />
        <circle className="stmt-dot" cx="300" cy="105" r="4" />
        <circle className="stmt-dot d2" cx="820" cy="330" r="4" />
        <circle className="stmt-dot d3" cx="1180" cy="440" r="4" />
      </svg>
      <div className="section-shell stmt-inner">
        <Reveal>
          <p className="eyebrow teal">THE CONNECTED WORLD IS CHANGING</p>
          <h2 className="stmt-title">
            Connectivity is no longer<br />just a signal. <em>It&rsquo;s an experience<br />that thinks.</em>
          </h2>
          <p className="stmt-copy">Modern connectivity needs more than speed. It needs visibility, intelligence and control.</p>
          <div className="stmt-rule" />
        </Reveal>
      </div>
    </section>
  );
}
