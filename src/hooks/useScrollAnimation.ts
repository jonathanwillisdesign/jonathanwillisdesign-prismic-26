"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  once?: boolean;
  margin?: string;
  threshold?: number;
}

/**
 * Hook for scroll-triggered animations using Intersection Observer.
 * Replaces Motion's `whileInView` functionality with CSS animations.
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { once = true, margin = "-50px", threshold = 0 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already visible and once is true, don't set up observer
    if (isVisible && once) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: margin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, once, margin, threshold]);

  return { ref: elementRef, isVisible };
}
