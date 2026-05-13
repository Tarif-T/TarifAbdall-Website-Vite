import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { USE_PRESENTATION_FALLBACK, apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";
import { apiFallbackNotice, presentationServices } from "../data/presentationContent";

// Lists service offerings loaded from the backend API.
export default function Services() {
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let isMounted = true;

    // Loads services for the public services page.
    async function loadServices() {
      if (USE_PRESENTATION_FALLBACK) {
        setServices(presentationServices);
        setNotice(apiFallbackNotice);
        setError("");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        setNotice("");
        const response = await apiRequest("/services");

        if (isMounted) {
          setServices(Array.isArray(response.data) ? response.data : []);
        }
      } catch {
        if (isMounted) {
          setServices(presentationServices);
          setNotice(apiFallbackNotice);
          setError("");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedServices = useMemo(
    () => [...services].sort((a, b) => String(a.title).localeCompare(String(b.title))),
    [services]
  );

  return (
    <div className="container">
      <section className="section-card">
        <p className="eyebrow">Services</p>
        <h1>Capabilities presented as live backend content.</h1>
        <p className="section-lead">
          These services are read from the portfolio API and can be managed from the authenticated
          dashboard.
        </p>
      </section>

      {error ? <p className="message error">{error}</p> : null}
      {notice ? <p className="message info">{notice}</p> : null}
      {isLoading ? <p className="section-card">Loading services...</p> : null}

      {!isLoading && sortedServices.length === 0 ? (
        <section className="section-card empty-state">
          <h2>No services published yet.</h2>
          <p>Add your service offerings from the protected dashboard.</p>
          <NavLink to={isAuthenticated ? "/dashboard" : "/signin"} className="cta small">
            {isAuthenticated ? "Open dashboard" : "Sign in"}
          </NavLink>
        </section>
      ) : null}

      {!isLoading && sortedServices.length > 0 ? (
        <section className="content-grid">
          {sortedServices.map((service) => (
            <article key={service.id} className="portfolio-card">
              <p className="footer-label">Service</p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
