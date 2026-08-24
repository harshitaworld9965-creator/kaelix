import { useRef } from 'react';
import gsap from 'gsap';
import { useReveal } from '../hooks/useReveal';
import './Services.css';

const SERVICES = [
  {
    num: '01',
    title: 'Build',
    desc: 'Production websites, web applications, and AI products — engineered to hold up in the real world.',
    items: ['Websites', 'Web applications', 'AI products'],
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Interfaces and digital experiences with a strong visual system underneath every screen.',
    items: ['Interfaces', 'Digital experiences', 'Visual systems'],
  },
  {
    num: '03',
    title: 'Experiment',
    desc: 'Where the studio pushes: real-time 3D, generative work, and interactive research.',
    items: ['AI', 'Three.js', 'Creative technology', 'Interactive experiments'],
  },
];

export default function Services() {
  const ref = useRef(null);
  useReveal(ref);

  const enter = (e) => {
    gsap.to(e.currentTarget.querySelector('.svc-title'), {
      x: 22,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
    });
  };
  const leave = (e) => {
    gsap.to(e.currentTarget.querySelector('.svc-title'), {
      x: 0,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  return (
    <section className="services section" ref={ref}>
      <span className="smarker">S.02 — Services</span>
      <div className="shell">
        <header className="svc-head" data-reveal>
          <span className="eyebrow">What we do</span>
          <p>Three overlapping disciplines. Most projects live between them.</p>
        </header>

        <div className="svc-list">
          {SERVICES.map((s) => (
            <div
              className="svc-row"
              key={s.num}
              data-reveal
              data-cursor="hover"
              onMouseEnter={enter}
              onMouseLeave={leave}
            >
              <span className="svc-num">{s.num}</span>
              <h3 className="svc-title display">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <ul className="svc-items">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
