import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Capabilities.css';

const ROWS = [
  {
    title: 'Websites & Web Applications',
    body: 'Marketing sites, editorial platforms, and full product front-ends. Built on modern React/Vite foundations with performance and accessibility treated as features, not afterthoughts.',
    tag: 'Build',
  },
  {
    title: 'Interactive 3D & WebGL',
    body: 'Real-time scenes with Three.js and React Three Fiber — procedural geometry, custom shaders, particle systems, and choreographed camera work that runs smoothly on the open web.',
    tag: 'Experiment',
  },
  {
    title: 'AI Products & Tools',
    body: 'From prototype to production: interfaces on top of language and image models, retrieval systems, and internal tools that make AI actually usable for a specific team.',
    tag: 'Build',
  },
  {
    title: 'Brand & Interface Systems',
    body: 'Type scales, color systems, motion language, and component libraries — the connective tissue that keeps a growing product feeling like one coherent thing.',
    tag: 'Design',
  },
  {
    title: 'Creative R&D',
    body: 'Funded exploration for teams who want to find out what is possible before committing. Generative visuals, novel interactions, and experiments that de-risk the ambitious idea.',
    tag: 'Experiment',
  },
];

function Row({ row, open, onToggle }) {
  const bodyRef = useRef(null);
  return (
    <div className={`cap-row ${open ? 'open' : ''}`} data-reveal>
      <button className="cap-trigger" onClick={onToggle} data-cursor="hover">
        <span className="cap-title">{row.title}</span>
        <span className="cap-tag">{row.tag}</span>
        <span className="cap-sign" aria-hidden="true">
          <span className="cap-sign-h" />
          <span className="cap-sign-v" />
        </span>
      </button>
      {/* grid-template-rows animates height cleanly with CSS transition */}
      <div className="cap-body-wrap" ref={bodyRef}>
        <div className="cap-body-inner">
          <p>{row.body}</p>
        </div>
      </div>
    </div>
  );
}

export default function Capabilities() {
  const ref = useRef(null);
  useReveal(ref);
  const [open, setOpen] = useState(0);

  return (
    <section className="capabilities section" ref={ref}>
      <span className="smarker">S.04 — Capabilities</span>
      <div className="shell">
        <header className="cap-head" data-reveal>
          <span className="eyebrow">How we help</span>
          <h2 className="cap-heading display">A studio built for range</h2>
        </header>

        <div className="cap-list">
          {ROWS.map((row, i) => (
            <Row
              key={row.title}
              row={row}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
