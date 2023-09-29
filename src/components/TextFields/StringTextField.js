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
const StringTextField = ({ label, value, onChange, ...props }) => {
  return (
    <div className="App">
      <GamingTextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default StringTextField;
