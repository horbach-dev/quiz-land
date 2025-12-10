import { useFieldArray, useFormContext } from 'react-hook-form';

import { validationRules } from '@/features/create-quiz/config.ts';
import type { IFormData } from '@/features/create-quiz/types.ts';

export const useFormQuestionOptions = (questionIndex: number, translation: any) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormData>();

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
    move: moveOptions,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
    rules: validationRules(translation).options,
  });

  const addOption = () => {
    appendOption(
      {
        text: '',
        image: null,
        loadedImg: null,
        isCorrect: !optionFields.length,
      },
      { shouldFocus: false },
    );
  };

  return {
    optionFields,
    errors: errors?.questions?.[questionIndex],
    addOption,
    removeOption,
    moveOptions,
  };
};
