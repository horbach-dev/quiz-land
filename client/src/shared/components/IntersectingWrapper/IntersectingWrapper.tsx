import { type ReactNode, useEffect } from 'react';

import { useIntersectionObserver } from '@/shared/hooks/useInterserctionObserver';

type IntersectionOptions = {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
};

interface IProps {
  children?: ReactNode;
  onVisible: () => void;
  options?: IntersectionOptions;
}

export const IntersectingWrapper = ({ children, options, onVisible }: IProps) => {
  const { ref, isIntersecting } = useIntersectionObserver(options);

  useEffect(() => {
    if (isIntersecting) onVisible();
  }, [isIntersecting, onVisible]);

  return <div ref={ref}>{children}</div>;
};
