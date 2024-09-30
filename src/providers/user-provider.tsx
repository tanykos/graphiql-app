'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { checkAuthStatus } from '@/utils/check-auth-status';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

type UserContextType = {
  user: { isLogged: boolean; displayName: string } | null;
  logout: () => Promise<void>;
  fetchAuthStatus: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ isLogged: boolean; displayName: string } | null>(null);

  const fetchAuthStatus = async () => {
    try {
      const userData = await checkAuthStatus();

      setUser({
        isLogged: userData?.isLogged || false,
        displayName: userData?.displayName || '',
      });
    } catch {
      setUser({ isLogged: false, displayName: '' });
    }
  };

  useEffect(() => {
    void fetchAuthStatus();
  }, []);

  const logout = async () => {
    await signOut(auth);

    try {
      const response = await fetch('/api/signout', {
        method: 'POST',
      });

      if (response.status === 200) {
        await fetchAuthStatus();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }

    setUser({ isLogged: false, displayName: '' });
  };

  return <UserContext.Provider value={{ user, logout, fetchAuthStatus }}>{children}</UserContext.Provider>;
};
