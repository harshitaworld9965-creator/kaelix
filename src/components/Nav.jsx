import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Nav.css';

const LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Lab', id: 'lab' },
  { label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const ref = useRef(null);
  const last = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-animate', {
        y: -22,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.4,
      });
    }, ref);

    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last.current && y > 140;
      gsap.to(ref.current, { yPercent: down ? -140 : 0, duration: 0.5, ease: 'power3.out' });
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    const target = id === 'top' ? 0 : `#${id}`;
    window.__lenis
      ? window.__lenis.scrollTo(target, { offset: -20 })
      : document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav" ref={ref}>
      <a href="#top" className="nav-brand nav-animate" data-cursor="hover" onClick={(e) => go(e, 'top')}>
        KAELI<span className="nav-brand-x">X</span>
      </a>
      <ul className="nav-links">
        {LINKS.map((l) => (
          <li key={l.id} className="nav-animate">
            <a href={`#${l.id}`} className="nav-link" data-cursor="hover" onClick={(e) => go(e, l.id)}>
              <span>{l.label}</span>
              <span className="nav-link-line" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
