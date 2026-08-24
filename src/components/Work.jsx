import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReveal } from '../hooks/useReveal';
import './Work.css';

const PROJECTS = [
  { num: '01', title: 'Analytics', cat: 'AI-powered analytics platform', year: '2025', v: 'v-a' },
  { num: '02', title: 'Digital Experience', cat: 'Interactive web experience', year: '2025', v: 'v-b' },
  { num: '03', title: 'AI Tool', cat: 'Experimental AI product', year: '2024', v: 'v-c' },
];

export default function Work() {
  const ref = useRef(null);
  const preview = useRef(null);
  const [active, setActive] = useState(null);
  useReveal(ref);

  useEffect(() => {
    const setX = gsap.quickTo(preview.current, 'x', { duration: 0.55, ease: 'power3' });
    const setY = gsap.quickTo(preview.current, 'y', { duration: 0.55, ease: 'power3' });
    const move = (e) => { setX(e.clientX); setY(e.clientY); };
    const el = ref.current;
    el.addEventListener('mousemove', move);
    return () => el.removeEventListener('mousemove', move);
  }, []);

  return (
    <section className="work section" id="work" ref={ref}>
      <span className="smarker">S.05 — Work</span>
      <div className="shell">
        <header className="work-head" data-reveal>
          <span className="eyebrow">Selected work</span>
          <span className="work-count">Three of many</span>
        </header>

        <div className="work-list">
          {PROJECTS.map((p, i) => (
            <a
              href="#work"
              key={p.num}
              className="work-row"
              data-reveal
              data-cursor="hover"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="work-num">{p.num}</span>
              <h3 className="work-title display">{p.title}</h3>
              <span className="work-cat">{p.cat}</span>
              <span className="work-year">{p.year}</span>
            </a>
          ))}
        </div>
      </div>

      <div ref={preview} className={`work-preview ${active !== null ? 'show' : ''}`} aria-hidden="true">
        {PROJECTS.map((p, i) => (
          <div key={p.num} className={`work-visual ${p.v} ${active === i ? 'on' : ''}`} />
        ))}
      </div>
    </section>
  );
}
