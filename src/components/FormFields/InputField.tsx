import { Visibility, VisibilityOff } from '@material-ui/icons';
import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { InputHTMLAttributes, useState } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
}

export function InputField({ name, control, label, type, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      value={value}
      name={name}
      label={label}
      type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
      variant="outlined"
      margin="normal"
      size="small"
      fullWidth
      InputProps={{
        endAdornment:
          type === 'password' ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
}
