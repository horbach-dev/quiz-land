import { useEffect } from 'react';

import { useAppStore } from '@/shared/stores/appStore';

let count = 0;

interface IProps {
  id?: string;
}

export const LoaderController = ({ id }: IProps) => {
  const setGlobalLoader = useAppStore((state) => state.setGlobalLoader);

  useEffect(() => {
    count++;
    setGlobalLoader(true, id);
    return () => {
      count--;
      if (count === 0) {
        setGlobalLoader(false, id);
      }
    };
  }, [setGlobalLoader, id]);

  return null;
};
