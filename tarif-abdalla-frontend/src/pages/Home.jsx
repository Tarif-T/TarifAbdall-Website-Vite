import React from "react";
import photo from "../assets/tarif.png";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero">
      <img src={photo} alt="Tarif Abdalla portrait" className="avatar" loading="lazy" />

      <div className="hero-text">
        <h1>Welcome</h1>
        <p className="subtitle">Tarif Abdalla • Software & AI Engineer</p>
        <p className="skills">AI Engineering • Machine Learning • MLOps • Python • PyTorch • TensorFlow • React</p>

        <p>
          I build production-ready software and AI systems — from data pipelines and
          model training to deployment and monitoring. My work blends high-precision
          reality-capture workflows with machine learning to deliver automated insights,
          scalable inference services, and data-driven features for construction and
          enterprise tools.
        </p>

        <p>
          <NavLink to="/projects" className="cta" aria-label="See my projects">See my projects →</NavLink>
        </p>
      </div>
    </div>
  );
}
