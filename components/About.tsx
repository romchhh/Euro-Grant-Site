import styles from './About.module.css';

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Перевірена експертиза',
    desc: 'Наша команда має 8+ років досвіду у підготовці успішних заявок на гранти ЄС для різних секторів бізнесу.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Швидкий результат',
    desc: 'Знаємо як прискорити кожен етап — від підбору програми до подачі документів і отримання відповіді.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Індивідуальний підхід',
    desc: 'Аналізуємо кожен бізнес окремо та підбираємо оптимальні програми, що максимально відповідають вашим цілям.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Повний супровід',
    desc: 'Від первинної консультації до отримання коштів — ми поруч на кожному кроці вашого шляху до фінансування.',
  },
];

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Команда EuroGrant Partners"
            />
            <div className={styles.imageBadge}>
              <span className={styles.ibNum}>94%</span>
              <span className={styles.ibLabel}>Успішних заявок</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <h2 className={styles.heading}>
            Ваш надійний партнер
            <br />
            <em>у світі грантів ЄС</em>
          </h2>
          <p className={styles.desc}>
            Ми не просто консультанти — ми ваші партнери, які кровно зацікавлені у вашому успіху.
            Наш показник успішності 94% говорить сам за себе.
          </p>

          <ul className={styles.featureList}>
            {features.map(f => (
              <li key={f.title} className={styles.featureItem}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <p className={styles.featureTitle}>{f.title}</p>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
