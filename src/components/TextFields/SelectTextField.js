import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import theme from "../../theme";

const StyledSelect = styled(Select)({
    '& label.Mui-focused': {
      color: theme.palette.quantiary.main,
    },
    '& label': {
      color: theme.palette.quantiary.main,
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

const SelectTextField = ({ label, value, onChange, options, ...props }) => {
  return(
    <div className="App">
        <StyledSelect
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
    </div>
  );
};

export default SelectTextField;
