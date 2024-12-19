import styles from '../../app/[lang]/graphiql/graphiql.module.css';

import getGraphQlSchema from '@/api/get-graphql-schema';
import { GraphQlUrlParams } from '@/types/graphql';
import getDecodedStr from '@/utils/get-decoded-string';
import GraphiQlForm from '../graphiql-form/graphiql-form';
import getGraphQlData from '@/api/get-graphql-data';
import ResponseViewer from '../response-viewer/response-viewer';
import { ApiResponse } from '@/types';

export default async function GraphQlPageContent({
  params,
  searchParams,
}: {
  params: GraphQlUrlParams;
  searchParams: Record<string, string>;
}) {
  const endpoint = getDecodedStr(params.base64endpoint);
  const query = params.base64body ? getDecodedStr(params.base64body) : '';

  let response: ApiResponse | undefined;
  if (endpoint !== undefined && query !== undefined) response = await getGraphQlData(endpoint, searchParams, query);

  let doc: object | undefined;
  if (endpoint) doc = await getGraphQlSchema(endpoint);

  return (
    <div className={styles.wrapper}>
      <GraphiQlForm params={params} documentation={doc} />
      <ResponseViewer response={response} />
    </div>
  );
}
