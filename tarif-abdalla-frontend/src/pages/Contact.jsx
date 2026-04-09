import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Contact() {
  const { isAuthenticated } = useAuth();
  const [references, setReferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadReferences() {
      try {
        setIsLoading(true);
        setError("");
        const response = await apiRequest("/references");

        if (isMounted) {
          setReferences(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load references.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadReferences();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedReferences = useMemo(
    () =>
      [...references].sort((a, b) =>
        `${a.lastname || ""}${a.firstname || ""}`.localeCompare(
          `${b.lastname || ""}${b.firstname || ""}`
        )
      ),
    [references]
  );

  return (
    <div className="container">
      <section className="section-card">
        <p className="eyebrow">Contact</p>
        <h1>Professional references and direct contact details.</h1>
        <p className="section-lead">
          The contact section combines direct outreach information with reference entries served by
          the backend. Authenticated users can update these records from the dashboard.
        </p>

        <div className="summary-grid">
          <article className="summary-card">
            <span className="summary-number">Email</span>
            <span className="summary-label">tarifelsir@gmail.com</span>
          </article>
          <article className="summary-card">
            <span className="summary-number">GitHub</span>
            <span className="summary-label">github.com/Tarif-T</span>
          </article>
          <article className="summary-card">
            <span className="summary-number">{sortedReferences.length}</span>
            <span className="summary-label">Published references</span>
          </article>
        </div>
      </section>

      {error ? <p className="message error">{error}</p> : null}
      {isLoading ? <p className="section-card">Loading references...</p> : null}

      {!isLoading && sortedReferences.length === 0 ? (
        <section className="section-card empty-state">
          <h2>No references published yet.</h2>
          <p>Add trusted contacts from the protected dashboard to complete this section.</p>
          <NavLink to={isAuthenticated ? "/dashboard" : "/signin"} className="cta small">
            {isAuthenticated ? "Manage references" : "Sign in"}
          </NavLink>
        </section>
      ) : null}

      {!isLoading && sortedReferences.length > 0 ? (
        <section className="content-grid">
          {sortedReferences.map((reference) => (
            <article key={reference.id} className="portfolio-card">
              <p className="footer-label">{reference.company || "Reference"}</p>
              <h2>
                {reference.firstname} {reference.lastname}
              </h2>
              <p>{reference.position || "Professional contact"}</p>
              <p>
                <a href={`mailto:${reference.email}`} className="inline-link">
                  {reference.email}
                </a>
              </p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
