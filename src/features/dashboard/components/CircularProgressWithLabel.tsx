import { Box, Typography } from '@mui/material';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} color="warning" size={60} />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="white" fontSize="1rem">
          {Math.round(props.value) + '%'}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
