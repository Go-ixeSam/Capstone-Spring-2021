import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  ShowPopUp,
  SuccessPopUp,
  FailPopUp
} from "components/Modal/Modal";
import * as variable from "variables/Variables";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) => {
      switch (props.color) {
        case "error":
          return theme.palette.error.main;
        case "success":
          return variable.alternativePrimaryColor;
        case "info":
          return theme.palette.info.main;
      }
    },
    color: "white",
    "&:hover": {
      backgroundColor: (props) => {
        switch (props.color) {
          case "error":
            return theme.palette.error.dark;
          case "success":
            return variable.darkColor;
          case "info":
            return theme.palette.info.dark;
        }
      },
    },
  },
}));



export function MaterialButton(props) {
  const classes = useStyles(props);
  return <Button className={classes.root} onClick={props.click} {...props} />;
}
