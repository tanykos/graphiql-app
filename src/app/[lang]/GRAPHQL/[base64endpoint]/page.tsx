import { GraphQlUrlParams } from '@/types/graphql';
import GraphQlPageContent from '@/components/graphql-page-content/graphql-page-content';
import { SearchParams } from '@/types';

export default function GraphiQlClient({
  params,
  searchParams,
}: {
  params: GraphQlUrlParams;
  searchParams: SearchParams;
}): React.ReactNode {
  return <GraphQlPageContent params={params} searchParams={searchParams} />;
}
