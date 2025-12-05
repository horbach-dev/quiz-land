import { useRef, useState } from 'react';

import { deleteQuizImage } from '@/features/create-quiz/api/delete-quiz-image';
import { uploadQuizImage } from '@/features/create-quiz/api/upload-quiz-image';
import { UploadImageInput } from '@/shared/components/UploadImageInput';

import styles from './upload-image.module.css';

const ONE_MEGABIT = 1048576;
const ACCEPTED_FILES = ['image/png', 'image/jpeg', 'image/jpg'];

const checkValidate = (file: File) => {
  if (file.size > ONE_MEGABIT) return 'Размер файла не должен превышать 1МБ';
  if (!ACCEPTED_FILES.includes(file.type))
    return 'Разрешены только файлы: PNG, JPEG';
  return false;
};

interface IProps {
  id: string;
  type: string;
  onChange: (value: string | null) => void;
  clearError: () => void;
  setError: (error: string) => void;
}

export const UploadImage = ({
  id,
  type = 'poster',
  onChange,
  clearError,
  setError,
}: IProps) => {
  const abortController = useRef<AbortController>(null);
  const [loadedImage, setLoadedImage] = useState<string | null>(null);

  const handleUploadImage = (
    file: File,
    {
      onLoaded,
      onProgress,
    }: {
      onProgress: (v: number) => void;
      onLoaded: () => void;
    },
  ) => {
    clearError();

    const validationFailed = checkValidate(file);
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
            setError('Ошибка загрузки, пожалуйста, повторите позже');
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
    setError('Обязательное поле');
    setLoadedImage(null);

    if (abortController.current) return abortController.current.abort();
    if (loadedImage) deleteQuizImage(loadedImage);
  };

  return (
    <div className={styles.content}>
      <UploadImageInput
        id={id}
        onDelete={handleDeleteImage}
        onChange={handleUploadImage}
      />
    </div>
  );
};
