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
import { auth } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { Routes } from '@/constants/routes';
import RouterLink from '../RouterLink/RouterLink';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { checkAuthStatus } from '@/utils/check-auth-status';

function Header(): React.ReactNode {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const [selectValue, setSelectValue] = useState(isLocaleCorrect(locale) ? locale : '');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // console.log('USER IN HEADER', user);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const handleStickyHeader = () => {
    setIsHeaderSticky(window.scrollY > 0);
  };

  useEffect(() => {
    handleStickyHeader();
  }, []);

  const fetchAuthStatus = async () => {
    try {
      const userData = await checkAuthStatus();
      console.log('userData IN HEADER', userData);
      setIsLogged(userData?.isLogged || false);
    } catch {
      setIsLogged(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchAuthStatus();
  });

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
    router.push(`${pathname.replace(locale, newLocale)}?${searchParams.toString()}`, { scroll: true });
  }

  const handleSignOut = async () => {
    await signOut(auth);

    try {
      const response = await fetch('/api/signout', {
        method: 'POST',
      });

      console.log('SignOut IN HEADER');
      if (response.status === 200) {
        await fetchAuthStatus();
        // setIsLogged(false);
        router.push(`/${locale}`);
      }
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

        {isLoading ? (
          <CircularProgress size={24} />
        ) : isLogged ? (
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
