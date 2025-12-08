import type { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

import { navigateTo } from '@/shared/utils/navigateTo';

import { useCreateQuizMutation } from '../hooks/useCreateQuizMutation';
import type { IFormData } from '../types';

export const useCreateQuizForm = () => {
  const { isPending, isSuccess, mutateAsync } = useCreateQuizMutation();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    mutateAsync({ ...data, limitedByTime: false }).then((res) => {
      navigateTo(`/quiz/${res.id}`);
    });
  };

  const preSubmit = (data: SyntheticEvent<HTMLFormElement>) => {
    if (!getValues()?.poster) {
      setError('poster', { message: 'Обязательное поле' });
    }
    return handleSubmit(onSubmit)(data);
  };

  return {
    watch,
    control,
    setValue,
    clearErrors,
    isSuccess,
    isLoading: isPending,
    register,
    onSubmit: preSubmit,
    errors,
    setError,
  };
};
