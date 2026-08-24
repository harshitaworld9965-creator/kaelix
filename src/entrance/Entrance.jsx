import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import EntranceScene from './EntranceScene';
import { progress } from './core';
import { useIsMobile } from '../hooks/useIsMobile';
import './entrance.css';

const WORD = ['K', 'A', 'E', 'L', 'I', 'X'];
const DURATION = 6.5; // seconds of autoplay

export default function Entrance() {
  const isMobile = useIsMobile();
  const rootRef = useRef(null);
  const wordRef = useRef(null);
  const cueRef = useRef(null);
  const tlRef = useRef(null);

  const [started, setStarted] = useState(false); // veil lifted
  const [ready, setReady] = useState(false);     // intro finished, "scroll to enter"
  const [done, setDone] = useState(false);       // dismissing (fade)
  const [dismissed, setDismissed] = useState(false); // unmounted
  const [reduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Lock/unlock page scroll while the intro is on screen
  const lock = (on) => {
    document.documentElement.style.overflow = on ? 'hidden' : '';
    const lenis = window.__lenis;
    if (lenis) (on ? lenis.stop() : lenis.start());
  };

  useEffect(() => {
    if (reduced) {
      // Simplified: brief static splash, then reveal the site
      const t = setTimeout(() => setDismissed(true), 1600);
      return () => clearTimeout(t);
    }

    lock(true);

    const onMove = (e) => {
      progress.mxRaw = (e.clientX / window.innerWidth) * 2 - 1;
      progress.myRaw = -((e.clientY / window.innerHeight) * 2 - 1);
      if (wordRef.current) {
        wordRef.current.style.transform = `translate(${progress.mxRaw * 8}px, ${progress.myRaw * 6}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);

    const veil = setTimeout(() => setStarted(true), 400);

    // Master autoplay timeline: runs progress 0→1 and reveals the wordmark
    const state = { v: 0 };
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => setReady(true),
    });
    tl.to(state, {
      v: 1,
      duration: DURATION,
      ease: 'power1.inOut',
      onUpdate: () => (progress.target = state.v),
    }, 0);
        // set the hidden start state explicitly...
    gsap.set('.kx-inner', { yPercent: 120 });
    gsap.set('.kx-sub', { opacity: 0, y: 14 });
    // ...then animate TO visible, so the end state is always "shown"
    tl.to('.kx-inner', { yPercent: 0, duration: 1.4, stagger: 0.08, ease: 'power3.out' }, 4.1);
    tl.to('.kx-sub', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 5.1);
    tlRef.current = tl;

    // Scrolling NUDGES the intro forward (Option B) — it's never required
    const nudge = (dir) => {
      if (!tlRef.current) return;
      const t = Math.min(tlRef.current.time() + 0.32 * dir, tlRef.current.duration());
      tlRef.current.time(t);
    };
    const onWheel = (e) => {
      e.preventDefault();
      if (ready) return; // after finish, wheel dismisses instead (handled below)
      nudge(e.deltaY > 0 ? 1 : 0.4);
    };
    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('wheel', onWheel);
      clearTimeout(veil);
      tl.kill();
      lock(false);
    };
  }, [reduced]);

  // Once ready, the first scroll/tap/key dismisses the intro and reveals the site
  useEffect(() => {
    if (!ready || done) return;
    const dismiss = () => setDone(true);
    const auto = setTimeout(dismiss, 5000); // fallback if they just wait
    const onKey = (e) => { if (['ArrowDown', ' ', 'PageDown', 'Enter'].includes(e.key)) dismiss(); };
    window.addEventListener('wheel', dismiss, { passive: true });
    window.addEventListener('touchstart', dismiss, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(auto);
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchstart', dismiss);
      window.removeEventListener('keydown', onKey);
    };
  }, [ready, done]);

  // When dismissing: unlock scroll, then unmount the overlay after the fade
  useEffect(() => {
    if (!done) return;
    lock(false);
    const t = setTimeout(() => setDismissed(true), 1100);
    return () => clearTimeout(t);
  }, [done]);

  const skip = () => {
    if (tlRef.current) tlRef.current.progress(1);
  };

  if (reduced) {
    if (dismissed) return null;
    return (
      <div className="entrance-root reduced">
        <div className="entrance-word">
          <h1 className="kx-word">
            {WORD.map((c, i) => (
              <span className="kx-letter" key={i}>
                <span className="kx-inner" style={c === 'X' ? { color: 'var(--sage)' } : undefined}>{c}</span>
              </span>
            ))}
          </h1>
          <p className="kx-sub">The logic of chaos</p>
        </div>
      </div>
    );
  }

  if (dismissed) return null;

  return (
    <div className={`entrance-root ${done ? 'done' : ''}`} ref={rootRef}>
      <div className="entrance-stage">
        <Canvas
          frameloop={done ? 'never' : 'always'}
          dpr={[1, isMobile ? 1.5 : 2]}
          camera={{ position: [0, 0, 34], fov: 55, near: 0.1, far: 1200 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 0.92;
          }}
        >
          <Suspense fallback={null}>
            <EntranceScene isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      <div className="entrance-word" ref={wordRef} aria-hidden="true">
        <h1 className="kx-word">
          {WORD.map((c, i) => (
            <span className="kx-letter" key={i}>
              <span className="kx-inner" style={c === 'X' ? { color: 'var(--sage)' } : undefined}>{c}</span>
            </span>
          ))}
        </h1>
        <p className="kx-sub">The logic of chaos</p>
      </div>

      <div className={`entrance-veil ${started ? 'gone' : ''}`}>
        <span className="entrance-veil-mark">KAELIX</span>
      </div>

      <button className={`entrance-skip ${started && !ready ? 'show' : ''}`} onClick={skip}>
        Skip
      </button>

      <div className={`entrance-cue ${ready ? 'show' : ''}`} ref={cueRef}>
        <span className="entrance-cue-dot" />
        SCROLL TO ENTER
      </div>
    </div>
  );
}
