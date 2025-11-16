import clsx from "clsx";
import styles from './Options.module.css'

interface IProps {
  options: { value: string, label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}

export const Options = ({ options, value, onChange }: IProps) => {
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div
          key={option.value}
          className={clsx(styles.item, value === option.value && styles.itemActive)}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}
