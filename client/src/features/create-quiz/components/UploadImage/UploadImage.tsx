import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { deleteQuizImage } from '@/features/create-quiz/api/delete-quiz-image';
import { uploadQuizImage } from '@/features/create-quiz/api/upload-quiz-image';
import { UploadImageInput } from '@/shared/components/UploadImageInput';

import styles from './upload-image.module.css';

const ONE_MEGABIT = 1048576;
const ACCEPTED_FILES = ['image/png', 'image/jpeg', 'image/jpg'];

const checkValidate = (file: File, t) => {
  if (file.size > ONE_MEGABIT) return t('errors.image.size', { value: 1 });
  if (!ACCEPTED_FILES.includes(file.type)) return t('errors.image.format');
  return false;
};

interface IProps {
  id: string;
  type: string;
  loadedImg?: string | null;
  onChange: (value: string | null) => void;
  clearError: () => void;
  setError: (error: string) => void;
}

export const UploadImage = ({
  id,
  type = 'poster',
  onChange,
  loadedImg,
  clearError,
  setError,
}: IProps) => {
  const { t } = useTranslation();
  const abortController = useRef<AbortController>(null);
  const [loadedImage, setLoadedImage] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (loadedImg) setLoadedImage(loadedImg);
  }, [loadedImg]);

  const handleUploadImage = (file: File, { onLoaded, onProgress }) => {
    clearError();

    const validationFailed = checkValidate(file, t);
    if (validationFailed) {
      setError(validationFailed);
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      abortController.current = new AbortController();
      const signal = abortController.current.signal;

      uploadQuizImage(formData, { signal, onProgress })
        .then((result) => {
          onChange(result.fileName);
          setLoadedImage(result.tempPath);
        })
        .catch((err) => {
          if (err.response?.data?.message) {
            setError(err.response?.data?.message);
          } else {
            setError(t('errors.image.load'));
          }
        })
        .finally(() => {
          onLoaded();
          abortController.current = null;
        });
    }
  };

  const handleDeleteImage = async () => {
    onChange(null);
    setError(t('validation.required'));
    setLoadedImage(null);

    if (abortController.current) return abortController.current.abort();
    if (loadedImage) deleteQuizImage(loadedImage);
  };

  return (
    <div className={styles.content}>
      <UploadImageInput
        id={id}
        loadedImage={loadedImage}
        onDelete={handleDeleteImage}
        onChange={handleUploadImage}
      />
    </div>
  );
};
