import { Trash2 } from 'lucide-react';
import { Fragment } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { InputNumber } from '@/shared/components/InputNumber';
import { Select } from '@/shared/components/Select';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/shadcn/ui/field';

interface IProps {
  categoriesCounts: Record<string, number>;
  resultIndex: number;
  index: number;
  categoryList: { label: string; value: string }[];
  remove: () => void;
}

export const ResultCategoryCondition = ({
  categoriesCounts,
  resultIndex,
  categoryList,
  remove,
  index,
}: IProps) => {
  const { control, register } = useFormContext<IFormData>();
  const condition = useWatch({ control, name: `results.${resultIndex}.conditions.${index}` });
  const categoryMax = categoriesCounts?.[condition?.category || ''];

  return (
    <Fragment>
      <FieldGroup className='bg-[rgba(255,255,255,0.05)] p-[1rem] rounded-[1rem]'>
        <Field className='flex flex-row items-center'>
          <Controller
            name={`results.${resultIndex}.conditions.${index}.category`}
            control={control}
            render={({ field }) => (
              <Select
                placeholder='Выберите категорию'
                value={field.value as string}
                onChange={field.onChange}
                options={categoryList}
              />
            )}
          />
          <Button
            className='h-[3.2rem_!important] w-[3.2rem_!important] min-w-[3.2rem]'
            type='button'
            style='icon'
            onClick={remove}
          >
            <Trash2 />
          </Button>
        </Field>
        <div className='flex items-center gap-[1rem]'>
          <Field>
            <FieldLabel htmlFor={`condition-more-${index}`}>Больше || ровно</FieldLabel>
            <InputNumber
              max={100}
              inputProps={{
                id: `condition-more-${index}`,
                placeholder: 'Число...',
                ...register(`results.${resultIndex}.conditions.${index}.moreOrEqual`),
              }}
            />
            <FieldDescription>Макс. {categoryMax}</FieldDescription>
          </Field>
          <p className='relative top-[1rem]'>&</p>
          <Field>
            <FieldLabel htmlFor={`condition-less-${index}`}>Меньше || ровно</FieldLabel>
            <InputNumber
              max={100}
              inputProps={{
                id: `condition-less-${index}`,
                placeholder: 'Число...',
                ...register(`results.${resultIndex}.conditions.${index}.lessOrEqual`),
              }}
            />
            <FieldDescription>Макс. {categoryMax}</FieldDescription>
          </Field>
        </div>
      </FieldGroup>
    </Fragment>
  );
};
