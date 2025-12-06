import { FilePlusCorner } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  type UseFieldArrayRemove,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { FieldDescription, FieldError, FieldLegend, FieldSet } from '@/shared/shadcn/ui/field';

import type { IFormData } from '../../types';

type TRenderItemParams = {
  field: FieldArrayWithId<IFormData, 'questions', 'id'>;
  index: number;
  remove: UseFieldArrayRemove;
};

interface IProps {
  error?: string;
  control: Control<IFormData>;
  isLoading: boolean;
  renderItem: (params: TRenderItemParams) => ReactNode;
}

export const CreateQuizQuestions = ({ error, control, renderItem, isLoading }: IProps) => {
  const { t } = useTranslation();

  const {
    fields: questionFields,
    append: questionAppend,
    remove,
  } = useFieldArray({
    control,
    name: 'questions',
    rules: { required: 'Нельзя создавать квизы без вопросов' },
  });

  const handleAddQuestion = () => {
    questionAppend(
      {
        text: '',
        image: null,
        options: [{ text: '', image: null, isCorrect: true }],
        type: 'SINGLE_CHOICE',
        order: questionFields?.length || 0,
      },
      { shouldFocus: false },
    );
  };

  return (
    <FieldSet className='mb-5'>
      <FieldLegend>Вопросы к квизу</FieldLegend>

      <FieldDescription>{t('create_page.description')}</FieldDescription>

      {questionFields.map((field, index) =>
        renderItem({ field, index, remove: () => remove(index) }),
      )}

      {error && <FieldError>{error}</FieldError>}

      <Button
        disabled={isLoading}
        type='button'
        onClick={handleAddQuestion}
        after={<FilePlusCorner />}
      >
        Добавить вопрос
      </Button>
    </FieldSet>
  );
};
