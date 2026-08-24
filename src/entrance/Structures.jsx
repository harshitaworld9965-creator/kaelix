import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { progress, computeField, makeRandom } from './core';

/* A handful of huge, slow forms far out in the fog — pure depth cues at the
   edges. They never cross the centre where the wordmark sits. */
export default function Structures({ count = 26 }) {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const items = useMemo(() => {
    const rnd = makeRandom(41);
    const out = [];
    for (let i = 0; i < count; i++) {
      const kind = rnd();
      let sx, sy, sz;
      if (kind < 0.6) { sx = 2 + rnd() * 3; sy = 2 + rnd() * 3; sz = 30 + rnd() * 90; }
      else { sx = 6 + rnd() * 12; sy = 40 + rnd() * 110; sz = 6 + rnd() * 12; }
      const side = rnd() < 0.5 ? -1 : 1;
      out.push({
        px: side * (55 + rnd() * 80),
        py: (rnd() * 2 - 1) * 80,
        pz: -70 - rnd() * 240,
        rx: rnd() * Math.PI, ry: rnd() * Math.PI, rz: rnd() * Math.PI,
        spin: (rnd() * 2 - 1) * 0.12,
        scale: [sx, sy, sz],
      });
    }
    return out;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const { order } = computeField(progress.current);
    for (let i = 0; i < count; i++) {
      const it = items[i];
      dummy.position.set(it.px + progress.mx * 2, it.py + progress.my * 1.5, it.pz);
      const s = it.spin * t * (1 - order * 0.6);
      dummy.rotation.set(it.rx + s, it.ry + s * 0.8, it.rz);
      dummy.scale.set(it.scale[0], it.scale[1], it.scale[2]);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0f2c20" roughness={0.96} metalness={0.1} emissive="#0b3d2e" emissiveIntensity={0.1} />
    </instancedMesh>
  );
}
