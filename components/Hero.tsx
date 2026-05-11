import { STRIPE_CONSULTATION_URL } from '@/lib/siteLinks';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Background layers */}
      <div className={styles.bg} />
      <div className={styles.overlay} />
      <div className={styles.grain} />

      {/* Decorative orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.content}>
        <h1 className={styles.heading}>
          Отримайте
          <br />
          <em>фінансування</em>
          <br />
          для бізнесу
        </h1>

        <p className={styles.lead}>
          Гранти ЄС та приватні інвестиції з професійним супроводом —<br />
          від консультації до успішної заявки.
        </p>

        <div className={styles.buttons}>
          <a
            href={STRIPE_CONSULTATION_URL}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 8l9 6 9-6" />
            </svg>
            Консультація — €10
          </a>
          <a href="#services" className={styles.btnGhost}>
            Дізнатись більше
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.stats}>
        {[
          { n: '85%', l: 'Успішних заявок' },
          { n: '8+', l: 'Років досвіду' },
          { n: '€50M+', l: 'Залучено для клієнтів' },
        ].map(s => (
          <div key={s.l} className={styles.stat}>
            <span className={styles.statNum}>{s.n}</span>
            <span className={styles.statLabel}>{s.l}</span>
          </div>
        ))}
      </div>

      <div className={styles.scrollHint}>
        <span />
      </div>
    </section>
  );
}
