import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Elements.css';

/* The studio's "materials" as periodic elements — Kaelix's take on the
   reference site's minerals section. Hovering a tile updates the readout. */
const ELEMENTS = [
  { n: '01', sym: 'Wb', name: 'Web', cat: 'Structure', desc: 'Fast, accessible sites and web applications built to last.' },
  { n: '02', sym: 'Ui', name: 'Interface', cat: 'Structure', desc: 'Interaction design and interface systems with real hierarchy.' },
  { n: '03', sym: '3d', name: 'Realtime 3D', cat: 'Surface', desc: 'Three.js / WebGL scenes, shaders, and immersive moments.' },
  { n: '04', sym: 'Ai', name: 'Intelligence', cat: 'Signal', desc: 'AI-powered tools and products, from prototype to production.' },
  { n: '05', sym: 'Sh', name: 'Shaders', cat: 'Surface', desc: 'GPU-driven visuals — noise, distortion, light, material.' },
  { n: '06', sym: 'Mo', name: 'Motion', cat: 'Signal', desc: 'Choreographed, scroll-driven, and generative animation.' },
  { n: '07', sym: 'Ty', name: 'Typography', cat: 'Structure', desc: 'Editorial type systems as the backbone of the work.' },
  { n: '08', sym: 'Da', name: 'Data', cat: 'Signal', desc: 'Turning data into interfaces people can actually read.' },
  { n: '09', sym: 'Sn', name: 'Sound', cat: 'Surface', desc: 'Reactive audio and sound design for interactive pieces.' },
  { n: '10', sym: 'Xr', name: 'Immersive', cat: 'Surface', desc: 'Spatial and experimental formats beyond the flat screen.' },
];

export default function Elements() {
  const ref = useRef(null);
  useReveal(ref);
  const [active, setActive] = useState(0);
  const el = ELEMENTS[active];

  return (
    <section className="elements section" id="lab" ref={ref}>
      <span className="smarker">S.03 — Materials</span>
      <div className="shell">
        <header className="el-head" data-reveal>
          <span className="eyebrow">The Kaelix table</span>
          <h2 className="el-title display">Materials we build with</h2>
        </header>

        <div className="el-layout">
          {/* Readout for the active element */}
          <div className="el-readout" data-reveal>
            <span className="el-readout-sym">{el.sym}</span>
            <div className="el-readout-meta">
              <span className="el-readout-cat">{el.cat}</span>
              <h3 className="el-readout-name display">{el.name}</h3>
              <p className="el-readout-desc">{el.desc}</p>
            </div>
          </div>

          {/* The grid of tiles */}
          <div className="el-grid" data-reveal>
            {ELEMENTS.map((item, i) => (
              <button
                key={item.sym}
                className={`el-tile ${active === i ? 'on' : ''}`}
                data-cursor="hover"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={item.name}
              >
                <span className="el-tile-n">{item.n}</span>
                <span className="el-tile-sym">{item.sym}</span>
                <span className="el-tile-name">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
