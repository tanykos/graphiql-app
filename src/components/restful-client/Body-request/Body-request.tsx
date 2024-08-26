import { useContext } from 'react';
import style from './Body-request.module.scss';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

export default function BodyRequest() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 4px;
    color: ${grey[900]};
    background: #fff;
    border-color: ${grey[400]};
    border-width: 1px;
    // color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

    &:hover {
      border-color: ${grey[800]};
    }

    &:focus {
      border-color: ${blue[600]};
      border-width: 2px;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  return (
    <div>
      <p className={style.bodyTitle}>{dictionary.body.request}</p>

      <Textarea minRows={3} aria-label="Body" placeholder="Body" defaultValue="" />
    </div>
  );
}
