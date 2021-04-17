/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import cx from "classnames";
import PropTypes from "prop-types";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import * as variable from "../../variables/Variables"
class CustomButton extends Component {
  render() {
    const { fill, simple, pullRight, round, block, ...rest } = this.props;

    const btnClasses = cx({
      "btn-fill": fill,
      "btn-simple": simple,
      "pull-right": pullRight,
      "btn-block": block,
      "btn-round": round,
    });

    return <Button className={btnClasses} {...rest} />;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.error,
  },
}));

export const DeleteButton = (props) => {
  return (
    <IconButton aria-label="delete" onClick={props.click}>
      <DeleteIcon />
    </IconButton>
  );
};
export const CheckCircleButton = (props) => {
  return (
    <IconButton aria-label="delete" onClick={props.click} style={{color:variable.alternativePrimaryColor}}>
      <CheckCircleIcon />
    </IconButton>
  );
};
export const CancelButton = (props) => {
  const classes = useStyles();
  return (
    <IconButton aria-label="delete" onClick={props.click} style={{color:"red"}}>
      <CancelIcon />
    </IconButton>
  );
};

CustomButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool,
};

export default CustomButton;
