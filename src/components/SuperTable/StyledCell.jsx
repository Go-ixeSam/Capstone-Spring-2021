import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell } from "@material-ui/core";
import * as variable from "../../variables/Variables";
export const StyledTableCell = withStyles((theme) => ({
  root: {
    fontSize: "12px",
    border: "none",
    borderBottom:"1px solid lightgrey",
  },
}))(TableCell);

export const StyledHeaderCell=withStyles((theme)=>({
  root:{
    fontSize:12,
    fontWeight:'bold',
    border:"none",
    backgroundColor:variable.primaryColor
  }
}))(TableCell)
