import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { progress, computeField, makeRandom, lerp } from './core';

function makeDot() {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(205,232,205,0.5)');
  g.addColorStop(1, 'rgba(205,232,205,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}
const gauss = (rnd) => (rnd() + rnd() + rnd() - 1.5) / 1.5;

/* A deep field of motes. Early: scattered and dim, drifting. As you scroll
   they converge toward a soft luminous core in front of the camera and
   brighten — the atmosphere behind the wordmark. Matte, never blown out. */
export default function Particles({ count = 3200 }) {
  const ref = useRef();
  const tex = useMemo(makeDot, []);

  const d = useMemo(() => {
    const rnd = makeRandom(7);
    const cx = new Float32Array(count), cy = new Float32Array(count), cz = new Float32Array(count);
    const vx = new Float32Array(count), vy = new Float32Array(count);
    const ph = new Float32Array(count), fr = new Float32Array(count), dw = new Float32Array(count);
    const core = new Float32Array(count * 3), col = new Float32Array(count * 3), positions = new Float32Array(count * 3);
    const warm = new THREE.Color('#e7eed9'), green = new THREE.Color('#5f9e77');
    for (let i = 0; i < count; i++) {
      cx[i] = (rnd() * 2 - 1) * 150; cy[i] = (rnd() * 2 - 1) * 95; cz[i] = -10 - rnd() * 260;
      vx[i] = (rnd() * 2 - 1) * 0.4; vy[i] = (rnd() * 2 - 1) * 0.4;
      ph[i] = rnd() * Math.PI * 2; fr[i] = 0.2 + rnd() * 0.5; dw[i] = rnd();
      const ox = gauss(rnd) * 40, oy = gauss(rnd) * 24, oz = -46 + gauss(rnd) * 30;
      core[i * 3] = ox; core[i * 3 + 1] = oy; core[i * 3 + 2] = oz;
      const r = Math.hypot(ox / 40, oy / 24);
      const c = r < 0.7 && rnd() < 0.55 ? warm : green;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { cx, cy, cz, vx, vy, ph, fr, dw, core, col, positions };
  }, [count]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    const p = progress.current;
    const { gather, fog } = computeField(p);
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array;
    const drift = (1 - gather) * 4;
    for (let i = 0; i < count; i++) {
      const bx = d.cx[i] + Math.sin(t * d.fr[i] + d.ph[i]) * drift + progress.mx * 3 * d.dw[i];
      const by = d.cy[i] + Math.cos(t * d.fr[i] * 0.8 + d.ph[i]) * drift + progress.my * 2.2 * d.dw[i];
      const bz = d.cz[i];
      arr[i * 3] = lerp(bx, d.core[i * 3], gather);
      arr[i * 3 + 1] = lerp(by, d.core[i * 3 + 1], gather);
      arr[i * 3 + 2] = lerp(bz, d.core[i * 3 + 2], gather);
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.material.opacity = 0.12 + fog * 0.16 + gather * 0.24;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={d.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={d.col} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} map={tex} vertexColors transparent opacity={0.12} depthWrite={false} sizeAttenuation />
    </points>
  );
}
