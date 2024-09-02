export default function getDecodedStr(base64Url: string): string | undefined {
  try {
    const base64Str = base64Url.replaceAll('_', '/').replaceAll('-', '+');
    const decodedStr = atob(base64Str);
    return decodedStr;
  } catch {
    return undefined;
  }
}
