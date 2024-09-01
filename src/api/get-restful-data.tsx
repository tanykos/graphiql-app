import { SearchParams } from '@/types';
import { MethodType } from '@/types/restful';
export default async function getRestfulData(method: MethodType, url: string, searchParams?: SearchParams) {
  const data: unknown = await fetch(url, { method: method, headers: searchParams })
    .then((res) => res.json())
    .catch((error: Error) => {
      console.log(error);
    });

  return data;
}
