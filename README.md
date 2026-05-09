# EuroGrant Partners — Website

Сучасний лендінг для консалтингової компанії з грантів ЄС.

## Технологічний стек

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **CSS Modules** (без зовнішніх UI-бібліотек)

## Дизайн

- Темна преміум-тема з золотими акцентами
- Шрифти: Cormorant Garamond (заголовки) + DM Sans (текст)
- Анімації на CSS без залежностей
- Scroll reveal через Intersection Observer
- Повністю адаптивний (mobile-first)

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # запуск production
```

## Структура

```
eurogrant/
├── app/
│   ├── globals.css       # CSS змінні, анімації, базові стилі
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Головна сторінка
└── components/
    ├── Navbar.tsx / .module.css
    ├── Hero.tsx / .module.css
    ├── StatsStrip.tsx / .module.css
    ├── About.tsx / .module.css
    ├── Services.tsx / .module.css
    ├── Process.tsx / .module.css
    ├── FAQ.tsx / .module.css
    ├── Contact.tsx / .module.css
    ├── Footer.tsx / .module.css
    └── ScrollReveal.tsx
```

## Секції

1. **Navbar** — фіксований, зі scroll-ефектом і мобільним меню
2. **Hero** — full-screen з фоновим фото, stats, CTA
3. **StatsStrip** — ключові цифри
4. **About** — спліт-секція з зображенням і перевагами
5. **Services** — картки послуг (3 напрями)
6. **Process** — 5 кроків роботи
7. **FAQ** — акордеон
8. **Contact** — форма заявки + контакти
9. **Footer** — повноцінний футер

## Кастомізація

Всі дизайн-токени знаходяться в `app/globals.css` в секції `:root`.
Основні кольори: `--gold`, `--bg`, `--surface`, `--text`.

## Деплой на Vercel

```bash
npx vercel
```
