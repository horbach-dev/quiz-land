import { FilePlusCorner } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types.ts';
import { Button } from '@/shared/components/Button';
import { FieldError } from '@/shared/shadcn/ui/field.tsx';

export const QuestionsListFooter = ({ onClick }) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<IFormData>();

  const questions = useWatch({ control, name: 'questions' });
  const algorithm = useWatch({ control, name: 'scoringAlgorithm' });
  const categories = useWatch({ control, name: 'questionCategories' });

  // Если тип теста персональный и категорий меньше 2-ух - дизейблим кнопку
  const categoriesCount = categories?.filter((c) => c.text?.trim()).length ?? 0;
  const isDisabledByCategory = algorithm === 'PERSONALITY_TEST' && categoriesCount < 2;

  // Если есть последний вопрос и в нем не заполнены поля - дизейблим кнопку
  const lastQ = questions?.[questions.length - 1];
  const isDisabledByIncomplete =
    !!lastQ && (!lastQ?.text || (lastQ?.options?.length || 0) < 2);

  return (
    <>
      <Button
        disabled={isDisabledByIncomplete || isSubmitting || isDisabledByCategory}
        type='button'
        onClick={onClick}
        after={<FilePlusCorner />}
      >
        {/*Добавить вопрос*/}
        {t('create_page.questions.add_question')}
      </Button>

      {isDisabledByCategory && (
        <FieldError className='text-center'>Добавьте минимум 2 категории выше</FieldError>
      )}

      {isDisabledByIncomplete && (
        <FieldError className='text-center'>
          Что-бы добавить следующий, заполните текущий
        </FieldError>
      )}

      {errors?.questions?.root?.message && (
        <FieldError className='text-center'>{errors?.questions?.root?.message}</FieldError>
      )}
    </>
  );
};
