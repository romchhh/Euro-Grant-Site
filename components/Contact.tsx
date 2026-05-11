'use client';
import { useState } from 'react';
import styles from './Contact.module.css';

const CONTACT_EMAIL = 'euhelpprivate@proton.me';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    interest: '',
    question: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          business: form.business,
          interest: form.interest,
          question: form.question,
          message: form.message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Не вдалося надіслати. Спробуйте ще раз.');
        return;
      }
      setSent(true);
    } catch {
      setError('Помилка мережі. Перевірте з’єднання та спробуйте знову.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Готові
            <br />
            <em>розпочати?</em>
          </h2>
          <p className={styles.desc}>
            Запишіться на консультацію за €10 і дізнайтесь, яке фінансування
            доступне саме для вашого бізнесу. Заявки та запитання також приймаємо
            на пошту.
          </p>

          <div className={styles.highlights}>
            {[
              { icon: '✓', text: '85% успішних заявок' },
              { icon: '✓', text: 'Відповідь протягом 24 годин' },
              { icon: '✓', text: 'Безпечна оплата через Stripe' },
              { icon: '✓', text: 'Конфіденційність гарантована' },
            ].map(h => (
              <div key={h.text} className={styles.highlight}>
                <span className={styles.hIcon}>{h.icon}</span>
                <span className={styles.hText}>{h.text}</span>
              </div>
            ))}
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Запит%20EuroGrant%20Partners`}
            className={styles.emailLink}
          >
            {CONTACT_EMAIL}
          </a>

          <a
            href="https://t.me/+jZfmKxGWs3U2NWRk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tgLink}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Приєднатись до Telegram-каналу
          </a>
          <p className={styles.tgNote}>
            Канал платний: підписка €10/місяць або €100/рік.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.formCard}>
            {sent ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Заявку надіслано!</h3>
                <p className={styles.successDesc}>
                  Ми контактуємо з вами протягом 24 годин.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Записатись на консультацію</h3>
                <p className={styles.formSub}>
                  €10 · Безпечна оплата через Stripe · {CONTACT_EMAIL}
                </p>

                {error ? <p className={styles.formError}>{error}</p> : null}

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Ваше ім'я *</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Іван Петренко"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Email *</label>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="ivan@company.ua"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Контактний телефон *</label>
                  <input
                    type="tel"
                    className={styles.input}
                    placeholder="+380 XX XXX XX XX"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Назва бізнесу або організації</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="ТОВ «Компанія»"
                    value={form.business}
                    onChange={e => setForm({ ...form, business: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Що вас цікавить? *</label>
                  <select
                    className={`${styles.input} ${styles.select}`}
                    value={form.interest}
                    onChange={e => setForm({ ...form, interest: e.target.value })}
                    required
                    disabled={loading}
                  >
                    <option value="" disabled>Оберіть варіант</option>
                    <option value="grants-eu">Гранти ЄС для бізнесу</option>
                    <option value="private-loans">Приватні позики та інвестиції</option>
                    <option value="grants-ngo">Гранти для НКО та благодійних організацій</option>
                    <option value="general">Загальна консультація</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Питання — відповідь (за бажанням)</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Коротко сформулюйте питання; відповімо під час консультації або листом."
                    rows={2}
                    value={form.question}
                    onChange={e => setForm({ ...form, question: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Короткий опис проєкту</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Опишіть ваш бізнес та які кошти вам потрібні..."
                    rows={3}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? 'Надсилання…' : 'Надіслати заявку'}
                  {!loading ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  ) : null}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
