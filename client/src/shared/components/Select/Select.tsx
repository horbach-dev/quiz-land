import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

import styles from './Select.module.css';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const Select = ({ value, onChange, options }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside({ ref, onClickOutside: () => setIsOpen(false) });

  const handleSetValue = (value: string) => {
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div
      ref={ref}
      className={styles.select}
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={styles.selectPlaceholder}
      >
        <p>{value ? value : 'Не выбрано'}</p>
        <ChevronDown className={clsx(styles.icon, isOpen && styles.iconRotate)} />
      </button>
      <div className={clsx(styles.selectList, isOpen && styles.selectListOpen)}>
        <div className={styles.selectListContent}>
          {options.map((option) => (
            <button
              key={option.value}
              className={clsx(
                styles.selectItem,
                value === option.value && styles.selectItemActive,
              )}
              onClick={() => handleSetValue(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
