import { yupResolver } from '@hookform/resolvers/yup';
import { Box, makeStyles } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { Alert, LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { verifyChangePwSelectors } from '../authSlice';

export interface InitialValuesVerifyEmail {
  password: string;
  confirmPw: string;
}

export interface VerifyEmailFormProps {
  initialValues?: InitialValuesVerifyEmail;
  onSubmit?: (values: InitialValuesVerifyEmail) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  mt3: {
    marginTop: theme.spacing(3),
  },
}));

const schemaForgetPw = yup
  .object({
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPw: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required(),
  })
  .required();

export const VerifyEmailForm = ({ initialValues, onSubmit }: VerifyEmailFormProps) => {
  const classes = useStyles();
  const { error } = useAppSelector(verifyChangePwSelectors);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<InitialValuesVerifyEmail>({
    defaultValues: initialValues,
    resolver: yupResolver(schemaForgetPw),
  });

  const handleOnSubmit = async (values: InitialValuesVerifyEmail) => {
    if (!onSubmit) return;
    await onSubmit?.(values);
  };

  return (
    <Box className={classes.root}>
      <Box>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          {error && <Alert severity="error">{error}</Alert>}

          <InputField name="password" control={control} label="New Password" type="password" />

          <InputField name="confirmPw" control={control} label="Confirm Password" type="password" />

          <Box className={classes.mt3}>
            <LoadingButton
              size="medium"
              endIcon={<SendIcon />}
              type="submit"
              fullWidth
              loading={isSubmitting}
              loadingPosition="end"
              variant="contained"
              color="primary"
            >
              Send
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
