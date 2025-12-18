import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import clsx from 'clsx';
import { GripVertical, SquarePen, Trash2 } from 'lucide-react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { FieldError } from '@/shared/shadcn/ui/field';
import type { TQuizQuestionField, TQuizScoringAlgorithm } from '@/shared/types/quiz';

import styles from './QuestionOptionsListItem.module.css';
import { getCurrentImage } from './utils';

interface IProps {
  index: number;
  questionIndex: number;
  editOption: () => void;
  removeOption: () => void;
  dragListeners: DraggableSyntheticListeners;
  onTouchDrag: (isStart: boolean) => void;
  textError?: string | null;
  imageError?: string | null;
  scoringAlgorithm: TQuizScoringAlgorithm;
  fieldType: TQuizQuestionField;
  questionCategories?: { text: string; id: string }[];
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
  fieldType,
  questionCategories,
  scoringAlgorithm,
}: IProps) => {
  const { t } = useTranslation();
  const value = useWatch({ name: `questions.${questionIndex}.options.${index}` });
  const currentImage = getCurrentImage(value.image, value.loadedImg);

  const category = questionCategories?.length
    ? questionCategories.find((v) => v.id === value?.category)
    : null;

  return (
    <div
      className={clsx(
        styles.item,
        scoringAlgorithm === 'STRICT_MATCH' && styles.itemStrict,
        scoringAlgorithm === 'STRICT_MATCH' && value.isCorrect && styles.itemCorrect,
      )}
    >
      <div className={styles.itemHeader}>
        <div className={styles.itemHeaderText}>
          <button
            className={styles.itemGrab}
            {...dragListeners}
            onTouchStart={() => onTouchDrag(true)}
            onTouchEnd={() => onTouchDrag(false)}
            type='button'
          >
            <GripVertical />
          </button>

          <p className={styles.itemNumber}>{index + 1}</p>

          {scoringAlgorithm === 'STRICT_MATCH' && value.isCorrect && (
            <span className={styles.itemRight}>{t('create_page.options.right')}</span>
          )}

          {scoringAlgorithm === 'WEIGHTED_SCALE' && (
            <p className={styles.itemLabel}>Балл: {value.weight}</p>
          )}

          {scoringAlgorithm === 'PERSONALITY_TEST' && category && (
            <p className={styles.itemLabel}>{category.text}</p>
          )}
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
      {fieldType === 'IMAGE' && currentImage ? (
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
