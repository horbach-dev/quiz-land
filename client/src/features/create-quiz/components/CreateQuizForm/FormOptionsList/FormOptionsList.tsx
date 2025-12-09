import clsx from 'clsx';
import { GripVertical, Trash2 } from 'lucide-react';
import type {
  FieldArrayWithId,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types.ts';
import { Button } from '@/shared/components/Button';
import { DragAndDrop } from '@/shared/components/DragAndDrop';
import { FieldError } from '@/shared/shadcn/ui/field.tsx';
import { useAppStore } from '@/shared/stores/appStore';

import styles from './FormOptionsList.module.css';

interface IProps {
  options: FieldArrayWithId<IFormData, `questions.${number}.options`, 'id'>[];
  errors: any[];
  questionIndex: number;
  moveOptions: UseFieldArrayMove;
  removeOption: UseFieldArrayRemove;
  watch: UseFormWatch<IFormData>;
}

export const FormOptionsList = ({
  watch,
  options,
  removeOption,
  questionIndex,
  moveOptions,
  errors,
}: IProps) => {
  const { t } = useTranslation();
  const setSwipeCallback = useAppStore((s) => s.setSwipeRedirectCallback);
  const optionsForQuestion = watch(`questions.${questionIndex}.options`);

  const handleTouchDrag = (isStart: boolean) => {
    setSwipeCallback(isStart ? null : 'default');
  };

  return (
    <div className={styles.container}>
      <DragAndDrop
        items={options}
        move={moveOptions}
        render={({ item, index, listeners }) => {
          const isCorrect = optionsForQuestion[index].isCorrect;
          return (
            <div
              key={item.id}
              className={clsx(styles.item, isCorrect && styles.itemCorrect)}
            >
              <div className={styles.itemHeader}>
                <div className={styles.itemLabel}>
                  <button
                    className={styles.itemGrab}
                    {...listeners}
                    onTouchStart={() => handleTouchDrag(true)}
                    onTouchEnd={() => handleTouchDrag(false)}
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
                    onClick={() => removeOption(index)}
                    type='button'
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
              <p className={styles.itemText}>
                {optionsForQuestion[index].text}
              </p>
              {errors?.[index]?.text?.message && (
                <FieldError>{errors?.[index]?.text?.message}</FieldError>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
