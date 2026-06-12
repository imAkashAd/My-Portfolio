import React from 'react';
import { skills } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInLeft, fadeInRight } from '../../utils/animations';
import './Section.css';

const SkillBar = ({ skill }) => (
  <div className="skill-bar">
    <div className="skill-bar__top">
      <span>{skill.name}</span>
      <span>{skill.level}%</span>
    </div>
    <div className="skill-bar__track">
      <div className="skill-bar__fill" style={{ width: `${skill.level}%`, background: skill.color }} />
    </div>
  </div>
);

const Skills = () => {
  const { ref, inView } = useScrollAnimation(0.15);

  return (
    <section id="skills" className="section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">Technical stack and working habits</h2>
        </div>

        <div className="skills-grid">
          <article className="card skills-card" style={fadeInLeft(inView)}>
            <h3>Primary</h3>
            <div className="skills-list">
              {skills.primary.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </article>

          <article className="card skills-card" style={fadeInRight(inView)}>
            <h3>Secondary</h3>
            <div className="skills-list">
              {skills.secondary.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </article>
        </div>

        <div className="card skills-tools" style={fadeInRight(inView, 120)}>
          <h3>Tools and soft skills</h3>
          <div className="skills-tags">
            {skills.tools.map((tool) => (
              <span key={tool.name} className="skills-tag">
                {tool.icon} {tool.name}
              </span>
            ))}
            {skills.soft.map((item) => (
              <span key={item} className="skills-tag skills-tag--soft">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;