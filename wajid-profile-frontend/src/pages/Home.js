import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { experienceData } from '../data/experinceData';
import PerformanceMetrics from '../components/PerformanceMetrics';
import ResumeButton from '../components/ResumeDownloadButton';
import { ReactTyped } from 'react-typed';
import Recommendations from '../components/Recommendations';
import GlitchText from '../components/GlitchText';
import HeroScene3D from '../components/HeroScene3D';

function Home() {
  return (
    <div className="section">

      {/* 3D HERO */}
      <HeroScene3D />

      {/* TYPING INTRO */}
      <div className="typing-intro">
        <ReactTyped
          strings={[
            "whoami — Wajid Jamadar",
            "role -- Full-Stack Developer",
            "stack -- AI + Cloud + WebSockets",
            "status -- Open to Opportunities",
          ]}
          typeSpeed={45}
          backSpeed={25}
          loop
        />
      </div>

      {/* PROFILE PIC */}
      <div className="profile-pic-wrapper">
        <Tilt
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          perspective={800}
          glareEnable
          glareMaxOpacity={0.08}
          glareColor="#00ffff"
          glarePosition="all"
          scale={1.03}
        >
          <div className="profile-pic-frame">
            <img
              src="/images/profile.JPG"
              alt="Wajid Jamadar"
              className="profile-pic"
            />
          </div>
        </Tilt>
      </div>

      {/* CONTACT */}
      <div className="contact">
        <a href="mailto:wajidjamadar01@gmail.com" target="_blank" rel="noreferrer">
          [EMAIL]
        </a>
        <span className="contact-sep"> · </span>
        <a href="https://github.com/Jamadar01" target="_blank" rel="noreferrer">
          [GITHUB]
        </a>
        <span className="contact-sep"> · </span>
        <a href="https://www.linkedin.com/in/wajid-jamadar-2b880b20a/" target="_blank" rel="noreferrer">
          [LINKEDIN]
        </a>
      </div>

      {/* ABOUT */}
      <div className="terminal-block" data-label="ABOUT_ME.txt">
        <h2 className="section-title">
          <GlitchText>About Me</GlitchText>
        </h2>
        <ResumeButton />
        <p className="about-line">
          Software Developer at Wohlig Transformation — building intelligent, real-time web apps.
        </p>
        <p className="about-line">
          Stack: Node.js · React.js · OpenAI · Gemini · Google Cloud · WebSockets · Kubernetes.
        </p>
        <p className="about-line">
          Prev: AI chatbots, recommendation engines, performance-optimised APIs, full-stack systems.
        </p>
        <p className="about-line">
          Interned @ 43Appmart and IBM CSRBOX. Outside code — dancing, sketching, writing.
        </p>
      </div>

      {/* METRICS */}
      <PerformanceMetrics />

      {/* EDUCATION */}
      <div className="terminal-block cyan" data-label="EDUCATION.log">
        <h2 className="section-title">Education</h2>
        <p className="about-line">
          B.Tech Electronics Engineering — Sardar Patel Institute of Technology, Mumbai (2020–2024)
        </p>
        <p className="about-line">CGPA: 7.0 &nbsp;|&nbsp; Andheri, Maharashtra</p>
      </div>

      {/* EXPERIENCE PREVIEW */}
      <div className="terminal-block" data-label="EXPERIENCE.preview">
        <h2 className="section-title">
          <GlitchText>Experience</GlitchText>
        </h2>
        <div className="card-grid">
          {experienceData.map((exp, i) => (
            <Tilt
              key={i}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={700}
              glareEnable
              glareMaxOpacity={0.06}
              glareColor="#00ffff"
              scale={1.02}
            >
              <div className="exp-card">
                <img src={exp.image} alt={exp.company} className="exp-card-img" />
                <div className="exp-card-content">
                  <h3>{exp.role}</h3>
                  <p>{exp.company}</p>
                  <p>{exp.techStack.split(',').slice(0, 3).join(' · ')}…</p>
                  <Link to="/experience" className="exp-card-link">
                    ./open
                  </Link>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>

      {/* QUICK SKILLS */}
      <div className="terminal-block pink" data-label="SKILLS.quick">
        <h2 className="section-title">Key Skills</h2>
        <span className="skill-category">Languages</span>
        <div className="skill-flags">
          {['JavaScript','Python','C++','Java','C'].map(s => (
            <span key={s} className="skill-flag">{s}</span>
          ))}
        </div>
        <span className="skill-category">Web & Frameworks</span>
        <div className="skill-flags">
          {['Node.js','React.js','Express.js','MongoDB','Django','AngularJS'].map(s => (
            <span key={s} className="skill-flag">{s}</span>
          ))}
        </div>
        <span className="skill-category">Tools</span>
        <div className="skill-flags">
          {['GitHub','Postman','Figma','Google Cloud','Kubernetes','Canva'].map(s => (
            <span key={s} className="skill-flag">{s}</span>
          ))}
        </div>
      </div>

      {/* HACKATHONS */}
      <div className="terminal-block" data-label="HACKATHONS.log">
        <h2 className="section-title">Hackathons</h2>
        <div className="hack-entry">
          <div className="hack-timestamp">2023-11-12 · IIT Hyderabad</div>
          <div className="hack-title">Web Development Hackathon</div>
          <div className="hack-desc">Top 10 out of 300 teams — built a fully functional web app end-to-end.</div>
          <div className="hack-badges">
            <span className="hack-badge green">TOP 10</span>
            <span className="hack-badge cyan">300 TEAMS</span>
          </div>
        </div>
        <div className="hack-entry">
          <div className="hack-timestamp">2023-09-08 · Finance-1 × Atrina</div>
          <div className="hack-title">AI Amplify Hackathon</div>
          <div className="hack-desc">Developed a working AI model within a 24-hour challenge sprint.</div>
          <div className="hack-badges">
            <span className="hack-badge pink">24H SPRINT</span>
            <span className="hack-badge green">AI MODEL</span>
          </div>
        </div>
      </div>

      {/* HOBBIES */}
      <div className="terminal-block cyan" data-label="HOBBIES.json">
        <h2 className="section-title">Hobbies</h2>
        <div className="skill-flags">
          {['Dancing','Drawing','Reading','Writing','Creative Expression'].map(h => (
            <span key={h} className="skill-flag">{h}</span>
          ))}
        </div>
      </div>

      {/* EXTRA-CURRICULAR */}
      <div className="terminal-block" data-label="ACTIVITIES.txt">
        <h2 className="section-title">Extra-Curricular</h2>
        <div className="hack-entry">
          <div className="hack-title">Creative Head — Enactus (SPIT)</div>
          <div className="hack-desc">Led design and video editing for events and social campaigns.</div>
        </div>
        <div className="hack-entry">
          <div className="hack-title">Committee Member — Enactus</div>
          <div className="hack-desc">Promoted online and offline social campaigns across platforms.</div>
        </div>
      </div>

      {/* NAV LINKS */}
      <div className="nav-section-links">
        <span>explore → </span>
        <Link to="/experience">/experience</Link>
        <Link to="/skills">/skills</Link>
        <Link to="/hackathons">/hackathons</Link>
      </div>

      <Recommendations />
    </div>
  );
}

export default Home;
