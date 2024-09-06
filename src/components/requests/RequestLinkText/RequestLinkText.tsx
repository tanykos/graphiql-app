import styles from './RequestLinkText.module.scss';
import getDecodedString from '@/utils/get-decoded-string';

export default function RequestLinkText({ urlParams }: { urlParams: string[] }) {
  const [clientParam, endpointParam, bodyParam] = urlParams;
  const endpoint = getDecodedString(endpointParam) ?? '';
  const body = getDecodedString(bodyParam) ?? '';

  return (
    <p className={styles.text}>
      {`${clientParam} ${endpoint} `}
      {body && <span>{body}</span>}
    </p>
  );
}
