import { Controller, type Path, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { DragAndDrop } from '@/shared/components/DragAndDrop';
import { TabBar } from '@/shared/components/TabBar';
import { Field, FieldDescription, FieldError, FieldSeparator } from '@/shared/shadcn/ui/field';

import { QuestionOptionsListItem } from '../QuestionOptionsListItem';
import { useFormQuestionOptions } from './hooks/useFormQuestionOptions';

interface IProps {
  questionIndex: number;
}

const TAB_BAR_OPTIONS = [
  { value: 'TEXT', label: 'Текст' },
  { value: 'IMAGE', label: 'Изображение' },
];

export const QuestionOptionsList = ({ questionIndex }: IProps) => {
  const { t } = useTranslation();

  const {
    control,
    optionFields,
    errors,
    addOption,
    removeOption,
    moveOptions,
    editOption,
    handleTouchDrag,
  } = useFormQuestionOptions(questionIndex, t);

  const error = errors?.options?.root?.message;

  const fieldName: Path<IFormData> = `questions.${questionIndex}.field`;
  const fieldType = useWatch({ control, name: fieldName });

  return (
    <>
      <FieldSeparator />
      {!optionFields.length && (
        <>
          <FieldDescription>
            {t('create_page.options.type_description')}
          </FieldDescription>
          <Controller
            name={`questions.${questionIndex}.field`}
            control={control}
            render={({ field }) => (
              <TabBar
                value={field.value}
                onChange={field.onChange}
                options={TAB_BAR_OPTIONS}
              />
            )}
          />
        </>
      )}

      {!!optionFields.length && (
        <>
          <DragAndDrop
            items={optionFields}
            move={moveOptions}
            render={({ item, index, listeners }) => {
              const error = errors?.options?.[index];

              return (
                <QuestionOptionsListItem
                  key={item.id}
                  index={index}
                  questionIndex={questionIndex}
                  dragListeners={listeners}
                  onTouchDrag={handleTouchDrag}
                  textError={error?.text?.message}
                  imageError={error?.image?.message}
                  editOption={() => editOption(index)}
                  removeOption={() => removeOption(index)}
                  fieldType={fieldType}
                />
              );
            }}
          />
        </>
      )}

      <Field>
        <Button
          type='button'
          style='white'
          size='sm'
          onClick={addOption}
        >
          {/*Добавить / изменить ответ*/}
          {t('create_page.options.add')}
        </Button>
      </Field>

      {error && <FieldError className='text-center'>{error}</FieldError>}
    </>
  );
};
