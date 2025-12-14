import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import type { IFormData } from '@/features/create-quiz/types';

export const useFeedbackItem = (index: number, translate) => {
  const {
    control,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<IFormData>();

  const feedbackErrors = errors?.result_feedbacks?.[index];

  const fromValue = watch(`result_feedbacks.${index}.from`);
  const toValue = watch(`result_feedbacks.${index}.to`);

  console.log(fromValue, toValue);

  useEffect(() => {
    if (fromValue && toValue) {
      if (Number(fromValue) >= Number(toValue)) {
        setError(`result_feedbacks.${index}.from`, {
          message: translate('validation.result_feedbacks.from_greater_than_to'),
        });
      } else {
        clearErrors(`result_feedbacks.${index}.from`);
      }
    }
  }, [setError, clearErrors, fromValue, toValue, index, translate]);

  return { errors: feedbackErrors, control, register };
};
