import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) => {
      switch (props.color) {
        case "error":
          return theme.palette.error.main;
        case "success":
          return theme.palette.success.main;
      }
    },
    color: "white",
    "&:hover": {
      backgroundColor: (props) => {
        switch (props.color) {
          case "error":
            return theme.palette.error.dark;
          case "success":
            return theme.palette.success.dark;
        }
      },
    },
  },
}));

export function MaterialButton(props) {
  const classes = useStyles(props);
  return <Button className={classes.root} {...props} />;
}
