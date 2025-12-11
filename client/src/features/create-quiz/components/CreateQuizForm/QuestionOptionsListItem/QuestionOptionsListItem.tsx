import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import clsx from 'clsx';
import { GripVertical, SquarePen, Trash2 } from 'lucide-react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { FieldError } from '@/shared/shadcn/ui/field';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './QuestionOptionsListItem.module.css';

interface IProps {
  index: number;
  questionIndex: number;
  editOption: () => void;
  removeOption: () => void;
  dragListeners: DraggableSyntheticListeners;
  onTouchDrag: (isStart: boolean) => void;
  textError?: string | null;
  imageError?: string | null;
}

export const QuestionOptionsListItem = ({
  index,
  questionIndex,
  editOption,
  removeOption,
  dragListeners,
  onTouchDrag,
  imageError,
  textError,
}: IProps) => {
  const { t } = useTranslation();
  const value = useWatch({ name: `questions.${questionIndex}.options.${index}` });

  const currentImage = value.image
    ? buildUrl('uploads/temp/', value.image)
    : value.loadedImg
      ? buildUrl(value.loadedImg)
      : null;

  return (
    <div className={clsx(styles.item, value.isCorrect && styles.itemCorrect)}>
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
                value: value.isCorrect
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
            onClick={editOption}
            type='button'
          >
            <SquarePen />
          </Button>
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
          <p className={styles.itemText}>{value.text}</p>
          {textError && <FieldError>{textError}</FieldError>}
        </>
      )}
    </div>
  );
};
