import React, { useEffect, useRef } from 'react';

const STARS = 280;

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: STARS }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      speed: (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.85 ? '#a78bfa' : Math.random() > 0.7 ? '#38bdf8' : '#ffffff',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha >= 1 || s.alpha <= 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace(')', `,${Math.max(0, Math.min(1, s.alpha))})`).replace('rgb', 'rgba').replace('#ffffff', `rgba(255,255,255,${Math.max(0, Math.min(1, s.alpha))}`);
        // simpler fill
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      raf = requestAnimationFrame(draw);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Draw one static frame instead of animating the twinkle loop
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0.2, Math.min(1, s.alpha));
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
