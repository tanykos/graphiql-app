import style from './Headers.module.scss';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { FormControl, TextField } from '@mui/material';

export default function Headers() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return (
    <>
      <div className={style.headersTitleWrapper}>
        <p className={style.headersTitle}>{dictionary.headers}</p>
        <Button type="submit" variant="contained" size="medium" className={style.button}>
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
            <TableRow>
              <TableCell>
                <FormControl className={style.nestedInput}>
                  <TextField label={dictionary.key} variant="outlined" size="small" />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl className={style.nestedInput}>
                  <TextField label={dictionary.value} variant="outlined" size="small" />
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
