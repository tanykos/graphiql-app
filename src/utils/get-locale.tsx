export default function getLocale(pathname: string): string {
  try {
    const locale = pathname.split('/')[1];
    return locale ? locale : '';
  } catch {
    return '';
  }
}
