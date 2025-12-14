import type { ComponentProps, SyntheticEvent } from 'react';

import { Input } from '@/shared/shadcn/ui/input';

const handleInputChange = (e: SyntheticEvent<HTMLInputElement>, max) => {
  const target = e.target as HTMLInputElement;
  const value = target.value.replace(/[eEаА]/g, '');

  if (value === 'e') return;

  if (value.length > 3) {
    target.value = value.slice(0, 3);
  }

  if (value > max) {
    console.log('234');
    target.value = max;
  }
};

interface IProps {
  max?: number;
  inputProps: ComponentProps<'input'>;
}

export const InputNumber = ({ max, inputProps }: IProps) => {
  return (
    <Input
      id='quiz-title'
      type='number'
      onInput={(e) => handleInputChange(e, max)}
      {...inputProps}
    />
  );
};
