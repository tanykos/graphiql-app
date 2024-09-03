import { SearchParams } from '@/types';
import { MethodType } from '@/types/restful';

export default async function getRestfulData(
  method: MethodType,
  url: string,
  searchParams?: SearchParams,
  body?: string,
) {
  const options =
    body !== undefined ? { method: method, headers: searchParams, body } : { method: method, headers: searchParams };
  const data: unknown = await fetch(url, options)
    .then((res) => res.json())
    .catch((error: Error) => {
      console.log(error);
    });

  return data;
}
