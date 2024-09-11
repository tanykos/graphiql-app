import styles from './RouterLink.module.scss';
import NextLink from 'next/link';
import MuiButton from '@mui/material/Button';
import { usePathname } from 'next/navigation';
import { IconButton, Tooltip } from '@mui/material';
import { ButtonsTypes } from '@/const';

interface RouterLinkProps {
  type?: 'link' | 'button' | 'iconButton';
  href: string;
  children: React.ReactNode;
  variantBtn?: ButtonsTypes;
  [key: string]: string | React.ReactNode;
}

export default function RouterLink({ type = 'link', href, children, ...props }: RouterLinkProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const renderLinkContent = () => {
    if (type === 'button') {
      const { variantBtn, ...buttonProps } = props;
      return (
        <MuiButton variant={variantBtn} {...buttonProps}>
          {children}
        </MuiButton>
      );
    }
    if (type === 'iconButton') {
      const { tooltip, ...buttonProps } = props;
      return (
        <Tooltip title={tooltip} {...buttonProps}>
          <IconButton color="primary">{children}</IconButton>
        </Tooltip>
      );
    } else {
      return <>{children}</>;
    }
  };

  return (
    <NextLink href={`/${locale}/${href}`} passHref className={styles.link}>
      {renderLinkContent()}
    </NextLink>
  );
}
