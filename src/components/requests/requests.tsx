'use client';

import styles from './requests.module.scss';
import { REQUESTS_SEPARATOR } from '@/const';
import useLocalStorageHistory from '@/hooks/use-local-storage-history';
import { DictionaryContext } from '@/providers/dictionary-provider';
import getLocale from '@/utils/get-locale';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import RequestLinkText from './RequestLinkText/RequestLinkText';

export default function Requests(): React.ReactNode {
  const [requests] = useLocalStorageHistory();

  const pathname = usePathname();
  const locale = getLocale(pathname);

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  // TODO add query params
  const getRequestsUrlParams = (requests: string) => {
    const arr = requests.split(REQUESTS_SEPARATOR);

    return arr.map((request) => {
      const [, , clientParam, endpointParam, bodyParam] = request.split('/');
      return [clientParam, endpointParam, bodyParam];
    });
  };

  return (
    <>
      {requests &&
        getRequestsUrlParams(requests)
          .map((urlParams: string[], index: number) => (
            <Link href={`/${locale}/${urlParams.join('/')}`} className={styles.link} key={index}>
              <RequestLinkText urlParams={urlParams} />
            </Link>
          ))
          .reverse()}
      {!requests && <p>{dictionary.historyPage.emptyMessage}</p>}
    </>
  );
}
