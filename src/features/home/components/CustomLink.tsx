import { Link } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink, useMatch, useResolvedPath } from 'react-router-dom';

export interface CustomLinkProps {
  to: string;
  sx?: Object;
  children: ReactNode;
  onClick?: () => void;
  [key: string]: any;
}

export default function CustomLink(props: CustomLinkProps) {
  const { to, sx, children, onClick } = props;

  let resolved = useResolvedPath(to);

  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      sx={{
        ...(sx && sx),
        textDecoration: 'none',
        color: match ? '-moz-initial' : 'ActiveCaption',
        display: 'flex',
        width: '100%',
      }}
      onClick={onClick}
      component={RouterLink}
      to={to}
    >
      {children}
    </Link>
  );
}
