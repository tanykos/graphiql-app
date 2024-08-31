import { SearchParams } from '@/types';

export default function transformSearchParamsToHeaders(
  searchParams: SearchParams | undefined,
): { [key: string]: string } | '' {
  if (!searchParams) return '';

  const queriesEntries = Object.entries(searchParams);

  const obj: { [key: string]: string } = {};
  for (let i = 1; i <= queriesEntries.length; i += 1) {
    obj[`key_${i}`] = `${queriesEntries[i - 1][0]}`;
    obj[`value_${i}`] = `${queriesEntries[i - 1][1]}`;
  }
  return obj;
}
