'use client';

import { REQUESTS_HISTORY, REQUESTS_SEPARATOR } from '@/const';
import { useState } from 'react';

export default function useLocalStorageHistory(): [string, (newRequest: string) => void] {
  const [requests, setRequests] = useState(() => {
    if (global.window) return localStorage.getItem(REQUESTS_HISTORY) ?? '';
    return '';
  });

  const saveToLocalStorage = (newRequest: string) => {
    const updatedRequests = requests + (requests ? REQUESTS_SEPARATOR : '') + newRequest;
    localStorage.setItem(REQUESTS_HISTORY, updatedRequests);
    setRequests(updatedRequests);
  };

  return [requests, saveToLocalStorage];
}
