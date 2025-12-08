import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import type {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types.ts';
import { Button } from '@/shared/components/Button';
import { FieldError } from '@/shared/shadcn/ui/field.tsx';

import styles from './OptionsResult.module.css';

interface IProps {
  options: FieldArrayWithId<IFormData, `questions.${number}.options`, 'id'>[];
  errors: any[];
  questionIndex: number;
  removeOption: UseFieldArrayRemove;
  watch: UseFormWatch<IFormData>;
}

export const OptionsResult = ({
  watch,
  options,
  removeOption,
  questionIndex,
  errors,
}: IProps) => {
  const { t } = useTranslation();

  const optionsForQuestion = watch(`questions.${questionIndex}.options`);

  return (
    <div className={styles.container}>
      {options.map((answer, index) => {
        const isCorrect = optionsForQuestion[index].isCorrect;
        return (
          <div
            key={answer.id}
            className={clsx(styles.item, isCorrect && styles.itemCorrect)}
          >
            <div className={styles.itemHeader}>
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
            <p className={styles.itemText}>{optionsForQuestion[index].text}</p>
            {errors?.[index]?.text?.message && (
              <FieldError>{errors?.[index]?.text?.message}</FieldError>
            )}
          </div>
        );
      })}
    </div>
  );
};
