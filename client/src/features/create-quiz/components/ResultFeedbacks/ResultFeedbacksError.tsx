import { useEffect } from 'react';
import { type UseFormClearErrors, type UseFormSetError, useWatch } from 'react-hook-form';

import type { IFormData, IFormDataResult } from '@/features/create-quiz/types';
import { FieldError } from '@/shared/shadcn/ui/field';

const validateRules = (values: IFormDataResult[]) => {
  if (values.length < 2) {
    return false;
  }

  const sortedRanges = [...values].sort((a, b) => a.from - b.from);

  for (let i = 0; i < sortedRanges.length - 1; i++) {
    const current = sortedRanges[i];
    const next = sortedRanges[i + 1];

    if (Number(current.to) > Number(next.from)) {
      return 'Присутствует пересечение диапазонов, проверьте поля процентов в результатах.';
    }
  }

  return false;
};

interface IProps {
  error?: string;
  setError: UseFormSetError<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>
}

export const ResultFeedbacksError = ({ error, setError, clearErrors }: IProps) => {
  const fields = useWatch({ name: 'result_feedbacks' });

  useEffect(() => {
    if (fields?.length > 1) {
      const message = validateRules(fields);

      console.log(message);

      if (message) {
        setError('result_feedbacks', { message });
      } else {
        clearErrors('result_feedbacks');
      }
    }
  }, [fields, setError, clearErrors]);

  if (!error) return null;

  return <FieldError>{error}</FieldError>;
};
