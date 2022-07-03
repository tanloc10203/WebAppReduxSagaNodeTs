import { Box, Checkbox } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Iconify } from 'components/Common';

export interface IconColorProps {
  sx: Object;
}

function IconColor({ sx, ...other }: IconColorProps) {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        display: 'flex',
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'currentColor',
        transition: (theme) =>
          theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
          }),
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="eva:checkmark-fill" />
    </Box>
  );
}

export interface ColorManyPickerProps {
  colors: Array<string>;
  onChecked?: (color: string) => boolean;
  sx: Object;
  [key: string]: any;
}

export default function ColorManyPicker({ colors, onChecked, sx, ...other }: ColorManyPickerProps) {
  return (
    <Box sx={sx}>
      {colors.map((color: string) => {
        const isWhite = color === '#FFFFFF' || color === 'white';

        return (
          <Checkbox
            key={color}
            size="small"
            value={color}
            color="default"
            checked={onChecked?.(color)}
            icon={
              <IconColor
                sx={{
                  ...(isWhite && {
                    border: (theme: Theme) => `solid 1px ${theme.palette.divider}`,
                  }),
                }}
              />
            }
            checkedIcon={
              <IconColor
                sx={{
                  transform: 'scale(1.4)',
                  '&:before': {
                    opacity: 0.48,
                    width: '100%',
                    content: "''",
                    height: '100%',
                    borderRadius: '50%',
                    position: 'absolute',
                    boxShadow: '4px 4px 8px 0 currentColor',
                  },
                  '& svg': { width: 12, height: 12, color: 'common.white' },
                  ...(isWhite && {
                    border: (theme: Theme) => `solid 1px ${theme.palette.divider}`,
                    boxShadow: (theme: any) => `4px 4px 8px 0 ${theme.palette.grey[500_24]}`,
                    '& svg': { width: 12, height: 12, color: 'common.black' },
                  }),
                }}
              />
            }
            sx={{
              color,
              '&:hover': { opacity: 0.72 },
            }}
            {...other}
          />
        );
      })}
    </Box>
  );
}
