import styles from './Background.module.css'

export const Background = () => {
  return (
    <div className={styles.container}>
      <span className={styles.shadow} />
      <span className={styles.shadow2} />
      <span className={styles.shadow3} />
    </div>
  )
}
