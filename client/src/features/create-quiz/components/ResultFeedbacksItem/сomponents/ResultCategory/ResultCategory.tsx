import { useFieldArray } from 'react-hook-form';

import { Button } from '@/shared/components/Button';
import { FieldDescription, FieldSet } from '@/shared/shadcn/ui/field';

import { ResultCategoryCondition } from './ResultCategoryCondition';

interface IProps {
  resultIndex: number;
  categoriesCounts?: Record<string, number>;
  categoryList: { value: string; label: string }[];
}

export const ResultCategory = ({ categoriesCounts, categoryList, resultIndex }: IProps) => {
  const { append, fields, remove } = useFieldArray({
    name: `results.${resultIndex}.conditions`,
  });

  const handleAddCondition = () => {
    append({ category: '', moreOrEqual: null, lessOrEqual: null });
  };

  return (
    <FieldSet>
      <FieldSet>
        <FieldDescription>
          По умолчанию, cистема находит категорию-лидера (где пользователь набрал больше всего
          баллов), если не заданы условия.
        </FieldDescription>
        {fields.map((field, i) => (
          <ResultCategoryCondition
            key={field.id}
            index={i}
            remove={() => remove(i)}
            resultIndex={resultIndex}
            categoryList={categoryList}
            categoriesCounts={categoriesCounts}
          />
        ))}
      </FieldSet>

      <Button
        type='button'
        style='white'
        size='sm'
        onClick={handleAddCondition}
      >
        Добавить условие
      </Button>
    </FieldSet>
  );
};
