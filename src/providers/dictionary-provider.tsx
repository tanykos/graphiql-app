'use client';

import { createContext } from 'react';
import { Dictionary } from '@/app/[lang]/dictionaries';

export const DictionaryContext = createContext<Dictionary | null>(null);

export default function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}): React.ReactNode {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}
