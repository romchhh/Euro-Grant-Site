import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.logo}>
            Euro<em>Grant</em> Partners
          </p>
          <p className={styles.tagline}>
            Допомагаємо бізнесу та благодійним організаціям
            отримувати гранти та фінансування від ЄС і приватних інвесторів.
          </p>
          <div className={styles.eu}>
            {['Horizon Europe', 'COSME', 'LIFE', 'InvestEU', 'EEA Grants'].map(t => (
              <span key={t} className={styles.euTag}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <p className={styles.colTitle}>Послуги</p>
            <ul className={styles.colList}>
              <li><a href="#services">Гранти ЄС</a></li>
              <li><a href="#services">Приватні інвестиції</a></li>
              <li><a href="#services">Для НКО</a></li>
              <li><a href="#contact">Записатись на консультацію</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <p className={styles.colTitle}>Інформація</p>
            <ul className={styles.colList}>
              <li><a href="#about">Про нас</a></li>
              <li><a href="#process">Як це працює</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <p className={styles.colTitle}>Контакти</p>
            <ul className={styles.colList}>
              <li><a href="#contact">Записатись</a></li>
              <li>
                <a href="mailto:euhelpprivate@proton.me">euhelpprivate@proton.me</a>
              </li>
              <li>
                <a href="https://t.me/+jZfmKxGWs3U2NWRk" target="_blank" rel="noopener noreferrer">
                  Telegram-канал
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© 2025 EuroGrant Partners. Всі права захищені.</p>
        <p className={styles.sub}>Консультаційний партнер програм ЄС</p>
      </div>
    </footer>
  );
}
