import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import Counter from './Counter';
import './About.css';

const STATS = [
  { to: 48, label: 'Projects shipped' },
  { to: 132, label: 'Lab experiments' },
  { to: 24, label: 'Collaborators' },
  { to: 11, label: 'Countries' },
];

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section className="about section" id="about" ref={ref}>
      <span className="smarker">S.01 — Studio</span>
      <div className="shell about-grid">
        <div className="about-lead">
          <span className="eyebrow" data-reveal-x>
            Who we are
          </span>
          <h2 className="about-statement display">
            <span data-reveal>We build digital</span>{' '}
            <span data-reveal>systems for</span>{' '}
            <span data-reveal className="about-em">
              unusual ideas.
            </span>
          </h2>
        </div>

        <div className="about-body">
          <p data-reveal>
            Kaelix is a creative technology studio working at the seam of design
            and engineering. We treat software as a material — something to
            shape, distort, and make strange — building websites, interactive
            experiences, and AI-powered products for teams with ideas that don't
            fit the template.
          </p>
        </div>
      </div>

      <div className="shell about-stats">
        {STATS.map((s) => (
          <div className="about-stat" key={s.label} data-reveal>
            <Counter to={s.to} className="about-stat-num display" />
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
