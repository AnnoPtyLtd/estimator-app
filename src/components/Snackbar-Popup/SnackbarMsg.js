import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarMsg = ({show,handleClose,severity,message}) => {
  const anchor = { vertical: 'top', horizontal: 'right' };

  return (
    <Snackbar open={show} autoHideDuration={2000} onClose={handleClose} anchorOrigin={anchor}>
        <MuiAlert elevation={2} variant='filled' onClose={handleClose} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
  )
}

export default SnackbarMsg
