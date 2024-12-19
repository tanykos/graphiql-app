export default function getEncodedString(value: string): string | undefined {
  try {
    const base64Str = btoa(value);
    const base64Url = base64Str.replaceAll('/', '_').replace('+', '-');
    return base64Url;
  } catch {
    return undefined;
  }
}
