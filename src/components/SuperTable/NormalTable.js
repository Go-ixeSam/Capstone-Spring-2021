import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TableFooter, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DeleteButton } from "../../components/CustomButton/CustomButton";
import SearchOption from "../../components/FilterOption/SearchOption/SearchBar";
import { getLocked, removeAdvanceRecordSelected } from "../../redux";
import {
  getAdvanceData,
  getAdvanceDataByNameSearch,
  removeAdvanceRecord,
} from "../../redux/Selector/Selectors";
import * as variable from "../../variables/Variables";
import EnhancedTableHead from "../SuperTable/Header/AdvanceHeader";
import { StyledTableCell } from "./StyledCell";
import { StyledTableRow } from "./StyledRow";
import ActionButton from "components/SuperTable/ActionButton";

const NormalPElement = styled.p`
  font-size: 14px;
  margin: 0px;
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiSelect-root": {
      fontSize: 14,
      margin: 0,
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    // fontSize:14,
    minWidth: 750,
    borderCollapse: "collapse",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function NormalTable(props) {
  const classes = useStyles();

  // ! row này sẽ đại diện cho dữ liệu lấy trực tiếp từ store (global)
  const rowWithDataFromStore = props.bodyData;
  const actionButtonList = props.actionbuttonlist;

  // * cái row ở bên store truyền từ bên component vào
  const [rows, setRows] = React.useState(props.bodyData);

  //* cái row ở trực tiếp bên store luôn
  let directRowBody = useSelector((state) => getAdvanceData(state));

  const dispatch = useDispatch();
  let history = useHistory(); // ! history object

  // * Dùng để đánh dấu account đang bị lock
  const [isLock, setIsLock] = React.useState(0);

  // ! Dùng để kiểm tra sự thay đổi của  const rowWithDataFromStore = props.bodyData;
  //!  lấy trực tiếp từ store. Vì ở đây rows đc khởi tạo với useState nên nếu như
  //! ko thực hiện hàm set của nó thì dù store có thay đổi state thì nó cũng ko tự trigger render
  React.useEffect(() => {
    console.log("Đã vào effect", rowWithDataFromStore);
    setRows(rowWithDataFromStore);
  }, rowWithDataFromStore);

  //* Dùng để thông báo rằng những field ko cần phải show ở table
  const { notShowing } = props;

  // console.log(rows);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const [selected, setSelected] = React.useState([]);

  const removeRows = useSelector((state) =>
    removeAdvanceRecord(state, selected)
  );

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //! tam thoi chua dung den all click
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      return;
    }
  };

  // ! Hàm này sẽ nhận name của cái row đc click và truyền đến trang edit
  // const handleEdit = (selectedRowName) => {
  //   console.log("user role=", userRole);
  //   if (userRole == variable.fleetManagerRole) {
  //     history.push(variable.fleetmanager + `/truckform/:name${selectedRowName}`);
  //     history.push({
  //       pathname: variable.fleetmanager + "/truckform",
  //       search: `?name=${selectedRowName}`,
  //     });
  //   }
  // };

  /**
   * ! row sẽ tượng trưng cái row đc click
   * @param {*} event
   * @param {*} row
   */
  const handleClick = (event, row) => {
    const { name } = row;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    // ! tam thoi ta se trien khai tren store
    setSelected(newSelected);
    console.log(selected);
  };

  const deleteRow = () => {
    console.log("row moi: ", selected);
    dispatch(removeAdvanceRecordSelected(selected));
    //! tìm ra những row đc lựa chọng
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const formik = useFormik({
    initialValues: {
      searchvalue: "",
      filtervalue: "Name",
    },
    onSubmit: (values) => {
      console.log("search value", values);
      switch (values["filtervalue"]) {
        case "Name":
          console.log(
            setRows(getAdvanceDataByNameSearch(rows, values["searchvalue"]))
          );
          setRows(getAdvanceDataByNameSearch(rows, values["searchvalue"]));
          break;
        case " Age":
          console.log("result", values["filtervalue"]);
          break;
      }
    },
  });
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box height={10} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={props.headCells}
              actionButtonList={actionButtonList}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  // * string dùng để lọc những field ko shwo lên table
                  let string = "";
                  const objectInArr = [];
                  for (const key in row) {
                    notShowing.map((showing) => {
                      string = showing;
                    });
                    if (string.localeCompare(key)) {
                      // ! Ko biết lí do vì sao mà ID lại bằng ID khi so sánh trong mảng nên thêm dòng dưới
                      if (key != "ID") {
                        objectInArr.push({
                          key: key,
                          value: row[key],
                        });
                      }
                    }
                  }

                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Dessert}
                      selected={isItemSelected}
                    >
                      {actionButtonList.map((obj) => {
                        if (obj == "remove") {
                          return (
                            <StyledTableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                                onClick={(event) => handleClick(event, row)}
                              />
                            </StyledTableCell>
                          );
                        }
                        return <ActionButton name={obj} row={row} />;
                      })}

                      {objectInArr.map((obj, index) => {
                        if (index == 0) {
                          return (
                            <StyledTableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {obj.value}
                            </StyledTableCell>
                          );
                        } else {
                          return (
                            <StyledTableCell align="right">
                              {obj.value}
                            </StyledTableCell>
                          );
                        }
                      })}
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
           
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}