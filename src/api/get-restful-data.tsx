import { SearchParams } from '@/types';
import { MethodType } from '@/types/restful';
import transformSearchParamsToQueries from '@/utils/transform-search-params-to-queries';

export default async function getRestfulData(method: MethodType, url: string, searchParams?: SearchParams) {
  let queryParams = '';

  if (searchParams) queryParams = transformSearchParamsToQueries(searchParams);
  const data: unknown = await fetch(`${url}${queryParams}`, { method: method })
    .then((res) => res.json())
    .catch((error: Error) => {
      console.log(error);
    });

  return data;
}
