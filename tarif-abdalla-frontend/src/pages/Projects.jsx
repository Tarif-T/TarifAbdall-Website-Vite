import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import modelOne from "../assets/3D-model01.jpeg";
import modelTwo from "../assets/3d-model02.jpeg";
import marketing from "../assets/FB-marketing.jpeg";
import webApp from "../assets/web-app01.jpeg";
import { USE_PRESENTATION_FALLBACK, apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";
import { apiFallbackNotice, presentationProjects } from "../data/presentationContent";

const projectArtwork = [webApp, marketing, modelOne, modelTwo];

// Formats project completion dates for human-readable display.
function formatCompletion(value) {
  if (!value) {
    return "No completion date";
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

// Displays projects with sorting, filtering, and lightweight search UX.
export default function Projects() {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let isMounted = true;

    // Loads projects from the API for list rendering.
    async function loadProjects() {
      if (USE_PRESENTATION_FALLBACK) {
        setProjects(presentationProjects);
        setNotice(apiFallbackNotice);
        setError("");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        setNotice("");
        const response = await apiRequest("/projects");

        if (isMounted) {
          setProjects(Array.isArray(response.data) ? response.data : []);
        }
      } catch {
        if (isMounted) {
          setProjects(presentationProjects);
          setNotice(apiFallbackNotice);
          setError("");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    const sortedProjects = [...projects].sort(
      (a, b) => new Date(b.completion).getTime() - new Date(a.completion).getTime()
    );

    if (!normalizedQuery) {
      return sortedProjects;
    }

    return sortedProjects.filter((project) =>
      [project.title, project.description].some((value) =>
        String(value || "").toLowerCase().includes(normalizedQuery)
      )
    );
  }, [deferredQuery, projects]);

  const latestProject = filteredProjects[0];

  // Handles project search input with transition scheduling.
  function onSearchChange(event) {
    const nextValue = event.target.value;
    startTransition(() => {
      setQuery(nextValue);
    });
  }

  return (
    <div className="container">
      <section className="section-card page-hero">
        <div className="page-hero-row">
          <div>
            <p className="eyebrow">Projects</p>
            <h1>Portfolio work connected to the live backend.</h1>
            <p className="section-lead">
              This page is optimized for browsing. Projects are sorted by completion date and can
              be filtered instantly while the input stays responsive.
            </p>
          </div>

          <div className="search-panel">
            <label className="field-group">
              <span>Search projects</span>
              <input
                type="search"
                placeholder="Filter by title or description"
                value={query}
                onChange={onSearchChange}
              />
            </label>
          </div>
        </div>

        <div className="summary-grid">
          <article className="summary-card">
            <span className="summary-number">{projects.length}</span>
            <span className="summary-label">Total projects</span>
          </article>
          <article className="summary-card">
            <span className="summary-number">{filteredProjects.length}</span>
            <span className="summary-label">Visible after filter</span>
          </article>
          <article className="summary-card">
            <span className="summary-number">
              {latestProject ? formatCompletion(latestProject.completion) : "Pending"}
            </span>
            <span className="summary-label">Latest completion</span>
          </article>
        </div>
      </section>

      {error ? <p className="message error">{error}</p> : null}
      {notice ? <p className="message info">{notice}</p> : null}
      {isLoading ? <p className="section-card">Loading projects...</p> : null}

      {!isLoading && filteredProjects.length === 0 ? (
        <section className="section-card empty-state">
          <h2>No projects matched your search.</h2>
          <p>Try a different keyword or add new work from the protected dashboard.</p>
          <NavLink to={isAuthenticated ? "/dashboard" : "/signin"} className="cta small">
            {isAuthenticated ? "Manage projects" : "Sign in"}
          </NavLink>
        </section>
      ) : null}

      {!isLoading && filteredProjects.length > 0 ? (
        <section className="content-grid">
          {filteredProjects.map((project, index) => (
            <article key={project.id} className="portfolio-card project-card">
              <div className="project-art">
                <img
                  src={projectArtwork[index % projectArtwork.length]}
                  alt={project.title}
                  loading="lazy"
                />
              </div>

              <div className="project-card-body">
                <p className="footer-label">{formatCompletion(project.completion)}</p>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
