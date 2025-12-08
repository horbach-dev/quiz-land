import { Fragment, useState } from 'react';
import {
  type Control,
  useFieldArray,
  type UseFormClearErrors,
  type UseFormRegister,
  type UseFormSetError,
  type UseFormSetValue,
  type UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { validationRules } from '@/features/create-quiz/config.ts';
import type { IFormData } from '@/features/create-quiz/types.ts';
import { Button } from '@/shared/components/Button';
import {
  Field,
  FieldError,
  FieldSeparator,
} from '@/shared/shadcn/ui/field.tsx';

import { FormOptionsList } from '../FormOptionsList';
import { FormQuestionOptionsItem } from '../FormQuestionOptionsItem';
import { OptionsModal } from '../OptionsModal';

interface IProps {
  questionIndex: number;
  control: Control<IFormData>;
  register: UseFormRegister<IFormData>;
  questionErrors: any;
  setValue: UseFormSetValue<IFormData>;
  setError: UseFormSetError<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>;
  watch: UseFormWatch<IFormData>;
}

export const FormQuestionOptions = ({
  watch,
  control,
  register,
  setValue,
  questionErrors,
  questionIndex,
}: IProps) => {
  const { t } = useTranslation();
  const [isOpenOptionsForm, setIsOpenOptionsForm] = useState(false);

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
    move: moveOptions,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
    rules: validationRules(t).options,
  });

  const handleAddOption = () => {
    appendOption(
      {
        text: '',
        image: null,
        isCorrect: !optionFields.length,
      },
      { shouldFocus: false },
    );
  };

  const handleChangeOptions = () => {
    if (!optionFields.length) handleAddOption();
    setIsOpenOptionsForm(true);
  };

  return (
    <>
      {!!optionFields.length && (
        <>
          <FieldSeparator />
          <FormOptionsList
            watch={watch}
            options={optionFields}
            questionIndex={questionIndex}
            removeOption={removeOption}
            moveOptions={moveOptions}
            errors={(questionErrors?.options as any) || []}
          />
        </>
      )}

      <OptionsModal
        isOpen={isOpenOptionsForm}
        addOption={handleAddOption}
        questionIndex={questionIndex}
        onClose={() => setIsOpenOptionsForm(false)}
        options={optionFields}
        setValue={setValue}
        watch={watch}
        renderItem={({ option, index, isCorrect, setCorrectOption }) => (
          <Fragment key={option.id}>
            <FormQuestionOptionsItem
              index={index}
              questionIndex={questionIndex}
              isCorrect={isCorrect}
              register={register}
              setCorrectOption={setCorrectOption}
              remove={() => removeOption(index)}
              answerErrors={questionErrors?.options?.[index]}
            />
            {index !== optionFields.length - 1 && (
              <FieldSeparator className='mt-3 mb-3' />
            )}
          </Fragment>
        )}
      />

      <Field>
        <Button
          type='button'
          style='white'
          size='sm'
          onClick={handleChangeOptions}
        >
          {/*Добавить / изменить ответ*/}
          {optionFields.length
            ? t('create_page.options.edit')
            : t('create_page.options.add')}
        </Button>
      </Field>

      {questionErrors?.options?.root?.message && (
        <FieldError className='text-center'>
          {questionErrors?.options?.root?.message}
        </FieldError>
      )}
    </>
  );
};
