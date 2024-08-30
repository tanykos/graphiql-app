import { SearchParams } from '@/types/restful';

export default function transformSearchParamsToUrlQuery(searchParams: SearchParams): string {
  let query = '';
  for (const [key, value] of Object.entries(searchParams)) {
    query = `${query}${query.includes('?') ? '&' : '?'}${key}=${value}`;
  }
  return query;
}
