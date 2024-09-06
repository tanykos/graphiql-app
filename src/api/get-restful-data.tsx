import { ApiResponse, SearchParams } from '@/types';
import { MethodType } from '@/types/restful';

export default async function getRestfulData(
  method: MethodType,
  url: string,
  searchParams?: SearchParams,
  body?: string,
): Promise<ApiResponse> {
  const response: ApiResponse = { data: undefined, status: { code: undefined, text: undefined } };
  console.log('body: ', body);
  const options = body ? { method: method, headers: searchParams, body } : { method: method, headers: searchParams };
  console.log('options: ', options);
  const data: unknown = await fetch(url, options)
    .then((res: Response) => {
      response.status.code = res.status;
      response.status.text = res.statusText;
      return res.json();
    })
    .catch((error: Error) => {
      console.log(error);
    });
  response.data = data;

  return response;
}
