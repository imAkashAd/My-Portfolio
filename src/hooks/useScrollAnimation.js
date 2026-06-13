import { useEffect, useRef, useState, useCallback } from 'react';

// ─── Shared IntersectionObserver pool ────────────────────────────────────────
// One observer per threshold instead of one per component → far fewer observers
const observerCache = new Map();

function getObserver(threshold, callback) {
  const key = String(threshold);
  if (!observerCache.has(key)) {
    const callbacks = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cb = callbacks.get(entry.target);
          if (cb) cb(entry);
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    observerCache.set(key, { observer, callbacks });
  }
  const { observer, callbacks } = observerCache.get(key);
  return { observer, callbacks };
}

// ─── useScrollAnimation ───────────────────────────────────────────────────────
export const useScrollAnimation = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { observer, callbacks } = getObserver(threshold, null);

    const handleEntry = (entry) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
        callbacks.delete(entry.target);
      }
    };

    callbacks.set(element, handleEntry);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      callbacks.delete(element);
    };
  }, [threshold]);

  return { ref, inView };
};

// ─── useActiveSection ────────────────────────────────────────────────────────
// Uses a single observer with rootMargin to fire when section hits ~20% from top
export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'hero');
  // stable ref so the effect deps don't change every render
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-20% 0px -75% 0px', // fires when section enters top 25% band
      }
    );

    const elements = idsRef.current
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []); // empty deps: sections don't change, observer is stable

  return activeSection;
};

// ─── useCountUp ───────────────────────────────────────────────────────────────
// Pure rAF loop, cubic-ease-out, cancels cleanly on unmount / re-trigger
export const useCountUp = (target, duration = 1200, trigger = true) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    // Cancel any running animation before starting a new one
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const numericTarget = Number.parseInt(target, 10);
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // cubic ease-out: fast start, gentle finish – looks great at high refresh rates
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(numericTarget); // ensure exact final value
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, trigger]);

  return count;
};

// ─── useScrollY ──────────────────────────────────────────────────────────────
// Single rAF-throttled scroll tracker – use this instead of raw scroll listeners
export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);
  const latestY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      latestY.current = window.scrollY;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(latestY.current);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return scrollY;
};
