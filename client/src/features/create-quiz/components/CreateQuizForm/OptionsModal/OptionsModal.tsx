import { FilePlus, SquareCheckBig } from 'lucide-react';
import { type PropsWithChildren, type ReactNode } from 'react';
import type {
  FieldArrayWithId,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types.ts';
import { Button } from '@/shared/components/Button';
import { Drawer } from '@/shared/components/Drawer';
// import { Popup } from '@/shared/components/Popup';

type TOption = FieldArrayWithId<IFormData, `questions.${number}.options`, 'id'>;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  addOption: () => void;
  options: TOption[];
  setValue: UseFormSetValue<IFormData>;
  questionIndex: number;
  watch: UseFormWatch<IFormData>;
  renderItem: (params: {
    option: TOption;
    index: number;
    isCorrect: boolean;
    setCorrectOption: (index: number) => void;
  }) => ReactNode;
}

export const OptionsModal = ({
  isOpen,
  onClose,
  addOption,
  options,
  questionIndex,
  setValue,
  watch,
  renderItem,
}: PropsWithChildren<IProps>) => {
  const { t } = useTranslation();

  const setCorrectOption = (selectedIndex: number) => {
    options.forEach((_, index) => {
      setValue(`questions.${questionIndex}.options.${index}.isCorrect`, false, {
        shouldDirty: true,
      });
    });

    setValue(
      `questions.${questionIndex}.options.${selectedIndex}.isCorrect`,
      true,
      {
        shouldDirty: true,
      },
    );
  };

  const optionsForQuestion = watch(`questions.${questionIndex}.options`);

  // if (optionsForQuestion.length > 0) {
  //   return (
  //     <Popup
  //       isOpen={isOpen}
  //       onClose={onClose}
  //     >
  //
  //     </Popup>
  //   )
  // }

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
      {options.map((option, index) => {
        return renderItem({
          option,
          index,
          isCorrect: optionsForQuestion[index].isCorrect,
          setCorrectOption,
        });
      })}
    </Drawer>
  );
};
