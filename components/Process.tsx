import styles from './Process.module.css';

const steps = [
  {
    num: '01',
    title: 'Первинна консультація',
    desc: 'Ви заповнюєте форму та оплачуєте €10. Ми контактуємо з вами та проводимо детальний аналіз вашого бізнесу та цілей.',
    duration: '1-2 дні',
  },
  {
    num: '02',
    title: 'Оцінка можливостей',
    desc: 'Наша команда аналізує відповідні програми грантів та інвестицій, формує список оптимальних варіантів для вашого випадку.',
    duration: '3-5 днів',
  },
  {
    num: '03',
    title: 'Підготовка заявки',
    desc: 'Допомагаємо зібрати всі необхідні документи, пишемо переконливу заявку та готуємо бізнес-план за вимогами програми.',
    duration: '2-8 тижнів',
  },
  {
    num: '04',
    title: 'Подача та відстеження',
    desc: 'Подаємо заявку та відстежуємо її статус. Відповідаємо на запити комісії та адаптуємо матеріали за потреби.',
    duration: '3-12 місяців',
  },
  {
    num: '05',
    title: 'Отримання фінансування',
    desc: 'Ви отримуєте кошти та можете зосередитися на розвитку бізнесу. Ми залишаємось поруч для звітування та compliance.',
    duration: 'Результат',
  },
];

export default function Process() {
  return (
    <section className={styles.process} id="process">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Простий шлях до
            <br />
            <em>вашого фінансування</em>
          </h2>
          <p className={styles.desc}>
            П'ять чітких кроків, на кожному з яких ми поруч з вами.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.stepLeft}>
                <div className={styles.stepNum}>{s.num}</div>
                {i < steps.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.stepContent}>
                <div className={styles.stepMeta}>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <span className={styles.stepDuration}>{s.duration}</span>
                </div>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
