import { createTheme } from '@mui/material/styles';
import { green, purple, blue, grey  } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[400], 
    },
    secondary: {
      main: grey[50], 
    },
    tertiary:{
      main: purple[50],
    },
    quantiary:{
      main:  blue[500],
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', 
  },
});

export default theme;
