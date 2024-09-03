import { SearchParams } from '@/types';
import { MethodType } from '@/types/restful';

export default async function getRestfulData(
  method: MethodType,
  url: string,
  searchParams?: SearchParams,
  body?: string,
) {
  console.log('body: ', body);
  const options = body ? { method: method, headers: searchParams, body } : { method: method, headers: searchParams };
  console.log('options: ', options);
  const data: unknown = await fetch(url, options)
    .then((res) => res.json())
    .catch((error: Error) => {
      console.log(error);
    });

  return data;
}
