'use client';

import styles from './header.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SvgImage from '@/components/svg-image/svg-image';
import { LOCALES } from '@/const';

export default function Header(): React.ReactNode {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav>
        <Link href="/" className={pathname === '/' ? styles.inactive : styles.active}>
          Logo
        </Link>
      </nav>
      <div className={styles.controls}>
        <div className={styles.lang}>
          <label htmlFor="select">
            <SvgImage url={'/globe-sprite.svg#lang'} className={styles.svg} />
          </label>
          <select id="select">
            {LOCALES.map((locale) => (
              <option value={locale} key={locale}>
                {locale.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <button className={styles['sign-out-button']} aria-label="sign out" title="sign out">
          <SvgImage url={'/sign-out-sprite.svg#signOut'} className={styles.svg}></SvgImage>
        </button>
      </div>
    </header>
  );
}
