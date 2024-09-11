import Link from 'next/link';
import SvgImage from '../svg-image/svg-image';
import styles from './footer.module.scss';
import getDictionary from '../../app/[lang]/dictionaries';
import { Locale } from '@/types';
import { use } from 'react';

export default function Footer({ locale }: { locale: Locale }): React.ReactNode {
  const dictionary = use(getDictionary(locale));

  const developers = [
    { name: dictionary.main.surnameTanyaK, github: 'tanykos' },
    { name: dictionary.main.surnameTanyaT, github: 'pambaka' },
    { name: dictionary.main.surnameArtyom, github: 'gunsnfnr' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.developers}>
        {developers.map((developer) => {
          return (
            <Link
              href={`https://github.com/${developer.github}`}
              target={'_blank'}
              key={developer.github}
              title={developer.name}
            >
              <SvgImage
                url="/footer-icons-sprite.svg#github"
                className={styles.github}
                ariaLabel={`${developer.github} github`}
              />
            </Link>
          );
        })}
      </div>
      <p>2024</p>
      <Link href="https://rs.school/courses/reactjs" target={'_blank'} title="RS School React">
        <SvgImage
          url="/footer-icons-sprite.svg#rss"
          className={styles.github}
          ariaLabel={dictionary.icons.rsSchoolReact}
        />
      </Link>
    </footer>
  );
}
