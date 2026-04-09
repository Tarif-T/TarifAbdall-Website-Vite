import { BrowserRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";

import logo from "./assets/ta-final_logo.png";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.css";

const publicLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

// Resolves the nav link class based on route active state.
function getNavLinkClass({ isActive }) {
  return isActive ? "nav-link active" : "nav-link";
}

// Renders the app shell, routes, and global navigation/footer.
export default function App() {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <BrowserRouter>
      <div className="site-shell">
        <header className="top-nav">
          <div className="nav-inner">
            <NavLink to="/" className="site-brand-link" aria-label="Go to home">
              <img src={logo} className="site-logo" alt="Tarif Abdalla logo" />
              <div className="brand-copy">
                <span className="brand-title">Tarif Abdalla</span>
                <span className="brand-subtitle">Engineering, media, marketing, AI, and software</span>
              </div>
            </NavLink>

            <nav className="main-nav" aria-label="Primary">
              {publicLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={getNavLinkClass}
                >
                  {link.label}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <NavLink to="/dashboard" className={getNavLinkClass}>
                  Dashboard
                </NavLink>
              ) : null}
            </nav>

            <div className="nav-utilities">
              {isAuthenticated ? (
                <>
                  <span className="nav-status">Signed in as {user?.firstname || "Admin"}</span>
                  <button className="ghost-button" type="button" onClick={signOut}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className={({ isActive }) => (isActive ? "ghost-link active" : "ghost-link")}
                  >
                    Sign in
                  </NavLink>
                  <NavLink to="/signup" className="cta small">
                    Create account
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="page-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/signin"
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <p className="footer-label">Portfolio</p>
              <h3>Engineering depth shaped by media, marketing, and software delivery.</h3>
              <p className="footer-copy">
                This portfolio reflects a path from electronic engineering through multimedia,
                audio visual work, broadcasting, digital marketing, and into AI and software
                engineering.
              </p>
            </div>

            <div>
              <p className="footer-label">Contact</p>
              <a href="mailto:tarifelsir@gmail.com" className="footer-row">
                tarifelsir@gmail.com
              </a>
              <p className="footer-row">Ontario, Canada</p>
              <a
                href="https://github.com/Tarif-T"
                target="_blank"
                rel="noreferrer"
                className="footer-row"
              >
                github.com/Tarif-T
              </a>
            </div>

            <div>
              <p className="footer-label">Access</p>
              <p className="footer-copy">
                {isAuthenticated
                  ? "Authenticated users can manage projects, services, references, and users from the dashboard."
                  : "Sign in to manage protected portfolio content and test the authenticated workflow."}
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <small>{new Date().getFullYear()} Tarif Abdalla. All rights reserved.</small>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
