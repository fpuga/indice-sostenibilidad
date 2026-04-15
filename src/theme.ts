import { createTheme } from '@mui/material/styles';
// @ts-expect-error: Fonts don't have type declarations
import '@fontsource/archivo';
// @ts-expect-error: Fonts don't have type declarations
import '@fontsource/public-sans';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004C8C', // Deep Water Blue
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2E7D32', // Success Green (Category A)
    },
    warning: {
      main: '#F57C00', // Warning Amber (Category B)
    },
    error: {
      main: '#D32F2F', // Error Red (Category C)
    },
    background: {
      default: '#F8F9FA', // Ghost Grey
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Public Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Archivo", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Archivo", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Archivo", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Archivo", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Archivo", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Archivo", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
