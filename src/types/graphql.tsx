export type GraphQlRequest = {
  endpointUrl: string;
  sdlUrl: string;
  documentation: string;
  query: string;
  [key: string]: string;
};

type GraphQlRequestWoHeaders = Pick<GraphQlRequest, 'endpointUrl' | 'sdlUrl' | 'documentation' | 'query'>;
export type GraphQlRequestField = keyof GraphQlRequestWoHeaders;

export type GraphQlUrlParams = {
  lang: string;
  base64endpoint: string;
  base64body: string;
};
