'use client';

import styles from './graphiql-form.module.css';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext } from 'react';
import { useForm } from 'react-hook-form';
import LabeledInput from './labeled-input/labeled-input';
import { GraphQlRequest, GraphQlUrlParams } from '@/types/graphql';
import getDecodedStr from '@/utils/get-decoded-string';
import { DictionaryContext } from '@/providers/dictionary-provider';
import getLocale from '@/utils/get-locale';
import getEncodedString from '@/utils/get-encoded-string';

export default function GraphiQlForm({ params }: { params?: GraphQlUrlParams }) {
  const { register, handleSubmit, watch } = useForm<GraphQlRequest>({
    defaultValues: {
      endpointUrl: params ? getDecodedStr(params.base64endpoint) : '',
      query: params ? getDecodedStr(params.base64body) : '',
    },
  });
  const pathname = usePathname();
  const router = useRouter();

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const onSubmit = () => {
    const locale = getLocale(pathname);
    const endpoint = watch('endpointUrl');
    const base64endpoint = getEncodedString(endpoint);
    const body = watch('query');
    const base64body = getEncodedString(body);

    if (base64endpoint && base64body !== undefined) router.push(`/${locale}/GRAPHQL/${base64endpoint}/${base64body}`);
  };

  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        void handleSubmit(onSubmit)();
      }}
      className={styles['graphiql-form']}
    >
      <div className={styles['main-row']}>
        <LabeledInput field="endpointUrl" register={register} isRequired={true} />
        <input type="submit" value={dictionary.send} />
      </div>
      <LabeledInput field="query" register={register} />
    </form>
  );
}
