import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { apiRequest } from "../api";

// Registers a new user account through the backend signup endpoint.
export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updates controlled sign-up form values.
  function onChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  // Creates a new account and redirects to sign-in with context.
  async function onSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      await apiRequest("/users/signup", {
        method: "POST",
        body: JSON.stringify(form),
      });

      navigate("/signin", {
        replace: true,
        state: {
          email: form.email,
          success: "Account created successfully. Please sign in to continue.",
        },
      });
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container auth-page">
      <section className="auth-shell">
        <div className="auth-panel">
          <p className="eyebrow">Sign Up</p>
          <h1>Create a portfolio user account.</h1>
          <p className="section-lead">
            This form creates a user through the backend API and stores the password securely in
            hashed form.
          </p>

          <form className="auth-form" onSubmit={onSubmit}>
            <div className="dual-inputs">
              <label className="field-group">
                <span>First name</span>
                <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={onChange}
                  placeholder="Tarif"
                  required
                />
              </label>

              <label className="field-group">
                <span>Last name</span>
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={onChange}
                  placeholder="Abdalla"
                  required
                />
              </label>
            </div>

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
                placeholder="Minimum 6 characters"
                minLength={6}
                required
              />
            </label>

            <button className="cta auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          {error ? <p className="message error">{error}</p> : null}

          <p className="auth-footer">
            Already registered?{" "}
            <NavLink to="/signin" className="inline-link">
              Sign in
            </NavLink>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
