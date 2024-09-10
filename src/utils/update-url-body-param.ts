import { CLIENT_PARAM, DEFAULT_METHOD } from '@/const';
import getEncodedString from './get-encoded-string';
import updateUrl from './update-url';

export default function updateUrlBodyParam(pathname: string, body: string): void {
  const pathParams = pathname.split('/');
  const [, locale, , endpointParam = ''] = pathParams;
  let [, , clientParam, , bodyParam] = pathParams;
  const queryParams = global.window ? window.location.search : '';

  if (body) {
    if (clientParam === CLIENT_PARAM.graphiql) clientParam = CLIENT_PARAM.GRAPHQL;
    else if (clientParam === CLIENT_PARAM.restful) clientParam = DEFAULT_METHOD;

    bodyParam = getEncodedString(body) ?? '';
  } else {
    if (!endpointParam && clientParam === CLIENT_PARAM.GRAPHQL) clientParam = 'graphiql';

    bodyParam = '';
  }

  updateUrl(`/${locale}/${clientParam}/${endpointParam}/${bodyParam}${queryParams}`);
}
