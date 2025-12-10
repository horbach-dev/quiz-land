import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { Field, FieldError, FieldSeparator } from '@/shared/shadcn/ui/field';

import { FormOptionsDrawer } from './components/FormOptionsDrawer';
import { FormOptionsList } from './components/FormOptionsList';
import { useFormQuestionOptions } from './hooks/useFormQuestionOptions';

interface IProps {
  questionIndex: number;
}

export const FormQuestionOptions = ({ questionIndex }: IProps) => {
  const { t } = useTranslation();
  const [isOpenOptionsForm, setIsOpenOptionsForm] = useState(false);

  const { optionFields, errors, addOption, removeOption, moveOptions } =
    useFormQuestionOptions(questionIndex, t);

  // const questionErrors = errors?.questions?.[questionIndex];
  const error = errors?.options?.root?.message;

  const handleChangeOptions = () => {
    if (!optionFields.length) addOption();
    setIsOpenOptionsForm(true);
  };

  return (
    <>
      {!!optionFields.length && (
        <>
          <FieldSeparator />
          <FormOptionsList
            options={optionFields}
            questionIndex={questionIndex}
            removeOption={removeOption}
            moveOptions={moveOptions}
            optionsError={(errors?.options as any) || []}
          />
        </>
      )}

      <FormOptionsDrawer
        isOpen={isOpenOptionsForm}
        options={optionFields}
        questionIndex={questionIndex}
        onClose={() => setIsOpenOptionsForm(false)}
        addOption={addOption}
        removeOption={removeOption}
      />

      <Field>
        <Button
          type='button'
          style='white'
          size='sm'
          onClick={handleChangeOptions}
        >
          {/*Добавить / изменить ответ*/}
          {optionFields.length ? t('create_page.options.edit') : t('create_page.options.add')}
        </Button>
      </Field>

      {error && <FieldError className='text-center'>{error}</FieldError>}
    </>
  );
};
