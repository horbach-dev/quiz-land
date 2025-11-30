import { useEffect, useRef, useState } from "react";

type IntersectionOptions = {
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
};

export function useIntersectionObserver(
  options: IntersectionOptions = {
    threshold: 0.1,
  }
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => setIsIntersecting(entries[0]?.isIntersecting ?? false),
      options
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
}
