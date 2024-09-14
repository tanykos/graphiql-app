import styles from './NotFoundPage.module.scss';
import { ButtonsTypes, DEFAULT_LOCALE } from '@/const';
import getDictionary from '../dictionaries';
import RouterLink from '@/components/RouterLink/RouterLink';
import { Routes } from '@/constants/routes';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default async function NotFoundPage({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params?.lang || DEFAULT_LOCALE);

  return (
    <Box className={styles.wrapper}>
      <Image src="/not-found.png" alt={`${dictionary.pageNotFound}`} width={200} height={100} />
      <Typography variant="h4" sx={{ mt: 3 }}>
        {dictionary.pageNotFound}
      </Typography>
      <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
        {dictionary.sorryMessage}
      </Typography>
      <RouterLink type="button" href={Routes.MAIN} variantBtn={ButtonsTypes.CONTAINED}>
        {dictionary.goToHome}
      </RouterLink>
    </Box>
  );
}
