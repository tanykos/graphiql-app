import { MethodType, SearchParams } from '@/types/restful';
import transformSearchParamsToUrlQuery from '@/utils/transform-search-params-to-url';

export default async function getRestfulData(method: MethodType, url: string, searchParams?: SearchParams) {
  let queryParams = '';

  if (searchParams) queryParams = transformSearchParamsToUrlQuery(searchParams);
  const data: unknown = await fetch(`${url}${queryParams}`, { method: method })
    .then((res) => res.json())
    .catch((error: Error) => {
      console.log(error);
    });

  return data;
}
