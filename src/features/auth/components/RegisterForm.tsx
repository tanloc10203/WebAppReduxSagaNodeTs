import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress, Grid, Link } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { Member } from 'models';
import { useForm } from 'react-hook-form';
import { Link as Route } from 'react-router-dom';
import * as yup from 'yup';
import { registerSelectors } from '../authSlice';

export interface RegisterFormProps {
  initialValues?: Member;
  onSubmit?: (values: Member) => void;
}

const schemaRegister = yup
  .object({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    username: yup.string().required().min(5),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    email: yup.string().email().required(),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female')
      .required('Please select gender'),
    key: yup
      .string()
      .oneOf(['ADMIN', 'STAFF', 'MEMBER'], 'Please select either ADMIN, STAFF or MEMBER')
      .required('Please select key'),
  })
  .required();

export const RegisterForm = ({ initialValues, onSubmit }: RegisterFormProps) => {
  const { error } = useAppSelector(registerSelectors);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Member>({
    defaultValues: initialValues,
    resolver: yupResolver(schemaRegister),
  });

  const handleOnSubmit = async (values: Member) => {
    if (!onSubmit) return;
    await onSubmit?.(values);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(handleOnSubmit)}>
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField name="firstName" control={control} label="First Name" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputField name="lastName" control={control} label="Last Name" />
        </Grid>

        <Grid item xs={12}>
          <InputField name="email" control={control} label="Email" type="email" />
        </Grid>

        <Grid item xs={12}>
          <InputField name="username" control={control} label="Username" />
        </Grid>

        <Grid item xs={12}>
          <InputField name="password" control={control} label="Password" type="password" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name="key"
            control={control}
            label="Role"
            options={[
              { label: 'ADMIN', value: 'ADMIN' },
              { label: 'STAFF', value: 'STAFF' },
              { label: 'MEMBER', value: 'MEMBER' },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <RadioGroupField
            name="gender"
            control={control}
            label="Gender"
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting && <CircularProgress size={16} color="inherit" />}
        &nbsp; Sign Up
      </Button>

      <Grid container justifyContent="flex-end" marginBottom={3}>
        <Grid item>
          <Link component={Route} to="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
