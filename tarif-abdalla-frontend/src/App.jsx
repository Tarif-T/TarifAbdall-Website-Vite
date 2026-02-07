import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import logo from "./assets/ta-final_logo.png";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="top-nav">
        <div className="nav-inner">
          <NavLink to="/" className="site-brand-link" aria-label="Go to home">
            <div className="logo-wrapper" title="Tarif Abdalla">
              <img src={logo} className="site-logo" alt="Tarif Abdalla logo" loading="lazy" />
            </div>
          </NavLink>

          <nav className="main-nav" aria-label="Primary">
            <NavLink to="/" end className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/about" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            <NavLink to="/projects" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink>
            <NavLink to="/services" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
            <NavLink to="/contact" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
          </nav>

          <div className="nav-cta">
            <NavLink to="/contact" className="cta small">Contact</NavLink>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col about">
            <img src={logo} alt="Tarif Abdalla logo" className="footer-logo" />
            <p>Software & AI Engineer — building scalable ML systems and reality-capture tools.</p>
          </div>

          <div className="footer-col links">
            <h4>Quick Links</h4>
            <nav className="footer-nav" aria-label="Footer">
              <NavLink to="/" className="footer-link">Home</NavLink>
              <NavLink to="/about" className="footer-link">About</NavLink>
              <NavLink to="/projects" className="footer-link">Projects</NavLink>
              <NavLink to="/services" className="footer-link">Services</NavLink>
              <NavLink to="/contact" className="footer-link">Contact</NavLink>
            </nav>
          </div>

          <div className="footer-col contact">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:tarifelsir@gmail.com">tarifelsir@gmail.com</a></p>
            <p>Location: Ontario, Canada</p>
            <div className="social">
              <a href="#" aria-label="GitHub" className="social-link">GitHub</a>
              <a href="#" aria-label="LinkedIn" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Tarif Abdalla • All rights reserved</small>
        </div>
      </footer>
    </BrowserRouter>
  );
}