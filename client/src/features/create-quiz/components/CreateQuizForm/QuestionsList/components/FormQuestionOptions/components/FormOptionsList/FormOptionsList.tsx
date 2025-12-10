import {
  type FieldArrayWithId,
  type UseFieldArrayMove,
  type UseFieldArrayRemove,
  useWatch,
} from 'react-hook-form';

import type { IFormData } from '@/features/create-quiz/types.ts';
import { DragAndDrop } from '@/shared/components/DragAndDrop';
import { useAppStore } from '@/shared/stores/appStore';

import styles from './FormOptionsList.module.css';
import { FormOptionsListItem } from './FormOptionsListItem';

interface IProps {
  options: FieldArrayWithId<IFormData, `questions.${number}.options`, 'id'>[];
  optionsError: any[];
  questionIndex: number;
  moveOptions: UseFieldArrayMove;
  removeOption: UseFieldArrayRemove;
}

export const FormOptionsList = ({
  options,
  removeOption,
  questionIndex,
  moveOptions,
  optionsError,
}: IProps) => {
  const setSwipeCallback = useAppStore((s) => s.setSwipeRedirectCallback);
  const values = useWatch<IFormData>({
    name: `questions.${questionIndex}.options`,
  });

  const handleTouchDrag = (isStart: boolean) => {
    setSwipeCallback(isStart ? null : 'default');
  };

  return (
    <div className={styles.container}>
      <DragAndDrop
        items={options}
        move={moveOptions}
        render={({ item, index, listeners }) => {
          const errors = optionsError[index];

          return (
            <FormOptionsListItem
              key={item.id}
              index={index}
              isCorrect={values?.[index].isCorrect}
              dragListeners={listeners}
              onTouchDrag={handleTouchDrag}
              text={values?.[index].text}
              image={values?.[index].image}
              loadedImg={values?.[index].loadedImg}
              textError={errors?.text?.message}
              imageError={errors?.image?.message}
              removeOption={() => removeOption(index)}
            />
          );
        }}
      />
    </div>
  );
};
