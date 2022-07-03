import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { Page } from 'components/Common';
import { authActions } from 'features/auth/authSlice';
import { RegisterForm } from 'features/auth/components';
import { Member } from 'models';

const theme = createTheme();

export default function Register() {
  const dispatch = useAppDispatch();

  const initialValues: Member = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    gender: 'male',
    key: 'STAFF',
  };

  const handleStudentOnSubmit = (values: Member) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(authActions.registerStart(values));
        resolve(true);
      }, 2000);
    });
  };

  return (
    <Page title="Sign Up">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
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
              Sign up
            </Typography>

            <RegisterForm initialValues={initialValues} onSubmit={handleStudentOnSubmit} />
          </Box>
        </Container>
      </ThemeProvider>
    </Page>
  );
}
