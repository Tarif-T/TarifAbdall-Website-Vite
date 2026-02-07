import React from "react";
import modelImage from "../assets/3D-model01.jpeg";
import marketingImage from "../assets/FB-marketing.jpeg";
import webAppImage from "../assets/web-app01.jpeg";

export default function Projects() {
  return (
    <div className="container">
      <div className="section-card">
        <div className="section-header">
          <h1>Projects</h1>
        </div>

        <div className="projects-grid">
          <article className="project-card featured-project">
            <div className="project-image-wrapper">
              <img 
                src={modelImage} 
                alt="3D Point Cloud Model" 
                className="project-image"
                loading="lazy"
              />
              <div className="project-overlay"></div>
            </div>
            <h3>Point-Cloud Object Detection</h3>
            <p>
              Trained deep learning models using PyTorch to automatically detect and
              label structural features from 3D point clouds with high accuracy.
            </p>
          </article>

          <article className="project-card featured-project">
            <div className="project-image-wrapper">
              <img 
                src={webAppImage} 
                alt="Web App Development" 
                className="project-image"
                loading="lazy"
              />
              <div className="project-overlay"></div>
            </div>
            <h3>Web App Development</h3>
            <p>
              Built full-stack web applications with React, Node.js, and Express. 
              Designed responsive UIs, RESTful APIs, and scalable database architectures.
            </p>
          </article>

          <article className="project-card featured-project">
            <div className="project-image-wrapper">
              <img 
                src={marketingImage} 
                alt="Digital Marketing Campaign" 
                className="project-image"
                loading="lazy"
              />
              <div className="project-overlay"></div>
            </div>
            <h3>Digital Marketing Campaigns</h3>
            <p>
              Managed Google Ads and Meta Ads campaigns for construction, technology,
              and SaaS companies. Optimized targeting and ROI through data-driven strategies.
            </p>
          </article>

          <article className="project-card">
            <h3>Full-Stack Web Application</h3>
            <p>
              Built React frontend and Node.js/Express backend with database design,
              API development, and responsive user interfaces.
            </p>
          </article>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h2>AI & Software Projects</h2>
        </div>

        <ul>
          <li><strong>Point-cloud object detection:</strong> trained deep learning models to automatically label structural features from 3D scans.</li>
          <li><strong>Automated QA pipelines:</strong> built data pipelines to validate scan completeness and generate construction QA reports.</li>
          <li><strong>MLOps deployment:</strong> containerized models and deployed inference services with monitoring for production use.</li>
        </ul>
      </div>
    </div>
  );
}

