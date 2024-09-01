export default async function getGraphQlSchema(endpoint: string): Promise<object | undefined> {
  const schemaQuery = '{ __schema { types { name fields { name } } } }';

  let response: object | undefined;
  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: schemaQuery }),
  })
    .then((res: Response) => {
      return res.json();
    })
    .then((data: object) => {
      response = data;
    })
    .catch((error: Error) => error);

  return response;
}
