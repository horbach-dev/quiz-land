import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UploadImage } from '@/features/create-quiz/components/UploadImage';
import { Button } from '@/shared/components/Button';
import { Toggle } from '@/shared/components/Toggle';
import { FieldError, FieldLabel } from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea';
import type { TQuizQuestionField } from '@/shared/types/quiz';

import styles from './QuestionOptionPopup.module.css';

interface IProps {
  close: () => void;
  registerText: any;
  isCorrect: boolean;
  setCorrect: (v: boolean) => void;
  setImageValue: (v: string | null) => void;
  optionIndex: number;
  questionIndex: number;
  fieldType: TQuizQuestionField;
}

export const QuestionOptionPopup = ({
  close,
  fieldType,
  optionIndex,
  registerText,
  isCorrect: defaultIsCorrect,
  setCorrect,
  setImageValue,
}: IProps) => {
  const { t } = useTranslation();
  const [isCorrect, setIsCorrect] = useState(defaultIsCorrect);
  const [imageError, setImageError] = useState<string | null>(null);

  return (
    <div className={styles.popup}>
      <div className={styles.header}>
        <FieldLabel htmlFor={`option-field-${optionIndex}`}>
          {t('create_page.options.title', { value: optionIndex + 1 })}
        </FieldLabel>
        <Toggle
          active={isCorrect}
          onClick={() => {
            setIsCorrect((prev) => {
              setCorrect(!prev);
              return !prev;
            });
          }}
          label={t('create_page.options.right')}
        />
      </div>
      {fieldType === 'TEXT' && (
        <Textarea
          id={`option-field-${optionIndex}`}
          placeholder={t('create_page.options.placeholder')}
          {...registerText}
        />
      )}
      {fieldType === 'IMAGE' && (
        <UploadImage
          id={`option-field-${optionIndex}`}
          type='question'
          clearError={() => setImageError(null)}
          setError={(message) => setImageError(message)}
          onChange={setImageValue}
        />
      )}
      {imageError && <FieldError>{imageError}</FieldError>}
      <Button
        type='button'
        className={styles.button}
        onClick={close}
      >
        Применить
      </Button>
    </div>
  );
};
