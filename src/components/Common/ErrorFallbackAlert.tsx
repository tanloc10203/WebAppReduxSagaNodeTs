import { Alert } from '@mui/material';

export default function ErrorFallbackAlert({ error }: { error: Error }) {
  return (
    <Alert variant="filled" severity="error">
      ERROR: {error.message}
    </Alert>
  );
}
