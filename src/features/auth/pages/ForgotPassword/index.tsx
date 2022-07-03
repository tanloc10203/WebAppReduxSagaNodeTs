import { Typography } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import { Page } from 'components/Common';
import { authActions } from 'features/auth/authSlice';
import { ForgotPwForm, InitialValuesForgetPw } from 'features/auth/components';

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const theme = createTheme();

  const initialValues: InitialValuesForgetPw = {
    username: '',
    email: '',
  };

  const handleOnSubmit = (values: InitialValuesForgetPw) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(authActions.forgotPwStart(values));
        resolve(true);
      }, 500);
    });
  };

  return (
    <Page title="Forgot Password">
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
              Forget Password
            </Typography>

            <ForgotPwForm initialValues={initialValues} onSubmit={handleOnSubmit} />
          </Box>
        </Container>
      </ThemeProvider>
    </Page>
  );
}
