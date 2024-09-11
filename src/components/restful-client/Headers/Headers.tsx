import style from './Headers.module.scss';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { FormControl, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { RestfulFormFields } from '@/types/restful';
import queriesNumberToArray from '@/components/restful-client/Headers/queries-number-to-array';
import { usePathname } from 'next/navigation';
import handleHeaderInputChange from './handle-header-input-change';
import TableContainer from '@mui/material/TableContainer';

import dynamic from 'next/dynamic';

const Table = dynamic(() => import('@mui/material/Table'), { ssr: false });

interface Props {
  register: UseFormRegister<RestfulFormFields>;
}

export default function Headers({ register }: Props) {
  const [rows, setRows] = useState(queriesNumberToArray());
  const pathname = usePathname();

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const handleAddHeader = () => {
    setRows([...rows, rows.length + 1]);
  };

  return (
    <>
      <div className={style.headersTitleWrapper}>
        <p className={style.headersTitle}>{dictionary.headers}</p>
        <Button type="button" variant="outlined" size="medium" className={style.button} onClick={handleAddHeader}>
          {dictionary.addHeader}
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
        <Table>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow key={`row${row}`}>
                  <TableCell className={style.tdStyle}>
                    <FormControl className={style.nestedInput}>
                      <TextField
                        label={dictionary.key}
                        variant="outlined"
                        size="small"
                        {...register(`key_${row}`, {
                          onChange: (e: InputEvent) => handleHeaderInputChange(e, 'key', pathname),
                        })}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell className={style.tdStyle}>
                    <FormControl className={style.nestedInput}>
                      <TextField
                        label={dictionary.value}
                        variant="outlined"
                        size="small"
                        {...register(`value_${row}`, {
                          onChange: (e: InputEvent) => handleHeaderInputChange(e, 'value', pathname),
                        })}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
