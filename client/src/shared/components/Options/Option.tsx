import clsx from 'clsx';

import styles from './Options.module.css';

interface IProps {
  isLoading?: boolean;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}

export const Options = ({ isLoading, options, value, onChange }: IProps) => {
  return (
    <div className={styles.container}>
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <div
            key={option.value}
            className={clsx(
              styles.item,
              isActive && styles.itemActive,
              isActive && isLoading && styles.itemLoading,
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};
