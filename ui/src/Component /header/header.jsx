import styles from './header.module.css'


const Header = () => {
  return (
    <header className={styles.header}>
      <p className={styles.kicker}>LSTM language model</p>
      <h1>Next word prediction</h1>
      <p className={styles.subtitle}>
        Type naturally and let the model complete the next word inline.
      </p>
    </header>
  )
}

export default Header
