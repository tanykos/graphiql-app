import { QueryParamArr } from '@/components/Headers/handle-header-input-change';

export default function transformQueryParamsToHeaders(queryParams: string): { [key: string]: string } | '' {
  const queriesEntries: QueryParamArr = queryParams
    .slice(1)
    .split('&')
    .map((str: string) => str.split('='));
  const obj: { [key: string]: string } = {};
  queriesEntries.forEach(([key, value], index) => {
    obj[`key_${index + 1}`] = key;
    obj[`value_${index + 1}`] = value;
  });
  return obj;
}
