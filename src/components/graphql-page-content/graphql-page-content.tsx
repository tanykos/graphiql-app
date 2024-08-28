import getGraphQlSchema from '@/api/get-graphql-schema';
import { GraphQlUrlParams } from '@/types/graphql';
import getDecodedStr from '@/utils/get-decoded-string';
import GraphiQlForm from '../graphiql-form/graphiql-form';
import getGraphQlData from '@/api/get-graphql-data';

export default async function GraphQlPageContent({ params }: { params: GraphQlUrlParams }) {
  const endpoint = getDecodedStr(params.base64endpoint);
  const query = params.base64body ? getDecodedStr(params.base64body) : '';

  let response: unknown;
  if (endpoint !== undefined && query !== undefined) response = await getGraphQlData(endpoint, query);
  console.log('response:', response); // response will be passed as props later

  let doc: object | undefined;
  if (endpoint) doc = await getGraphQlSchema(endpoint);

  return <GraphiQlForm params={params} documentation={doc} />;
}
