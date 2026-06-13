// ─── Easing constants ─────────────────────────────────────────────────────────
// These cubic-bezier curves feel natural at both 60Hz and 144Hz.
// Avoid plain "ease" / "ease-in-out" – they're defined at 60Hz cadence.
const EASE_OUT_QUART = 'cubic-bezier(0.25, 1, 0.5, 1)';
const EASE_OUT_EXPO  = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_OUT_BACK  = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // subtle overshoot

// ─── Core animation factories ─────────────────────────────────────────────────
// All transforms use translate3d / scale3d to guarantee compositor-thread
// execution (no layout or paint involvement).

export const fadeInUp = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,28px,0)',
  transition: `opacity 0.55s ${EASE_OUT_EXPO} ${delay}ms, transform 0.55s ${EASE_OUT_EXPO} ${delay}ms`,
  willChange: inView ? 'auto' : 'opacity, transform',
});

export const fadeInLeft = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translate3d(0,0,0)' : 'translate3d(-36px,0,0)',
  transition: `opacity 0.55s ${EASE_OUT_EXPO} ${delay}ms, transform 0.55s ${EASE_OUT_EXPO} ${delay}ms`,
  willChange: inView ? 'auto' : 'opacity, transform',
});

export const fadeInRight = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translate3d(0,0,0)' : 'translate3d(36px,0,0)',
  transition: `opacity 0.55s ${EASE_OUT_EXPO} ${delay}ms, transform 0.55s ${EASE_OUT_EXPO} ${delay}ms`,
  willChange: inView ? 'auto' : 'opacity, transform',
});

export const scaleIn = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'scale3d(1,1,1)' : 'scale3d(0.88,0.88,1)',
  transition: `opacity 0.45s ${EASE_OUT_BACK} ${delay}ms, transform 0.45s ${EASE_OUT_BACK} ${delay}ms`,
  willChange: inView ? 'auto' : 'opacity, transform',
});

// ─── Stagger helper ───────────────────────────────────────────────────────────
// Cap the stagger so the last item doesn't lag behind forever on large lists
export const staggerDelay = (index, baseDelay = 0, step = 80, maxDelay = 400) =>
  Math.min(baseDelay + index * step, maxDelay);

// ─── Utility ──────────────────────────────────────────────────────────────────
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
