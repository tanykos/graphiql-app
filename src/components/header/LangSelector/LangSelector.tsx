import SvgImage from '@/components/svg-image/svg-image';
import styles from './LangSelector.module.scss';
import { useContext, useState } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { LOCALES } from '@/const';
import isLocaleCorrect from '@/utils/is-locale-correct';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import getLocale from '@/utils/get-locale';
import { TEST_ID } from '@/__tests__/test-ids';

export default function LangSelector(): React.ReactNode {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const [selectValue, setSelectValue] = useState(isLocaleCorrect(locale) ? locale : '');

  const searchParams = useSearchParams();
  const router = useRouter();

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  function handleLocaleChange(event: React.ChangeEvent) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    setSelectValue(event.target.value);
    const newLocale = event.target.value;
    router.push(`${pathname.replace(locale, newLocale)}?${searchParams.toString()}`, { scroll: true });
  }

  return (
    <div className={styles.lang}>
      <label htmlFor="select">
        <SvgImage url={'/globe-sprite.svg#lang'} className={styles.svg} ariaLabel={dictionary.icons.globe} />
      </label>
      <select id="select" onChange={handleLocaleChange} value={selectValue} data-testid={TEST_ID.langSelector}>
        <option></option>
        {LOCALES.map((locale) => (
          <option value={locale} key={locale}>
            {locale.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
