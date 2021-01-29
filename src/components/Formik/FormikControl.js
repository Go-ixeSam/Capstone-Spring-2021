import React from "react";
import { FormControl, FormGroup, HelpBlock } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as variable from "variables/Variables";
import Select from "./Select";
import Input from "./Input";
import RadioButton from "./RadioButton";
import CheckboxGroup from "./CheckboxGroup";
import DatePicker from "./DatePicker";

export const FormControll = (argument) => {
  // const {}
  switch (argument.elementType) {
    case variable.input:
      return <Input {...argument} />;
    case "textarea":
      break;
    case variable.select:
      return <Select {...argument} />;
    case variable.radiobutton:
      return <RadioButton {...argument} />;
    case variable.checkboxgroup:
      return <CheckboxGroup {...argument} />;
    case variable.date:
      return <DatePicker {...argument} />;
    default:
      return null;
  }
};

/**
 * Thiết kế lại theo hướng của formik
 * @param {*} argument
 */
export const FormInput = (argument) => {
  let inputElement = <FormGroup></FormGroup>;
  let feedBack = <HelpBlock></HelpBlock>;
  switch (argument.elementType) {
    case "input":
      feedBack = <HelpBlock>{argument.valid.errorMessage}</HelpBlock>;
      inputElement = (
        <FormGroup validationState={argument.valid.type}>
          <label>{argument.elementConfig.labeltext}</label>
          <FormControl {...argument.elementConfig} onChange={argument.change} />
          {feedBack}
        </FormGroup>
      );
      break;
    case "textarea":
      break;
    case "select":
      var itemOption = argument.elementConfig.options;
      inputElement = (
        <FormGroup>
          <label>{argument.elementConfig.labeltext}</label>
          <FormControl componentClass="select" onChange={argument.change}>
            {itemOption.map((opt) => {
              if (argument.elementConfig.value == opt.value) {
                return (
                  <option key={opt.id} value={opt.value} selected>
                    {opt.displayValue}
                  </option>
                );
              } else {
                return (
                  <option key={opt.id} value={opt.value}>
                    {opt.displayValue}
                  </option>
                );
              }
            })}
          </FormControl>
        </FormGroup>
      );
      break;
  }
  return inputElement;
};

export function useFormResult() {
  const contractForm = useSelector((state) => state.contract.contractForm);
  const contracts = useSelector((state) => state.contract.contracts);
  let contract = React.useState({});

  contractForm.map((rows) => {
    rows.row.cols.map((col) => {
      let name = col.elementConfig.name;
      contract = { ...contract, [name]: col.elementConfig.value };
    });
  });
  // console.log("contracs= ", contracts.record.length);
  contract = {
    // [variable.id]: contracts.record.length + 1,
    ...contract,
    [variable.check]: false,
    [variable.time]: new Date().toString(),
  };
  return contract;
}
