import React from 'react';
import { personalInfo } from '../../data/portfolioData';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__logo">
            <span className="footer__bracket">&lt;</span>
            Akash Adhikary
            <span className="footer__bracket">/&gt;</span>
          </p>

          <p className="footer__copy">© {year} Akash Adhikary. Built with React.js</p>

          <div className="footer__links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;