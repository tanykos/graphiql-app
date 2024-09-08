import updateURLQueryParams from '@/utils/update-url-query-params';

type QueryParamArr = string[][];

const assignQueryParamArr = (): [] | QueryParamArr => {
  let queryParamArr: QueryParamArr;
  if (!queryParams) {
    queryParamArr = [];
  } else {
    queryParamArr = queryParams
      .slice(1)
      .split('&')
      .map((str: string) => str.split('='));
  }
  return queryParamArr;
};

let queryParams = window.location.search ?? '';
const queryParamArr: QueryParamArr = assignQueryParamArr();

const joinQueryParams = () => {
  const queryParamsArrPairsJoined: string[] = [];
  queryParams = queryParamArr
    .map(([key, value], index) => {
      queryParamsArrPairsJoined[index] = `${key ?? ''}${key || value ? '=' : ''}${value ?? ''}`;
      return queryParamsArrPairsJoined[index];
    })
    .join('&');
  queryParams = `${queryParams ? '?' : ''}${queryParams}`;
};

const handleHeaderInputChange = (e: InputEvent, fieldType: 'key' | 'value', pathname: string) => {
  if (e.target instanceof HTMLInputElement) {
    const thisValue = e.target.value;
    const thisHeaderNumber = +e.target.name.slice(-1);

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
