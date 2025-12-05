import { type ReactNode, useEffect } from 'react';
import { useIntersectionObserver } from '@/shared/hooks/useInterserctionObserver';

interface IProps {
  children?: ReactNode;
  onVisible: () => void;
}

export const IntersectingWrapper = ({ children, onVisible }: IProps) => {
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) onVisible();
  }, [isIntersecting, onVisible]);

  return <div ref={ref}>{children}</div>;
};
