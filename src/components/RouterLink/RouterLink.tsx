import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import MuiButton from '@mui/material/Button';
import { DEFAULT_LOCALE } from '@/const';

interface RouterLinkProps {
  type?: 'link' | 'button';
  href: string;
  children: React.ReactNode;
  variantBtn?: 'text' | 'outlined' | 'contained';
  [key: string]: string | React.ReactNode;
}

export default function RouterLink({ type = 'link', href, children, ...props }: RouterLinkProps) {
  const renderLinkContent = () => {
    if (type === 'button') {
      const { variantBtn, ...buttonProps } = props;
      return (
        <MuiButton variant={variantBtn} {...buttonProps}>
          {children}
        </MuiButton>
      );
    } else {
      return <MuiLink {...props}>{children}</MuiLink>;
    }
  };

  return (
    <NextLink href={`/${DEFAULT_LOCALE}/${href}`} passHref>
      {renderLinkContent()}
    </NextLink>
  );
}
