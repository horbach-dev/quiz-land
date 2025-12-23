import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

import { useClickOutside } from '@/shared/hooks/useClickOutside';

import styles from './Select.module.css';

interface IProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const Select = ({ value, onChange, placeholder = 'Не выбрано', options }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside({ ref, onClickOutside: () => setIsOpen(false) });

  const handleSetValue = (value: string) => {
    setIsOpen(false);
    onChange(value);
  };

  const label = options?.find((o) => o.value === value)?.label;

  return (
    <div
      ref={ref}
      className={styles.select}
    >
      <button
        type='button'
        onClick={() => setIsOpen((v) => !v)}
        className={styles.selectPlaceholder}
      >
        <p>{label ? label : placeholder}</p>
        <ChevronDown className={clsx(styles.icon, isOpen && styles.iconRotate)} />
      </button>
      <div className={clsx(styles.selectList, isOpen && styles.selectListOpen)}>
        <div className={styles.selectListContent}>
          {options.length ? (
            options.map((option) => (
              <button
                type='button'
                key={option.value}
                className={clsx(
                  styles.selectItem,
                  value === option.value && styles.selectItemActive,
                )}
                onClick={() => handleSetValue(option.value)}
              >
                {option.label}
              </button>
            ))
          ) : (
            <p className={styles.selectEmpty}>Список пуст</p>
          )}
        </div>
      </div>
    </div>
  );
};
