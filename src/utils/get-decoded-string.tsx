export default function getDecodedString(base64Url: string): string | undefined {
  try {
    const base64Str = base64Url.replaceAll('_', '/').replaceAll('-', '+').replaceAll('%3D', '=');
    const decodedStr = atob(base64Str);
    return decodedStr;
  } catch {
    return undefined;
  }
}
