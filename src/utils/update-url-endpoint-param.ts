import { CLIENT_PARAM, DEFAULT_METHOD } from '@/const';
import getEncodedString from './get-encoded-string';

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

    endpointParam = '';
  }

  return `${locale}/${clientParam}/${endpointParam}${bodyParam && '/'}${bodyParam}`;
}
