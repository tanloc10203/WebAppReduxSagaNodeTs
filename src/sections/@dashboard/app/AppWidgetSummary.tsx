import { Card, Color, PaletteMode, Typography as TypographyHeading } from '@mui/material';
import { alpha, styled, SxProps, Theme } from '@mui/material/styles';
import {
  CommonColors,
  PaletteAugmentColorOptions,
  PaletteTonalOffset,
  TypeAction,
  TypeBackground,
  TypeDivider,
  TypeText,
} from '@mui/material/styles/createPalette';
import { Iconify } from 'components/Common';
import { fShortenNumber } from 'utils';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

export interface AppWidgetSummaryProps {
  color?: string;
  icon: string;
  title: string;
  total: number;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

export interface PaletteColorC {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
}

export interface PaletteC {
  common: CommonColors;
  mode: PaletteMode;
  contrastThreshold: number;
  tonalOffset: PaletteTonalOffset;
  primary: PaletteColorC;
  secondary: PaletteColorC;
  error: PaletteColorC;
  warning: PaletteColorC;
  info: PaletteColorC;
  success: PaletteColorC;
  grey: Color;
  text: TypeText;
  divider: TypeDivider;
  action: TypeAction;
  background: TypeBackground;
  getContrastText: (background: string) => string;
  augmentColor: (options: PaletteAugmentColorOptions) => PaletteColorC;
}

// "primary" | "secondary" | "error" | "warning" | "info" | "success"
export type PaletteKey = keyof {
  [Key in keyof PaletteC as PaletteC[Key] extends PaletteColorC ? Key : never]: true;
};

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}: AppWidgetSummaryProps) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        borderRadius: (theme: Theme) => theme.spacing(2),
        color: (theme: any) => theme.palette[color as PaletteKey].darker,
        bgcolor: (theme: any) => theme.palette[color as PaletteKey].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme: Theme) => theme.palette[color as PaletteKey].dark,
          backgroundImage: (theme: Theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color as PaletteKey].dark,
              0
            )} 0%, ${alpha(theme.palette[color as PaletteKey].dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <TypographyHeading variant="h3">{fShortenNumber(total)}</TypographyHeading>

      <TypographyHeading variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </TypographyHeading>
    </Card>
  );
}
