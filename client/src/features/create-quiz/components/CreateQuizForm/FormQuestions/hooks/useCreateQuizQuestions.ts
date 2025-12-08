import type { TFunction } from 'i18next';
import { type Control, useFieldArray } from 'react-hook-form';

import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types.ts';

interface IProps {
  translate: TFunction<'translation', undefined>;
  control: Control<IFormData>;
}

export const useCreateQuizQuestions = ({ control, translate }: IProps) => {
  const {
    fields,
    append,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
    rules: validationRules(translate).questions,
  });

  const addQuestion = () => {
    append(
      {
        text: '',
        image: null,
        options: [],
        type: 'SINGLE_CHOICE',
        order: fields?.length || 0,
      },
      { shouldFocus: false },
    );
  };

  return {
    addQuestion,
    removeQuestion,
    fields,
  };
};
