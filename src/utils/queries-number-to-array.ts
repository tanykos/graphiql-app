import { SearchParams } from '@/types';

export default function queriesNumberToArray(searchParams: SearchParams | undefined): number[] {
  if (!searchParams || !Object.entries(searchParams).length) return [1];

  const arr = [];
  for (let i = 1; i <= Object.entries(searchParams).length; i += 1) {
    arr.push(i);
  }
  return arr;
}
