import React from 'react';
import { personalInfo } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp } from '../../utils/animations';
import './Section.css';

const Contact = () => {
  const { ref, inView } = useScrollAnimation(0.15);

  return (
    <section id="contact" className="section section--alt">
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title">Let&apos;s build something useful</h2>
          <p className="section-subtitle">
            I&apos;m open to Flutter roles, freelance work, and collaborations with teams that care
            about quality.
          </p>
        </div>

        <div className="card contact-card" style={fadeInUp(inView)}>
          <div>
            <h3>Reach out</h3>
            <p>Send a message and I&apos;ll respond quickly.</p>
          </div>
          <div className="contact-card__actions">
            <a className="btn btn-primary" href={`mailto:${personalInfo.email}`}>
              Email Me
            </a>
            <a className="btn btn-outline" href={personalInfo.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn btn-outline" href={personalInfo.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="contact-card__details">
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}>{personalInfo.phone}</a>
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
