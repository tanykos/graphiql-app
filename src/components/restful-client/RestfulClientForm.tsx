'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { FormEvent, useContext, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import style from './restful.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { METHODS } from '@/const';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import getLocale from '@/utils/get-locale';
import getEncodedString from '@/utils/get-encoded-string';
import getDecodedStr from '@/utils/get-decoded-string';
import { MethodType, RestfulFormFields, RestfulParams } from '@/types/restful';
import transformHeadersToQueries from '@/utils/transform-headers-to-queries';
import BodyEditor from '@/components/restful-client/BodyEditor/BodyEditor';
import updateUrlEndpointParam from '@/utils/update-url-endpoint-param';
import updateURLMethodParam from '@/utils/update-url-method-param';
import transformQueryParamsToHeaders from '@/utils/transform-query-params-to-headers';
import Headers from '@/components/Headers/Headers';
import FieldsetWrapper from '../FieldsetWrapper/FieldsetWrapper';
import useLocalStorageHistory from '@/hooks/use-local-storage-history';

export default function RestfulClientForm({ params }: { params?: RestfulParams }) {
  const [method, setMethod] = useState(params && METHODS.includes(params.method) ? params.method : 'GET');
  const pathname = usePathname();
  const handleChange = (event: SelectChangeEvent) => {
    setMethod(event.target.value as MethodType);
    updateURLMethodParam(pathname, event.target.value as MethodType);
  };
  const queryParamsReturned = global.window ? window.location.search : '';

  const { handleSubmit, register, getValues, control } = useForm<RestfulFormFields>({
    mode: 'onChange',
    defaultValues: {
      method,
      url: params ? getDecodedStr(params.base64Url) : '',
      ...transformQueryParamsToHeaders(queryParamsReturned),
      body: params && params.base64Body ? getDecodedStr(params.base64Body) : '',
    },
  });
  const router = useRouter();
  const [, saveToLocalStorage] = useLocalStorageHistory();

  const onSubmit = () => {
    const values = getValues();
    const locale = getLocale(pathname);
    const base64Url = getEncodedString(values.url);
    const base64Body = getEncodedString(values.body);
    const queryParamsToSend = transformHeadersToQueries(values);

    if (base64Url && base64Body !== undefined) {
      const path = `/${locale}/${values.method}/${base64Url}/${base64Body}${queryParamsToSend}`;
      saveToLocalStorage(path);
      router.push(path);
    }
  };

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const handleEndpointUrlChange = () => {
    updateUrlEndpointParam(pathname, getValues().url);
  };

  return (
    <FieldsetWrapper legendText={dictionary.request}>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
      >
        <div className={style.formInputLine}>
          <FormControl size="small">
            <InputLabel id="method-label">{dictionary.method}</InputLabel>
            <Select
              labelId="method-label"
              id="method"
              value={method}
              label="Method"
              className={style.select}
              size="small"
              MenuProps={{
                disableScrollLock: true,
                marginThreshold: null,
              }}
              {...register('method', { onChange: handleChange })}
            >
              {METHODS.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={style.inputUrl}>
            <TextField
              id="url"
              label="URL"
              variant="outlined"
              size="small"
              {...register('url', {
                onChange: handleEndpointUrlChange,
                required: { value: true, message: 'Enter URL' },
              })}
            />
          </FormControl>
          <Button type="submit" variant="contained" size="medium" className={style.button}>
            {dictionary.send}
          </Button>
        </div>
        <Headers register={register} />
        <BodyEditor control={control} getValues={getValues} />
      </form>
    </FieldsetWrapper>
  );
}
