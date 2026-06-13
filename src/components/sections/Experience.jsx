// ─── Experience.jsx ───────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { experiences } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerDelay } from '../../utils/animations';
import './Section.css';

const Experience = () => {
  const { ref, inView } = useScrollAnimation(0.15);
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? experiences : experiences.slice(0, 2);

  return (
    <section id="experience" className="section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="section-eyebrow">Experience</span>
          <h2 className="section-title">Work that shows growth, ownership, and delivery</h2>
        </div>

        {experiences.length > 2 && (
          <div className="projects__actions">
            <button className="projects__view-all" onClick={() => setShowAll((v) => !v)}>
              {showAll ? 'Show Less' : `View All Experience (+${experiences.length - 2})`}
            </button>
          </div>
        )}

        <div className="timeline">
          {displayed.map((job, index) => (
            <article
              key={job.id}
              className="card timeline-card"
              style={fadeInUp(inView, staggerDelay(index, 80))}
            >
              <div className="timeline-card__top">
                <div>
                  <h3>{job.company}</h3>
                  <p>{job.role}</p>
                </div>
                <span className={`timeline-card__badge${job.current ? ' timeline-card__badge--current' : ''}`}>
                  {job.period}
                </span>
              </div>

              <span className="timeline-card__location">{job.location}</span>

              <ul className="timeline-card__list">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {showAll && experiences.length > 2 && (
          <div className="projects__actions projects__actions--bottom">
            <button className="projects__view-all" onClick={() => setShowAll(false)}>
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
