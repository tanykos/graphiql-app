import style from '../Headers/Headers.module.scss';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { FormControl, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import handleVariableInputChange from './handle-variable-input-change';

interface Props {
  variables: string[][];
  setVariables: Dispatch<SetStateAction<string[][]>>;
}

export default function Variables({ variables, setVariables }: Props) {
  const [rows, setRows] = useState<number[] | undefined>();

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const handleAddVariable = () => {
    if (rows) {
      setRows([...rows, rows.length + 1]);
    } else setRows([1]);
    setVariables([...variables, []]);
  };

  return (
    <div>
      <div className={style.headersTitleWrapper}>
        <p className={style.headersTitle}>{dictionary.variables}</p>
        <Button type="button" variant="outlined" size="medium" className={style.button} onClick={handleAddVariable}>
          {dictionary.addVariable}
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
                        label={dictionary.name}
                        variant="outlined"
                        size="small"
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariableInputChange(ev, 'name', row, variables)
                        }
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell className={style.tdStyle}>
                    <FormControl className={style.nestedInput}>
                      <TextField
                        label={dictionary.value}
                        variant="outlined"
                        size="small"
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariableInputChange(ev, 'value', row, variables)
                        }
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
