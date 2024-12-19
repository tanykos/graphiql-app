import styles from './history.module.scss';
import { Locale } from '@/types';
import getDictionary from '../dictionaries';
import dynamic from 'next/dynamic';

const Requests = dynamic(() => import('@/components/requests/requests'), { ssr: false });

export default async function RequestsHistory({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <h2 className={styles.title}>{dictionary.requestsHistory}</h2>
      <section className={styles.requests}>
        <Requests />
      </section>
    </>
  );
}
