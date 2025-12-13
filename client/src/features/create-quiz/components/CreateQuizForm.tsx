import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';

import type { TQuiz } from '@/shared/types/quiz';

import { useCreateQuizForm } from '../hooks/useCreateQuizForm';
import { FormSubmit } from './FormSubmit';
import { GeneralInfo } from './GeneralInfo';
import { QuestionsList } from './QuestionsList';

interface IProps {
  isEdit?: boolean;
  data?: TQuiz;
}

export const CreateQuizForm = ({ isEdit, data }: IProps) => {
  const formRef = useRef(null);
  const form = useCreateQuizForm(data, isEdit);
  const isDisabled = !!Object.keys(form.formState.errors).length;

  return (
    <FormProvider {...form}>
      <form
        ref={formRef}
        onSubmit={form.onSubmit}
      >
        <GeneralInfo />
        <QuestionsList />
        <FormSubmit
          formRef={formRef}
          isDisabled={isDisabled}
          isEdit={isEdit}
          isLoading={form.formState.isSubmitting}
          onSubmit={form.onSubmit}
        />
      </form>
    </FormProvider>
  );
};
