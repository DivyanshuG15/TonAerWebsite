import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./SecHead";
import "./home.css";

export default function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <section className="sec stmt" id="story" ref={ref} data-testid="editorial-statement">
      <div className="section-shell stmt-grid">
        <div>
          <Reveal>
            <p className="eyebrow teal">FROM CONNECTIVITY TO INTELLIGENCE</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="stmt-title">
              The connected world is changing. <em>Leading operators are already raising the bar.</em> Now, <em>it&rsquo;s your turn.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="stmt-copy">
              Connectivity is no longer just about keeping people online. Leading operators are evolving toward smarter, more visible and more intelligent network experiences. TonAer helps you make that transition with unified infrastructure, real-time intelligence and AI-powered operations.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="stmt-proof" data-testid="carrier-proof">
              <div className="stmt-logos">
                <img src="/assets/carrier-tmobile.png" alt="T-Mobile" data-testid="carrier-tmobile" />
                <img src="/assets/carrier-att.png" alt="AT&T" data-testid="carrier-att" />
                <img src="/assets/carrier-verizon.png" alt="Verizon" data-testid="carrier-verizon" />
              </div>
              <small>Built for the evolving standards of leading U.S. networks.</small>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <a href="#platform" className="stmt-cta" data-testid="statement-cta">
              See how TonAer changes the connected experience <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>

        <motion.div
          className="stmt-visual"
          style={{ y: visualY }}
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          data-testid="statement-visual"
        >
          <img src="/assets/ecosystem-cloud.png" alt="TonAer cloud platform connected to the gateway, EasyMesh nodes and smart home devices with AI intelligence" />
          <svg className="stmt-net" viewBox="0 0 1536 1024" aria-hidden="true">
            <path className="stmt-net-path" d="M768 195 L768 520" />
            <path className="stmt-net-path d2" d="M768 520 C 620 640, 500 700, 400 845" />
            <path className="stmt-net-path d3" d="M768 520 C 920 640, 1040 700, 1145 845" />
            <circle className="stmt-net-node" cx="768" cy="195" r="11" />
            <circle className="stmt-net-node n2" cx="768" cy="520" r="14" />
            <circle className="stmt-net-node n3" cx="400" cy="845" r="10" />
            <circle className="stmt-net-node n4" cx="1145" cy="845" r="10" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
