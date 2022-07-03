import { Box, Button, Card, CardHeader, Divider, Link, Stack, Typography } from '@mui/material';
import { Iconify, ScrollBar } from 'components/Common';
import { fToNow } from 'utils';

export interface ListAppNewsUpdateProps {
  id: string;
  title: string;
  description: string;
  image: string;
  postedAt: Date;
}

export interface AppNewsUpdateProps {
  title?: string;
  subheader?: string;
  list: Array<ListAppNewsUpdateProps>;
  [key: string]: any;
}

export default function AppNewsUpdate({ title, subheader, list, ...other }: AppNewsUpdateProps) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <ScrollBar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </ScrollBar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

export interface NewsItemProps {
  news: ListAppNewsUpdateProps;
}

function NewsItem({ news }: NewsItemProps) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
