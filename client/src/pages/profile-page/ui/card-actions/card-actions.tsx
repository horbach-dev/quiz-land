import { SquarePen, Trash2 } from 'lucide-react';

import { useDeleteQuizQuery } from '@/features/quiz/services/useDeleteQuizQuery';
import { Button } from '@/shared/components/Button';
import { Popover } from '@/shared/components/Popover';
import type { TQuiz } from '@/shared/types/quiz';

import styles from './card-actions.module.css';

interface IProps {
  item: TQuiz;
}

export const CardActions = ({ item }: IProps) => {
  const { mutate: handleDelete, isPending } = useDeleteQuizQuery(item.id);

  return (
    <div className={styles.cardActions}>
      <Button
        size='sm'
        style='icon'
      >
        <SquarePen />
      </Button>
      <Popover
        onConfirm={handleDelete}
        text={
          <>
            Удалить <br /> {item.title} ?
          </>
        }
      >
        <Button
          size='sm'
          style='icon'
          loading={isPending}
          type='button'
        >
          <Trash2 />
        </Button>
      </Popover>
    </div>
  );
};
