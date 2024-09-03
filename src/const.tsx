import { Locale } from './types';

export const LOCALES: Locale[] = ['en', 'ru'];

export const DEFAULT_LOCALE = 'en';

export const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;

export const REQUESTS_HISTORY = 'requestsHistory';

export const REQUESTS_SEPARATOR = '*';
