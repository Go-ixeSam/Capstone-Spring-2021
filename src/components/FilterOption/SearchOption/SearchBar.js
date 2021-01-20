import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SimpleSelect from "../DropDown";
import { SearchBar } from "./Search";

const useStyles = makeStyles((theme) => ({
  around: {
    display: "flex",
    flexDirection: "row",
    width: "max-content",
  },
}));

const searchFilter = [
  {
    key: "age",
    value: "Age",
  },
  {
    key: "name",
    value: "Name",
  },
];

function SearchOption(props) {
  const formik=props.formikAction
  const classes = useStyles();
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.around}>
        <SearchBar
          name="searchvalue"
          label="Search"
          searchvalue={formik.values.searchvalue}
          searchOnChange={formik.handleChange}
        />
        <Box width={7} />
        <SimpleSelect
          name="filtervalue"
          label="options"
          options={searchFilter}
          filterValue={formik.values.filtervalue}
          filterOnChange={formik.handleChange}
        />
      </div>
    </form>
  );
}

export default SearchOption;
