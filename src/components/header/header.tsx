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
import { auth } from '../../../firebaseConfig';
import { signOut, User } from 'firebase/auth';
import { Routes } from '@/constants/routes';
import RouterLink from '../RouterLink/RouterLink';
import { IconButton, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import withAuth from '@/hoc/withAuth';

interface HeaderProps {
  user: User | null;
}

function Header({ user }: HeaderProps): React.ReactNode {
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push(`/${locale}`);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
            <SvgImage url={'/globe-sprite.svg#lang'} className={styles.svg} ariaLabel={dictionary.icons.globe} />
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

        {user ? (
          <>
            <RouterLink href={Routes.MAIN}>
              <Tooltip title={dictionary.icons.toMain}>
                <IconButton color="primary" aria-label={dictionary.icons.toMain}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </RouterLink>

            <Tooltip title={dictionary.icons.signOut}>
              <IconButton color="primary" onClick={() => void handleSignOut()}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <RouterLink href={Routes.SIGN_IN}>
              <Tooltip title={dictionary.main.signin}>
                <IconButton color="primary" aria-label={dictionary.main.signin}>
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            </RouterLink>

            <RouterLink href={Routes.SIGN_UP}>
              <Tooltip title={dictionary.main.signup}>
                <IconButton color="primary" aria-label={dictionary.main.signup}>
                  <AppRegistrationIcon />
                </IconButton>
              </Tooltip>
            </RouterLink>
          </>
        )}
      </div>
    </header>
  );
}

export default withAuth(Header);
