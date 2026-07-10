import { createTheme } from '@mui/material/styles';
import { type ThemeOptions } from '@mui/material/styles';
import tokens from '@/tokens/base';

export const muiThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1560,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      dark: tokens.colorCtaBlue60,
      main: tokens.colorCtaBlue60,
      light: tokens.colorCtaBlue60,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100dvh',
          backgroundColor: tokens.colorBackgroundPagePrimary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-paper": {
            borderRadius: "16px",
          },
        },
      },
    },
  },
};

export default createTheme(muiThemeOptions);
