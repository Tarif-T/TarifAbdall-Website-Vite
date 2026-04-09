import { useEffect, useMemo, useState } from "react";

import CrudManager from "../components/CrudManager";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

// Formats dates for dashboard list and summary display.
function formatCompletion(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

const dashboardSections = [
  {
    id: "projects",
    label: "Projects",
    endpoint: "projects",
    title: "Projects",
    intro: "Create, edit, and delete the public project entries shown on the portfolio site.",
    emptyMessage: "Add your first project to populate the public projects page.",
    fields: [
      { name: "title", label: "Title", required: true, placeholder: "Project title" },
      {
        name: "completion",
        label: "Completion Date",
        type: "date",
        required: true,
        formatListValue: (value) => formatCompletion(value),
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        placeholder: "Brief project summary",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    endpoint: "services",
    title: "Services",
    intro: "Maintain the service offerings presented on the public-facing portfolio pages.",
    emptyMessage: "Add a service to describe what you offer.",
    fields: [
      { name: "title", label: "Title", required: true, placeholder: "Service title" },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        placeholder: "What this service includes",
      },
    ],
  },
  {
    id: "references",
    label: "References",
    endpoint: "references",
    title: "References",
    intro: "Manage professional contacts and recommendation references shown in the contact section.",
    emptyMessage: "Add a professional reference to strengthen the contact page.",
    fields: [
      { name: "firstname", label: "First Name", required: true, placeholder: "Jane" },
      { name: "lastname", label: "Last Name", required: true, placeholder: "Doe" },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "jane@company.com",
      },
      { name: "position", label: "Position", placeholder: "Director" },
      { name: "company", label: "Company", placeholder: "Company name" },
    ],
  },
  {
    id: "users",
    label: "Users",
    endpoint: "users",
    title: "Users",
    intro: "Create users and manage the authenticated admin roster for the portfolio application.",
    emptyMessage: "Create or update user accounts used to access the dashboard.",
    fields: [
      { name: "firstname", label: "First Name", required: true, placeholder: "First name" },
      { name: "lastname", label: "Last Name", required: true, placeholder: "Last name" },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "user@email.com",
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Create or reset password",
        requiredOnCreate: true,
        requiredOnEdit: false,
        clearOnEdit: true,
        hideOnList: true,
        omitWhenEmpty: true,
      },
    ],
  },
];

// Renders protected admin controls and CRUD section switching.
export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeSectionId, setActiveSectionId] = useState("projects");
  const [counts, setCounts] = useState({
    projects: 0,
    services: 0,
    references: 0,
    users: 0,
  });
  const [statsError, setStatsError] = useState("");

  const activeSection = useMemo(
    () => dashboardSections.find((section) => section.id === activeSectionId) || dashboardSections[0],
    [activeSectionId]
  );

  useEffect(() => {
    let isMounted = true;

    // Loads record counts for dashboard summary cards.
    async function loadCounts() {
      try {
        setStatsError("");
        const [projects, services, references, users] = await Promise.all([
          apiRequest("/projects"),
          apiRequest("/services"),
          apiRequest("/references"),
          apiRequest("/users"),
        ]);

        if (!isMounted) {
          return;
        }

        setCounts({
          projects: Array.isArray(projects.data) ? projects.data.length : 0,
          services: Array.isArray(services.data) ? services.data.length : 0,
          references: Array.isArray(references.data) ? references.data.length : 0,
          users: Array.isArray(users.data) ? users.data.length : 0,
        });
      } catch (err) {
        if (isMounted) {
          setStatsError(err.message || "Unable to refresh dashboard totals.");
        }
      }
    }

    void loadCounts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container dashboard-page">
      <section className="section-card dashboard-overview">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Protected portfolio management</h1>
            <p className="section-lead">
              Welcome back{user?.firstname ? `, ${user.firstname}` : ""}. Use this dashboard to
              manage the protected API resources required by the assignment brief.
            </p>
          </div>

          <button className="ghost-button" type="button" onClick={signOut}>
            Sign out
          </button>
        </div>

        <div className="summary-grid">
          <article className="summary-card">
            <span className="summary-number">{counts.projects}</span>
            <span className="summary-label">Projects</span>
          </article>
          <article className="summary-card">
            <span className="summary-number">{counts.services}</span>
            <span className="summary-label">Services</span>
          </article>
          <article className="summary-card">
            <span className="summary-number">{counts.references}</span>
            <span className="summary-label">References</span>
          </article>
          <article className="summary-card">
            <span className="summary-number">{counts.users}</span>
            <span className="summary-label">Users</span>
          </article>
        </div>

        {statsError ? <p className="message error">{statsError}</p> : null}
      </section>

      <section className="dashboard-tab-row">
        {dashboardSections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={section.id === activeSection.id ? "dashboard-tab active" : "dashboard-tab"}
            onClick={() => setActiveSectionId(section.id)}
          >
            {section.label}
          </button>
        ))}
      </section>

      <CrudManager
        title={activeSection.title}
        endpoint={activeSection.endpoint}
        fields={activeSection.fields}
        intro={activeSection.intro}
        emptyMessage={activeSection.emptyMessage}
        requiresAuth
      />
    </div>
  );
}
