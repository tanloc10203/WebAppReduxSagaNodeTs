import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export interface SvgIconStyleProps {
  src: string;
  sx: Object;
  [key: string]: any;
}

export default function SvgIconStyle({ src, sx, ...others }: SvgIconStyleProps) {
  return (
    <Box
      component="span"
      {...others}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
}
