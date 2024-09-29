'use client';

import styles from './header.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import LangSelector from './LangSelector/LangSelector';

function Header(): React.ReactNode {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const router = useRouter();

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const correctLocale = isLocaleCorrect(locale) ? locale : DEFAULT_LOCALE;

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

  const handleSignOut = async () => {
    await logout();
    await fetchAuthStatus();
    router.push(`/${locale}`);
  };

  const isMainPath = (pathname: string) => LOCALES.some((locale) => pathname === `/${locale}`);

  return (
    <header className={`${styles.header} ${isHeaderSticky && styles.sticky}`}>
      <div className={styles.backdrop}></div>
      <nav>
        <Link href={`/${correctLocale}`} className={isMainPath(pathname) ? styles.inactive : styles.active}>
          <Logo />
        </Link>
      </nav>
      <div className={styles.controls}>
        <LangSelector />
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
