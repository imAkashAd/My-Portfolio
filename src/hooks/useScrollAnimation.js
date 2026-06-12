import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const element = ref.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold]);

  return { ref, inView };
};

export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );

      observer.observe(element);
      observers.push({ observer, element });
    });

    return () => {
      observers.forEach(({ observer, element }) => observer.unobserve(element));
    };
  }, [sectionIds]);

  return activeSection;
};

export const useCountUp = (target, duration = 1500, trigger = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return undefined;

    let startTime = null;
    const numericTarget = Number.parseInt(target, 10);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, trigger]);

  return count;
};