import CodeMirror from '@uiw/react-codemirror';
import { Control, FieldValues, Controller, UseFormGetValues } from 'react-hook-form';
import { RestfulFormFields } from '@/types/restful';
import { useContext } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import style from './BodyEditor.module.scss';
import updateUrlBodyParam from '@/utils/update-url-body-param';
import { usePathname } from 'next/navigation';
import { handleVariables } from '@/components/Variables/handle-variable-input-change';

interface Props {
  control: Control<RestfulFormFields, FieldValues>;
  getValues: UseFormGetValues<RestfulFormFields>;
  variables: string[][];
}

function BodyEditor({ control, getValues, variables }: Props) {
  const pathname = usePathname();
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const handleBodyEdit = () => {
    updateUrlBodyParam(pathname, handleVariables(getValues().body, variables));
  };

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
            onBlur={handleBodyEdit}
          />
        )}
      />
    </fieldset>
  );
}
export default BodyEditor;
