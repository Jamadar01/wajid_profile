import React from 'react';

const orbs = [
  { top: '8%',  left: '10%',  w: 480, h: 480, color: 'rgba(139,92,246,0.12)', blur: 100, delay: '0s',    dur: '12s'  },
  { top: '55%', left: '70%',  w: 560, h: 400, color: 'rgba(6,182,212,0.1)',   blur: 120, delay: '-4s',   dur: '15s'  },
  { top: '30%', left: '50%',  w: 320, h: 320, color: 'rgba(236,72,153,0.07)', blur: 80,  delay: '-8s',   dur: '18s'  },
  { top: '75%', left: '5%',   w: 400, h: 300, color: 'rgba(59,130,246,0.08)', blur: 100, delay: '-2s',   dur: '14s'  },
  { top: '5%',  left: '65%',  w: 350, h: 350, color: 'rgba(139,92,246,0.08)', blur: 90,  delay: '-6s',   dur: '16s'  },
];

export default function NebulaOrbs() {
  return (
    <div className="nebula-orbs" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {orbs.map((o, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: o.top,
            left: o.left,
            width: o.w,
            height: o.h,
            background: `radial-gradient(ellipse at center, ${o.color} 0%, transparent 70%)`,
            filter: `blur(${o.blur}px)`,
            borderRadius: '50%',
            animation: `floatSlow ${o.dur} ${o.delay} ease-in-out infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
