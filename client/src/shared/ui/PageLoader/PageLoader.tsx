import styles from './PageLoader.module.css'

export const PageLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  )
}
