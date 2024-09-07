import { MethodType } from '@/types/restful';

export default function updateURLMethodParam(pathname: string, method: MethodType) {
  const methodParam = pathname.split('/')[2];
  const updatedURL = pathname.replace(methodParam, method);
  window.history.replaceState({}, '', updatedURL);
}
