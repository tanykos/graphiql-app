import style from './Headers.module.scss';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { memo, useContext, useState } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { FormControl, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { RestfulFormFields } from '@/types/restful';
import queriesNumberToArray from '@/utils/queries-number-to-array';
import { SearchParams } from '@/types';
import { usePathname } from 'next/navigation';
import updateURLQueryParams from '@/utils/update-url-query-params';

interface Props {
  register: UseFormRegister<RestfulFormFields>;
  searchParams?: SearchParams;
}

type QueryParamPair = [string, string] | [];
type QueryParamArr = QueryParamPair[];

const Headers = memo(function Headers({ register, searchParams }: Props) {
  const [rows, setRows] = useState(queriesNumberToArray(searchParams));
  const pathname = usePathname();

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const handleAddHeader = () => {
    setRows([...rows, rows.length + 1]);
  };

  const queryParamArr: QueryParamArr = [];

  let queryParams = window.location.search ?? '';
  console.log('queryParams: ', queryParams);
  const queryParamsArrPairsJoined: string[] = [];
  function joinQueryParams() {
    queryParams = queryParamArr
      .map(([key, value], index) => {
        queryParamsArrPairsJoined[index] = `${key ? key : ''}${key || value ? '=' : ''}${value ? value : ''}`;
        return queryParamsArrPairsJoined[index];
      })
      .join('&');
    queryParams = `${queryParams ? '?' : ''}${queryParams}`;
  }

  const handleKeyChange = (e: InputEvent, fieldType: 'key' | 'value') => {
    if (e.target instanceof HTMLInputElement) {
      const thisValue = e.target.value;
      const thisHeaderNumber = +e.target.name.slice(-1);

      if (!queryParamArr[thisHeaderNumber - 1]) queryParamArr[thisHeaderNumber - 1] = [];
      if (fieldType === 'key') {
        queryParamArr[thisHeaderNumber - 1][0] = thisValue;
      } else {
        queryParamArr[thisHeaderNumber - 1][1] = thisValue;
      }
      joinQueryParams();
      updateURLQueryParams(pathname, queryParams);
    }
  };

  return (
    <>
      <div className={style.headersTitleWrapper}>
        <p className={style.headersTitle}>{dictionary.headers}</p>
        <Button type="button" variant="outlined" size="medium" className={style.button} onClick={handleAddHeader}>
          {dictionary.addHeader}
        </Button>
      </div>
      <TableContainer component={Paper}>
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
                        {...register(`key_${row}`, { onChange: (e: InputEvent) => handleKeyChange(e, 'key') })}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell className={style.tdStyle}>
                    <FormControl className={style.nestedInput}>
                      <TextField
                        label={dictionary.value}
                        variant="outlined"
                        size="small"
                        {...register(`value_${row}`, { onChange: (e: InputEvent) => handleKeyChange(e, 'value') })}
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
});

export default Headers;
