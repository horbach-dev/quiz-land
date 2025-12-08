import { useRef } from 'react';

import { useCreateQuizForm } from '../../hooks/useCreateQuizForm';
import { FormFooter } from './FormFooter';
import { FormMain } from './FormMain';
import {
  FormQuestion,
  FormQuestionHeader,
  FormQuestionMain,
} from './FormQuestion';
import { FormQuestionOptions } from './FormQuestionOptions';
import { FormQuestions } from './FormQuestions';

export const CreateQuizForm = () => {
  const formRef = useRef(null);
  const {
    watch,
    control,
    onSubmit,
    register,
    setValue,
    clearErrors,
    errors,
    isLoading,
    setError,
  } = useCreateQuizForm();

  const isDisabled = !!Object.keys(errors).length;

  return (
    <div className='w-full max-w-md'>
      <form
        ref={formRef}
        onSubmit={onSubmit}
      >
        <FormMain
          control={control}
          register={register}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
          setValue={setValue}
        />

        <FormQuestions
          isLoading={isLoading}
          control={control}
          error={errors.questions?.root?.message}
          renderItem={({ field, remove, index }) => {
            const questionErrors = errors?.questions?.[index];
            return (
              <FormQuestion
                key={field.id}
                index={index}
                renderHeader={
                  <FormQuestionHeader
                    index={index}
                    removeQuestion={remove}
                  />
                }
                renderMain={
                  <FormQuestionMain
                    index={index}
                    register={register}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    questionErrors={questionErrors}
                  />
                }
                renderOptions={
                  <FormQuestionOptions
                    questionIndex={index}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    control={control}
                    setError={setError}
                    clearErrors={clearErrors}
                    questionErrors={questionErrors}
                  />
                }
              />
            );
          }}
        />

        <FormFooter
          formRef={formRef}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </form>
    </div>
  );
};
