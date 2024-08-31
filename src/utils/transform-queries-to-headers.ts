import { SearchParams } from '@/types';

export default function transformQueriesToHeaders(queries: SearchParams | undefined): SearchParams | '' {
  if (!queries) return '';

  const queriesEntries = Object.entries(queries);

  const obj: SearchParams = {};
  for (let i = 1; i <= queriesEntries.length; i += 1) {
    obj[`key_${i}`] = `${queriesEntries[i - 1][0]}`;
    obj[`value_${i}`] = `${queriesEntries[i - 1][1]}`;
  }
  return obj;
}
