import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

// Authenticates an existing user and redirects to protected routes.
export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({
    email: location.state?.email || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState(location.state?.success || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.email || location.state?.success) {
      setForm((current) => ({
        ...current,
        email: location.state?.email || current.email,
      }));
      setInfoMessage(location.state?.success || "");
    }
  }, [location.state]);

  // Updates controlled sign-in form values.
  function onChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  // Submits sign-in credentials and stores returned session data.
  async function onSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");
      const response = await apiRequest("/users/signin", {
        method: "POST",
        body: JSON.stringify(form),
      });

      signIn(response.data);
      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container auth-page">
      <section className="auth-shell">
        <div className="auth-panel">
          <p className="eyebrow">Sign In</p>
          <h1>Access the protected portfolio dashboard.</h1>
          <p className="section-lead">
            Authenticated users can manage projects, services, references, and user records.
          </p>

          <form className="auth-form" onSubmit={onSubmit}>
            <label className="field-group">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="field-group">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Enter your password"
                required
              />
            </label>

            <button className="cta auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {infoMessage ? <p className="message success">{infoMessage}</p> : null}
          {error ? <p className="message error">{error}</p> : null}

          <p className="auth-footer">
            Need an account?{" "}
            <NavLink to="/signup" className="inline-link">
              Create one here
            </NavLink>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
