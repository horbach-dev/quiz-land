import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import clsx from 'clsx';
import { GripVertical, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { BASE_URL } from '@/shared/constants.ts';
import { FieldError } from '@/shared/shadcn/ui/field.tsx';

import styles from './FormOptionsList.module.css';

interface IProps {
  index: number;
  isCorrect: boolean;
  removeOption: () => void;
  dragListeners: DraggableSyntheticListeners;
  onTouchDrag: (isStart: boolean) => void;
  image: string | null;
  imageError: string | null;
  loadedImg: string | null;
  text: string | null;
  textError: string | null;
}

export const FormOptionsListItem = ({
  index,
  isCorrect,
  removeOption,
  dragListeners,
  onTouchDrag,
  image,
  imageError,
  loadedImg,
  text,
  textError,
}: IProps) => {
  const { t } = useTranslation();

  const currentImage = image
    ? BASE_URL + 'uploads/temp/' + image
    : loadedImg
      ? BASE_URL + loadedImg
      : null;

  return (
    <div className={clsx(styles.item, isCorrect && styles.itemCorrect)}>
      <div className={styles.itemHeader}>
        <div className={styles.itemLabel}>
          <button
            className={styles.itemGrab}
            {...dragListeners}
            onTouchStart={() => onTouchDrag(true)}
            onTouchEnd={() => onTouchDrag(false)}
            type='button'
          >
            <GripVertical />
          </button>
          <p
            className={styles.itemTitle}
            dangerouslySetInnerHTML={{
              __html: t('create_page.options.title', {
                value: isCorrect
                  ? `${index + 1} <span>${t('create_page.options.right')}</span>`
                  : index + 1,
              }),
            }}
          />
        </div>
        <div className={styles.actions}>
          <Button
            style='icon'
            size='sm'
            onClick={removeOption}
            type='button'
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      {currentImage ? (
        <>
          <img
            className={styles.itemImage}
            src={currentImage}
            alt=''
          />
          {imageError && <FieldError>{imageError}</FieldError>}
        </>
      ) : (
        <>
          <p className={styles.itemText}>{text}</p>
          {textError && <FieldError>{textError}</FieldError>}
        </>
      )}
    </div>
  );
};
