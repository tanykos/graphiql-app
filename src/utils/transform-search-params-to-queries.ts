import { SearchParams } from '@/types';

export default function transformSearchParamsToQueries(searchParams: SearchParams): string {
  let query = '';
  for (const [key, value] of Object.entries(searchParams)) {
    query = `${query}${query.includes('?') ? '&' : '?'}${key}=${value}`;
  }
  return query;
}
