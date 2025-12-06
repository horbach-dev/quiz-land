import clsx from 'clsx';
import { useState } from 'react';

import styles from './image.module.css';

interface IProps {
  className?: string;
  image?: string;
  title?: string;
  placeholder?: string;
}

export const LazyImage = ({ image, title, className, placeholder }: IProps) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(image);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={clsx(styles.container, isLoading && styles.containerLoading, className)}>
      <img
        className={clsx(styles.image, !isLoading && styles.imageLoaded)}
        src={currentImage || image}
        alt={title}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (placeholder) {
            setIsLoading(true);
            setCurrentImage(placeholder);
          } else {
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
};
