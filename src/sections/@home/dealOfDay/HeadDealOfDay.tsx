import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, Chip, Link, Stack, Typography } from '@mui/material';
import { useCountDown } from 'hooks';
import { Link as RouterLink } from 'react-router-dom';

export interface HeadDealOfDayProps {}

export default function HeadDealOfDay(props: HeadDealOfDayProps) {
  const countDown = useCountDown();

  return (
    <Stack
      sx={{
        borderBottom: '1px solid #dedede',
        pb: 1,
        justifyContent: 'space-between',
        flexFlow: { lg: 'row wrap', xs: 'row wrap' },
        alignItems: 'center',
      }}
    >
      <Stack sx={{ flexFlow: { lg: 'row wrap', xs: 'row wrap' }, alignItems: 'center' }}>
        <Typography variant="h5">Deal of the day</Typography>
        {Boolean(countDown) && (
          <Chip
            icon={<AccessTimeIcon />}
            variant="filled"
            size="medium"
            color="error"
            label={countDown}
            sx={{ ml: 1 }}
          />
        )}
      </Stack>
      <Button color="secondary">
        <Link component={RouterLink} to="#">
          View all
        </Link>
      </Button>
    </Stack>
  );
}
