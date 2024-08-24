'use client';

import { METHODS } from '@/const';
import style from './restful.module.scss';
import { useContext } from 'react';
import { DictionaryContext } from '@/providers/dictionary-provider';

export default function Client() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  return (
    <form className={style.form}>
      <fieldset className={style.requestFieldset}>
        <legend>{dictionary.request}</legend>

        <div className={style.formInputLine}>
          <div className={style.formUnit}>
            <label htmlFor="method-label">{dictionary.method}</label>
            <select id="method-label" name="Method" className={style.select}>
              {METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div className={style.formUnit}>
            <label htmlFor="url">URL</label>
            <input className={style.inputUrl} id="url" name="URL" />
          </div>
          <button type="submit" className={style.submit}>
            {dictionary.send}
          </button>
        </div>

        <div className={style.formUnit}>
          <div className={style.headersTitleWrapper}>
            <p className={style.headersTitle}>{dictionary.headers}</p>
            <button>{dictionary.addHeader}</button>
          </div>
          <table className={style.headersTable}>
            <tbody>
              <tr>
                <th className={style.headersTableKeys}>{dictionary.key}</th>
                <th>{dictionary.value}</th>
              </tr>
              <tr>
                <td>
                  <input type="text" className={style.headersInput} placeholder={dictionary.key} />
                </td>
                <td>
                  <input type="text" className={style.headersInput} placeholder={dictionary.value} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={style.bodyTitleWrapper}>
          <label htmlFor="body-label">{dictionary.body.request}</label>
        </div>
        <textarea className={style.bodyRequest} id="body-label" rows={4} cols={30} />
      </fieldset>

      <fieldset className={style.responseFieldset}>
        <legend>{dictionary.response}</legend>
        <p className={style.statusTitle}>{dictionary.status}</p>
        <div className={style.statusValue}></div>
        <p className={style.bodyTitle}>{dictionary.body.response}</p>
        <div className={style.bodyValue}></div>
      </fieldset>
    </form>
  );
}
