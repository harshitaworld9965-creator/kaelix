import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef(null);
  useReveal(ref);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The giant outro wordmark drifts up as it enters — parallax
      gsap.from('.cta-wordmark', {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: '.cta-wordmark-wrap',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact section" id="contact" ref={ref}>
      <span className="smarker">S.07 — Contact</span>
      <div className="shell">
        <span className="eyebrow" data-reveal>
          Start something
        </span>
        <h2 className="cta-prompt display">
          <span data-reveal>Have an idea?</span>
          <span data-reveal className="cta-2">
            Let's make it real.
          </span>
        </h2>

        <div className="cta-actions" data-reveal>
          <a className="cta-mail" href="mailto:hello@kaelix.studio" data-cursor="hover">
            hello@kaelix.studio
            <span className="cta-mail-line" />
          </a>
          <div className="cta-socials">
            <a href="#work" data-cursor="hover">Instagram</a>
            <a href="#work" data-cursor="hover">X / Twitter</a>
            <a href="#work" data-cursor="hover">GitHub</a>
          </div>
        </div>
      </div>

      <div className="cta-wordmark-wrap" aria-hidden="true">
        <span className="cta-wordmark display">KAELIX</span>
      </div>

      <footer className="foot shell">
        <span>© 2025 Kaelix Studio</span>
        <span className="foot-mid">The logic of chaos.</span>
        <span>Three.js · GSAP · React</span>
      </footer>
    </section>
  );
}
