import { useThree, useFrame } from '@react-three/fiber';
import { progress } from './core';

/* Dead simple: a slow push forward through the field with a little mouse
   parallax. Nothing to mis-frame — the wordmark is DOM, always centered. */
export default function CameraController() {
  const { camera } = useThree();
  useFrame((state) => {
    const p = progress.current;
    const t = state.clock.elapsedTime;
    camera.position.set(
      progress.mx * 2.2 + Math.sin(t * 0.3) * 0.3,
      progress.my * 1.6 + Math.cos(t * 0.24) * 0.3,
      34 - p * 30
    );
    camera.lookAt(progress.mx * 4, progress.my * 3, -46);
  });
  return null;
}
