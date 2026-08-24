import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------------
   SmoothScroll
   Sets up Lenis momentum scrolling and wires it into GSAP's ScrollTrigger
   so every scroll-driven animation stays in sync with the smoothed scroll.
   Exposes the instance on window.__lenis so the nav can scrollTo sections.
--------------------------------------------------------------------- */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    window.__lenis = lenis;

    // Keep ScrollTrigger updated on every Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for a single, consistent RAF loop
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return null;
}
