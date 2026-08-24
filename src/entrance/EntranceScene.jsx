import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Particles from './Particles';
import Structures from './Structures';
import CameraController from './CameraController';
import { progress, computeField, damp, lerp } from './core';

function Driver() {
  useFrame((_, dt) => {
    progress.current += (progress.target - progress.current) * damp(dt, 0.0011);
    progress.mx += (progress.mxRaw - progress.mx) * damp(dt, 0.02);
    progress.my += (progress.myRaw - progress.my) * damp(dt, 0.02);
  });
  return null;
}
function FogReveal() {
  const { scene } = useThree();
  useFrame(() => {
    if (!scene.fog) return;
    scene.fog.far = lerp(48, 480, computeField(progress.current).fog);
  });
  return null;
}

export default function EntranceScene({ isMobile }) {
  return (
    <>
      <color attach="background" args={['#05130d']} />
      <fog attach="fog" args={['#05130d', 4, 48]} />
      <ambientLight intensity={0.16} color="#7fa78f" />
      <hemisphereLight intensity={0.2} color="#2c5a45" groundColor="#03100a" />
      <directionalLight position={[-30, 24, -20]} intensity={0.5} color="#cfe0c2" />
      <pointLight position={[0, 0, 10]} intensity={30} distance={90} decay={1.8} color="#bfe0a8" />
      <Driver />
      <FogReveal />
      <CameraController />
      <Structures count={isMobile ? 16 : 26} />
      <Particles count={isMobile ? 1600 : 3200} />
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur intensity={isMobile ? 0.18 : 0.26} luminanceThreshold={0.62} luminanceSmoothing={0.3} radius={0.6} />
        <Vignette offset={0.18} darkness={1.0} eskil={false} />
      </EffectComposer>
    </>
  );
}
