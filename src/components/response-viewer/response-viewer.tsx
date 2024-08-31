'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import styles from './response-viewer.module.scss';
import { ApiResponse } from '@/types';
import { useContext } from 'react';

export default function ResponseViewer({ response }: { response?: ApiResponse }) {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  // TODO add JSON Viewer
  return (
    <fieldset className={styles['response-wrapper']}>
      <legend>{dictionary.response}</legend>
      <div className={styles.response}>
        <p>
          {`${dictionary.status}:`} <span className={styles['status-code']}>{response && response.status.code}</span>{' '}
          {response && response.status.text && (
            <span className={styles['status-text']}>{`(${response.status.text})`}</span>
          )}
        </p>
        <div>
          <p>{`${dictionary.body.response}:`}</p>
          <pre>{response && JSON.stringify(response.data, null, 2)}</pre>
        </div>
      </div>
    </fieldset>
  );
}
