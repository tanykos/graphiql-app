'use client';

import styles from './graphiql-form.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import LabeledInput from './labeled-input/labeled-input';
import { GraphQlRequest, GraphQlUrlParams } from '@/types/graphql';
import getDecodedStr from '@/utils/get-decoded-string';
import { DictionaryContext } from '@/providers/dictionary-provider';
import getLocale from '@/utils/get-locale';
import getEncodedString from '@/utils/get-encoded-string';
import useLocalStorageHistory from '@/hooks/use-local-storage-history';
import updateUrlEndpointParam from '@/utils/update-url-endpoint-param';
import updateUrlBodyParam from '@/utils/update-url-body-param';
import FieldsetWrapper from '../FieldsetWrapper/FieldsetWrapper';
import JsonFormatter, { JsonObject } from 'react-json-formatter';
import Headers from '../Headers/Headers';
import transformQueryParamsToHeaders from '@/utils/transform-query-params-to-headers';
import ReactCodeMirror from '@uiw/react-codemirror';

export default function GraphiQlForm({
  params,
  documentation = undefined,
}: {
  params?: GraphQlUrlParams;
  documentation?: object | undefined;
}) {
  const queryParamsReturned = global.window ? window.location.search : '';

  const { register, handleSubmit, watch, control } = useForm<GraphQlRequest>({
    defaultValues: {
      endpointUrl: params ? getDecodedStr(params.base64endpoint) : '',
      ...transformQueryParamsToHeaders(queryParamsReturned),
      query: params && params.base64body ? getDecodedStr(params.base64body) : '',
      documentation: documentation ? JSON.stringify(documentation) : '',
    },
  });
  const [sdlUrlValue, setSdlUrlValue] = useState(() => {
    const endpointUrl = watch('endpointUrl');
    return endpointUrl ? `${endpointUrl}?sdl` : '';
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [, saveToLocalStorage] = useLocalStorageHistory();

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const onSubmit = () => {
    const endpoint = watch('endpointUrl');
    const base64endpoint = getEncodedString(endpoint);
    const body = watch('query');
    const base64body = getEncodedString(body);

    if (base64endpoint && base64body !== undefined) {
      const locale = getLocale(pathname);
      const path = `/${locale}/GRAPHQL/${base64endpoint}/${base64body}?${searchParams.toString()}`;
      saveToLocalStorage(path);
      router.push(path);
    }
  };

  const handleEndpointUrlChange = (event: React.ChangeEvent) => {
    updateUrlEndpointParam(pathname, watch('endpointUrl'));

    if (!(event.target instanceof HTMLInputElement)) return;

    if (sdlUrlValue === '' || sdlUrlValue.includes('?sdl'))
      setSdlUrlValue(`${event.target.value ? event.target.value + '?sdl' : ''}`);
  };

  const handleQueryChange = () => {
    updateUrlBodyParam(pathname, watch('query'));
  };

  const handleSdlUrlChange = (event: React.ChangeEvent) => {
    if (event.target instanceof HTMLInputElement) {
      setSdlUrlValue(event.target.value);
    }
  };

  const CodeEditor = ({ field }: { field: ControllerRenderProps<GraphQlRequest, string> }) => (
    <ReactCodeMirror
      {...field}
      onChange={(value) => {
        field.onChange(value);
      }}
      onBlur={handleQueryChange}
    />
  );

  return (
    <FieldsetWrapper legendText={dictionary.request}>
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          void handleSubmit(onSubmit)();
        }}
        className={styles['graphiql-form']}
      >
        <div className={styles['main-row']}>
          <LabeledInput field="endpointUrl" register={register} onChange={handleEndpointUrlChange} isRequired={true} />
          <input type="submit" value={dictionary.send} />
        </div>
        <LabeledInput field="sdlUrl" register={register} value={sdlUrlValue} onChange={handleSdlUrlChange} />
        <Headers register={register} />
        <div className={styles.editors}>
          {documentation && (
            <FieldsetWrapper className={styles.documentation} legendText={dictionary.graphql.documentation}>
              <JsonFormatter json={documentation as JsonObject} tabWith={2} />
            </FieldsetWrapper>
          )}
          <FieldsetWrapper className={styles.query} legendText={dictionary.graphql.query}>
            <Controller name="query" control={control} render={CodeEditor} />
          </FieldsetWrapper>
        </div>
      </form>
    </FieldsetWrapper>
  );
}
