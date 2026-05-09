import styles from './StatsStrip.module.css';

const stats = [
  { num: '€50M+', label: 'Залучено для клієнтів' },
  { num: '94%', label: 'Успішних заявок' },
  { num: '8+', label: 'Років на ринку' },
  { num: '200+', label: 'Задоволених клієнтів' },
  { num: '40+', label: 'Грантових програм' },
];

export default function StatsStrip() {
  return (
    <div className={styles.strip}>
      <div className={styles.inner}>
        {stats.map(s => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.num}>{s.num}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
