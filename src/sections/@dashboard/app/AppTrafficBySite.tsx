import { Box, Card, CardContent, CardHeader, Paper, Typography } from '@mui/material';
import { fShortenNumber } from 'utils';

export interface ListAppTrafficBySiteProps {
  name: string;
  value: number;
  icon: JSX.Element;
}

export interface AppTrafficBySiteProps {
  title: string;
  subheader?: string;
  list: Array<ListAppTrafficBySiteProps>;
  [key: string]: any;
}

export default function AppTrafficBySite({
  title,
  subheader,
  list,
  ...other
}: AppTrafficBySiteProps) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {list.map((site) => (
            <Paper key={site.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
              <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

              <Typography variant="h6">{fShortenNumber(site.value)}</Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
