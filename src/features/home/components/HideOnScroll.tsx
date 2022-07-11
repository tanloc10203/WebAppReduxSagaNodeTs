import { Slide, useScrollTrigger } from '@mui/material';
import { ScrollTopProps } from './ScrollTop';

export default function HideOnScroll(props: ScrollTopProps) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
