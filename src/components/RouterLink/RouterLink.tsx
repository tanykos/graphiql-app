import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import MuiButton from '@mui/material/Button';
import { usePathname } from 'next/navigation';

interface RouterLinkProps {
  type?: 'link' | 'button';
  href: string;
  children: React.ReactNode;
  variantBtn?: 'text' | 'outlined' | 'contained';
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
    } else {
      return <MuiLink {...props}>{children}</MuiLink>;
    }
  };

  return (
    <NextLink href={`/${locale}/${href}`} passHref>
      {renderLinkContent()}
    </NextLink>
  );
}
