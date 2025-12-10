import type { TFunction } from 'i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types.ts';

interface IProps {
  translate: TFunction<'translation', undefined>;
}

export const useQuestionsList = ({ translate }: IProps) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<IFormData>();

  // const fieldType = useWatch({ name: 'options.' })

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
        loadedImg: null,
        field: 'text',
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
    error: errors.questions?.root?.message,
    isSubmitting,
  };
};
