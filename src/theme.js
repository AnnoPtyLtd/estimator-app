import { createTheme } from '@mui/material/styles';
import { purple, blue, grey  } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[400], 
    },
    secondary: {
      main: grey[50], 
    },
    tertiary:{
      main: purple[0],
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
