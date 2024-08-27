export default function getEncodedString(value: string): string | undefined {
  try {
    return btoa(value);
  } catch {
    return undefined;
  }
}
