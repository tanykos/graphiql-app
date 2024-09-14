import { handleVariables } from '@/components/Variables/handle-variable-input-change';
import updateURLQueryParams from '@/utils/update-url-query-params';

export type QueryParamArr = string[][];

export const queryParamsToQueriesEntries = (queryParams: string): QueryParamArr =>
  queryParams
    .slice(1)
    .split('&')
    .map((str: string) => str.split('='));

const assignQueryParamArr = (): [] | QueryParamArr => {
  if (!queryParams) return [];
  const queriesEntries: QueryParamArr = queryParamsToQueriesEntries(queryParams);
  return queriesEntries;
};

let queryParams = global.window ? window.location.search : '';

let queriesEntries: QueryParamArr = assignQueryParamArr();

const joinQueryParams = () => {
  queryParams = queriesEntries
    .map(([key, value]) => {
      return `${key ?? ''}${key || value ? '=' : ''}${value ?? ''}`;
    })
    .join('&');
  queryParams = queryParams ? `?${queryParams}` : '';
};

const handleHeaderInputChange = (
  ev: InputEvent,
  fieldType: 'key' | 'value',
  pathname: string,
  variables: string[][],
) => {
  queryParams = global.window ? window.location.search : '';
  queriesEntries = assignQueryParamArr();
  if (ev.target instanceof HTMLInputElement) {
    const thisValue = ev.target.value.trim();
    const thisHeaderNumber = +ev.target.name.split('_')[1];

    if (!queriesEntries[thisHeaderNumber - 1]) queriesEntries[thisHeaderNumber - 1] = [];
    if (fieldType === 'key') {
      queriesEntries[thisHeaderNumber - 1][0] = thisValue;
    } else {
      queriesEntries[thisHeaderNumber - 1][1] = thisValue;
    }
    joinQueryParams();
    updateURLQueryParams(pathname, handleVariables(queryParams, variables));
  }
};

export default handleHeaderInputChange;
