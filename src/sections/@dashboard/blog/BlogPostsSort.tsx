import { MenuItem, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface OptionState {
  value: string;
  label: string;
}

export interface BlogPostsSortProps {
  options: Array<OptionState>;
  onSort?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function BlogPostsSort({ options, onSort }: BlogPostsSortProps) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
