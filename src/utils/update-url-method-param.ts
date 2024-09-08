import { MethodType } from '@/types/restful';

export default function updateURLMethodParam(pathname: string, method: MethodType) {
  const methodParam = pathname.split('/')[2];
  const updatedPathname = pathname.replace(methodParam, method);

  const searchParams = window.location.search;
  window.history.replaceState({}, '', `${updatedPathname}${searchParams}`);
}
