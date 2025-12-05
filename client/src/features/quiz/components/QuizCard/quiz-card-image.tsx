import clsx from 'clsx';
import { useState } from 'react';

import styles from './quiz-card.module.css';

const loadedImages = new Set();

export const QuizCardImage = ({ title, image }) => {
  const [isLoading, setIsLoading] = useState(!loadedImages.has(image));

  return (
    <div className={clsx(styles.image, !isLoading && styles.imageLoaded)}>
      <img
        alt={title}
        src={image}
        loading='lazy'
        onLoad={() => {
          loadedImages.add(image);
          setIsLoading(false);
        }}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
};
