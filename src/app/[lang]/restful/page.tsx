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
import Headers from '@/components/restful-client/Headers/Headers';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import getLocale from '@/utils/get-locale';
import getEncodedString from '@/utils/get-encoded-string';
import getDecodedStr from '@/utils/get-decoded-string';
import { MethodType, RestfulFormFields, RestfulParams } from '@/types/restful';
import transformHeadersToQueries from '@/utils/transform-headers-to-queries';
import transformSearchParamsToHeaders from '@/utils/transform-search-params-to-headers';
import { SearchParams } from '@/types';
import BodyEditor from '@/components/restful-client/Body-editor/Body-editor';

export default function RestfulClientForm({
  params,
  response,
  searchParams,
}: {
  params?: RestfulParams;
  response?: unknown;
  searchParams?: SearchParams;
}) {
  if (response) console.log('response: ', response);

  const [method, setMethod] = useState(params && METHODS.includes(params.method) ? params.method : 'GET');
  const handleChange = (event: SelectChangeEvent) => {
    setMethod(event.target.value as MethodType);
  };
  const { handleSubmit, register, getValues, control } = useForm<RestfulFormFields>({
    mode: 'onChange',
    defaultValues: {
      method,
      url: params ? getDecodedStr(params.base64Url) : '',
      ...transformSearchParamsToHeaders(searchParams),
      body: params ? getDecodedStr(params.base64Body) : '',
    },
  });

  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = () => {
    const values = getValues();
    console.log('values: ', values);
    const locale = getLocale(pathname);
    const base64Url = getEncodedString(values.url);
    const base64Body = getEncodedString(values.body);
    const queryParams = transformHeadersToQueries(values);

    if (base64Url && base64Body !== undefined)
      router.push(`/${locale}/${values.method}/${base64Url}/${base64Body}${queryParams}`);
  };

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return (
    <form
      className={style.restful}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        void handleSubmit(onSubmit)();
      }}
    >
      <fieldset className={style.fieldset}>
        <legend className={style.sectionTitle}>{dictionary.request}</legend>
        <div className={style.formInputLine}>
          <FormControl size="small">
            <InputLabel id="method-label">Method</InputLabel>
            <Select
              labelId="method-label"
              id="method"
              value={method}
              label="Method"
              className={style.select}
              size="small"
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
              {...register('url', { required: { value: true, message: 'Enter URL' } })}
            />
          </FormControl>
          <Button type="submit" variant="contained" size="medium" className={style.button}>
            {dictionary.send}
          </Button>
        </div>
        <Headers register={register} searchParams={searchParams} />
        <BodyEditor control={control} />
      </fieldset>

      <fieldset className={style.fieldset}>
        <legend className={style.sectionTitle}>{dictionary.response}</legend>
        <p className={style.statusTitle}>{dictionary.status}</p>
        <div className={style.statusValue}></div>
        <p className={style.bodyTitle}>{dictionary.body.response}</p>
        <div className={style.bodyValue}></div>
      </fieldset>
    </form>
  );
}
