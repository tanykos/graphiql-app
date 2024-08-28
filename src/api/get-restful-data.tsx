import { MethodType } from '@/types/restful';

export default async function getRestfulData(method: MethodType, url: string) {
  const data: unknown = await fetch(url, { method: method })
    .then((res) => res.json())
    .catch((error: Error) => {
      console.log(error);
    });
  return data;
}
