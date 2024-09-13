export const defaultScheme = 'https://';

export default function isValidUrl(endpoint: string) {
  return endpoint.startsWith('http://') || endpoint.startsWith('https://');
}
