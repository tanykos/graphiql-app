export default function getDecodedStr(urlParam: string): string | undefined {
  try {
    const base64Str = urlParam.replaceAll('%3D', '=');
    const decodedStr = atob(base64Str);
    return decodedStr;
  } catch {
    return undefined;
  }
}
