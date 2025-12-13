import clsx from 'clsx';
import { BadgePlus } from 'lucide-react';
import type { Ref } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { FieldError } from '@/shared/shadcn/ui/field.tsx';

import styles from './FormSubmit.module.css';
import { useFormFooter } from './hooks/useFormFooter';

const portalContainer = document.getElementById('footer')!;

interface IProps {
  isEdit?: boolean;
  formRef: Ref<HTMLFormElement>;
  isDisabled: boolean;
  isLoading: boolean;
  onSubmit: (data: any) => void;
}

export const FormSubmit = ({ isEdit, formRef, isDisabled, isLoading, onSubmit }: IProps) => {
  const { t } = useTranslation();
  const { isShow } = useFormFooter(formRef);

  return createPortal(
    <div className={clsx(styles.footer, isShow && styles.footerShow)}>
      {isDisabled && (
        <FieldError className='text-center'>{t('create_page.check_fields')}</FieldError>
      )}
      <Button
        className={styles.button}
        loading={isLoading}
        disabled={isDisabled}
        type='submit'
        onClick={onSubmit}
        after={<BadgePlus />}
      >
        {isEdit ? 'Внести изменения' : t('common.create')}
      </Button>
    </div>,
    portalContainer,
  );
};
