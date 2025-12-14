import styles from './Description.module.css';

interface IProps {
  text: string;
}

export const Description = ({ text }: IProps) => {
  return (
    <div
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}
