import { QueryParamArr } from '@/components/restful-client/Headers/handle-header-input-change';

export default function transformQueryParamsToHeaders(queryParams: string): { [key: string]: string } | '' {
  const queriesEntries: QueryParamArr = queryParams
    .slice(1)
    .split('&')
    .map((str: string) => str.split('='));
  const obj: { [key: string]: string } = {};
  queriesEntries.forEach(([key, value], index) => {
    console.log('key, value: ', key, value);
    obj[`key_${index + 1}`] = key;
    obj[`value_${index + 1}`] = value;
  });
  console.log('obj: ', obj);
  return obj;
}
