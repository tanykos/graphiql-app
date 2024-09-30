'use client';

import styles from './requests.module.scss';
import { REQUESTS_SEPARATOR } from '@/const';
import useLocalStorageHistory from '@/hooks/use-local-storage-history';
import getLocale from '@/utils/get-locale';
import { usePathname } from 'next/navigation';
import RequestLinkText from './RequestLinkText/RequestLinkText';
import EmptyRequestsList from './EmptyRequestsList/EmptyRequestsList';

export default function Requests(): React.ReactNode {
  const [requests] = useLocalStorageHistory();

  const pathname = usePathname();
  const locale = getLocale(pathname);

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
            <a href={`/${locale}/${urlParams.join('/')}`} className={styles.link} key={index}>
              <RequestLinkText urlParams={urlParams} />
            </a>
          ))
          .reverse()}
      {!requests && <EmptyRequestsList />}
    </>
  );
}
