import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const STARS = 280;

/* Stars exist in both themes — the sky just changes time of day. On light the
   points go violet and sit at lower alpha, so they read as a daylit star chart
   rather than white dots vanishing into a pale ground. */
const PALETTE = {
  dark:  { a: '#A78BFA', b: '#38BDF8', base: '#FFFFFF', min: 0.0, max: 1.0 },
  light: { a: '#7C3AED', b: '#0EA5E9', base: '#6D28D9', min: 0.1, max: 0.55 },
};

export default function StarField() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const pal = PALETTE[theme] || PALETTE.dark;
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
      color: Math.random() > 0.85 ? pal.a : Math.random() > 0.7 ? pal.b : pal.base,
    }));

    /* twinkle bounces between the theme's alpha bounds */
    const clamp = (v) => Math.max(pal.min, Math.min(pal.max, v));

    const paint = (animate) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        if (animate) {
          s.alpha += s.speed;
          if (s.alpha >= pal.max || s.alpha <= pal.min) s.speed *= -1;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.globalAlpha = animate ? clamp(s.alpha) : Math.max(pal.min + 0.2, clamp(s.alpha));
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const draw = () => {
      paint(true);
      raf = requestAnimationFrame(draw);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(false);   // one static frame instead of the twinkle loop
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
