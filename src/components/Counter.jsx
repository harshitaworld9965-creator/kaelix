import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Animated stat counter. Counts from 0 to `to` once, when it scrolls into
   view. `format` lets a stat render as 1M, 5.1k, etc. */
export default function Counter({ to, format, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const obj = { v: 0 };
    const render = () =>
      (el.textContent = format ? format(obj.v) : Math.round(obj.v).toString());
    render();

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: to,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: render,
        }),
    });
    return () => st.kill();
  }, [to, format]);

  return <span ref={ref} className={className} />;
}
