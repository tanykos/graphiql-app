import CodeMirror from '@uiw/react-codemirror';
import { Control, FieldValues, Controller } from 'react-hook-form';
import { RestfulFormFields } from '@/types/restful';
import { useContext } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import style from './Body-editor.module.scss';

interface Props {
  control: Control<RestfulFormFields, FieldValues>;
}

function BodyEditor({ control }: Props) {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return (
    <fieldset className={style.bodyFieldset}>
      <legend className={style.bodyTitle}>{dictionary.body.request}</legend>
      <Controller
        name="body"
        control={control}
        render={({ field }) => (
          <CodeMirror
            {...field}
            height="100px"
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
    </fieldset>
  );
}
export default BodyEditor;
