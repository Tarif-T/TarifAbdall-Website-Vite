import { NavLink } from "react-router-dom";

import photo from "../assets/tarif_web.png";
import background from "../assets/background_2.jpg";
import { useAuth } from "../context/AuthContext";

const proofPoints = [
  {
    title: "Engineering roots",
    description:
      "My foundation in electronic engineering gave me a systems mindset: structure, precision, problem solving, and comfort working across technical detail.",
  },
  {
    title: "Creative communication",
    description:
      "Working through multimedia, audio visual, and broadcasting strengthened how I think about storytelling, audience experience, and clean presentation.",
  },
  {
    title: "Current direction",
    description:
      "Today I combine that background with digital marketing awareness, AI, and software engineering to build products that are both technically solid and user-aware.",
  },
];

// Renders the homepage hero and core proof points.
export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      <section className="hero-panel">
        <div className="hero-copy">
          <h1 className="hero-title">Engineering, AI, and content systems built for real-world impact.</h1>
          <h2 className="hero-summary">
            I build AI-powered tools, digital systems, and content workflows that connect engineering depth with marketing clarity.
          </h2>

          <div className="hero-actions">
            <NavLink to="/projects" className="cta">
              View projects
            </NavLink>
            <NavLink to={isAuthenticated ? "/dashboard" : "/signin"} className="ghost-button link-button">
              {isAuthenticated ? "Open dashboard" : "Sign in"}
            </NavLink>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-stage">
            <div className="portrait-frame" style={{ "--portrait-bg-image": `url(${background})` }}>
              <img src={photo} alt="Tarif Abdalla portrait" className="avatar" loading="eager" fetchPriority="high" />
            </div>
          </div>
        </div>
      </section>

      <section className="insight-grid">
        {proofPoints.map((point) => (
          <article key={point.title} className="insight-card">
            <p className="footer-label">{point.title}</p>
            <p>{point.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
