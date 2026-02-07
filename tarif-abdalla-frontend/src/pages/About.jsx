import React from "react";

export default function About() {
  return (
    <div className="container">
      <div className="section-card">
        <div className="section-header">
          <h1>About Me</h1>
        </div>

        <p>
          My name is <strong>Tarif Abdalla</strong>. I combine software engineering
          and AI expertise to deliver production systems and intelligent features for
          construction, surveying, and enterprise workflows.
        </p>

        <p>
          I design and implement data pipelines, train and validate machine learning
          models, and deploy scalable inference services (MLOps). My day-to-day tools
          include Python, PyTorch, TensorFlow, Docker, and cloud platforms for model
          serving and monitoring.
        </p>

        <p>
          Alongside reality-capture and BIM delivery, I focus on embedding automation
          and AI-driven analytics into products — from object detection in point clouds
          to predictive maintenance and process automation.
        </p>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h2>Core Skills</h2>
        </div>

        <ul className="skill-list">
          <li className="skill-badge">API Design</li>
          <li className="skill-badge">React</li>
          <li className="skill-badge">Node.js</li>
          <li className="skill-badge">Python</li>
          <li className="skill-badge">PyTorch</li>
          <li className="skill-badge">TensorFlow</li>
          <li className="skill-badge">MLOps</li>
          <li className="skill-badge">Kubernetes</li>
        </ul>
      </div>
    </div>
  );
}

