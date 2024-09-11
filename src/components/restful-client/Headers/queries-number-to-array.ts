import {
  QueryParamArr,
  queryParamsToQueriesEntries,
} from '@/components/restful-client/Headers/handle-header-input-change';

const queriesNumberToArray = (): number[] => {
  const queryParams = global.window ? window.location.search : '';

  if (!queryParams) return [1];
  const queriesEntries: QueryParamArr = queryParamsToQueriesEntries(queryParams);

  if (!queriesEntries || !queriesEntries.length) return [1];

  const arr = [];
  for (let i = 1; i <= queriesEntries.length; i += 1) {
    arr.push(i);
  }
  return arr;
};

export default queriesNumberToArray;
