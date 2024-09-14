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
import Logo from './Logo/Logo';
import LangSelector from './LangSelector/LangSelector';

interface HeaderProps {
  user: User | null;
}

function Header({ user }: HeaderProps): React.ReactNode {
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
  if (!dictionary) return;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push(`/${locale}`);
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
        {user ? (
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

export default withAuth(Header);
