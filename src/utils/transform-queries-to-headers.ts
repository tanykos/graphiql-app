import { SearchParams } from '@/types/restful';

export default function transformQueriesToHeaders(queries: SearchParams | undefined) {
  if (!queries) return '';

  interface ObjectKeys {
    [key: string]: string;
  }

  const obj: ObjectKeys = {};
  for (let i = 1; i <= Object.entries(queries).length; i += 1) {
    obj[`key_${i}`] = `${Object.entries(queries)[i - 1][0]}`;
    obj[`value_${i}`] = `${Object.entries(queries)[i - 1][1]}`;
  }
  return obj;
}
