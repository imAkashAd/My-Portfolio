import React, { useState } from "react";
import { projects } from "../../data/portfolioData";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { fadeInUp, staggerDelay } from "../../utils/animations";
import "./Section.css";

const Projects = () => {
  const { ref, inView } = useScrollAnimation(0.15);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <section id="projects" className="section section--alt">
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title">Selected work with production focus</h2>
        </div>

        {projects.length > 2 && (
          <div className="projects__actions">
            <button
              className="projects__view-all"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "Show Less"
                : `View All Projects (+${projects.length - 2})`}
            </button>
          </div>
        )}

        <div className="project-grid">
          {displayedProjects.map((project, index) => {
            const hiddenProject = index >= 2;

            return (
              <article
                key={project.id}
                className={`card project-card ${
                  showAll && hiddenProject ? "project-card--reveal" : ""
                }`}
                style={fadeInUp(inView, staggerDelay(index, 80, 120))}
              >
                <div className="project-card__header">
                  <div className="project-card__title-wrap">
                    <span
                      className="project-card__icon"
                      style={{ color: project.color }}
                    >
                      {project.icon}
                    </span>

                    <h3>{project.title}</h3>
                  </div>

                  <span className="project-card__badge">{project.badge}</span>
                </div>

                <p className="project-card__subtitle">{project.subtitle}</p>

                <p className="project-card__description">
                  {project.description}
                </p>

                <div className="project-card__features">
                  {project.features.map((feature) => (
                    <span key={feature} className="tech-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="project-card__tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="project-card__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card__links">
                  {project.liveUrl ? (
                    <a
                      className="btn btn-primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>
                  ) : null}

                  <a
                    className="btn btn-outline"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Code
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {showAll && projects.length > 2 && (
          <div className="projects__actions projects__actions--bottom">
            <button
              className="projects__view-all"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
