import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import { Alert, Box, Button, Grid, Link } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { LoginFormState } from 'models';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link as Route, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { loginSelectors } from '../authSlice';

export interface LoginFormProps {
  initialValues?: LoginFormState;
  onSubmit?: (values: LoginFormState) => void;
}

const schemaLogin = yup
  .object({
    username: yup.string().required().min(5),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  })
  .required();

export const LoginForm = ({ initialValues, onSubmit }: LoginFormProps) => {
  const { error } = useAppSelector(loginSelectors);
  const accessToken = Boolean(localStorage.getItem('accessToken'));
  const navigation = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigation('/', { replace: true });
    }
  }, [accessToken, navigation]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormState>({
    defaultValues: initialValues,
    resolver: yupResolver(schemaLogin),
  });

  const handleOnSubmit = async (values: LoginFormState) => {
    if (!onSubmit) return;
    await onSubmit?.(values);
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handleOnSubmit)}>
      {error && <Alert severity="error">{error}</Alert>}

      <InputField name="username" control={control} label="Username" />

      <InputField name="password" control={control} label="Password" type="password" />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting && <CircularProgress size={16} color="inherit" />}
        &nbsp;Sign In
      </Button>

      <Grid container>
        <Grid item xs>
          <Link component={Route} to="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link component={Route} to="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
