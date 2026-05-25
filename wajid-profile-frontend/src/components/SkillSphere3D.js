import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const ALL_SKILLS = [
  'JavaScript', 'Python', 'C++', 'Java',
  'React.js', 'Node.js', 'Express', 'AngularJS',
  'MongoDB', 'MySQL', 'Pinecone',
  'OpenAI', 'Gemini', 'Vertex AI', 'GCP', 'Kubernetes',
  'WebSockets', 'REST APIs',
  'GitHub', 'Postman', 'Figma', 'Docker',
];

/* Fibonacci sphere — evenly distributes N points on a sphere */
function fibonacciSphere(count, radius) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y   = 1 - (i / (count - 1)) * 2;
    const r   = Math.sqrt(1 - y * y);
    const phi = goldenAngle * i;
    points.push([radius * r * Math.cos(phi), radius * y, radius * r * Math.sin(phi)]);
  }
  return points;
}

const COLORS = {
  Languages:  '#00ff41',
  Frontend:   '#00ffff',
  Backend:    '#ff00ff',
  Database:   '#ffff00',
  AI:         '#ff8800',
  Tools:      '#00ffff',
};

const SKILL_META = {
  JavaScript: 'Languages', Python: 'Languages', 'C++': 'Languages', Java: 'Languages',
  'React.js': 'Frontend', 'Node.js': 'Backend', Express: 'Backend', AngularJS: 'Frontend',
  MongoDB: 'Database', MySQL: 'Database', Pinecone: 'Database',
  OpenAI: 'AI', Gemini: 'AI', 'Vertex AI': 'AI', GCP: 'AI', Kubernetes: 'Tools',
  WebSockets: 'Backend', 'REST APIs': 'Backend',
  GitHub: 'Tools', Postman: 'Tools', Figma: 'Tools', Docker: 'Tools',
};

function SkillNode({ position, skill }) {
  const [hovered, setHovered] = useState(false);
  const cat   = SKILL_META[skill] || 'Tools';
  const color = COLORS[cat];

  return (
    <Html position={position} center zIndexRange={[10, 0]}>
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: hovered ? '0.78rem' : '0.68rem',
          color: hovered ? '#0a0a0f' : color,
          background: hovered ? color : 'rgba(13,13,26,0.85)',
          border: `1px solid ${color}`,
          padding: '2px 8px',
          borderRadius: '2px',
          whiteSpace: 'nowrap',
          textShadow: hovered ? 'none' : `0 0 8px ${color}`,
          boxShadow: hovered ? `0 0 14px ${color}` : 'none',
          transition: 'all 0.2s ease',
          cursor: 'default',
          userSelect: 'none',
          letterSpacing: '1px',
        }}
      >
        --{skill}
      </span>
    </Html>
  );
}

function WireframeSphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.6, 20, 20]} />
      <meshBasicMaterial color="#00ff41" wireframe opacity={0.08} transparent />
    </mesh>
  );
}

function RotatingGroup({ skills, paused }) {
  const group = useRef();
  const positions = fibonacciSphere(skills.length, 2.6);

  useFrame((_, delta) => {
    if (!paused) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group ref={group}>
      <WireframeSphere />
      {skills.map((skill, i) => (
        <SkillNode key={skill} position={positions[i]} skill={skill} />
      ))}
    </group>
  );
}

export default function SkillSphere3D({ compact = false }) {
  const [paused, setPaused] = useState(false);
  const height = compact ? '240px' : '420px';

  return (
    <div
      style={{ height, width: '100%', cursor: 'grab' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 58 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]}   color="#00ffff" intensity={10} />
        <pointLight position={[-5, -5, 5]} color="#ff00ff" intensity={8} />
        <pointLight position={[0, 5, -5]}  color="#00ff41" intensity={6} />
        <RotatingGroup skills={ALL_SKILLS} paused={paused} />
      </Canvas>
    </div>
  );
}
