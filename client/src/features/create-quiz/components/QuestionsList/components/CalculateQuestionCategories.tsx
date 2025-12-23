import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { IFormData } from '@/features/create-quiz/types';

export const CalculateQuestionCategories = () => {
  const { control, setValue } = useFormContext<IFormData>();
  const questions = useWatch({ control, name: 'questions' });

  const categoriesCounts = useMemo(() => {
    const acc = {};

    questions?.forEach((question) => {
      question?.options?.forEach((option) => {
        const catId = option?.category;
        if (catId) {
          acc[catId] = (acc[catId] || 0) + 1;
        }
      });
    });

    return acc as Record<string, number>;
  }, [questions]);

  useEffect(() => {
    if (Object.keys(categoriesCounts).length > 0) {
      setValue('categoriesCounts', categoriesCounts);
    }
  }, [categoriesCounts, setValue]);

  return null;
};
