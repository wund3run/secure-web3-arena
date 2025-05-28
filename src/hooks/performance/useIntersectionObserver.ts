
import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends Element>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  triggerOnce = false
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<T>(null);

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
      {
        threshold,
        root,
        rootMargin
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, root, rootMargin, triggerOnce, hasIntersected]);

  return {
    targetRef,
    isIntersecting,
    hasIntersected
  };
}
