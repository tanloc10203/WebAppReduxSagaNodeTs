import { Box, Fab, Fade, Tooltip, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface ScrollTopProps {
  window?: () => Window;
  children: React.ReactElement;
}

export function BackToTop() {
  return (
    <ScrollTop>
      <Tooltip title="Scroll to top" placement="top" arrow>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{
            background: 'rgb(153, 204, 243)',
            '&:hover': { background: 'rgb(30, 73, 118)' },
          }}
          color="secondary"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </ScrollTop>
  );
}

export default function ScrollTop(props: ScrollTopProps) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 90, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
