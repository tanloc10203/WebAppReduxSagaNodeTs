import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import { Page } from 'components/Common';
import { authActions } from 'features/auth/authSlice';
import { LoginForm } from 'features/auth/components';
import { LoginFormState } from 'models';

const theme = createTheme();

export default function Login() {
  const dispatch = useAppDispatch();

  const initialValues: LoginFormState = {
    username: '',
    password: '',
  };

  const handleOnSubmit = (values: LoginFormState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(authActions.loginStart(values));
        resolve(true);
      }, 500);
    });
  };

  return (
    <Page title="Login">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <LoginForm initialValues={initialValues} onSubmit={handleOnSubmit} />
          </Box>
        </Container>
      </ThemeProvider>
    </Page>
  );
}
