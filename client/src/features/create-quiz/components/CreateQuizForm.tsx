import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';

import { QuizType } from '@/features/create-quiz/components/QuizType';
import { FieldSeparator } from '@/shared/shadcn/ui/field';
import type { TQuiz } from '@/shared/types/quiz';

import { useCreateQuizForm } from '../hooks/useCreateQuizForm';
import { FormSubmit } from './FormSubmit';
import { GeneralInfo } from './GeneralInfo';
import { QuestionOptionPopup } from './QuestionOptionPopup';
import { QuestionsList } from './QuestionsList';
import { ResultFeedbacks } from './ResultFeedbacks';
import { TimeLimit } from './TimeLimit';

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
        <FieldSeparator className='my-7' />
        <TimeLimit />
        <FieldSeparator className='my-7' />
        <QuizType />
        <FieldSeparator className='my-7' />
        <QuestionsList />
        <FieldSeparator className='my-7' />
        <ResultFeedbacks />
        <FormSubmit
          formRef={formRef}
          isDisabled={isDisabled}
          isEdit={isEdit}
          isLoading={form.formState.isSubmitting}
          onSubmit={form.onSubmit}
        />
      </form>
      <QuestionOptionPopup />
    </FormProvider>
  );
};
