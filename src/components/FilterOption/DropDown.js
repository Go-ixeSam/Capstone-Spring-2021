import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Field, Form, useFormik } from "formik";
// import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 100,
    "& .MuiSelect-root": {
      fontSize: 14,
    },
  },
}));
export default function SimpleSelect(props) {
  // const { register, handleSubmit, watch, errors, control } = useForm();
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const onSubmit = (data) => console.log("seach filter", data);
  let opt = <MenuItem></MenuItem>;
  const formik = useFormik({
    initialValues: {
      searchfilter: "Name",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <FormControl variant="outlined" className={classes.root} size="small">
        <InputLabel id="demo-simple-select-outlined-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.filterValue}
          name={props.name}
          onChange={props.filterOnChange}
          // Chữ DS là 1 mẹo để khắc phục nhược điể khi label chuyển lên border mà ko lấp đầy chỗ trống
          label={props.label + "dss"}
        >
          {props.options.map((option) => {
            return (
              <MenuItem key={option.key} value={option.value}>
                {option.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
  {
  }
}
