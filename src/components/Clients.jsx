import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Clients.css';

const CLIENTS = [
  'Northwind', 'Vesta Labs', 'Aperture', 'Monolith', 'Cobalt',
  'Meridian', 'Halcyon', 'Corvus', 'Ostium', 'Praxis', 'Lumen', 'Aether',
];

function Track({ reverse }) {
  // Rendered twice so the -50% marquee loop is seamless
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <div className={`cl-track ${reverse ? 'rev' : ''}`}>
      {row.map((c, i) => (
        <span className="cl-item" key={i}>
          {c}
          <span className="cl-dot" />
        </span>
      ))}
    </div>
  );
}

export default function Clients() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="clients section" ref={ref}>
      <span className="smarker">S.06 — Trusted by</span>
      <div className="shell cl-head" data-reveal>
        <span className="eyebrow">Selected collaborators</span>
        <p>Teams who came with an unusual idea and left with a working one.</p>
      </div>

      <div className="cl-marquee" data-reveal>
        <Track />
      </div>
      <div className="cl-marquee" data-reveal>
        <Track reverse />
      </div>
    </section>
  );
}
