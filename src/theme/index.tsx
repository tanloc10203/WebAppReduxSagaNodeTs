import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';
import ComponentsOverrides from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';

interface ThemeProviderProps {
  children: ReactNode | JSX.Element;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeOptions: any = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
