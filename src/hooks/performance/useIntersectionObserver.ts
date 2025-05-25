
import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<T>(null);

  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIsIntersecting(isCurrentlyIntersecting);
        
        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
        
        if (triggerOnce && isCurrentlyIntersecting) {
          observer.unobserve(target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, triggerOnce, hasIntersected]);

  return {
    targetRef,
    isIntersecting,
    hasIntersected
  };
}
