import React from "react";
import { Field, ErrorMessage } from "formik";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from "react-bootstrap";
// import TextError from "./TextError";

function Textarea(argument) {
  const { label, name, type, ...rest } = argument;
  let state = ""; //Dung de thay doi mau sac khi bắt validation
  return (
    <Field id={name} name={name}>
      {({ field, form }) => {
        if (form.errors[name]) {
          state = "error";
        }
        return (
          <FormGroup validationState={state} controlId="formControlsTextarea">
            <ControlLabel>{label}</ControlLabel>
            <FormControl
              type={type}
              componentClass="textarea"
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
export default Textarea;
