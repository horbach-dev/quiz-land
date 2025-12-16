import { Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { Field, FieldError, FieldGroup, FieldSet } from '@/shared/shadcn/ui/field';
import { Input } from '@/shared/shadcn/ui/input';

export const QuestionCategories = () => {
  const { t } = useTranslation();
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<IFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questionCategories',
  });

  const handleAddCategory = () => {
    append({ text: '' });
  };

  const isShow = watch('scoringAlgorithm') === 'PERSONALITY_TEST';

  if (!isShow) return null;

  return (
    <FieldSet>
      <FieldGroup>
        {fields.map((field, i) => (
          <Field key={field.id}>
            <div className='flex gap-[1rem]'>
              <Input
                className='h-[3.2rem]'
                placeholder='Введите название...'
                {...register(`questionCategories.${i}.text`, {
                  required: t('validation.required'),
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

            {errors?.questionCategories?.[i]?.text?.message && (
              <FieldError>{errors.questionCategories[i].text.message}</FieldError>
            )}
          </Field>
        ))}
      </FieldGroup>
      <Button
        style='white'
        size='sm'
        onClick={handleAddCategory}
      >
        Добавить категорию
      </Button>
    </FieldSet>
  );
};
