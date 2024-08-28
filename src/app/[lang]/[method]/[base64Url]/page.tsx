import { RestfulParams } from '@/types/restful';
import RestfulClientForm from '../../restful/page';
import getDecodedStr from '@/utils/get-decoded-string';
import getRestfulData from '@/api/get-restful-data';

export default async function RestfulFilledFormPage({ params }: { params: RestfulParams }) {
  const url = getDecodedStr(params.base64Url);
  const method = params.method;

  let response: unknown;
  if (url) response = await getRestfulData(method, url);

  return <RestfulClientForm params={params} response={response} />;
}
