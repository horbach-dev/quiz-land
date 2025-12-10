import clsx from 'clsx';
import { useState } from 'react';

import styles from './image.module.css';

interface IProps {
  className?: string;
  image?: string;
  title?: string;
  fit?: 'content' | 'cover';
  placeholder?: string;
}

export const LazyImage = ({
  image,
  title,
  fit = 'cover',
  className,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={clsx(
        styles.container,
        styles[`container-${fit}`],
        isLoading && styles.containerLoading,
        isLoading && styles.containerLoading,
        className,
      )}
    >
      <img
        className={clsx(styles.image, !isLoading && styles.imageLoaded)}
        src={image}
        alt={title}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
