import updateURLQueryParams from '@/utils/update-url-query-params';

export type QueryParamArr = string[][];

const assignQueryParamArr = (): [] | QueryParamArr => {
  if (!queryParams) return [];
  const queryParamArr: QueryParamArr = queryParams
    .slice(1)
    .split('&')
    .map((str: string) => str.split('='));
  return queryParamArr;
};

let queryParams = global.window ? window.location.search : '';

let queryParamArr: QueryParamArr = assignQueryParamArr();

const joinQueryParams = () => {
  queryParams = queryParamArr
    .map(([key, value]) => {
      return `${key ?? ''}${key || value ? '=' : ''}${value ?? ''}`;
    })
    .join('&');
  queryParams = queryParams ? `?${queryParams}` : '';
};

const handleHeaderInputChange = (ev: InputEvent, fieldType: 'key' | 'value', pathname: string) => {
  queryParams = global.window ? window.location.search : '';
  queryParamArr = assignQueryParamArr();
  if (ev.target instanceof HTMLInputElement) {
    const thisValue = ev.target.value.trim();
    const thisHeaderNumber = +ev.target.name.split('_')[1];

    if (!queryParamArr[thisHeaderNumber - 1]) queryParamArr[thisHeaderNumber - 1] = [];
    if (fieldType === 'key') {
      queryParamArr[thisHeaderNumber - 1][0] = thisValue;
    } else {
      queryParamArr[thisHeaderNumber - 1][1] = thisValue;
    }
    joinQueryParams();
    updateURLQueryParams(pathname, queryParams);
  }
};

export default handleHeaderInputChange;
