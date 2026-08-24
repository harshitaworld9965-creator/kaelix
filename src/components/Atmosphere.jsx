import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const dx = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e) => {
      if (e.target.closest('[data-cursor="hover"]')) ring.classList.add('is-active');
    };
    const out = (e) => {
      if (e.target.closest('[data-cursor="hover"]')) ring.classList.remove('is-active');
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
