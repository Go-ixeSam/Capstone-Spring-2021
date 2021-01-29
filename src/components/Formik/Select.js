import React from "react";
import { Field, ErrorMessage } from "formik";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from "react-bootstrap";
// import TextError from "./TextError";

function Select(props) {
  const { label, name, ...rest } = props;
  const { options } = props.elementConfig;
  let state = ""; //Dung de thay doi mau sac khi bắt validation

  return (
    <Field as="select" id={name} name={name}>
      {({ field, form }) => {
        if (form.errors[name]) {
          state = "error";
        }
        return (
          <FormGroup controlId="formControlsSelect" validationState={state}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl componentClass="select" {...field}>
              {options.map((option) => {
                return (
                  <option value={option.value} key={option.value}>
                    {option.key}
                  </option>
                );
              })}
            </FormControl>
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
export default Select;
