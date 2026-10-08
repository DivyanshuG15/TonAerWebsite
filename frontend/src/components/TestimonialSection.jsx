import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Reveal, SecHead } from "./SecHead";
import "./home.css";

// Set TESTIMONIAL_VIDEO to the final customer testimonial video URL when available —
// the frame below is ready to play it (poster + play button already wired).
const TESTIMONIAL_VIDEO = null;
const TESTIMONIAL_POSTER = null;

export default function TestimonialSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="sec tst" data-testid="testimonial-section">
      <div className="section-shell">
        <SecHead
          center
          eyebrow="CUSTOMER STORIES"
          title={<>Real networks.<br /><em>Real results.</em></>}
          copy="Hear directly from the teams using TonAer to simplify network operations, improve visibility and deliver better connected experiences."
        />
        <Reveal className="tst-frame" data-testid="testimonial-frame">
          {TESTIMONIAL_VIDEO ? (
            playing ? (
              <video src={TESTIMONIAL_VIDEO} poster={TESTIMONIAL_POSTER || undefined} controls autoPlay data-testid="testimonial-video" />
            ) : (
              <button className="tst-cover" style={TESTIMONIAL_POSTER ? { backgroundImage: `url(${TESTIMONIAL_POSTER})` } : undefined} onClick={() => setPlaying(true)} data-testid="testimonial-play">
                <span className="tst-play"><Play size={26} fill="currentColor" /></span>
              </button>
            )
          ) : (
            <div className="tst-placeholder" data-testid="testimonial-placeholder">
              <span className="tst-play"><Play size={26} fill="currentColor" /></span>
              <span className="tst-note">CUSTOMER TESTIMONIAL — VIDEO COMING SOON</span>
            </div>
          )}
        </Reveal>
        <Reveal className="tst-meta" delay={0.1}>
          <b>CUSTOMER NAME</b>
          <span>Company · Role</span>
          <small>The first TonAer customer story drops in here — video, name and quote slot straight in.</small>
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <a href="#platform" className="stmt-cta tst-cta" data-testid="testimonial-cta">
            Explore the TonAer platform <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
