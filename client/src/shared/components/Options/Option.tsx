import clsx from 'clsx';

import styles from './Options.module.css';

interface IProps {
  isLoading?: boolean;
  isImage?: boolean;
  options: { value: string; label: string; image?: string | null }[];
  value: string | null;
  onChange: (value: string) => void;
}

export const Options = ({
  isLoading,
  isImage,
  options,
  value,
  onChange,
}: IProps) => {
  return (
    <div className={clsx(styles.container, isImage && styles.containerImages)}>
      {options.map((option, idx) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type='button'
            className={clsx(
              styles.item,
              isActive && styles.itemActive,
              isImage && styles.itemImage,
            )}
            onClick={() => onChange(option.value)}
          >
            {isImage ? (
              <img
                src={option?.image || ''}
                alt={`image-${idx}`}
              />
            ) : (
              option.label
            )}
            {isLoading && isActive && <span className={styles.itemLoading} />}
          </button>
        );
      })}
    </div>
  );
};
