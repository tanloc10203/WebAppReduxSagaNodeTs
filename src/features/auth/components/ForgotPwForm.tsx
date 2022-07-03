import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import { Alert, LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { forgotPwSelectors } from '../authSlice';
import { makeStyles } from '@material-ui/core';

export interface InitialValuesForgetPw {
  username: string;
  email: string;
}

export interface ForgetPwFormProps {
  initialValues?: InitialValuesForgetPw;
  onSubmit?: (values: InitialValuesForgetPw) => void;
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
    username: yup.string().required().min(5),
    email: yup.string().email().required(),
  })
  .required();

export const ForgotPwForm = ({ initialValues, onSubmit }: ForgetPwFormProps) => {
  const classes = useStyles();
  const { error } = useAppSelector(forgotPwSelectors);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<InitialValuesForgetPw>({
    defaultValues: initialValues,
    resolver: yupResolver(schemaForgetPw),
  });

  const handleOnSubmit = async (values: InitialValuesForgetPw) => {
    if (!onSubmit) return;
    await onSubmit?.(values);
  };

  return (
    <Box className={classes.root}>
      <Box>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          {error && <Alert severity="error">{error}</Alert>}

          <InputField name="username" control={control} label="Username" />

          <InputField name="email" control={control} label="Email" type="email" />

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
