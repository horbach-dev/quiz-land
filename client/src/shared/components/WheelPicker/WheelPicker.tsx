import './WheelPicker.css';

import { WheelPicker as Component, WheelPickerWrapper } from '@ncdai/react-wheel-picker';

const vw = (window.innerWidth * 12) / 100;

interface IProps {
  options: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

export const WheelPicker = ({ options, value, onValueChange }: IProps) => {
  return (
    <WheelPickerWrapper>
      <Component
        options={options}
        optionItemHeight={vw}
        value={value}
        onValueChange={onValueChange}
      />
    </WheelPickerWrapper>
  );
};
