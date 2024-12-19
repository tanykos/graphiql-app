import RouterLink from '@/components/RouterLink/RouterLink';
import { Typography } from '@mui/material';

interface FormLinkProps {
  note: string;
  linkText: string;
  href: string;
}

export function FormLink({ note, linkText, href }: FormLinkProps) {
  return (
    <Typography component="p" align="center" sx={{ marginTop: 1.5 }}>
      {note}{' '}
      <RouterLink type="link" href={href}>
        {linkText}
      </RouterLink>
    </Typography>
  );
}
