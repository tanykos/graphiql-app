'use client';

import styles from './header.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SvgImage from '@/components/svg-image/svg-image';
import { DEFAULT_LOCALE, LOCALES } from '@/const';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import isLocaleCorrect from '@/utils/is-locale-correct';

export default function Header(): React.ReactNode {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const [selectValue, setSelectValue] = useState(isLocaleCorrect(locale) ? locale : '');

  const router = useRouter();

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  function handleLocaleChange(event: React.ChangeEvent) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    setSelectValue(event.target.value);
    const newLocale = event.target.value;
    router.push(`${pathname.replace(locale, newLocale)}`);
  }

  return (
    <header className={styles.header}>
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
            <SvgImage url={'/globe-sprite.svg#lang'} className={styles.svg} />
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
        <button className={styles['sign-out-button']} aria-label="sign out" title="sign out">
          <SvgImage url={'/sign-out-sprite.svg#signOut'} className={styles.svg}></SvgImage>
        </button>
      </div>
    </header>
  );
}
