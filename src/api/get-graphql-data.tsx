import { ApiResponse } from '@/types';
import getValidUrl from './get-valid-url';

export default async function getGraphQlData(
  endpoint: string,
  searchParams: Record<string, string>,
  query?: string,
): Promise<ApiResponse> {
  const bodyQuery = query ? `query ${query}` : '';

  const endpointUrl = getValidUrl(endpoint);

  const response: ApiResponse = { data: undefined, status: { code: undefined, text: undefined } };
  await fetch(endpointUrl, {
    method: 'POST',
    headers: searchParams,
    body: JSON.stringify({ query: bodyQuery }),
  })
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
