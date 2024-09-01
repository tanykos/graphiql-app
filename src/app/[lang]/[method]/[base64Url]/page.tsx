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
  const method = params.method;

  let response: unknown;
  if (url) response = await getRestfulData(method, url, searchParams);

  return <RestfulClientForm params={params} response={response} searchParams={searchParams} />;
}
