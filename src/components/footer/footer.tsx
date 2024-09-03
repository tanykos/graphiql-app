import Link from 'next/link';
import SvgImage from '../svg-image/svg-image';
import styles from './footer.module.scss';

export default function Footer(): React.ReactNode {
  const developers = [
    { name: 'Tetiana', github: 'tanykos' },
    { name: 'Tanya', github: 'pambaka' },
    { name: 'Artyom', github: 'gunsnfnr' },
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
        <SvgImage url="/footer-icons-sprite.svg#rss" className={styles.github} ariaLabel="RS School, React course" />
      </Link>
    </footer>
  );
}
