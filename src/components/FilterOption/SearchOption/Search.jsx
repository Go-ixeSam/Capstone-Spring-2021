import { ButtonBase, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import * as icon from "@material-ui/icons";
import { useFormik } from "formik";
import React from "react";
// import { useForm } from "react-hook-form";
import * as variable from "../../../variables/Variables";
import SimpleSelect from "../DropDown";
const StyledTextField = withStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      fontSize: 14,
      border: "1px lightgrey",
      "& .MuiInputBase-formControl": {
        "& .Mui-focused": {
          border: "1px " + variable.primaryColor,
        },
      },
    },
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  around: {
    display: "flex",
    flexDirection: "row",
    width: "max-content",
  },
}));
export const SearchBar = (argument) => {
  const classes = useStyles();
  const { name, label, searchOnChange, searchValue } = argument;
  return (
    <div>
      <StyledTextField
        type="text"
        size="small"
        label={label}
        variant="outlined"
        InputProps={{
          name: name,
          onChange: searchOnChange,
          value: searchValue,
          endAdornment: (
            <InputAdornment>
              <StyledIcontButton type="submit">
                <icon.Search />
              </StyledIcontButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

const StyledIcontButton = withStyles((theme) => ({
  root: {
    "& .MuiButtonBase-root	": {
      padding: 0,
    },
  },
}))(ButtonBase);
