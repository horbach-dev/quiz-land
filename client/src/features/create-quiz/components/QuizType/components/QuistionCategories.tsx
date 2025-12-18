import { Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { Field, FieldError, FieldGroup, FieldSet } from '@/shared/shadcn/ui/field';
import { Input } from '@/shared/shadcn/ui/input';

export const QuestionCategories = () => {
  const { t } = useTranslation();
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useFormContext<IFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questionCategories',
  });

  const handleAddCategory = async () => {
    const isValid = await trigger('questionCategories');

    if (!isValid) return;

    append({ text: '', id: uuid() });
  };

  const err = errors?.questionCategories;

  return (
    <FieldSet>
      <FieldGroup>
        <SectionHeader
          className='mt-5'
          title={'Категории результата'}
          description={
            'Добавьте категории, между которыми будет распределяться результат теста. Каждый вариант ответа в вопросах будет относиться к одной из категорий, а итог определяется по преобладающей категории.'
          }
        />
        {fields.map((field, i) => (
          <Field key={field.id}>
            <div className='flex gap-[1rem]'>
              <Input
                className='h-[3.2rem]'
                placeholder='Введите название...'
                {...register(`questionCategories.${i}.text`, {
                  required: t('validation.required'),
                  maxLength: {
                    value: 30,
                    message: t('validation.min_length', { value: 30 }),
                  },
                })}
              />
              <Button
                style='icon'
                className='w-[3.2rem] h-[3.2rem] max-h-[3.2rem] min-w-[3.2rem]'
                onClick={() => remove(i)}
                type='button'
              >
                <Trash2 />
              </Button>
            </div>

            {err?.[i]?.text?.message && <FieldError>{err[i].text.message}</FieldError>}
          </Field>
        ))}
      </FieldGroup>
      <Button
        style='white'
        size='sm'
        disabled={!!err}
        onClick={handleAddCategory}
      >
        Добавить категорию
      </Button>
    </FieldSet>
  );
};
