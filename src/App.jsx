import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SmoothScroll from './components/SmoothScroll';
import { Grain, Cursor } from './components/Atmosphere';
import Nav from './components/Nav';
import Entrance from './entrance/Entrance';
import About from './components/About';
import Services from './components/Services';
import Elements from './components/Elements';
import Capabilities from './components/Capabilities';
import Work from './components/Work';
import Clients from './components/Clients';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    gsap.defaults({ ease: 'power3.out', duration: 1 });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SmoothScroll />
      <Grain />
      <Cursor />
      <Nav />

      {/* Scroll-driven 3D entrance (fixed canvas + its own scroll spacer) */}
      <Entrance />

      {/* The real site. It sits above the entrance's fixed canvas and scrolls
          up over it, so the transition reads as continuous rather than a cut. */}
      <main className="site">
        <About />
        <Services />
        <Elements />
        <Capabilities />
        <Work />
        <Clients />
        <Contact />
      </main>
    </>
  );
}
