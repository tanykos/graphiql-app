'use client';

import { REQUESTS_SEPARATOR } from '@/const';
import useLocalStorageHistory from '@/hooks/use-local-storage-history';
import { DictionaryContext } from '@/providers/dictionary-provider';
import getDecodedStr from '@/utils/get-decoded-string';
import { useContext } from 'react';

export default function Requests(): React.ReactNode {
  const [requests] = useLocalStorageHistory();

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  // TODO Rewrite requests handler, make it universal (working for both api clients), this is a temporary solution
  const getRequests = (requests: string) => {
    const arr = requests.split(REQUESTS_SEPARATOR);

    return arr.map((request) => {
      const arr = request.split('/');
      const apiClient = arr[2];
      const endpoint = getDecodedStr(arr[3]);
      const body = getDecodedStr(arr[4]) ?? '';

      return `${apiClient} ${endpoint} ${body}`;
    });
  };

  return (
    <>
      {requests &&
        getRequests(requests).map((request: string, index: number) => {
          return <p key={index}>{request}</p>;
        })}
      {!requests && <p>{dictionary.historyPage.emptyMessage}</p>}
    </>
  );
}
