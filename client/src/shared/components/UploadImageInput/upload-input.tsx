import { Images, Trash2 } from 'lucide-react';
import { type ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './upload-input.module.css';

interface IProps {
  id?: string;
  name?: string;
  loadedImage: string | null;
  onDelete?: () => void;
  onChange: (
    file: File,
    options: {
      onProgress: (value: number) => void;
      onLoaded: () => void;
    },
  ) => void;
}

export const UploadImageInput = ({ id, loadedImage, name, onDelete, onChange }: IProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [progress, setProgress] = useState<number | null>(0);

  const handleDelete = () => {
    if (inputRef.current?.value) inputRef.current.value = '';
    setImage(null);
    setProgress(0);
    onDelete?.();
  };

  const onLoaded = () => {
    setProgress(0);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProgress(0);
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = function (e) {
        if (e.target?.result) setImage(e.target.result);
      };

      reader.readAsDataURL(file);
      onChange(file, { onProgress: setProgress, onLoaded });
    }
  };

  const currentImg = image || loadedImage ? buildUrl(loadedImage as string) : null;

  return (
    <div className={styles.uploadInput}>
      <div className={styles.uploadInputContent}>
        <input
          id={id}
          type='file'
          name={name}
          disabled={!!currentImg}
          ref={inputRef}
          onChange={handleChange}
          accept='image/png, image/jpeg, image/jpg'
        />

        <div className={styles.uploadInputPreview}>
          <Images className={styles.uploadInputIcon} />
          <p>{t('shared.load_image')}</p>
        </div>

        {currentImg && (
          <img
            className={styles.uploadInputImage}
            src={currentImg as string}
            alt={name}
          />
        )}

        {!!progress && (
          <div className={styles.uploadInputProgress}>
            <p>Загрузка {progress} %</p>
            <span style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {currentImg && (
        <Button
          size='sm'
          after={<Trash2 />}
          className={styles.uploadInputDelete}
          onClick={handleDelete}
        >
          {t('shared.delete_image')}
        </Button>
      )}
    </div>
  );
};
