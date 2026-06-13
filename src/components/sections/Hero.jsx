import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { personalInfo, stats } from '../../data/portfolioData';
import { useScrollAnimation, useCountUp } from '../../hooks/useScrollAnimation';
import './Hero.css';

// ─── Typewriter ───────────────────────────────────────────────────────────────
// Cursor blink is pure CSS now (no JS setInterval → no extra renders per blink)
const Typewriter = ({ words }) => {
  const [index, setIndex]       = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((v) => (v + 1) % words.length);
      return undefined;
    }

    const speed = deleting ? 55 : 95;
    const t = setTimeout(() => setSubIndex((v) => v + (deleting ? -1 : 1)), speed);
    return () => clearTimeout(t);
  }, [subIndex, index, deleting, words]);

  return (
    <span className="typewriter">
      {words[index].substring(0, subIndex)}
      {/* CSS animation handles blink – zero JS timer, zero re-renders */}
      <span className="cursor cursor--css" aria-hidden="true">|</span>
    </span>
  );
};

// ─── Stat item ────────────────────────────────────────────────────────────────
const StatItem = ({ stat, trigger }) => {
  const numeric = parseInt(stat.value, 10);
  const count   = useCountUp(numeric, 1200, trigger);
  const suffix  = stat.value.replace(String(numeric), '');

  return (
    <div className="hero__stat">
      <span className="hero__stat-value">{count}{suffix}</span>
      <span className="hero__stat-label">{stat.label}</span>
    </div>
  );
};

// ─── Floating Particles ───────────────────────────────────────────────────────
// useMemo so positions are stable across re-renders (no random drift on update)
const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left:     `${(i * 5.55) % 100}%`,           // deterministic spread
        top:      `${(i * 7.77 + 13) % 100}%`,
        delay:    `${(i * 0.33) % 6}s`,
        duration: `${6 + (i % 6)}s`,
        size:     `${2 + (i % 3)}px`,
        opacity:  0.2 + (i % 5) * 0.08,
      })),
    []
  );

  return (
    <div className="hero__particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero__particle"
          style={{
            left:              p.left,
            top:               p.top,
            animationDelay:    p.delay,
            animationDuration: p.duration,
            width:             p.size,
            height:            p.size,
            opacity:           p.opacity,
          }}
        />
      ))}
    </div>
  );
};

// ─── Grid overlay ─────────────────────────────────────────────────────────────
const GridLines = () => (
  <div className="hero__grid" aria-hidden="true">
    <div className="hero__grid-horizontal" />
    <div className="hero__grid-vertical" />
  </div>
);

// ─── Smooth scroll helper ─────────────────────────────────────────────────────
const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { ref, inView }       = useScrollAnimation(0.1);
  const [avatarError, setAvatarError] = useState(false);

  // Stable entry animation styles – only recomputed when inView flips
  const animStyle = useCallback(
    (delay, extraFrom = '') => ({
      opacity:    inView ? 1 : 0,
      transform:  inView ? 'translate3d(0,0,0)' : `translate3d(0,22px,0)${extraFrom ? ` ${extraFrom}` : ''}`,
      transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      willChange: inView ? 'auto' : 'opacity, transform',
    }),
    [inView]
  );

  return (
    <section id="hero" className="hero">
      <FloatingParticles />
      <GridLines />
      <div className="hero__glow hero__glow--blue"   aria-hidden="true" />
      <div className="hero__glow hero__glow--purple" aria-hidden="true" />

      <div className="container hero__content" ref={ref}>

        {/* ── Text column ── */}
        <div className="hero__text">
          <p className="hero__eyebrow" style={animStyle(100)}>
            <span className="hero__status-dot" />
            Available for work
          </p>

          <h1 className="hero__name" style={animStyle(200)}>
            Hi, I&apos;m <span className="hero__name-accent">Akash</span>
            <br />Adhikary
          </h1>

          <h2 className="hero__role" style={animStyle(340)}>
            <Typewriter words={personalInfo.taglines} />
          </h2>

          <p className="hero__bio" style={animStyle(480)}>
            {personalInfo.bio}
          </p>

          <div className="hero__ctas" style={animStyle(600)}>
            <button
              className="btn btn-primary hero__cta-main"
              onClick={() => scrollTo('projects')}
            >
              View Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              Contact Me
            </button>

            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
              className="btn btn-outline hero__icon-btn" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.73.084-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
              className="btn btn-outline hero__icon-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <div className="hero__location" style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1) 750ms' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {personalInfo.location}
          </div>
        </div>

        {/* ── Visual column ── */}
        <div className="hero__visual">
          <div
            className="hero__photo-wrap"
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? 'translate3d(0,0,0) scale3d(1,1,1)' : 'translate3d(36px,0,0) scale3d(0.92,0.92,1)',
              transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 280ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 280ms',
              willChange: inView ? 'auto' : 'opacity, transform',
            }}
          >
            <div className="hero__photo-ring" aria-hidden="true" />
            <div className="hero__photo-glow" aria-hidden="true" />

            {!avatarError ? (
              <img
                src={personalInfo.avatar}
                alt="Akash Adhikary"
                className="hero__photo"
                loading="eager"
                decoding="async"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="hero__photo-fallback" aria-hidden="true">AA</div>
            )}

            <div className="hero__badge">
              <span className="hero__badge-icon">📱</span>
              <div>
                <span className="hero__badge-title">Flutter Dev</span>
                <span className="hero__badge-sub">Mobile &amp; Cross-Platform</span>
              </div>
            </div>
          </div>

          <div
            className="hero__stats"
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? 'translate3d(0,0,0)' : 'translate3d(0,18px,0)',
              transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1) 520ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) 520ms',
              willChange: inView ? 'auto' : 'opacity, transform',
            }}
          >
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} trigger={inView} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        className="hero__scroll-indicator"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to about section"
      >
        <span className="hero__scroll-text">Scroll Down</span>
        <span className="hero__scroll-arrow">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </section>
  );
};

export default Hero;
