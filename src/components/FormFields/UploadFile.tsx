import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useRef } from 'react';

const Input = styled('input')({
  display: 'none',
});

export interface UploadFileProps {
  onChange?: (file: File) => void;
}

export default function UploadFile({ onChange }: UploadFileProps) {
  const fileRef = useRef<null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (!file) return;

    onChange?.(file[0]);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          ref={fileRef}
          onChange={handleChange}
        />
        <Button variant="contained" component="span">
          Upload Img
        </Button>
      </label>
    </Stack>
  );
}
