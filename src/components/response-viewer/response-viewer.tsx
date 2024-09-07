'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import styles from './response-viewer.module.scss';
import { ApiResponse } from '@/types';
import { useContext } from 'react';
import JsonFormatter, { JsonObject } from 'react-json-formatter';

export default function ResponseViewer({ response }: { response?: ApiResponse }) {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const jsonStyle = {
    propertyStyle: { color: '#533030' },
    stringStyle: { color: '#0e5a0e' },
    numberStyle: { color: '#774300' },
  };

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
          {response && <JsonFormatter json={response.data as JsonObject} tabWith={4} jsonStyle={jsonStyle} />}
        </div>
      </div>
    </fieldset>
  );
}
