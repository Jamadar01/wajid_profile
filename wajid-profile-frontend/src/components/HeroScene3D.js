import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
/* Three interlocked rings rotating as a gyroscope */
function HolographicGyro() {
  const outer = useRef();
  const mid   = useRef();
  const inner = useRef();
  const core  = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    outer.current.rotation.y += delta * 0.4;
    outer.current.rotation.x  = Math.sin(t * 0.2) * 0.15;

    mid.current.rotation.x += delta * 0.35;
    mid.current.rotation.z  = Math.cos(t * 0.18) * 0.1;

    inner.current.rotation.z += delta * 0.45;
    inner.current.rotation.y  = Math.sin(t * 0.25) * 0.12;

    core.current.rotation.x += delta * 0.6;
    core.current.rotation.y += delta * 0.4;
  });

  return (
    <group>
      {/* Outer ring — cyan */}
      <mesh ref={outer}>
        <torusGeometry args={[2.2, 0.03, 12, 120]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Mid ring — green, tilted 60° */}
      <mesh ref={mid} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 12, 120]} />
        <meshBasicMaterial color="#00ff41" />
      </mesh>

      {/* Inner ring — pink, tilted -45° */}
      <mesh ref={inner} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.03, 12, 120]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>

      {/* Core icosahedron */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.3}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color="#00ff41" wireframe />
        </mesh>
      </Float>

      {/* Orbital dots on rings */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh key={i} position={[2.2 * Math.cos(angle), 2.2 * Math.sin(angle), 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      ))}
    </group>
  );
}

/* Floating small wireframe shapes around the gyro */
function AccentShape({ position, color, speed }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.7;
  });
  return (
    <Float speed={1.5} floatIntensity={0.4}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
}

export default function HeroScene3D() {
  return (
    <div style={{ height: '300px', width: '100%', marginBottom: '1rem' }}>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 55 }}>
        <ambientLight intensity={0.05} />
        <pointLight position={[4, 4, 4]}   color="#00ffff" intensity={12} />
        <pointLight position={[-4, -4, 4]} color="#ff00ff" intensity={10} />
        <pointLight position={[0, 0, 5]}   color="#00ff41" intensity={6} />

        <HolographicGyro />

        <AccentShape position={[-3.2, 0.8, 0]}  color="#00ffff" speed={0.5} />
        <AccentShape position={[3.2, -0.8, 0]}  color="#ff00ff" speed={0.6} />
        <AccentShape position={[0, 2.8, -1]}    color="#00ff41" speed={0.4} />
        <AccentShape position={[-1.5, -2.5, 0]} color="#00ffff" speed={0.55} />
        <AccentShape position={[1.8, 2.2, 0]}   color="#ff00ff" speed={0.45} />
      </Canvas>
    </div>
  );
}
