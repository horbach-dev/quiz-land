import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { FieldLegend } from '@/shared/shadcn/ui/field.tsx';

interface IProps {
  index: number;
  removeQuestion: () => void;
}

export const FormQuestionHeader = ({ index, removeQuestion }: IProps) => {
  const { t } = useTranslation();

  return (
    <FieldLegend className='flex items-center justify-between'>
      <p className='w-full'>
        {t('create_page.question.title', { value: index + 1 })}
      </p>
      <div className='w-fit'>
        <Button
          size='sm'
          onClick={removeQuestion}
          after={<Trash2 className='w-4' />}
        >
          {t('create_page.question.delete')}
        </Button>
      </div>
    </FieldLegend>
  );
};
