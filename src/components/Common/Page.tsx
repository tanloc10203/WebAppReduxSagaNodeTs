import { Box } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

export interface PageProps {
  children: ReactNode | JSX.Element;
  title?: string;
  meta?: ReactNode | JSX.Element;
  [key: string]: any;
}

const Page = forwardRef(({ children, title = '', meta, ...other }: PageProps, ref) => (
  <>
    <Helmet>
      <title>{`${title} | END COOL`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
