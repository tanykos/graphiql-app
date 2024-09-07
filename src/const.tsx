import { Locale } from './types';

export const LOCALES: Locale[] = ['en', 'ru'];
export const DEFAULT_LOCALE = 'en';

export const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;
export const DEFAULT_METHOD = 'GET';

export const REQUESTS_HISTORY = 'requestsHistory';
export const REQUESTS_SEPARATOR = '*';

export const CLIENT_PARAM = {
  restful: 'restful',
  graphiql: 'graphiql',
  GRAPHQL: 'GRAPHQL',
};
