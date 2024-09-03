import { SearchParams } from '@/types';
import { MethodType } from '@/types/restful';

export default async function getRestfulData(
  method: MethodType,
  url: string,
  searchParams?: SearchParams,
  body?: string,
) {
  console.log('body: ', body, typeof body);
  const data: unknown =
    body !== undefined
      ? await fetch(url, { method: method, headers: searchParams, body })
          .then((res) => res.json())
          .catch((error: Error) => {
            console.log(error);
          })
      : await fetch(url, { method: method, headers: searchParams })
          .then((res) => res.json())
          .catch((error: Error) => {
            console.log(error);
          });

  return data;
}
