import { QueryParamArr } from '@/components/restful-client/Headers/handle-header-input-change';

export default function queriesNumberToArray(): number[] {
  const queryParams = global.window ? window.location.search : '';

  if (!queryParams) return [1];
  const queriesEntries: QueryParamArr = queryParams
    .slice(1)
    .split('&')
    .map((str: string) => str.split('='));
  if (!queriesEntries || !queriesEntries.length) return [1];

  const arr = [];
  for (let i = 1; i <= queriesEntries.length; i += 1) {
    arr.push(i);
  }
  return arr;
}
