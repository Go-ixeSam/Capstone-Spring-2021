import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function TextButtons(props) {
  return <Button style={{fontSize:12}} color="secondary" onClick={props.click}>{props.text}</Button>;
}
