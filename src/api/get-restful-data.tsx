import { ApiResponse, SearchParams } from '@/types';
import { MethodType } from '@/types/restful';

export default async function getRestfulData(
  method: MethodType,
  url: string,
  searchParams?: SearchParams,
  body?: string,
): Promise<ApiResponse> {
  const response: ApiResponse = { data: undefined, status: { code: undefined, text: undefined } };
  const options = body ? { method: method, headers: searchParams, body } : { method: method, headers: searchParams };
  await fetch(url, options)
    .then((res: Response) => {
      response.status.code = res.status;
      response.status.text = res.statusText;
      return res.json();
    })
    .then((data) => {
      response.data = data;
    })
    .catch((error: Error) => error);

  return response;
}
