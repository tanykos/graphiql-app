'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { useContext } from 'react';

function TestRoute(): React.ReactNode {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return <p>{dictionary.testRoute}</p>;
}

export default TestRoute;
