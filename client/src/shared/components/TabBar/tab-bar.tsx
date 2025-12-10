import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './tab-bar.module.css';

type TOption = { label: string; value: string };

interface IProps {
  value: string;
  options: TOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const TabBar = ({ options, value, onChange, className }: IProps) => {
  const { t } = useTranslation();
  const index = options.findIndex((v) => v.value === value);
  const activeIndex = index < 0 ? 0 : index;

  return (
    <div className={clsx(styles.tabBar, className)}>
      {options.map((item) => {
        return (
          <button
            key={item.value}
            type='button'
            onClick={() => onChange(item.value)}
            className={clsx(
              styles.tabBarItem,
              item.value === value && styles.tabBarItemActive,
            )}
          >
            {t(item.label)}
          </button>
        );
      })}
      <div className={styles.tabBarActive}>
        <span
          style={{
            width: `${100 / options.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};
