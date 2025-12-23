import type { ComponentProps, SyntheticEvent } from 'react';

import { Input } from '@/shared/shadcn/ui/input';

const handleInputChange = (e: SyntheticEvent<HTMLInputElement>, { max, onInput }) => {
  const target = e.target as HTMLInputElement;
  const value = target.value.replace(/[eEаА-]/g, '');

  if (value === 'e') return;

  target.value = value;

  if (value.length > 3) {
    target.value = value.slice(0, 3);
  }

  if (value > max) {
    target.value = max;
  }

  onInput?.(e);
};

interface IProps {
  max?: number;
  onInput?: (e: SyntheticEvent<HTMLInputElement>) => void;
  inputProps: ComponentProps<'input'>;
}

export const InputNumber = ({ max = 999, onInput, inputProps }: IProps) => {
  return (
    <Input
      id='quiz-title'
      type='number'
      {...inputProps}
      onInput={(e) => handleInputChange(e, { max, onInput })}
    />
  );
};
