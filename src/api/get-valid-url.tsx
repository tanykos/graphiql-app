const defaultProtocol = 'https://';

export default function getValidUrl(url: string): string {
  const validUrl = url.includes('://') ? url : `${defaultProtocol}${url}`;
  return validUrl;
}
