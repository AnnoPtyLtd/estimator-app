import React from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from '@mui/material/styles';
import theme from "../../theme";

const GamingTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: theme.palette.tertiary.main,
  },
  '& label': {
    color: theme.palette.tertiary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor:  theme.palette.quantiary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.quantiary.main,
      boxShadow: `${alpha(theme.palette.quantiary.main, 0.25)} 0 0 0 2px`,
    },
    '&.Mui-focused fieldset': {
      color: theme.palette.grey.main,
      borderColor:  theme.palette.quantiary.main,
      boxShadow: `${alpha(theme.palette.quantiary.main, 0.25)} 0 0 0 5px`,
    },
  },
});
<<<<<<< HEAD

const StringTextField = ({ label, value, onChange }) => {
=======
const StringTextField = ({ label, value, onChange, ...props }) => {
>>>>>>> 951801770b31fc179d3ea8609b17e2ab27b474a8
  return (
    <div className="App">
      <GamingTextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
<<<<<<< HEAD
=======
        {...props}
>>>>>>> 951801770b31fc179d3ea8609b17e2ab27b474a8
      />
    </div>
  );
};

<<<<<<< HEAD
export default StringTextField;
=======
export default StringTextField;
>>>>>>> 951801770b31fc179d3ea8609b17e2ab27b474a8
