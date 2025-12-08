import { FilePlus, SquareCheckBig } from 'lucide-react';
import { type PropsWithChildren, type ReactNode } from 'react';
import type {
  FieldArrayWithId,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import type { IFormData } from '@/features/create-quiz/types.ts';
import { Button } from '@/shared/components/Button';
import { Drawer } from '@/shared/components/Drawer';

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

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Ответы к № ${questionIndex + 1}`}
      headerActions={
        <Button
          size='sm'
          style='white'
          after={<FilePlus />}
          onClick={addOption}
        >
          Добавить
        </Button>
      }
      actions={
        <Button
          after={<SquareCheckBig />}
          disabled={false}
          onClick={onClose}
        >
          Применить ответы
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
