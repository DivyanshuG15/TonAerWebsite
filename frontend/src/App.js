import { useEffect, useState } from "react";
import "@/App.css";
import { ArrowUpRight, Cpu, Radio, Router, Sparkles, Zap } from "lucide-react";
import { ReactLenis, useLenis } from "lenis/react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContactModal from "@/components/ContactModal";

const showcaseAsset = "https://customer-assets-v7afamib.emergentagent.net/job_5dae4414-273d-4335-a9e2-a4d5d8a89108/artifacts/t0ms9n1s_TonAer%20Intelligent%20Connectivity%20Showcase.png";
const towerImage = "https://images.unsplash.com/photo-1514439531855-0e9f1cd9a873?crop=entropy&cs=srgb&fm=jpg&q=85";

function AnchorSmoothing() {
  const lenis = useLenis();
  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || !lenis) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      event.preventDefault();
      lenis.scrollTo(hash === "#top" ? 0 : hash, { offset: hash === "#top" ? 0 : -72, duration: 1.4 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);
  return null;
}

function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);
  return (
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true }}>
      <AnchorSmoothing />
      <div className="site" id="top">
        <Header onContact={openContact} />
        <main>
          <Hero onContact={openContact} />
          <section className="statement section-shell" id="story" data-testid="editorial-statement"><p className="eyebrow teal">THE CONNECTED WORLD IS CHANGING</p><h2>Connectivity is no longer<br />just a signal. <em>It&apos;s an experience<br />that thinks.</em></h2><div className="statement-line" /></section>
          <section className="dark-section ai-section" id="ai" data-testid="ai-section"><div className="section-shell split-heading"><div><p className="eyebrow">NETWORK INTELLIGENCE / 02</p><h2>Make every<br /><em>connection smarter.</em></h2></div><p>TonAer brings intelligence into the network — helping operators understand performance, identify issues, optimize connectivity and deliver better experiences.</p></div><div className="intelligence-visual"><div className="ai-lines" /><div className="ai-chip"><Sparkles size={19} /><span>TonAer<br /><b>INTELLIGENCE</b></span></div>{["AI Optimization", "Predictive Insights", "Intelligent Troubleshooting", "Network Intelligence", "Better Experiences"].map((label, index) => <div className={`ai-label ai-label-${index + 1}`} key={label}><span className="label-dot" />{label}</div>)}</div></section>
          <section className="section-shell connectivity" id="connectivity" data-testid="connectivity-section"><div className="split-heading"><div><p className="eyebrow teal">THE INFRASTRUCTURE / 03</p><h2>Built for the next<br />generation of <em>connectivity.</em></h2></div><p>5G, eSIM, Wi-Fi 7 and intelligent mesh working together for faster, smarter and more reliable connected experiences.</p></div><div className="device-stage"><div className="device-glow" /><div className="device-main"><div className="device-logo">TonAer</div><div className="device-light" /></div><div className="device-ring" /><span className="spec spec-5g"><Radio /> 5G / LOW LATENCY</span><span className="spec spec-esim"><Cpu /> eSIM / FLEXIBLE</span><span className="spec spec-wifi"><Zap /> WI-FI 7 / PERFORMANCE</span><span className="spec spec-mesh"><Router /> INTELLIGENT MESH</span></div></section>
          <section className="platform-section" id="platform" data-testid="platform-section"><div className="section-shell"><div className="split-heading"><div><p className="eyebrow teal">THE OPERATOR PLATFORM / 04</p><h2>One platform.<br /><em>Complete visibility.</em></h2></div><p>Manage networks, devices, users and operations from one intelligent platform. A clearer view of every connection, built for teams who keep the world moving.</p></div><div className="dashboard-wrap"><div className="dashboard-top"><span>TonAer / Network intelligence</span><span className="dashboard-live"><i /> LIVE SYSTEM VIEW</span></div><div className="dashboard-grid"><aside><b>TONAER</b><span>Overview</span><span>Network</span><span>Devices</span><span>AI Insights</span><span>Operations</span><span>Reports</span></aside><div className="dashboard-main"><div className="metric-row"><div><small>NETWORK HEALTH</small><strong>98.7<span>%</span></strong><em>+ 2.3% this week</em></div><div><small>ACTIVE DEVICES</small><strong>12,482</strong><em>+ 12% this week</em></div><div><small>OPEN INSIGHTS</small><strong>08</strong><em className="warning">2 need attention</em></div></div><div className="chart-box"><div><b>Network performance</b><span>Last 24 hours　⌄</span></div><div className="chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="dashboard-bottom"><div><b>AI INSIGHTS</b><p><span className="green-dot" /> 23 devices showing improved performance</p><p><span className="amber-dot" /> 08 potential issues detected early</p></div><div className="mini-radar"><div>24ms</div><small>AVG. LATENCY</small></div></div></div></div></div></div></section>
          <section className="ecosystem section-shell" id="devices" data-testid="ecosystem-section"><div className="split-heading"><div><p className="eyebrow teal">ONE CONNECTED ECOSYSTEM / 05</p><h2>From device<br />to <em>digital experience.</em></h2></div><p>Premium hardware and a powerful platform experience, connected by intelligence. Every layer is designed to work as one.</p></div><div className="ecosystem-visual"><img src={showcaseAsset} alt="TonAer intelligent connectivity ecosystem concept" loading="lazy" /><div className="ecosystem-caption"><span>HARDWARE</span><span>NETWORK</span><span>USERS</span><span>OPERATIONS</span><span>INTELLIGENCE</span></div></div></section>
          <section className="analytics section-shell" id="solutions" data-testid="analytics-section"><div className="analytics-copy"><p className="eyebrow teal">SEE MORE. KNOW MORE.</p><h2>Turn network data<br />into <em>intelligence.</em></h2><p>From real-time monitoring to intelligent insights, TonAer helps operators understand, optimize and improve connected experiences.</p><a href="#platform" className="text-link" data-testid="analytics-platform-link">Explore the platform <ArrowUpRight size={16} /></a></div><div className="analytics-visual"><img src={towerImage} alt="Telecom infrastructure at night" loading="lazy" /><div className="analytics-overlay"><div><small>GLOBAL NETWORK INSIGHT</small><strong>98.7%</strong><span>Network health</span></div><div><small>ACTIVE CONNECTIONS</small><strong>24.8K</strong><span>Across live sites</span></div></div><div className="pulse-map"><div /><div /><div /></div></div></section>
          <section className="white-label" id="about" data-testid="white-label-section"><div className="section-shell white-label-inner"><div><p className="eyebrow">FOR OPERATORS WHO THINK AHEAD</p><h2>Your network.<br />Your brand.<br /><em>One intelligent platform.</em></h2></div><div><p>Give operators a unified, white-label experience across devices, connectivity, network management and customer operations.</p><button className="button button-light" onClick={openContact} data-testid="white-label-talk-button">Talk to TonAer <ArrowUpRight size={18} /></button></div></div></section>
          <section className="final-cta section-shell" id="resources" data-testid="final-cta"><p className="eyebrow teal">THE NEXT CONNECTION</p><h2>The future of connectivity<br /><em>is intelligent.</em></h2><p>Connect smarter. Understand more. Deliver better experiences.</p><button className="button button-teal" onClick={openContact} data-testid="final-talk-button">Talk to Us <ArrowUpRight size={18} /></button></section>
        </main>
        <footer className="site-footer"><div><a className="foot-logo" href="#top" data-testid="footer-brand" aria-label="TonAer home"><img src="/assets/tonaer-logo-horizontal-dark.png" alt="TonAer — Intelligent Connectivity" /></a><p>Intelligent connectivity for a connected world.</p></div><div className="footer-links"><a href="#platform">Platform</a><a href="#ai">AI</a><a href="#connectivity">Connectivity</a><a href="#about">About TonAer</a><button onClick={openContact} data-testid="footer-contact-button">Contact</button></div><small>© 2026 TonAer. Intelligent Connectivity.</small></footer>
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </ReactLenis>
  );
}

export default Home;
