'use client';

import { createContext } from 'react';
import { Dictionary } from '@/app/[lang]/dictionaries';
import defaultDictionary from '@/app/[lang]/dictionaries/en.json' with { type: 'json' };

export const DictionaryContext = createContext<Dictionary>(defaultDictionary);

export default function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}): React.ReactNode {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}
