import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "./header.css";

const LINKS = [
  ["Platform", "#platform"],
  ["AI", "#ai"],
  ["Connectivity", "#connectivity"],
  ["Devices", "#devices"],
  ["Solutions", "#solutions"],
  ["Resources", "#resources"],
  ["About", "#about"],
];

export default function Header({ onContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  return (
    <header className={`hdr ${scrolled ? "is-scrolled" : ""}`} data-testid="site-header">
      <a className="hdr-brand" href="#top" data-testid="brand-logo" aria-label="TonAer home">
        <img className="hdr-logo hdr-logo-white" src="/assets/tonaer-logo-horizontal-white.png" alt="TonAer — Intelligent Connectivity" />
        <img className="hdr-logo hdr-logo-dark" src="/assets/tonaer-logo-horizontal-dark.png" alt="" aria-hidden="true" />
      </a>
      <nav className="hdr-nav" data-testid="main-navigation">
        {LINKS.map(([label, hash]) => (
          <a key={hash} href={hash} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <button className="hdr-cta" onClick={onContact} data-testid="header-talk-to-us">
        Talk to Us <ArrowUpRight size={14} />
      </button>
      <button className="hdr-burger" onClick={() => setOpen(true)} aria-label="Open menu" data-testid="mobile-menu-open">
        <Menu size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="hdr-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} data-testid="mobile-menu">
            <img src="/assets/tonaer-logo-horizontal-white.png" alt="TonAer" className="hdr-menu-logo" />
            <button className="hdr-menu-close" onClick={() => setOpen(false)} aria-label="Close menu" data-testid="mobile-menu-close">
              <X size={24} />
            </button>
            {LINKS.map(([label, hash], i) => (
              <motion.a
                key={hash}
                href={hash}
                onClick={() => setOpen(false)}
                initial={{ y: 34, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {label}
              </motion.a>
            ))}
            <motion.button
              className="hdr-menu-cta"
              onClick={() => { setOpen(false); onContact(); }}
              initial={{ y: 34, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-testid="mobile-menu-talk"
            >
              Talk to Us <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
