import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import "./hero.css";

// The final TonAer brand film — plays as the full-viewport hero background.
// If the video ever fails to load, the hero falls back to the poster image.
const HERO_VIDEO_URL = "https://customer-assets-39nsmqrw.emergentagent.net/job_network-intelligence-3/artifacts/a090118016dbec97_gemini_generated_video_ea85614d.mp4";
const HERO_POSTER = "https://images.unsplash.com/photo-1602823284936-463177448097?crop=entropy&cs=srgb&fm=jpg&q=85";

const NODES = [
  ["5G", "hx-node-a"],
  ["eSIM", "hx-node-b"],
  ["WI-FI 7", "hx-node-c"],
  ["MESH", "hx-node-d"],
];

const MARQUEE = [
  "AI INTELLIGENCE",
  "5G",
  "WI-FI 7",
  "eSIM",
  "EASYMESH",
  "CLOUD MANAGED",
  "NETWORK VISIBILITY",
  "ZERO-TOUCH PROVISIONING",
];

const EASE = [0.16, 1, 0.3, 1];
const REVEAL_BASE = 1.55; // headline waits for the intro wipe

export default function Hero({ onContact }) {
  const ref = useRef(null);
  const lenis = useLenis();
  const [intro, setIntro] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const explore = () => lenis?.scrollTo("#story", { offset: -40, duration: 1.6 });

  return (
    <section className="hx-hero" ref={ref} data-testid="hero-section">
      <motion.div className="hx-media" style={{ y: mediaY }}>
        {HERO_VIDEO_URL && !videoFailed ? (
          <video
            className="hx-video"
            src={HERO_VIDEO_URL}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onError={() => setVideoFailed(true)}
            data-testid="hero-video"
          />
        ) : videoFailed ? (
          <div className="hx-stage" data-testid="hero-media-fallback" role="img" aria-label="TonAer brand film poster">
            <div className="hx-photo" style={{ backgroundImage: `url(${HERO_POSTER})` }} />
            <div className="hx-aura" />
          </div>
        ) : (
          <div className="hx-stage" data-testid="hero-media-placeholder" role="img" aria-label="Cinematic placeholder for the upcoming TonAer brand film">
            <div className="hx-photo" style={{ backgroundImage: `url(${HERO_POSTER})` }} />
            <div className="hx-aura" />
            <div className="hx-grid" />
            <span className="hx-ring hx-ring-a" />
            <span className="hx-ring hx-ring-b" />
            <div className="hx-orbit hx-orbit-a" />
            <div className="hx-orbit hx-orbit-b" />
            {NODES.map(([label, cls], i) => (
              <span key={label} className={`hx-node ${cls}`} style={{ animationDelay: `${-i * 1.4}s` }}>{label}</span>
            ))}
          </div>
        )}
        <div className="hx-shade" />
        <div className="hx-grain" />
      </motion.div>

      <motion.div className="hx-content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p
          className="hx-eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: REVEAL_BASE }}
        >
          INTELLIGENT CONNECTIVITY
        </motion.p>

        <h1 className="hx-title" data-testid="hero-headline">
          <span className="hx-line">
            <motion.span initial={{ y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 1.15, ease: EASE, delay: REVEAL_BASE + 0.1 }}>
              Every connection.
            </motion.span>
          </span>
          <span className="hx-line">
            <motion.span className="hx-accent" initial={{ y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 1.15, ease: EASE, delay: REVEAL_BASE + 0.24 }}>
              More intelligent.
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hx-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: REVEAL_BASE + 0.5 }}
        >
          AI-powered connectivity for smarter networks, better experiences and a more intelligent connected world.
        </motion.p>

        <motion.div
          className="hx-actions"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: REVEAL_BASE + 0.66 }}
        >
          <button className="hx-btn hx-btn-primary" onClick={onContact} data-testid="hero-talk-button">
            Talk to Us <ArrowUpRight size={16} />
          </button>
          <button className="hx-btn hx-btn-ghost" onClick={explore} data-testid="hero-explore-button">
            Explore TonAer <ArrowDown size={16} />
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        className="hx-hint"
        onClick={explore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: REVEAL_BASE + 1 }}
        data-testid="hero-scroll-hint"
      >
        SCROLL
        <span className="hx-hint-line" />
      </motion.button>

      <motion.div
        className="hx-marquee"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: REVEAL_BASE + 1.1 }}
        data-testid="hero-marquee"
      >
        <div className="hx-marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span className="hx-marquee-item" key={`${item}-${i}`}>{item}<i /></span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {intro && (
          <motion.div
            className="hx-intro"
            data-testid="hero-intro"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.85, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="hx-intro-mark">
              <span className="hx-intro-ring" />
              <span className="hx-intro-ring hx-intro-ring-b" />
              <img src="/assets/favicon.png" alt="" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
