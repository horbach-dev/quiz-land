import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { DragAndDrop } from '@/shared/components/DragAndDrop';
import { TabBar } from '@/shared/components/TabBar';
import { Field, FieldError, FieldSeparator } from '@/shared/shadcn/ui/field';

import { QuestionOptionsListItem } from '../QuestionOptionsListItem';
import { useFormQuestionOptions } from './hooks/useFormQuestionOptions';

interface IProps {
  questionIndex: number;
}

const TAB_BAR_OPTIONS = [
  { value: 'text', label: 'Текст' },
  { value: 'image', label: 'Картинка' },
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

  const fieldType = useWatch({ name: `questions.${questionIndex}.field` });

  const options = optionFields.filter(i => {
    if (fieldType === 'image') {
      return i.image;
    }

    return i.text;
  });

  return (
    <>
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

      {!!optionFields.length && (
        <>
          <FieldSeparator />
          <DragAndDrop
            items={options}
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
