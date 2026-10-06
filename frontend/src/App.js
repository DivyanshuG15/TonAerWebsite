import { useEffect, useState } from "react";
import "@/App.css";
import { ReactLenis, useLenis } from "lenis/react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContactModal from "@/components/ContactModal";
import Statement from "@/components/Statement";
import ProblemSection from "@/components/ProblemSection";
import PlatformOverview from "@/components/PlatformOverview";
import PlatformShowcase from "@/components/PlatformShowcase";
import PlatformFeatures from "@/components/PlatformFeatures";
import GatewaySection from "@/components/GatewaySection";
import EcosystemSection from "@/components/EcosystemSection";
import EasyMeshSection from "@/components/EasyMeshSection";
import EcosystemIntegration from "@/components/EcosystemIntegration";
import AIIntelligence from "@/components/AIIntelligence";
import OperationsSection from "@/components/OperationsSection";
import SecuritySection from "@/components/SecuritySection";
import AnalyticsSection from "@/components/AnalyticsSection";
import LayeredPlatform from "@/components/LayeredPlatform";
import WhiteLabelSection from "@/components/WhiteLabelSection";
import BusinessValue from "@/components/BusinessValue";
import AdvantageSection from "@/components/AdvantageSection";
import FinalCTA from "@/components/FinalCTA";

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
          <Statement />
          <ProblemSection />
          <PlatformOverview />
          <PlatformShowcase />
          <PlatformFeatures />
          <GatewaySection />
          <EcosystemSection />
          <EasyMeshSection />
          <EcosystemIntegration />
          <AIIntelligence />
          <OperationsSection />
          <SecuritySection />
          <AnalyticsSection />
          <LayeredPlatform />
          <WhiteLabelSection onContact={openContact} />
          <BusinessValue />
          <AdvantageSection />
          <FinalCTA onContact={openContact} />
        </main>
        <footer className="site-footer"><div><a className="foot-logo" href="#top" data-testid="footer-brand" aria-label="TonAer home"><img src="/assets/tonaer-logo-horizontal-dark.png" alt="TonAer — Intelligent Connectivity" /></a><p>Intelligent connectivity for a connected world.</p></div><div className="footer-links"><a href="#platform">Platform</a><a href="#ai">AI</a><a href="#connectivity">Connectivity</a><a href="#about">About TonAer</a><button onClick={openContact} data-testid="footer-contact-button">Contact</button></div><small>© 2026 TonAer. Intelligent Connectivity.</small></footer>
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </ReactLenis>
  );
}

export default Home;
