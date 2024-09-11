'use client';

import styles from './header.module.scss';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import SvgImage from '@/components/svg-image/svg-image';
import { DEFAULT_LOCALE, LOCALES } from '@/const';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import isLocaleCorrect from '@/utils/is-locale-correct';
import getLocale from '@/utils/get-locale';
import { Routes } from '@/constants/routes';
import RouterLink from '../RouterLink/RouterLink';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { UserContext } from '@/providers/user-provider';
import Logo from './Logo/Logo';

function Header(): React.ReactNode {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const [selectValue, setSelectValue] = useState(isLocaleCorrect(locale) ? locale : '');

  const searchParams = useSearchParams();
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
  const userContext = useContext(UserContext);
  const { user, logout, fetchAuthStatus } = userContext!;

  if (!dictionary) return;

  function handleLocaleChange(event: React.ChangeEvent) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    setSelectValue(event.target.value);
    const newLocale = event.target.value;
    router.push(`${pathname.replace(locale, newLocale)}?${searchParams.toString()}`, { scroll: true });
  }

  const handleSignOut = async () => {
    await logout();
    await fetchAuthStatus();
    router.push(`/${locale}`);
  };

  return (
    <header className={`${styles.header} ${isHeaderSticky && styles.sticky}`}>
      <div className={styles.backdrop}></div>
      <nav>
        <Link
          href={`/${DEFAULT_LOCALE}`}
          className={pathname === `/${DEFAULT_LOCALE}` ? styles.inactive : styles.active}
        >
          <Logo />
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

        {!user ? (
          <CircularProgress size={24} />
        ) : user.isLogged ? (
          <>
            <RouterLink href={Routes.MAIN} tooltip={dictionary.icons.toMain} type="iconButton">
              <HomeIcon />
            </RouterLink>

            <Tooltip title={dictionary.icons.signOut}>
              <IconButton color="primary" onClick={() => void handleSignOut()}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <RouterLink href={Routes.SIGN_IN} tooltip={dictionary.main.signin} type="iconButton">
              <LoginIcon />
            </RouterLink>

            <RouterLink href={Routes.SIGN_UP} tooltip={dictionary.main.signup} type="iconButton">
              <AppRegistrationIcon />
            </RouterLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
