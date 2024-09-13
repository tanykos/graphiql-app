export default function getLocale(pathname: string): string {
  const locale = pathname.split('/')[1];
  return locale ? locale : '';
}
