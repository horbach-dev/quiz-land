import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { DragAndDrop } from '@/shared/components/DragAndDrop';
import { TabBar } from '@/shared/components/TabBar';
import { Field, FieldDescription, FieldError } from '@/shared/shadcn/ui/field';

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
    fields,
    errors,
    addOption,
    removeOption,
    move,
    handleTouchDrag,
    editOption,
  } = useFormQuestionOptions({ questionIndex, translate: t });

  console.log('fields', fields);

  const error = errors?.options?.root?.message;

  const fieldType = useWatch({ control, name: `questions.${questionIndex}.field` });
  const questionCategories = useWatch({ control, name: 'questionCategories' });
  const scoringAlgorithm = useWatch({ control, name: 'scoringAlgorithm' });

  return (
    <>
      {!fields.length && (
        <>
          <FieldDescription>{t('create_page.options.type_description')}</FieldDescription>
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

      {!!fields.length && (
        <>
          <DragAndDrop
            items={fields}
            move={move}
            render={({ item, index, listeners }) => {
              const error = errors?.options?.[index];

              return (
                <QuestionOptionsListItem
                  key={item.id}
                  index={index}
                  questionIndex={questionIndex}
                  dragListeners={listeners}
                  scoringAlgorithm={scoringAlgorithm}
                  onTouchDrag={handleTouchDrag}
                  textError={error?.text?.message}
                  imageError={error?.image?.message}
                  editOption={() => editOption(index)}
                  removeOption={() => removeOption(index)}
                  questionCategories={questionCategories}
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
