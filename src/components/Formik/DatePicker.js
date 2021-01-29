import React from "react";
import { Field, ErrorMessage } from "formik";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from "react-bootstrap";
import * as variable from "../../variables/Variables";
// import TextError from "./TextError";

function DatePicker(argument) {
  const { label, name, ...rest } = argument;
  console.log("argument", argument);
  let state = ""; //Dung de thay doi mau sac khi bắt validation
  return (
    <Field id={name} name={name}>
      {({ field, form }) => {
        // console.log("Day la form", form);
        if (form.errors[name]) {
          state = "error";
        }
        return (
          <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <FormControl
              width="max-content"
              type={argument.elementConfig.type}
              placeholder={argument.placeholder}
              {...field}
            />
            <ErrorMessage
              name={name}
              render={(msgg) => {
                return <HelpBlock>{msgg}</HelpBlock>;
              }}
            />
          </FormGroup>
        );
      }}
    </Field>
  );
}
export default DatePicker;
