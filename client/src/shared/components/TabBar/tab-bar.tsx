import styles from './tab-bar.module.css';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface IProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export const TabBar = ({ options, value, onChange }: IProps) => {
  const { t } = useTranslation();
  const activeIndex = options.findIndex((v) => v.value === value);
  return (
    <div className={styles.tabBar}>
      {options.map((item) => {
        return (
          <button
            key={item.value}
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
        <span style={{ transform: `translateX(${activeIndex * 100}%)` }} />
      </div>
    </div>
  );
};
