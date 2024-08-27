export default async function getGraphQlData(endpoint: string, query?: string): Promise<unknown> {
  const bodyQuery = query ? `query ${query}` : '';

  // TODO specify data type to replace 'unknown'
  let response: unknown;
  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: bodyQuery }),
  })
    .then((res: Response) => {
      return res.json();
    })
    .then((data) => {
      response = data;
    })
    .catch((error: Error) => error);

  return response;
}
