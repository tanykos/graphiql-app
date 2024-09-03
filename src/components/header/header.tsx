'use client';

import styles from './header.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SvgImage from '@/components/svg-image/svg-image';
import { DEFAULT_LOCALE, LOCALES } from '@/const';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import isLocaleCorrect from '@/utils/is-locale-correct';
import getLocale from '@/utils/get-locale';

export default function Header(): React.ReactNode {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const [selectValue, setSelectValue] = useState(isLocaleCorrect(locale) ? locale : '');

  const router = useRouter();

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const handleStickyHeader = () => {
    setIsHeaderSticky(window.scrollY > 0);
  };

  useEffect(() => {
    handleStickyHeader();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleStickyHeader);
    return () => {
      window.removeEventListener('scroll', handleStickyHeader);
    };
  });

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  function handleLocaleChange(event: React.ChangeEvent) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    setSelectValue(event.target.value);
    const newLocale = event.target.value;
    router.push(`${pathname.replace(locale, newLocale)}`, { scroll: true });
  }

  return (
    <header className={`${styles.header} ${isHeaderSticky && styles.sticky}`}>
      <div className={styles.backdrop}></div>
      <nav>
        <Link
          href={`/${DEFAULT_LOCALE}`}
          className={pathname === `/${DEFAULT_LOCALE}` ? styles.inactive : styles.active}
        >
          {dictionary.header.logo}
        </Link>
      </nav>
      <div className={styles.controls}>
        <div className={styles.lang}>
          <label htmlFor="select">
            <SvgImage url={'/globe-sprite.svg#lang'} className={styles.svg} ariaLabel="Language globe" />
          </label>
          <select id="select" onChange={handleLocaleChange} value={selectValue}>
            <option></option>
            {LOCALES.map((locale) => (
              <option value={locale} key={locale}>
                {locale.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <button className={styles['sign-out-button']} aria-label="Sign out" title="sign out">
          <SvgImage url={'/sign-out-sprite.svg#signOut'} className={styles.svg} />
        </button>
      </div>
    </header>
  );
}
