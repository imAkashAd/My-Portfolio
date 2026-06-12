export const fadeInUp = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(30px)',
  transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
});

export const fadeInLeft = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateX(0)' : 'translateX(-40px)',
  transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
});

export const fadeInRight = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateX(0)' : 'translateX(40px)',
  transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
});

export const scaleIn = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'scale(1)' : 'scale(0.85)',
  transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
});

export const staggerDelay = (index, baseDelay = 0, step = 100) => baseDelay + index * step;

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);