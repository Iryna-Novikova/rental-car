'use client';
import Link from 'next/link';
import Container from '../Container/Container';
import css from './Header.module.css';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headWrapper}>
          <Link href="/" aria-label="Home" className={css.link}>
            <svg className={css.logo} width="102" height="16">
              <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
          <ul className={css.navList}>
            <li
              className={`${css.navLi} ${pathName === '/' ? css.navLiActive : ''}`}
            >
              <Link href="/" aria-label="Home">
                Home
              </Link>
            </li>
            <li
              className={`${css.navLi} ${pathName === '/catalog' ? css.navLiActive : ''}`}
            >
              <Link href="/catalog" aria-label="Catalog">
                Catalog
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}
