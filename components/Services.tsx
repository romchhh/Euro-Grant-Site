import styles from './Services.module.css';

const services = [
  {
    tag: 'Гранти ЄС',
    title: 'Гранти Євросоюзу',
    desc: 'Підбір та супровід заявок на гранти Horizon Europe, COSME, LIFE та інших програм фінансування від Єврокомісії.',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
    features: ['Horizon Europe', 'COSME', 'Erasmus+', 'InvestEU'],
  },
  {
    tag: 'Приватні інвестиції',
    title: 'Позики та інвестиції',
    desc: 'Зв\'язок з мережею приватних інвесторів і фондів, структурування угод і підготовка інвестиційних меморандумів.',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80',
    features: ['Венчурний капітал', 'Бізнес-ангели', 'EIF позики', 'Мезонінне фінансування'],
  },
  {
    tag: 'НКО та благодійність',
    title: 'Фінансування для НКО',
    desc: 'Спеціалізовані гранти для неприбуткових організацій, благодійних фондів та соціальних підприємств.',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    features: ['Citizen Programme', 'EEA Grants', 'Структурні фонди', 'EIDHR'],
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Широкий спектр
          <br />
          <em>можливостей фінансування</em>
        </h2>
        <p className={styles.desc}>
          Від стартапів до великих корпорацій, від НКО до муніципальних проєктів —
          ми знайдемо оптимальне фінансування саме для вас.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <div key={s.tag} className={`${styles.card} ${i === 0 ? styles.featured : ''}`}>
            <div className={styles.cardImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.title} />
              <div className={styles.imgOverlay} />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTag}>{s.tag}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <ul className={styles.cardFeatures}>
                {s.features.map(f => (
                  <li key={f} className={styles.feature}>
                    <span className={styles.featureDot} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={styles.cardLink}>
                Дізнатись більше
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
