import { useFormContext } from 'react-hook-form';

import type { IFormData } from '@/features/create-quiz/types';

export const useFeedbackItem = (index: number, translate) => {
  const {
    control,
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<IFormData>();

  const feedbackErrors = errors?.results?.[index];

  // TODO Исправить костыль, когда появиться норм валидация
  const handleChangeInput = () => {
    setTimeout(() => {
      const values = getValues(`results.${index}`);
      if (!values) return;

      if (Number(values.from) > Number(values.to) && !feedbackErrors?.from) {
        setError(`results.${index}.from`, {
          message: translate('validation.result_feedbacks.from_greater_than_to'),
        });
      }

      if (Number(values.from) <= Number(values.to) && feedbackErrors?.from) {
        clearErrors(`results.${index}.from`);
      }
    }, 0);
  };

  return { errors: feedbackErrors, control, register, handleChangeInput };
};
