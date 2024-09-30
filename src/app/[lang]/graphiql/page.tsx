import styles from './graphiql.module.css';

import GraphiQlForm from '@/components/graphiql-form/graphiql-form';
import ResponseViewer from '@/components/response-viewer/response-viewer';

export default function GraphiQL() {
  return (
    <div className={styles.wrapper}>
      <GraphiQlForm />
      <ResponseViewer />
    </div>
  );
}
