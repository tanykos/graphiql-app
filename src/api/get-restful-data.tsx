import { ApiResponse, SearchParams } from '@/types';
import { MethodType } from '@/types/restful';
import getValidUrl from './get-valid-url';

export default async function getRestfulData(
  method: MethodType,
  url: string,
  searchParams?: SearchParams,
  body?: string,
): Promise<ApiResponse> {
  const endpointUrl = getValidUrl(url);
  const response: ApiResponse = { data: undefined, status: { code: undefined, text: undefined } };
  const options = body ? { method: method, headers: searchParams, body } : { method: method, headers: searchParams };
  await fetch(endpointUrl, options)
    .then((res: Response) => {
      response.status.code = res.status;
      response.status.text = res.statusText;
      return res.json();
    })
    .then((data: object) => {
      response.data = data;
    })
    .catch((error: Error) => error);

  return response;
}
