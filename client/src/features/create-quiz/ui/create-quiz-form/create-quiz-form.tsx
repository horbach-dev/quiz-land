import { useRef } from 'react';

import { useCreateQuizForm } from '@/features/create-quiz/hooks/useCreateQuizForm';

import { CreateQuizFormSubmit } from './create-quiz-form-submit';
import { CreateQuizMain } from './create-quiz-main';
import { CreateQuizQuestions } from './create-quiz-questions';
import { QuestionFields } from './question-fields';

export const CreateQuizForm = () => {
  const formRef = useRef(null);
  const { watch, control, onSubmit, register, setValue, clearErrors, errors, isLoading, setError } =
    useCreateQuizForm();

  const isDisabled = !!Object.keys(errors).length;

  return (
    <div className='w-full max-w-md'>
      <form ref={formRef} onSubmit={onSubmit}>
        <CreateQuizMain
          register={register}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
          setValue={setValue}
        />

        <CreateQuizQuestions
          isLoading={isLoading}
          control={control}
          error={errors.questions?.root?.message}
          renderItem={({ field, remove, index }) => (
            <QuestionFields
              key={field.id}
              watch={watch}
              removeQuestion={remove}
              questionIndex={index}
              setValue={setValue}
              control={control}
              register={register}
              setError={setError}
              clearErrors={clearErrors}
              errors={errors}
            />
          )}
        />

        <CreateQuizFormSubmit
          formRef={formRef}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </form>
    </div>
  );
};
