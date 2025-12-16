import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UploadImage } from '@/features/create-quiz/components/UploadImage';
import { Button } from '@/shared/components/Button';
import { InputNumber } from '@/shared/components/InputNumber';
import { Select } from '@/shared/components/Select';
import { Toggle } from '@/shared/components/Toggle';
import { FieldError, FieldLabel } from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea';
import type { TQuizQuestionField, TQuizScoringAlgorithm } from '@/shared/types/quiz';

import styles from './QuestionOptionPopup.module.css';

interface IProps {
  close: () => void;
  registerText: any;
  registerWeight: any;
  isCorrect: boolean;
  setCorrect: (v: boolean) => void;
  setImageValue: (v: string | null) => void;
  optionIndex: number;
  questionIndex: number;
  scoringAlgorithm: TQuizScoringAlgorithm;
  fieldType: TQuizQuestionField;
  categories?: { text: string }[];
  category?: string | null;
  setCategory: (v: string) => void;
}

export const QuestionOptionPopup = ({
  close,
  fieldType,
  optionIndex,
  registerText,
  registerWeight,
  scoringAlgorithm = 'STRICT_MATCH',
  isCorrect: defaultIsCorrect,
  setCorrect,
  setImageValue,
  category: defaultCategory,
  categories,
  setCategory,
}: IProps) => {
  const { t } = useTranslation();
  const [isCorrect, setIsCorrect] = useState(defaultIsCorrect);
  const [category, setCategoryValue] = useState(defaultCategory);
  const [imageError, setImageError] = useState<string | null>(null);

  return (
    <div className={styles.popup}>
      <div className={styles.header}>
        <FieldLabel
          className={styles.label}
          htmlFor={`option-field-${optionIndex}`}
        >
          {t('create_page.options.title', { value: optionIndex + 1 })}
        </FieldLabel>

        {scoringAlgorithm === 'WEIGHTED_SCALE' && (
          <div className={styles.weight}>
            <span>Балл</span>
            <InputNumber
              max={100}
              inputProps={{ ...registerWeight }}
            />
          </div>
        )}

        {scoringAlgorithm === 'STRICT_MATCH' && (
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
        )}

        {scoringAlgorithm === 'PERSONALITY_TEST' && categories && (
          <Select
            value={category as string}
            onChange={(value) => {
              setCategory(value);
              setCategoryValue(value);
            }}
            options={categories?.map((category) => ({
              label: category.text,
              value: category.text,
            }))}
          />
        )}
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
