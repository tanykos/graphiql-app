export type GraphQlRequest = {
  endpointUrl: string;
  sdlUrl: string;
  documentation: string;
  query: string;
};

export type GraphQlRequestField = keyof GraphQlRequest;

export type GraphQlUrlParams = {
  lang: string;
  base64endpoint: string;
  base64body: string;
};
