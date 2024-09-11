import { RestfulParams } from '@/types/restful';
import getDecodedStr from '@/utils/get-decoded-string';
import getRestfulData from '@/api/get-restful-data';
import { ApiResponse, SearchParams } from '@/types';
import RestfulClientForm from '@/components/restful-client/RestfulClientForm';
import ResponseViewer from '@/components/response-viewer/response-viewer';
import style from '../../restful/restful.module.scss';

export default async function RestfulFilledFormPage({
  params,
  searchParams,
}: {
  params: RestfulParams;
  searchParams: SearchParams;
}) {
  const url = getDecodedStr(params.base64Url);
  const method = params.method;
  let body: string | undefined = '';
  if (params.base64Body) body = getDecodedStr(params.base64Body);

  let response: ApiResponse | undefined;
  if (url) response = await getRestfulData(method, url, searchParams, body);

  return (
    <div className={style.restful}>
      <RestfulClientForm params={params} />
      <ResponseViewer response={response} />
    </div>
  );
}
