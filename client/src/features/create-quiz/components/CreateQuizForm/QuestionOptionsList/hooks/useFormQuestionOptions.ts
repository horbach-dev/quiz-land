import { useFieldArray, useFormContext } from 'react-hook-form';

import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types';
import { useAppStore } from '@/shared/stores/appStore';
import { usePopupStore } from '@/shared/stores/popupStore';

export const useFormQuestionOptions = (questionIndex: number, translation: any) => {
  const openPopup = usePopupStore((s) => s.openPopup);
  const setSwipeCallback = useAppStore((s) => s.setSwipeRedirectCallback);

  const {
    control,
    register,
    setValue,
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

    editOption(optionFields.length);
  };

  const setCorrectOption = (selectedIndex: number) => {
    optionFields.forEach((_, index) => {
      setValue(`questions.${questionIndex}.options.${index}.isCorrect`, false, {
        shouldDirty: true,
      });
    });

    setValue(`questions.${questionIndex}.options.${selectedIndex}.isCorrect`, true, {
      shouldDirty: true,
    });
  };

  const editOption = (optionIndex: number) => {
    openPopup('questionOptionPopup', {
      isCorrect: true,
      setCorrect: () => setCorrectOption(optionIndex),
      questionIndex,
      optionIndex,
      registerText: register(
        `questions.${questionIndex}.options.${optionIndex}.text`,
        validationRules(translation).option,
      ),
      fieldType: 'text',
    });
  };

  const handleTouchDrag = (isStart: boolean) => {
    setSwipeCallback(isStart ? null : 'default');
  };

  return {
    control,
    register,
    optionFields,
    setCorrectOption,
    handleTouchDrag,
    errors: errors?.questions?.[questionIndex],
    addOption,
    removeOption,
    moveOptions,
    editOption,
  };
};
