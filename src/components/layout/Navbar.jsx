import React, { useEffect, useState } from 'react';
import { navLinks, personalInfo } from '../../data/portfolioData';
import { useActiveSection } from '../../hooks/useScrollAnimation';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navLinks.map((link) => link.id);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <button className="navbar__logo" onClick={() => scrollTo('hero')} aria-label="Back to top">
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-name">Akash</span>
          <span className="navbar__logo-bracket">/&gt;</span>
        </button>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a href={`mailto:${personalInfo.email}`} className="navbar__cta btn btn-outline">
          Hire Me
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        <ul className="navbar__drawer-links container">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`navbar__drawer-link ${activeSection === link.id ? 'navbar__drawer-link--active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <a href={`mailto:${personalInfo.email}`} className="btn btn-primary navbar__drawer-cta">
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;