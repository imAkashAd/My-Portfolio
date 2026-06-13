import React from 'react';
import { personalInfo, education, certifications } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInLeft, fadeInRight, staggerDelay } from '../../utils/animations';
import './Section.css';

const About = () => {
  const { ref, inView } = useScrollAnimation(0.2);

  return (
    <section id="about" className="section section--alt">
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="section-eyebrow">About</span>
          <h2 className="section-title">A focused Flutter developer building with care</h2>
          <p className="section-subtitle">
            Clean UI, reliable state management, and close collaboration with design and backend teams.
          </p>
        </div>

        <div className="about-grid">
          <article className="card about-card" style={fadeInLeft(inView)}>
            <h3>Summary</h3>
            <p>{personalInfo.bio}</p>
            <p>
              I work mostly with Flutter and GetX, integrate APIs, and care a lot about shipping
              polished apps on time while keeping the codebase easy to maintain.
            </p>
            <div className="about-meta">
              <div>
                <span className="about-meta__label">Location</span>
                <span className="about-meta__value">{personalInfo.location}</span>
              </div>
              <div>
                <span className="about-meta__label">Email</span>
                <a className="about-meta__value" href={`mailto:${personalInfo.email}`}>
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </article>

          <div className="about-stack">
            <article className="card about-card" style={fadeInRight(inView)}>
              <h3>Education</h3>
              {education.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-item__dot" />
                  <div>
                    <h4>{item.institution}</h4>
                    <p>{item.degree}</p>
                    <span>{item.period} · {item.location}</span>
                  </div>
                </div>
              ))}
            </article>

            <article className="card about-card" style={fadeInRight(inView, staggerDelay(1, 120))}>
              <h3>Certifications</h3>
              <div className="about-cert-list">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="about-cert-item"
                    style={fadeInRight(inView, staggerDelay(index, 180, 80))}
                  >
                    <span className="about-cert-icon">{cert.icon}</span>
                    <div>
                      <h4>{cert.title}</h4>
                      <p>{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
