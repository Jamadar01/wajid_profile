import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particleOptions = {
  background: { color: { value: "#0a0a0f" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#00ff41", "#00ffff", "#ff00ff"] },
    links: {
      enable: true,
      color: "#00ff4120",
      distance: 160,
      width: 1,
      opacity: 0.3,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
    number: { value: 55, density: { enable: true, area: 900 } },
    opacity: { value: { min: 0.04, max: 0.25 } },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2 } },
  },
  detectRetina: true,
};

export default function CyberpunkBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={particleOptions}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
