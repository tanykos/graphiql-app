import styles from './FieldsetWrapper.module.scss';
import { useContext } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';

export default function FieldsetWrapper({
  legendText,
  children,
}: {
  legendText: 'request' | 'response';
  children: React.ReactNode;
}): React.ReactNode {
  const dictionary = useContext(DictionaryContext);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{dictionary ? dictionary[legendText] : legendText}</legend>
      {children}
    </fieldset>
  );
}
