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
    getValues,
    formState: { errors },
  } = useFormContext<IFormData>();

  const getValue = (i: number) => getValues(`questions.${questionIndex}.options.${i}`);

  const {
    fields: optionFields,
    append: appendOption,
    remove,
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

  const removeOption = (optionIndex: number) => {
    remove(optionIndex);

    if (optionFields.length > 1 && getValue(optionIndex)?.isCorrect) {
      setValue(`questions.${questionIndex}.options.0.isCorrect`, true, {
        shouldDirty: true,
      });
    }
  };

  const setCorrect = (value: boolean, optionIndex: number) => {
    setValue(`questions.${questionIndex}.options.${optionIndex}.isCorrect`, value, {
      shouldDirty: true,
    });
  };

  const setImage = (value: string | null, optionIndex: number) => {
    setValue(`questions.${questionIndex}.options.${optionIndex}.image`, value, {
      shouldDirty: true,
    });
  };

  const editOption = (optionIndex: number) => {
    openPopup('questionOptionPopup', {
      isCorrect: getValue(optionIndex).isCorrect,
      questionIndex,
      optionIndex,
      fieldType: getValues(`questions.${questionIndex}.field`),
      setImageValue: (image) => setImage(image, optionIndex),
      setCorrect: (value: boolean) => setCorrect(value, optionIndex),
      registerText: register(
        `questions.${questionIndex}.options.${optionIndex}.text`,
        validationRules(translation).option,
      ),
    }).onClose(() => {
      const values = getValue(optionIndex);
      if (!values?.text && !values?.image) {
        removeOption(optionIndex);
      }
    });
  };

  const handleTouchDrag = (isStart: boolean) => {
    setSwipeCallback(isStart ? null : 'default');
  };

  return {
    control,
    register,
    optionFields,
    handleTouchDrag,
    errors: errors?.questions?.[questionIndex],
    addOption,
    removeOption,
    moveOptions,
    editOption,
  };
};
