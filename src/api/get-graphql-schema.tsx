import getValidUrl from './get-valid-url';

export default async function getGraphQlSchema(endpoint: string): Promise<object | undefined> {
  const schemaQuery = '{ __schema { types { name fields { name } } } }';

  let response: object | undefined;

  const endpointUrl = getValidUrl(endpoint);

  await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: schemaQuery }),
  })
    .then((res: Response) => {
      if (res.ok) return res.json();
      return undefined;
    })
    .then((data: object) => {
      if (data) response = data;
    })
    .catch((error: Error) => error);

  return response;
}
