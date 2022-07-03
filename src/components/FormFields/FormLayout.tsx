import { Avatar, Box, Container, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Page } from 'components/Common';
import { ReactNode } from 'react';

export interface FormLayoutProps {
  title: string;
  titleHead: string;
  children: ReactNode;
  icon: ReactNode | JSX.Element;
}

export default function FormLayout({ title, titleHead, children, icon }: FormLayoutProps) {
  const theme = createTheme({
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: `800px !important`,
          },
        },
      },
    },
  });

  return (
    <Page title={title}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>{icon}</Avatar>
            <Typography component="h1" variant="h5">
              {titleHead}
            </Typography>
          </Box>

          {children}
        </Container>
      </ThemeProvider>
    </Page>
  );
}
