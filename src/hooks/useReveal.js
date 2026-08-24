import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------------
   useReveal
   Give any element inside `ref` a `data-reveal` attribute and it rises +
   fades in as it enters the viewport. Add `data-reveal-x` for a lateral
   slide instead. One shared hook keeps every section consistent.
--------------------------------------------------------------------- */
export function useReveal(ref) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 42,
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        });
      });
      gsap.utils.toArray('[data-reveal-x]').forEach((el) => {
        gsap.from(el, {
          x: -34,
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}
