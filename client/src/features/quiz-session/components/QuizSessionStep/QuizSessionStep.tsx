import clsx from 'clsx';
import { memo } from 'react';

import { LazyImage } from '@/shared/components/LazyImage';
import { Options } from '@/shared/components/Options';
import { WheelPicker } from '@/shared/components/WheelPicker';
import type { TQuizQuestion } from '@/shared/types/quiz';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './QuizSessionStep.module.css';

interface IProps {
  isTransition: boolean;
  isLoading: boolean;
  question: TQuizQuestion;
  value: string | null;
  setValue: (value: string) => void;
}

export const QuizSessionStep = memo(
  ({ isTransition, isLoading, question, value, setValue }: IProps) => {
    const options = question.options.map((i) => ({
      image: i.image ? buildUrl(i.image) : null,
      label: i.text,
      value: i.id,
    }));

    return (
      <div
        className={clsx(
          styles.container,
          isTransition && styles.hide,
          isLoading && styles.disabled,
        )}
      >
        {question.image && (
          <LazyImage
            key={question.id}
            fit='content'
            image={buildUrl(question.image)}
            title={question.text}
          />
        )}

        <p className={styles.title}>{question.text}</p>

        {question.type === 'MULTI_CHOICE' && (
          <WheelPicker
            onValueChange={setValue}
            options={options}
            value={value as string}
          />
        )}

        {question.type === 'SINGLE_CHOICE' && (
          <Options
            isLoading={isLoading}
            value={value}
            isImage={!!question.options[0].image}
            options={options}
            onChange={setValue}
          />
        )}
      </div>
    );
  },
);
