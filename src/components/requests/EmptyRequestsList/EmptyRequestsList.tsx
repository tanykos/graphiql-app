'use client';

import styles from './EmptyRequestsList.module.scss';
import RouterLink from '@/components/RouterLink/RouterLink';
import { ButtonsTypes } from '@/const';
import { Routes } from '@/constants/routes';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { useContext } from 'react';

export default function EmptyRequestsList() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const pageButtons = [
    { href: Routes.RESTFUL_CLIENT, text: dictionary.restClient },
    { href: Routes.GRAPHQL_CLIENT, text: dictionary.graphClient },
  ];

  return (
    <div className={styles.empty}>
      <p>{dictionary.historyPage.emptyMessage}</p>
      <div className={styles.buttons}>
        {pageButtons.map(({ href, text }, index) => (
          <RouterLink key={index} type="button" href={href} variantBtn={ButtonsTypes.CONTAINED}>
            {text}
          </RouterLink>
        ))}
      </div>
    </div>
  );
}
