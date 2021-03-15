import IconButton from "@material-ui/core/IconButton";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";
import * as variable from "../../../variables/Variables";
import { StyledHeaderCell } from "../StyledCell";

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    actionButtonList,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const editHeaderIcon = {
    border: "none",
    backgroundColor: variable.primaryColor,
    height: 14,
    width: 14,
  };

  return (
    <TableHead>
      <TableRow>
        {actionButtonList.map((action) => {
          if (action == "remove") {
            return (
              <StyledHeaderCell padding="checkbox" style={{ fontSize: 14 }}>
                <IconButton disabled></IconButton>
              </StyledHeaderCell>
            );
          }
          return (
            <StyledHeaderCell
              padding="checkbox"
              style={{ fontSize: 14 }}
            ></StyledHeaderCell>
          );
        })}

        {/* <StyledHeaderCell padding="checkbox" style={{ fontSize: 14 }}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </StyledHeaderCell> */}
        {headCells.map((headCell) => (
          <StyledHeaderCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
