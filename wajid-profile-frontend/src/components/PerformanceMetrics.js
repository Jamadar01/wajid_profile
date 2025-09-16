// components/PerformanceMetrics.js
import React, { useEffect, useState } from "react";

function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    projects: 0,
    commits: 0,
    linesOfCode: 0,
  });

  useEffect(() => {
    // Dummy animated counters
    let projects = 0;
    let commits = 0;
    let lines = 0;

    const interval = setInterval(() => {
      projects = Math.min(projects + 1, 15); // total projects
      commits = Math.min(commits + 10, 1200); // total commits
      lines = Math.min(lines + 50, 50000); // total lines of code

      setMetrics({
        projects,
        commits,
        linesOfCode: lines,
      });

      if (projects === 15 && commits === 1200 && lines === 50000) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sub-section">
      <h2>Performance Metrics 🚀</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>{metrics.projects}+</h3>
          <p>Projects Completed</p>
        </div>
        <div className="metric-card">
          <h3>{metrics.commits}+</h3>
          <p>GitHub Commits</p>
        </div>
        <div className="metric-card">
          <h3>{metrics.linesOfCode.toLocaleString()}+</h3>
          <p>Lines of Code Written</p>
        </div>
      </div>
    </div>
  );
}

export default PerformanceMetrics;
