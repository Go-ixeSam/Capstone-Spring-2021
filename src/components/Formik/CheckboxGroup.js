import React from "react";
import { Field, ErrorMessage } from "formik";
import {
  FormControl,
  FormGroup,
  HelpBlock,
  ControlLabel,
  Checkbox,
} from "react-bootstrap";

function CheckboxGroup(props) {
  const { label, name, ...rest } = props;
  const { options } = props.elementConfig;
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <Field id={name} name={name}>
        {({ field }) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              {options.map((option) => {
                return (
                  <div
                    key={option.key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginRight: 10,
                    }}
                  >
                    <Checkbox
                      inline
                      {...field}
                      value={option.value}
                      checked={field.value.includes(option.value)}
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
                    </Checkbox>
                  </div>
                );
              })}
            </div>
          );
        }}
      </Field>
    </FormGroup>
  );
}

export default CheckboxGroup;
