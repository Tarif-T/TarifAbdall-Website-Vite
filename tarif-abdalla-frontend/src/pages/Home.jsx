import { NavLink } from "react-router-dom";

import photo from "../assets/tarif.png";
import { useAuth } from "../context/AuthContext";

const focusAreas = [
  "Electronic engineering foundation",
  "Multimedia, audio visual, and broadcasting",
  "Digital marketing perspective",
  "AI and software engineering",
];

const signalCards = [
  {
    title: "Signal",
    description: "Engineering structure and systems thinking.",
  },
  {
    title: "Story",
    description: "Media instincts for rhythm, composition, and audience attention.",
  },
  {
    title: "Systems",
    description: "AI workflows, APIs, and full-stack implementation.",
  },
];

const waveBars = [38, 70, 54, 96, 62, 88, 48, 74];

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

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Media x AI Portfolio</p>
          <h1 className="hero-title">Where broadcast instincts meet intelligent systems.</h1>
          <p className="hero-summary">
            I started from an electronic engineering background, moved through multimedia,
            audio visual, and broadcasting work, added digital marketing training, and now focus
            on AI and software engineering. That path shapes how I build: technically grounded,
            visually aware, and focused on communication, systems, and impact.
          </p>

          <div className="hero-actions">
            <NavLink to="/projects" className="cta">
              View projects
            </NavLink>
            <NavLink to={isAuthenticated ? "/dashboard" : "/signin"} className="ghost-button link-button">
              {isAuthenticated ? "Open dashboard" : "Sign in"}
            </NavLink>
          </div>

          <div className="tag-list">
            {focusAreas.map((area) => (
              <span key={area} className="tag-chip">
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-stage">
            <div className="stage-label">Studio Signal</div>

            <div className="portrait-frame">
              <img src={photo} alt="Tarif Abdalla portrait" className="avatar" loading="lazy" />
              <span className="portrait-badge">Media + AI</span>
            </div>

            <aside className="signal-stack">
              {signalCards.map((card) => (
                <article key={card.title} className="signal-card">
                  <strong>{card.title}</strong>
                  <span>{card.description}</span>
                </article>
              ))}
            </aside>

            <div className="signal-wave" aria-hidden="true">
              {waveBars.map((height, index) => (
                <span key={`${height}-${index}`} style={{ height }} />
              ))}
            </div>

            <div className="hero-aside">
              <p className="hero-aside-title">Professional path</p>
              <div className="metric-list">
                <div className="metric-item">
                  <strong>Engineering</strong>
                  <span>Strong technical base in electronics and structured problem solving.</span>
                </div>
                <div className="metric-item">
                  <strong>Media and broadcast</strong>
                  <span>Experience shaped by multimedia, audio visual, and presentation-driven work.</span>
                </div>
                <div className="metric-item">
                  <strong>AI and software</strong>
                  <span>Current focus on intelligent systems, APIs, and polished full-stack delivery.</span>
                </div>
              </div>
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
