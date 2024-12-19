export default function updateURLQueryParams(pathname: string, queryParams: string) {
  const path = pathname.split('?')[0];
  const updatedURL = `${path}${queryParams}`;
  window.history.replaceState({}, '', updatedURL);
}
