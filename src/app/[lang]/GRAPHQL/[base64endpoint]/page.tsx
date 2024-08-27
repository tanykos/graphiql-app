import getGraphQlData from '@/api/get-graphql-data';
import GraphiQlForm from '@/components/graphiql-form/graphiql-form';
import { GraphQlUrlParams } from '@/types/graphql';
import getDecodedStr from '@/utils/get-decoded-string';

export default async function GraphiQlClient({ params }: { params: GraphQlUrlParams }): Promise<React.ReactNode> {
  const endpoint = getDecodedStr(params.base64endpoint);

  let response: unknown;
  if (endpoint) response = await getGraphQlData(endpoint);
  console.log('response:', response); // response will be passed as props later

  return <GraphiQlForm params={params} />;
}
