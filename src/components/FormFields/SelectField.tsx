import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
  value: string | number;
  label: string;
}

export interface SelectFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOptions[];
}

export function SelectField({
  name,
  control,
  label,
  options,
  disabled,
  ...inputProps
}: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      margin="normal"
      error={invalid}
      disabled={disabled}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>

      <Select
        labelId={`${name}_label`}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        inputProps={inputProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
