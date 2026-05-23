import { useEffect } from "react";
import Lenis from "lenis";

import AnimatedBackground from "./components/AnimatedBackground";
import ContactSection from "./components/ContactSection";
import HeroLab from "./components/HeroLab";
import Navbar from "./components/Navbar";
import ProofSections from "./components/ProofSections";

function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.08,
    });

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-shell">
      <AnimatedBackground />

      <Navbar />

      <main className="relative z-10">
        <HeroLab />
        <ProofSections />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
