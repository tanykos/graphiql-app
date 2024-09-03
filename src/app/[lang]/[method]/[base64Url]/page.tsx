import { RestfulParams } from '@/types/restful';
import RestfulClientForm from '../../restful/page';
import getDecodedStr from '@/utils/get-decoded-string';
import getRestfulData from '@/api/get-restful-data';
import { SearchParams } from '@/types';

export default async function RestfulFilledFormPage({
  params,
  searchParams,
}: {
  params: RestfulParams;
  searchParams: SearchParams;
}) {
  const url = getDecodedStr(params.base64Url);
  console.log('params: ', params);
  const method = params.method;
  let body: string | undefined = '';
  if (params.base64Body) body = getDecodedStr(params.base64Body);
  console.log('body!: ', body);
  console.log('params: ', params);
  console.log('searchParams: ', searchParams);

  let response: unknown;
  if (url) response = await getRestfulData(method, url, searchParams, body);

  return <RestfulClientForm params={params} response={response} searchParams={searchParams} />;
}
