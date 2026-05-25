import React, { useRef, useEffect } from 'react';
import { useScene } from './SceneContext';
import HeroPanel from './panels/HeroPanel';
import ExperiencePanel from './panels/ExperiencePanel';
import SkillsPanel from './panels/SkillsPanel';
import HackathonsPanel from './panels/HackathonsPanel';
import AboutPanel from './panels/AboutPanel';

/* Carousel orbit angles — angle around Y axis where each panel lives */
export const SECTION_ORBIT = {
  hero:       0,
  experience: 75,
  skills:    -75,
  hackathons: 155,
  about:     -155,
};

const RADIUS = 950; /* carousel cylinder radius in px */

export default function CSS3DScene() {
  const { active } = useScene();
  const innerRef  = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const rot       = useRef({ x: 0, y: 0 });
  const activeRef = useRef(active);
  activeRef.current = active;

  /* Single rAF loop — reads activeRef so no restarts on nav */
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      const baseY  = -SECTION_ORBIT[activeRef.current]; /* negate: bring panel to front */
      const targetX =  mouse.current.y * 14;
      const targetY =  baseY + mouse.current.x * 18;

      rot.current.x += (targetX - rot.current.x) * 0.045;
      rot.current.y += (targetY - rot.current.y) * 0.045;

      if (innerRef.current) {
        innerRef.current.style.transform =
          `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scene-perspective">
      <div ref={innerRef} className="scene-inner">
        <HeroPanel       angle={SECTION_ORBIT.hero}       radius={RADIUS} />
        <ExperiencePanel angle={SECTION_ORBIT.experience} radius={RADIUS} />
        <SkillsPanel     angle={SECTION_ORBIT.skills}     radius={RADIUS} />
        <HackathonsPanel angle={SECTION_ORBIT.hackathons} radius={RADIUS} />
        <AboutPanel      angle={SECTION_ORBIT.about}      radius={RADIUS} />
      </div>
    </div>
  );
}
