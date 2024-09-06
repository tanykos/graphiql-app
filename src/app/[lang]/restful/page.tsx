import ResponseViewer from '@/components/response-viewer/response-viewer';
import RestfulClientForm from '@/components/restful-client/RestfulClientForm';
import style from './restful.module.scss';

export default function RestfulClient() {
  return (
    <div className={style.restful}>
      <RestfulClientForm />
      <ResponseViewer />
    </div>
  );
}
