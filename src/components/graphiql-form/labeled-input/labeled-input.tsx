'use client';

import styles from './labeled-input.module.css';
import { UseFormRegister } from 'react-hook-form';
import { GraphQlRequest, GraphQlRequestField } from '@/types/graphql';
import { useContext } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';

export default function LabeledInput({
  field,
  register,
  onChange,
  isRequired = false,
}: {
  field: GraphQlRequestField;
  register: UseFormRegister<GraphQlRequest>;
  onChange?: (event: React.ChangeEvent) => void;
  isRequired?: boolean;
}) {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return (
    <div className={styles['labeled-input']}>
      <label>
        <p>{dictionary.graphql[field]}</p>
      </label>
      <input type="text" {...register(field, { onChange: onChange })} required={isRequired}></input>
    </div>
  );
}
