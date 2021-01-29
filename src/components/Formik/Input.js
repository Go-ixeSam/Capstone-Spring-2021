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

function Input(argument) {
  const { label, name, type, placeholder, ...rest } = argument;
  console.log("input");
  let state = ""; //Dung de thay doi mau sac khi bắt validation
  return (
    <Field id={name} name={name}>
      {({ field, form }) => {
        // console.log("Day la form", form);
        if (form.errors[name] && form.touched[name] == true) {
          state = "error";
        }
        return (
          <FormGroup validationState={state} style={{ marginBottom:0,textAlign:"left" }}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl type={type} placeholder={placeholder} {...field} />
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
export default Input;
