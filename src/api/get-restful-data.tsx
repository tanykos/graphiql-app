export default async function getRestfulData(url: string) {
  const data: unknown = await fetch(url)
    .then((res) => res.json())
    .catch((error: Error) => {
      console.log(error);
    });
  console.log('data: ', data);
  return data;
}
