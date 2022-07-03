import { Theme } from '@emotion/react';
import { Icon, IconifyIcon } from '@iconify/react';
import { Box, SxProps } from '@mui/material';

export interface IconifyProps {
  icon: IconifyIcon | string;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
