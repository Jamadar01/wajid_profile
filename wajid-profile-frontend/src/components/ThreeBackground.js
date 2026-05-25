import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function SpinningTorus({ position, color, speed, scale, tiltX = 0, tiltZ = 0 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.6;
    ref.current.rotation.z += delta * speed * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={scale} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[1, 0.04, 8, 60]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function SpinningIco({ position, color, speed, scale }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.8;
    ref.current.rotation.z += delta * speed * 0.4;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <Stars radius={120} depth={80} count={2500} factor={4} saturation={0} fade speed={0.4} />
      <pointLight position={[6, 6, 4]}  color="#00ffff" intensity={8} />
      <pointLight position={[-6, -4, 4]} color="#ff00ff" intensity={6} />
      <pointLight position={[0, 0, 5]}  color="#00ff41" intensity={4} />

      {/* Left cluster */}
      <SpinningTorus position={[-5, 2, -4]}  color="#00ffff" speed={0.18} scale={1.8} tiltX={0.5} />
      <SpinningIco   position={[-6, -1, -6]} color="#00ffff" speed={0.22} scale={0.7} />

      {/* Right cluster */}
      <SpinningTorus position={[5, -1.5, -5]} color="#ff00ff" speed={0.14} scale={2.2} tiltZ={0.8} />
      <SpinningIco   position={[6, 2, -4]}    color="#ff00ff" speed={0.19} scale={0.8} />

      {/* Far back center */}
      <SpinningTorus position={[0, 4, -10]}  color="#00ff41" speed={0.1}  scale={3.5} tiltX={1} tiltZ={0.5} />
      <SpinningIco   position={[2, -3, -8]}  color="#00ff41" speed={0.16} scale={1.2} />

      {/* Small accent shapes */}
      <SpinningTorus position={[-2, -3, -3]} color="#ff00ff" speed={0.28} scale={0.8} tiltX={0.3} />
      <SpinningIco   position={[3, 3, -3]}   color="#00ffff" speed={0.3}  scale={0.5} />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 70 }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#0a0a0f']} />
        <Scene />
      </Canvas>
    </div>
  );
}
