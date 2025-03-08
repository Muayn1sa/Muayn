import { createTheme } from '@mui/material';

const createCustomTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === 'dark' ? '#0a0a0a' : '#ffffff',
        paper: mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
      },
      primary: {
        main: mode === 'dark' ? '#ffffff' : '#000000',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
        secondary: mode === 'dark' ? '#cccccc' : '#666666',
      },
      action: {
        active: mode === 'dark' ? '#ffffff' : '#000000',
        hover: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
      fontFamily: "'Tajawal', sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#ffffff' : '#000000',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#ffffff' : '#000000',
          },
        },
      },
    },
  });
};

export default createCustomTheme;