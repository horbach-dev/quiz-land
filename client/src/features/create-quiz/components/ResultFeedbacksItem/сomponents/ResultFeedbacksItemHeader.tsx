import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { FieldDescription, FieldLegend } from '@/shared/shadcn/ui/field';

interface IProps {
  index: number;
  description?: string;
  remove: () => void;
}

export const ResultFeedbacksItemHeader = ({ description, remove, index }: IProps) => {
  const { t } = useTranslation();

  return (
    <>
      <FieldLegend className='flex items-center justify-between'>
        <p className='w-full'>
          {t('create_page.result_feedbacks.result_title', { value: index + 1 })}
        </p>
        <div className='w-fit'>
          <Button
            size='sm'
            onClick={remove}
            after={<Trash2 className='w-4' />}
          >
            {t('create_page.question.delete')}
          </Button>
        </div>
      </FieldLegend>

      {description && <FieldDescription>{t(description)}</FieldDescription>}
    </>
  );
};
