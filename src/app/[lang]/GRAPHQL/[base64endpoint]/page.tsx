import { GraphQlUrlParams } from '@/types/graphql';
import GraphQlPageContent from '@/components/graphql-page-content/graphql-page-content';

export default function GraphiQlClient({ params }: { params: GraphQlUrlParams }): React.ReactNode {
  return <GraphQlPageContent params={params} />;
}
