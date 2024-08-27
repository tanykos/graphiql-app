'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import style from './restful.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { METHODS } from '@/const';
import { DictionaryContext } from '@/providers/dictionary-provider';
import Headers from '@/components/restful-client/Headers/Headers';
import BodyRequest from '@/components/restful-client/Body-request/Body-request';

export default function Client() {
  const [method, setMethod] = useState('GET');
  const handleChange = (event: SelectChangeEvent) => {
    setMethod(event.target.value);
  };

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return (
    <form className={style.restful}>
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
              onChange={handleChange}
              className={style.select}
              size="small"
            >
              {METHODS.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={style.inputUrl}>
            <TextField id="url" label="URL" variant="outlined" size="small" />
          </FormControl>
          <Button type="submit" variant="contained" size="medium" className={style.button}>
            {dictionary.send}
          </Button>
        </div>
        <Headers />
        <BodyRequest />
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
