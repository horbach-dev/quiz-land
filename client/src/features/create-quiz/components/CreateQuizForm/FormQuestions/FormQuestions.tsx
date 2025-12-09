import { FilePlusCorner } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayRemove,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { FieldError, FieldSet } from '@/shared/shadcn/ui/field';

import { useCreateQuizQuestions } from './hooks/useCreateQuizQuestions.ts';

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

export const FormQuestions = ({
  error,
  control,
  renderItem,
  isLoading,
}: IProps) => {
  const { t } = useTranslation();

  const { fields, addQuestion, removeQuestion } = useCreateQuizQuestions({
    control,
    translate: t,
  });

  return (
    <FieldSet className='mb-5'>
      <SectionHeader
        title={t('create_page.questions.title')}
        description={t('create_page.questions.description')}
      />

      {fields.map((field, index) =>
        renderItem({ field, index, remove: () => removeQuestion(index) }),
      )}

      <Button
        disabled={isLoading}
        type='button'
        onClick={addQuestion}
        after={<FilePlusCorner />}
      >
        {/*Добавить вопрос*/}
        {t('create_page.questions.add_question')}
      </Button>

      {error && <FieldError className='text-center'>{error}</FieldError>}
    </FieldSet>
  );
};
