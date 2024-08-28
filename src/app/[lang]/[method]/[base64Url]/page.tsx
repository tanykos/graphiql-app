import { RestfulParams } from '@/types/restful';
import RestfulClientForm from '../../restful/page';
import getDecodedStr from '@/utils/get-decoded-string';
import getRestfulData from '@/api/get-restful-data';

export default async function page({ params }: { params: RestfulParams }) {
  console.log('params: ', params);
  const url = getDecodedStr(params.base64Url);

  let response: unknown;
  if (url) response = await getRestfulData(url);

  return <RestfulClientForm params={params} response={response} />;
}
