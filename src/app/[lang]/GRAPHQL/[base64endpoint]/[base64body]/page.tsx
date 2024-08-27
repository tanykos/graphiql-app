import getGraphQlData from '@/api/get-graphql-data';
import GraphiQlForm from '@/components/graphiql-form/graphiql-form';
import { GraphQlUrlParams } from '@/types/graphql';
import getDecodedStr from '@/utils/get-decoded-string';

export default async function GraphiQlClient({ params }: { params: GraphQlUrlParams }): Promise<React.ReactNode> {
  const endpoint = getDecodedStr(params.base64endpoint);
  const query = getDecodedStr(params.base64body);

  let response: unknown;
  if (endpoint !== undefined && query !== undefined) response = await getGraphQlData(endpoint, query);
  console.log('response:', response); // response will be passed as props later

  return <GraphiQlForm params={params} />;
}
