import React from 'react';
// src/data/experienceData.js
// Experience.js
import { experienceData } from '../data/experinceData';


function Experience() {
  return (
    <div className="section">
      <h2>Experience</h2>
      {experienceData.map((exp, index) => (
        <div key={index} className="sub-section">
          <h3>{exp.role} – {exp.company}</h3>
          <p><strong>Duration:</strong> {exp.duration}</p>
          <p><strong>Location:</strong> {exp.location}</p>
          <p><strong>Tech Stack:</strong> {exp.techStack}</p>
          <ul>
            {exp.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <a href={exp.link} target="_blank" rel="noreferrer">Visit Company ↗</a>
        </div>
      ))}
    </div>
  );
}

export default {Experience};
