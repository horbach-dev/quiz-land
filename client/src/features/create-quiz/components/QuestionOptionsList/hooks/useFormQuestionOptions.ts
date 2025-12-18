import { useFieldArray, useFormContext } from 'react-hook-form';

import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types';
import { useAppStore } from '@/shared/stores/appStore';

export const useFormQuestionOptions = ({ questionIndex, translate }) => {
  const setSwipeCallback = useAppStore((s) => s.setSwipeRedirectCallback);

  const {
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<IFormData>();

  const getOptionValue = (i: number) => getValues(`questions.${questionIndex}.options.${i}`);

  const { remove, fields, append, move } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
    rules: validationRules(translate).options,
  });

  const editOption = (optionIndex: number) => {
    setValue('optionPopup', { isOpen: true, questionIndex, optionIndex });
  };

  const addOption = () => {
    const algorithm = getValues('scoringAlgorithm');
    const category =
      algorithm === 'PERSONALITY_TEST' ? getValues('questionCategories')?.[0]?.id : null;

    append(
      {
        text: '',
        image: null,
        category,
        weight: algorithm === 'WEIGHTED_SCALE' ? 0 : null,
        loadedImg: null,
        isCorrect: !fields.length,
      },
      { shouldFocus: false },
    );

    editOption(fields.length);
  };

  const removeOption = (optionIndex: number) => {
    remove(optionIndex);

    if (fields.length > 1 && getOptionValue(optionIndex)?.isCorrect) {
      setValue(`questions.${questionIndex}.options.0.isCorrect`, true, {
        shouldDirty: true,
      });
    }
  };

  const handleTouchDrag = (isStart: boolean) => {
    setSwipeCallback(isStart ? null : 'default');
  };

  return {
    control,
    register,
    fields,
    handleTouchDrag,
    addOption,
    removeOption,
    move,
    editOption,
    errors: errors?.questions?.[questionIndex],
  };
};
