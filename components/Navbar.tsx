'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const links = [
  { href: '#about', label: 'Про нас' },
  { href: '#services', label: 'Послуги' },
  { href: '#process', label: 'Як це працює' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({ top: (target as HTMLElement).offsetTop - 72, behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#" className={styles.brand} onClick={e => handleNav(e, '#')}>
          <span className={styles.logo}>
            Euro<em>Grant</em> Partners
          </span>
        </a>

        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => handleNav(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.cta} onClick={e => handleNav(e, '#contact')}>
          Консультація — €10
        </a>

        <button
          className={`${styles.hamburger} ${open ? styles.hOpen : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`${styles.mobile} ${open ? styles.mOpen : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={e => handleNav(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className={styles.mobileCta} onClick={e => handleNav(e, '#contact')}>
          Консультація — €10 →
        </a>
      </div>
    </>
  );
}
