import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell } from "@material-ui/core";
import * as variable from "../../variables/Variables";
export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
    "&:nth-child(even)": {
      backgroundColor: "white",
    },
    border: "none",
  },
}))(TableRow);
