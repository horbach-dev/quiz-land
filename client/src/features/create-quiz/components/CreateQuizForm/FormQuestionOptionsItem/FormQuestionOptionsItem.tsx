import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { validationRules } from '@/features/create-quiz/config';
import { Button } from '@/shared/components/Button';
import { Toggle } from '@/shared/components/Toggle';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/shadcn/ui/field.tsx';
import { Textarea } from '@/shared/shadcn/ui/textarea';

import styles from './FormQuestionOptionsItem.module.css';

export const FormQuestionOptionsItem = ({
  index,
  register,
  questionIndex,
  remove,
  answerErrors,
  isCorrect,
  setCorrectOption,
}) => {
  const { t } = useTranslation();

  console.log(answerErrors);

  return (
    <Field className={styles.container}>
      <div className={styles.header}>
        <FieldLabel htmlFor={`answer-text-${index}`}>
          {t('create_page.options.title', { value: index + 1 })}
        </FieldLabel>
        <Toggle
          active={isCorrect}
          onClick={() => setCorrectOption(index)}
          label={t('create_page.options.right')}
        />
        <Button
          style='icon'
          size='sm'
          onClick={remove}
        >
          <Trash2 />
        </Button>
      </div>
      <Textarea
        id={`answer-text-${index}`}
        multiple={true}
        placeholder={t('create_page.options.placeholder')}
        {...register(
          `questions.${questionIndex}.options.${index}.text`,
          validationRules(t).option,
        )}
      />

      {answerErrors?.text?.message ? (
        <FieldError>{answerErrors?.text?.message}</FieldError>
      ) : (
        <FieldDescription>
          {t('validation.min_length', { value: 1 })}
        </FieldDescription>
      )}
    </Field>
  );
};
