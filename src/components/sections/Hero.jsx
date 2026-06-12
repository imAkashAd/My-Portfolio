import React, { useEffect, useState } from "react";
import { personalInfo, stats } from "../../data/portfolioData";
import { useScrollAnimation, useCountUp } from "../../hooks/useScrollAnimation";
import "./Hero.css";

const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink((value) => !value), 530);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      const timer = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(timer);
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((value) => (value + 1) % words.length);
      return undefined;
    }

    const speed = deleting ? 60 : 100;
    const timer = setTimeout(() => {
      setSubIndex((value) => value + (deleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [subIndex, index, deleting, words]);

  return (
    <span className="typewriter">
      {words[index].substring(0, subIndex)}
      <span className={`cursor ${blink ? "cursor--visible" : ""}`}>|</span>
    </span>
  );
};

const StatItem = ({ stat, trigger }) => {
  const numeric = Number.parseInt(stat.value, 10);
  const count = useCountUp(numeric, 1400, trigger);
  const suffix = stat.value.replace(numeric.toString(), "");

  return (
    <div className="hero__stat">
      <span className="hero__stat-value">
        {count}
        {suffix}
      </span>
      <span className="hero__stat-label">{stat.label}</span>
    </div>
  );
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 18 }, (_, index) => index);

  return (
    <div className="hero__particles" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle}
          className="hero__particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            opacity: 0.2 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
};

const GridLines = () => (
  <div className="hero__grid" aria-hidden="true">
    <div className="hero__grid-horizontal" />
    <div className="hero__grid-vertical" />
  </div>
);

const Hero = () => {
  const { ref, inView } = useScrollAnimation(0.1);
  const [avatarLoaded, setAvatarLoaded] = useState(true);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero">
      <FloatingParticles />
      <GridLines />
      <div className="hero__glow hero__glow--blue" aria-hidden="true" />
      <div className="hero__glow hero__glow--purple" aria-hidden="true" />

      <div className="container hero__content" ref={ref}>
        <div className="hero__text">
          <p
            className="hero__eyebrow"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            }}
          >
            <span className="hero__status-dot" />
            Available for work
          </p>

          <h1
            className="hero__name"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(30px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            Hi, I&apos;m <span className="hero__name-accent">Akash</span>
            <br />
            Adhikary
          </h1>

          <h2
            className="hero__role"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(25px)",
              transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
            }}
          >
            <Typewriter words={personalInfo.taglines} />
          </h2>

          <p
            className="hero__bio"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
            }}
          >
            {personalInfo.bio}
          </p>

          <div
            className="hero__ctas"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s",
            }}
          >
            <button
              className="btn btn-primary hero__cta-main"
              onClick={() => scrollTo("projects")}
            >
              View Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => scrollTo("contact")}
            >
              Contact Me
            </button>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero__icon-btn"
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.73.084-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero__icon-btn"
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <div
            className="hero__location"
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.6s ease 0.8s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {personalInfo.location}
          </div>
        </div>

        <div className="hero__visual">
          <div
            className="hero__photo-wrap"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(40px) scale(0.9)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
          >
            <div className="hero__photo-ring" aria-hidden="true" />
            <div className="hero__photo-glow" aria-hidden="true" />
            {avatarLoaded ? (
              <img
                src={personalInfo.avatar}
                alt="Akash Adhikary"
                className="hero__photo"
                loading="eager"
                onError={() => setAvatarLoaded(false)}
              />
            ) : (
              <div className="hero__photo-fallback" aria-hidden="true">
                AA
              </div>
            )}
            <div className="hero__badge">
              <span className="hero__badge-icon">📱</span>
              <div>
                <span className="hero__badge-title">Flutter Dev</span>
                <span className="hero__badge-sub">
                  Mobile &amp; Cross-Platform
                </span>
              </div>
            </div>
          </div>

          <div
            className="hero__stats"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s",
            }}
          >
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} trigger={inView} />
            ))}
          </div>
        </div>
      </div>

      <button
        className="hero__scroll-indicator"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about section"
      >
        <span className="hero__scroll-text">Scroll Down</span>
        <span className="hero__scroll-arrow">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2v10M2 7l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </section>
  );
};

export default Hero;
