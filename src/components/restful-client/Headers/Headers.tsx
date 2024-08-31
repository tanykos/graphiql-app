import style from './Headers.module.scss';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { FormControl, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { RestfulFormFields } from '@/types/restful';
import queriesNumberToArray from '@/utils/queries-number-to-array';
import { SearchParams } from '@/types';

interface Props {
  register: UseFormRegister<RestfulFormFields>;
  queries?: SearchParams;
}

export default function Headers(props: Props) {
  const [rows, setRows] = useState(props.queries ? queriesNumberToArray(Object.entries(props.queries).length) : [1]);

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const handleAddHeader = () => {
    setRows([...rows, rows.length + 1]);
  };

  return (
    <>
      <div className={style.headersTitleWrapper}>
        <p className={style.headersTitle}>{dictionary.headers}</p>
        <Button type="button" variant="contained" size="medium" className={style.button} onClick={handleAddHeader}>
          {dictionary.addHeader}
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{dictionary.key}</TableCell>
              <TableCell>{dictionary.value}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow key={`row${row}`}>
                  <TableCell>
                    <FormControl className={style.nestedInput}>
                      <TextField
                        label={dictionary.key}
                        variant="outlined"
                        size="small"
                        {...props.register(`key_${row}`)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl className={style.nestedInput}>
                      <TextField
                        label={dictionary.value}
                        variant="outlined"
                        size="small"
                        {...props.register(`value_${row}`)}
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
