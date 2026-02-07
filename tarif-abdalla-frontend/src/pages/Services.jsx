import React from "react";

export default function Services() {
  return (
    <div className="container">
      <div className="section-card">
        <div className="section-header">
          <h1>Services</h1>
        </div>

        <div className="section-card">
          <h2>Professional Services</h2>

          <ul>
            <li><strong>AI & Machine Learning:</strong> Model development, training, evaluation, and deployment</li>
            <li><strong>MLOps & Model Serving:</strong> Docker containerization, inference APIs, monitoring, and scaling</li>
            <li><strong>Full-Stack Development:</strong> React frontend, Node.js/Express backend, database design</li>
            <li><strong>Data Pipelines:</strong> ETL workflows, feature engineering, data validation and quality assurance</li>
            <li><strong>3D Laser Scanning & Reality Capture:</strong> Point cloud processing, Scan-to-BIM, reality capture workflows</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

