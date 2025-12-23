import { useForm } from 'react-hook-form';

import { getDefaultValues } from '@/features/create-quiz/utils.ts';
import type { TQuiz } from '@/shared/types/quiz';
import { navigateTo } from '@/shared/utils/navigateTo';

import { useCreateQuizMutation } from '../services/useCreateQuizMutation';
import { useUpdateQuizMutation } from '../services/useUpdateQuizMutation';
import type { IFormData } from '../types';

export const useCreateQuizForm = (data?: TQuiz, isEdit?: boolean) => {
  const { mutateAsync: create } = useCreateQuizMutation();
  const { mutateAsync: update } = useUpdateQuizMutation(data?.id as string);
  const formMethods = useForm<IFormData>({
    reValidateMode: 'onChange',
    mode: 'onBlur',
    defaultValues: data ? getDefaultValues(data) : {},
  });

  const onSubmit = async (data: IFormData) => {
    try {
      if (isEdit) {
        const response = await update(data);
        navigateTo(`/quiz/${response.id}`);
        return;
      }

      const response = await create(data);
      navigateTo(`/quiz/${response.id}`);
    } catch (error) {
      console.error('Ошибка создания / обновления теста', error);
    }
  };

  return {
    ...formMethods,
    onSubmit: formMethods.handleSubmit(onSubmit),
  };
};
