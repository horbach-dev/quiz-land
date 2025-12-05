import { CircleUserRound } from 'lucide-react';
import { useState } from 'react';

import styles from './avatar.module.css';

export const Avatar = ({ image }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.avatar}>
      {(!isLoaded || !image) && <CircleUserRound />}
      {image && (
        <img
          src={image}
          alt='avatar'
          style={{ opacity: isLoaded ? 1 : 0 }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};
