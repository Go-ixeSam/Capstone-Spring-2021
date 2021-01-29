import React from "react";
import { Field, ErrorMessage } from "formik";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  Radio,
} from "react-bootstrap";
// import TextError from "./TextError";

function RadioButton(props) {
  const { label, name, ...rest } = props;
  const { options } = props.elementConfig;
  let radio = <Radio></Radio>;
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <Field id={name} name={name}>
        {({ field }) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              {options.map((option) => {
                if (options[0] == option) {
                  radio = (
                    <Radio
                      //   type="radio"
                      name="radioGroup"
                      inline
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked
                      //   checked={field.value === option.value}
                    >
                      <p
                        style={{
                          margin: 0,
                          width: "max-content",
                          fontSize: 14,
                        }}
                      >
                        {option.key}
                      </p>
                    </Radio>
                  );
                } else {
                  radio = (
                    <Radio
                      //   type="radio"
                      name="radioGroup"
                      inline
                      id={option.value}
                      {...field}
                      value={option.value}
                      //   checked
                      checked={field.value === option.value}
                    >
                      <p
                        style={{
                          margin: 0,
                          width: "max-content",
                          fontSize: 14,
                        }}
                      >
                        {option.key}
                      </p>
                    </Radio>
                  );
                }
                return (
                  <div
                    key={option.key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginRight: 10,
                    }}
                  >
                    {radio}
                    {/* <label htmlFor={option.value}>{option.key}</label> */}
                  </div>
                );
              })}
            </div>
          );
        }}
      </Field>
      {/* <ErrorMessage name={name} component={TextError} /> */}
    </FormGroup>
  );
}
export default RadioButton;
