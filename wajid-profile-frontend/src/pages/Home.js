import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="section">
      <img
        src="/images/profile.JPG"
        alt="Wajid Jamadar"
        className="profile-pic"
      />

      {/* ABOUT ME */}
      <h2>About Me</h2>
      <p>
        I’m a passionate Software Developer currently working at Wohlig Transformation. I specialize in building intelligent,
        real-time web applications using technologies like Node.js, React.js, OpenAI, Google Cloud, and WebSockets.
      </p>
      <p>
        My experience includes developing AI-driven features like chatbots, personalized recommendation systems, and
        performance-optimized APIs. I’ve also interned at 43Appmart and IBM CSRBOX, where I worked on full-stack and
        frontend projects.
      </p>
      <p>
        Beyond code, I love creative expression—whether it’s dancing, sketching, or writing. I'm always eager to build,
        learn, and grow in the tech world.
      </p>

      {/* CONTACT LINKS */}
      <div className="contact">
        <a href="mailto:wajidjamadar01@gmail.com" target="_blank" rel="noreferrer">📧 Email</a> |{' '}
        <a href="https://github.com/Jamadar01" target="_blank" rel="noreferrer">💻 GitHub</a> |{' '}
        <a href="https://www.linkedin.com/in/wajid-jamadar-2b880b20a/" target="_blank" rel="noreferrer">🔗 LinkedIn</a>
      </div>

      {/* EDUCATION */}
      <div className="sub-section">
        <h2>Education</h2>
        <p><strong>Sardar Patel Institute of Technology</strong> (2020 – 2024)</p>
        <p>B.Tech in Electronics Engineering – 7.0 CGPA, Andheri, Mumbai</p>
      </div>

      {/* SKILLS */}
      <div className="sub-section">
        <h2>Key Skills</h2>
        <ul>
          <li><strong>Languages:</strong> JavaScript, Python, C++, Java, C</li>
          <li><strong>Web & Frameworks:</strong> Node.js, Express.js, React.js, MongoDB, Django, PHP, AngularJS, HTML, CSS, Bootstrap</li>
          <li><strong>Tools:</strong> GitHub, Mongo Shell, Postman, Appsmith, Wampserver, Figma, Canva</li>
        </ul>
      </div>

      {/* HACKATHONS */}
      <div className="sub-section">
        <h2>Hackathons</h2>
        <ul>
          <li><strong>IIT Hyderabad Web Development Hackathon (2023):</strong> Top 10 out of 300 teams for building a fully functional web app.</li>
          <li><strong>AI Amplify Hackathon (2023):</strong> Developed a working AI model in a 24-hour challenge hosted by Finance-1 and Atrina.</li>
        </ul>
      </div>

      {/* HOBBIES */}
      <div className="sub-section">
        <h2>Hobbies</h2>
        <p>Dancing and expressive movement, Drawing and visual art, Reading fiction and non-fiction, Writing short stories and creative content</p>
      </div>

      {/* EXTRA-CURRICULAR */}
      <div className="sub-section">
        <h2>Extra-Curricular Activities</h2>
        <ul>
          <li><strong>Creative Head</strong> – Enactus (SPIT): Led design and video editing for events.</li>
          <li><strong>Committee Member</strong> – Enactus: Promoted online/offline social campaigns.</li>
        </ul>
      </div>

      {/* QUICK LINKS */}
      <div className="nav-section-links">
        <p>Explore other sections:</p>
        <Link to="/experience">Experience</Link> |{' '}
        <Link to="/skills">Skills</Link> |{' '}
        <Link to="/hackathons">Hackathons</Link>
      </div>
    </div>
  );
}

export default Home;
