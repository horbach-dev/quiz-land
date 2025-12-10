import { FilePlus, SquareCheckBig } from 'lucide-react';
import { Fragment, type PropsWithChildren, useState } from 'react';
import { type FieldArrayWithId, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types.ts';
import { Button } from '@/shared/components/Button';
import { Drawer } from '@/shared/components/Drawer';
import { TabBar } from '@/shared/components/TabBar';
import { FieldSeparator } from '@/shared/shadcn/ui/field.tsx';

import { FormQuestionOptionsItem } from './components/FormQuestionOptionsItem';
import styles from './FormOptionsDrawer.module.css';

type TOption = FieldArrayWithId<IFormData, `questions.${number}.options`, 'id'>;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  addOption: () => void;
  removeOption: (index: number) => void;
  options: TOption[];
  questionIndex: number;
}

const tabBarOptions = [
  { value: 'text', label: 'Текст' },
  { value: 'image', label: 'Картинка' },
];

export const FormOptionsDrawer = ({
  isOpen,
  onClose,
  options,
  addOption,
  questionIndex,
  removeOption,
}: PropsWithChildren<IProps>) => {
  const { t } = useTranslation();
  const [inputType, setInputType] = useState<string>('text');

  const {
    watch,
    register,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext<IFormData>();

  const setCorrectOption = (selectedIndex: number) => {
    options.forEach((_, index) => {
      setValue(`questions.${questionIndex}.options.${index}.isCorrect`, false, {
        shouldDirty: true,
      });
    });

    setValue(`questions.${questionIndex}.options.${selectedIndex}.isCorrect`, true, {
      shouldDirty: true,
    });
  };

  const optionsErrors = errors?.questions?.[questionIndex]?.options;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t('create_page.options.modal_title', { value: questionIndex + 1 })}
      headerActions={
        <Button
          size='sm'
          style='white'
          auto={true}
          after={<FilePlus />}
          onClick={addOption}
        >
          {t('create_page.options.add_variant')}
        </Button>
      }
      actions={
        <Button
          after={<SquareCheckBig />}
          disabled={false}
          onClick={onClose}
        >
          {t('create_page.options.apply_options')}
        </Button>
      }
    >
      <TabBar
        className={styles.tabBar}
        value={inputType}
        onChange={setInputType}
        options={tabBarOptions}
      />

      {options.map((option, index) => {
        const isCorrect = watch(`questions.${questionIndex}.options.${index}.isCorrect`);
        return (
          <Fragment key={option.id}>
            <FormQuestionOptionsItem
              index={index}
              register={register}
              control={control}
              setError={setError}
              clearErrors={clearErrors}
              isImage={inputType === 'image'}
              isCorrect={isCorrect}
              questionIndex={questionIndex}
              remove={() => removeOption(index)}
              setCorrectOption={() => setCorrectOption(index)}
              textError={optionsErrors?.[index]?.text?.message}
              imageError={optionsErrors?.[index]?.image?.message}
            />
            {index !== options.length - 1 && <FieldSeparator className='mt-3 mb-3' />}
          </Fragment>
        );
      })}
    </Drawer>
  );
};
