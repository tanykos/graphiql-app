'use client';

import styles from './graphiql-form.module.scss';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
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
import Variables from '../Variables/Variables';
import { substituteVariables } from '../Variables/handle-variable-input-change';
import transformHeadersToQueries from '@/utils/transform-headers-to-queries';
import { Button } from '@mui/material';
import getGraphQlSchema from '@/api/get-graphql-schema';

export default function GraphiQlForm({
  params,
  documentation = undefined,
}: {
  params?: GraphQlUrlParams;
  documentation?: object | undefined;
}) {
  const queryParamsReturned = global.window ? window.location.search : '';

  const [docValue, setDocValue] = useState(documentation ? JSON.stringify(documentation) : '');

  const { register, handleSubmit, watch, control, getValues } = useForm<GraphQlRequest>({
    defaultValues: {
      endpointUrl: params ? getDecodedStr(params.base64endpoint) : '',
      ...transformQueryParamsToHeaders(queryParamsReturned),
      query: params && params.base64body ? getDecodedStr(params.base64body) : '',
    },
  });
  const [sdlUrlValue, setSdlUrlValue] = useState(() => {
    const endpointUrl = watch('endpointUrl');
    return endpointUrl ? `${endpointUrl}?sdl` : '';
  });

  const pathname = usePathname();
  const router = useRouter();

  const [, saveToLocalStorage] = useLocalStorageHistory();

  const [variables, setVariables] = useState<string[][]>([]);

  const [getButtonClicked, setGetButtonClicked] = useState(false);
  useEffect(() => {
    if (!getButtonClicked) return;

    const getDoc = async () => {
      const data = await getGraphQlSchema(sdlUrlValue);
      setDocValue(JSON.stringify(data));
    };
    getDoc().catch(() => {});

    setGetButtonClicked(false);
  }, [getButtonClicked, sdlUrlValue]);

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const onSubmit = () => {
    const endpoint = watch('endpointUrl');
    const base64endpoint = getEncodedString(substituteVariables(endpoint, variables));
    const body = watch('query');
    const base64body = getEncodedString(substituteVariables(body, variables));
    const queryParamsToSend = transformHeadersToQueries(getValues());

    if (base64endpoint && base64body !== undefined) {
      const locale = getLocale(pathname);
      const path = `/${locale}/GRAPHQL/${base64endpoint}/${base64body}${substituteVariables(queryParamsToSend, variables)}`;
      saveToLocalStorage(path);
      router.push(path);
    }
  };

  const handleEndpointUrlChange = (event: React.ChangeEvent) => {
    const processedEnpointParam = substituteVariables(watch('endpointUrl'), variables);
    updateUrlEndpointParam(pathname, processedEnpointParam);

    if (!(event.target instanceof HTMLInputElement)) return;

    if (sdlUrlValue === '' || sdlUrlValue.includes('?sdl'))
      setSdlUrlValue(`${event.target.value ? event.target.value + '?sdl' : ''}`);
  };

  const handleQueryChange = () => {
    updateUrlBodyParam(pathname, substituteVariables(watch('query'), variables));
  };

  const handleSdlUrlChange = (event: React.ChangeEvent) => {
    if (event.target instanceof HTMLInputElement) {
      setSdlUrlValue(event.target.value);
    }
  };

  const QueryEditor = ({ field }: { field: ControllerRenderProps<GraphQlRequest, 'query'> }) => (
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
          <Button type="submit" variant="contained" size="medium" className={styles.button}>
            {dictionary.send}
          </Button>
        </div>
        <div className={styles['main-row']}>
          <LabeledInput field="sdlUrl" register={register} value={sdlUrlValue} onChange={handleSdlUrlChange} />
          <Button variant="outlined" size="medium" className={styles.button} onClick={() => setGetButtonClicked(true)}>
            {dictionary.getDocumentation}
          </Button>
        </div>
        <Headers register={register} variables={variables} />
        <div className={styles.editors}>
          {docValue && (
            <FieldsetWrapper className={styles.documentation} legendText={dictionary.graphql.documentation}>
              <JsonFormatter json={docValue as JsonObject} tabWith={2} />
            </FieldsetWrapper>
          )}
          <FieldsetWrapper className={styles.query} legendText={dictionary.graphql.query}>
            <Controller name="query" control={control} render={QueryEditor} />
          </FieldsetWrapper>
        </div>
        <Variables variables={variables} setVariables={setVariables} />
      </form>
    </FieldsetWrapper>
  );
}
