import { CLIENT_PARAM } from '@/const';

export enum Routes {
  MAIN = '',
  SIGN_UP = 'sign-up',
  SIGN_IN = 'sign-in',
  RESTFUL_CLIENT = 'restful',
  GRAPHQL_CLIENT = 'graphiql',
  HISTORY = 'history',
}

export const PUBLIC_ROUTES = [Routes.SIGN_IN, Routes.SIGN_UP];

export const PROTECTED_ROUTES = {
  ...CLIENT_PARAM,
  history: Routes.HISTORY,
};

export enum RouteAccessTypes {
  PUBLIC = 'public',
  PROTECTED = 'protected',
}
