import { Typography } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import { Page } from 'components/Common';
import { authActions } from 'features/auth/authSlice';
import { InitialValuesVerifyEmail, VerifyEmailForm } from 'features/auth/components';
import { InterfaceVerifyChangePw } from 'models';
import { useParams } from 'react-router-dom';

export default function VerifyEmail() {
  const dispatch = useAppDispatch();
  const { token } = useParams();
  const theme = createTheme();

  const initialValues: InitialValuesVerifyEmail = {
    password: '',
    confirmPw: '',
  };

  const handleOnSubmit = (values: InitialValuesVerifyEmail) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dataInput: InterfaceVerifyChangePw = {
          data: values,
          token: token as string,
        };
        dispatch(authActions.verifyChangePwStart(dataInput));
        resolve(true);
      }, 500);
    });
  };

  return (
    <Page title="Verify Email">
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
              Password New Change
            </Typography>

            <VerifyEmailForm initialValues={initialValues} onSubmit={handleOnSubmit} />
          </Box>
        </Container>
      </ThemeProvider>
    </Page>
  );
}
