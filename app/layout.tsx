import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EuroGrant Partners — Фінансування для вашого бізнесу',
  description:
    'Гранти ЄС та фінансування для бізнесу й благодійних організацій — професійний супровід від заявки до результату. Запитання та заявки: euhelpprivate@proton.me',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
