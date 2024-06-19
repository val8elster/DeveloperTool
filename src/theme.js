import { createTheme, ThemeProvider } from '@mui/material/styles';
import purple from '@mui/material/colors/purple';
import CssBaseline from '@mui/material/CssBaseline'; 

const theme = createTheme({
  palette: {
    mode: 'dark', // Theme-Typ auf dunkel setzen
    primary: {
      main: purple[500], // Primärfarbe auf Violettpalette setzen
    },
  },
  typography: {
    fontFamily: 'Comic Sans', // Schriftfamilie auf Comic Sans setzen
    fontWeightBold: 900, // Fettdruckgewicht auf 900 setzen
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Hier können globale CSS-Regeln hinzugefügt werden
        html: {
          height: '100%',
        },
        body: {
          margin: 0,
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        },
      },
    },
  },
});