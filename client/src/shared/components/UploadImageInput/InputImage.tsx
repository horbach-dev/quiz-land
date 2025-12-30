import { useState } from 'react';

import styles from './upload-input.module.css';
import { ImageOff } from 'lucide-react';

interface IProps {
  src: string;
}

export const InputImage = ({ src }: IProps) => {
  const [error, setError] = useState<string>('');

  if (error)
    return (
      <div className={styles.uploadInputImageError}>
        <ImageOff />
        <p>
          Похоже такого изображения больше нет на сервере. <br /> Удалите и загрузите
          заново.
        </p>
      </div>
    );

  return (
    <img
      className={styles.uploadInputImage}
      src={src}
      onError={() => setError('error')}
      alt='uploaded image'
    />
  );
};
