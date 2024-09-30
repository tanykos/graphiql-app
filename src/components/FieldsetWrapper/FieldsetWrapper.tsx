import styles from './FieldsetWrapper.module.scss';

export default function FieldsetWrapper({
  legendText,
  className = '',
  children,
}: {
  legendText: string;
  className?: string;
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <fieldset className={`${styles.fieldset} ${className}`}>
      <legend className={styles.legend}>{legendText}</legend>
      {children}
    </fieldset>
  );
}
