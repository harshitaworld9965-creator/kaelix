import * as THREE from 'three';

// Shared, mutated-not-reactive scroll state
export const progress = {
  target: 0,
  current: 0,
  mx: 0,
  my: 0,
  mxRaw: 0,
  myRaw: 0,
};

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const damp = (dt, s = 0.001) => 1 - Math.pow(s, dt);

export function makeRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Sample a keyframed path of {p, key:[x,y,z]} at progress p into `out`.
export function samplePath(waypoints, p, key, out) {
  const n = waypoints.length;
  if (p <= waypoints[0].p) {
    const v = waypoints[0][key];
    return out.set(v[0], v[1], v[2]);
  }
  if (p >= waypoints[n - 1].p) {
    const v = waypoints[n - 1][key];
    return out.set(v[0], v[1], v[2]);
  }
  for (let i = 0; i < n - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = smoothstep(a.p, b.p, p);
      return out.set(
        lerp(a[key][0], b[key][0], t),
        lerp(a[key][1], b[key][1], t),
        lerp(a[key][2], b[key][2], t)
      );
    }
  }
  return out;
}

/* One field of numbers the whole entrance reads. Tuned for a short
   (~10s of scroll) arc: void → force → pull → acceleration →
   breakthrough → slow-mo → order → KAELIX → handoff. */
export function computeField(p) {
  const fog = smoothstep(0.08, 0.55, p);    // fog opens, depth appears
  const gather = smoothstep(0.2, 0.72, p);  // particles converge + brighten
  const order = smoothstep(0.5, 0.9, p);    // settle into a calm core
  const settle = smoothstep(0.8, 1.0, p);
  const handoff = smoothstep(0.92, 1.0, p);
  return { fog, gather, order, settle, handoff };
}

export const _scratch = new THREE.Vector3();
