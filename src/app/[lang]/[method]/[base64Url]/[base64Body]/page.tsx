import { SearchParams } from '@/types';
import { RestfulParams } from '@/types/restful';
import RestfulFilledFormPage from '../page';

export default function Page({ params, searchParams }: { params: RestfulParams; searchParams: SearchParams }) {
  return <RestfulFilledFormPage params={params} searchParams={searchParams} />;
}
