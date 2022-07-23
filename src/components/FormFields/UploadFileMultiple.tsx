import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ChangeEvent, useRef } from 'react';

export interface UploadFileMultipleProps {
  onChange?: (file: Array<File>) => void;
}

export default function UploadFileMultiple({ onChange, ...props }: UploadFileMultipleProps) {
  const fileRef = useRef<null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.prototype.slice.call(event.target.files);

    if (!files) return;

    onChange?.(files);

    if (fileRef.current) (fileRef.current as HTMLInputElement).value = '';
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          id="contained-button-file"
          type="file"
          inputRef={fileRef}
          inputProps={{ multiple: true }}
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
