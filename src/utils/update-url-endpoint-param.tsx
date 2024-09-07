import { CLIENT_PARAM, DEFAULT_METHOD, METHODS } from '@/const';
import getEncodedString from './get-encoded-string';
import { MethodType } from '@/types/restful';

export default function updateUrlEndpointParam(pathname: string, endpoint: string): string {
  const pathParams = pathname.split('/');
  const [, locale, , , bodyParam = ''] = pathParams;
  let [, , clientParam, endpointParam] = pathParams;

  if (endpoint) {
    if (clientParam === CLIENT_PARAM.graphiql) clientParam = CLIENT_PARAM.GRAPHQL;
    else if (clientParam === CLIENT_PARAM.restful) clientParam = DEFAULT_METHOD;

    endpointParam = getEncodedString(endpoint) ?? '';
  } else {
    if (!bodyParam && clientParam === CLIENT_PARAM.GRAPHQL) clientParam = CLIENT_PARAM.graphiql;
    else if (!bodyParam && METHODS.includes(clientParam as MethodType)) clientParam = CLIENT_PARAM.restful;

    endpointParam = '';
  }

  return `${locale}/${clientParam}/${endpointParam}/${bodyParam}`;
}
