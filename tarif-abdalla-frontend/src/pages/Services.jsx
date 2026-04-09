import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Services() {
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        setIsLoading(true);
        setError("");
        const response = await apiRequest("/services");

        if (isMounted) {
          setServices(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load services.");
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
