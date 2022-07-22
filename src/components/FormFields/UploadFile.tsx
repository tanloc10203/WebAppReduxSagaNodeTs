import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ChangeEvent, useRef } from 'react';

export interface UploadFileProps {
  onChange?: (file: File) => void;
}

export default function UploadFile({ onChange }: UploadFileProps) {
  const fileRef = useRef<null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (!file) return;

    onChange?.(file[0]);

    if (fileRef.current) (fileRef.current as HTMLInputElement).value = '';
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          id="contained-button-file"
          type="file"
          inputRef={fileRef}
          sx={{ display: 'none' }}
          onChange={handleChange}
        />
        <Button variant="contained" component="span">
          Upload Img
        </Button>
      </label>
    </Stack>
  );
}
