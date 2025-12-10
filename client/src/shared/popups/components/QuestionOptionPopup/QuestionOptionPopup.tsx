import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { Toggle } from '@/shared/components/Toggle';
import { FieldLabel } from '@/shared/shadcn/ui/field.tsx';
import { Textarea } from '@/shared/shadcn/ui/textarea.tsx';

import styles from './QuestionOptionPopup.module.css';

interface IProps {
  close: () => void;
  registerText: any;
  isCorrect: boolean;
  setCorrect: () => void;
  optionIndex: number;
  questionIndex: number;
  fieldType: 'text' | 'image';
}

export const QuestionOptionPopup = ({
  close,
  registerText,
  isCorrect,
  setCorrect,
  optionIndex,
  fieldType,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.popup}>
      <div className={styles.header}>
        <FieldLabel htmlFor={`option-field-${optionIndex}`}>
          {t('create_page.options.title', { value: optionIndex + 1 })}
        </FieldLabel>
        <Toggle
          active={isCorrect}
          onClick={setCorrect}
          label={t('create_page.options.right')}
        />
      </div>
      {fieldType === 'text' && (
        <Textarea
          id={`answer-text-${optionIndex}`}
          placeholder={t('create_page.options.placeholder')}
          {...registerText}
        />
      )}
      <Button
        className={styles.button}
        onClick={close}
      >
        Применить
      </Button>
    </div>
  );
};
