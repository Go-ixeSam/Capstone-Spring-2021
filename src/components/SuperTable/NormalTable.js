import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TableFooter, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import { prepareVegetableData } from "util/Helper";
import {
  setVisible,
  isAccept,
  getAllVegetableUnapproved,
  decreaseNotificationCount,
} from "redux/index";
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
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  DeleteButton,
  CheckCircleButton,
  CancelButton,
} from "../../components/CustomButton/CustomButton";
import SearchOption from "../../components/FilterOption/SearchOption/SearchBar";
import { getLocked, removeAdvanceRecordSelected } from "../../redux";
import {
  getAdvanceData,
  getAdvanceDataByNameSearch,
  removeAdvanceRecord,
} from "../../redux/Selector/Selectors";
import * as variable from "../../variables/Variables";
import EnhancedTableHead from "../SuperTable/Header/AdvanceHeader";
import { StyledTableCell, StyledTableCell17px } from "./StyledCell";
import { StyledTableRow } from "./StyledRow";
import ActionButton from "components/SuperTable/ActionButton";

const normalPElement = {
  fontSize: 14,
  margin: 0,
};

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
  const actionButtonList = props.actionbuttonlist;

  // * cái row ở bên store truyền từ bên component vào
  let [rows, setRows] = useState(props.bodyData);

  const dispatch = useDispatch();
  let history = useHistory(); // ! history object

  // * Dùng để đánh dấu account đang bị lock
  const [isLock, setIsLock] = React.useState(0);

  React.useEffect(() => {
    setRows(props.bodyData);
  }, [props.bodyData]);

  //* Dùng để thông báo rằng những field ko cần phải show ở table
  const { headCells } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState([variable.negativeCommendCount]);
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
   * * Cái này chỉ là chọn đc những cái row đc click thôi,
   * * Muốn nó hiện màu ở checkbox còn phải, thay đổi ở chỗ
   * * này nữa: const isItemSelected = isSelected(row.ID);
   * @param {*} event
   * @param {*} row
   */
  const handleClick = (event, ID) => {
    //* row đc click sẽ dựa theo ID của nó
    // const { ID: name } = row;
    const selectedIndex = selected.indexOf(ID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ID);
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

    // ! Ở chỗ này là ta sẽ có đc 1 list những item đc check
    setSelected(newSelected);
    console.log(newSelected);
  };

  const deleteRow = () => {
    console.log("Những row đc lựa chọn: ", selected);
    dispatch(removeAdvanceRecordSelected(selected));
    //! tìm ra những row đc lựa chọng
  };

  /**
   ** Hàm dùng để duyệt những rau đúng thông tin
   ** Vì ở đây là duyệt nhiều rau cùng 1 lúc nên sẽ có 1 vòng lập xử lí
   */
  const passTest = () => {
    let tmp = [];
    console.log("Những row đc lựa chọn: ", selected);
    // const doing = async () => {
    //   await
    selected.map((item) => {
      dispatch(
        isAccept({
          Id: item,
          Status: 2,
        })
      ).then(() => {
        dispatch(getAllVegetableUnapproved()).then((res) => {
          // const hava = prepareVegetableData(res.payload.data);
          // console.log("hava ne: ", hava);
          tmp = [...prepareVegetableData(res.payload.data)];
          setRows(tmp);
          setSelected([]);
        });
      });
    });
    dispatch(decreaseNotificationCount(selected.length));
    // };
    // doing().then(() => {
    // console.log("Nhìn nè", res);
    //! sau khi submit thành công thì cập nhật row và load lại list
    // });D
  };

  /**
   ** Hàm dùng để từ chối những rau sai thông tin
   */
  const failTest = () => {
    let tmp = [];
    console.log("Những row đc lựa chọn: ", selected);
    // const doing = async () => {
    //   await
    selected.map((item) => {
      dispatch(
        isAccept({
          Id: item,
          Status: 3,
        })
      ).then(() => {
        dispatch(getAllVegetableUnapproved()).then((res) => {
          // const hava = prepareVegetableData(res.payload.data);
          // console.log("hava ne: ", hava);
          tmp = [...prepareVegetableData(res.payload.data)];
          setRows(tmp);
          setSelected([]);
        });
      });
    });
    dispatch(decreaseNotificationCount(selected.length));
    // };
    // doing().then(() => {
    // console.log("Nhìn nè", res);
    //! sau khi submit thành công thì cập nhật row và load lại list
    // });D
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
          console
            .log
            // setRows(getAdvanceDataByNameSearch(rows, values["searchvalue"]))
            ();
          // setRows(getAdvanceDataByNameSearch(rows, values["searchvalue"]));
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
              headCells={headCells}
              actionButtonList={actionButtonList}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.ID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const objectInArr = []; //! cái array này sẽ chứa
                  const finalArray = []; //! cái array sau khi đã đc xử lí để hiển thị
                  for (const key in row) {
                    objectInArr.push({
                      key: key,
                      value: row[key],
                    });
                  }
                  /**
                   * * Phần này giúp cho dữ liệu body luôn hiển thị đúng với header
                   */
                  headCells.map((obj) => {
                    objectInArr.map((cell) => {
                      if (obj.id == cell.key) {
                        // console.log("cell", cell.key, " obj", obj.id);
                        //! phần tử trong mảng final có 2 cái, đặc biệt là numeric giúp cho việc hiển thị giữa dữ liệu chữ và số đẹp hơn ở mỗi row của table
                        finalArray.push({
                          value: cell.value,
                          numeric: obj.numeric,
                          key: cell.key,
                        });
                      }
                    });
                  });
                  // //* kết thúc

                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Dessert}
                      selected={isItemSelected}
                      onClick={(event) => handleClick(event, row.ID)}
                    >
                      {actionButtonList.map((obj) => {
                        if (obj == "remove") {
                          return (
                            <StyledTableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </StyledTableCell>
                          );
                        }
                        return <ActionButton name={obj} row={row} />;
                      })}

                      {finalArray.map((obj, index) => {
                        // console.log("value", obj.value);
                        //  ! Nếu value là ảnh thì sẽ  thêm 1 component image và để hiển thị
                        if (obj.key == "vegetableImage") {
                          if (obj.numeric == false) {
                            return (
                              <StyledTableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                <img
                                  src={obj.value}
                                  height="80"
                                  width="80"
                                  style={{ margin: 10 }}
                                />
                              </StyledTableCell>
                            );
                          }
                        }
                        if (obj.key == "description" || obj.key == "uses") {
                          return (
                            <StyledTableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              <PerfectScrollbar
                                style={{
                                  height: 100,
                                  width: 200,
                                  padding: 10,
                                }}
                              >
                                {obj.value}
                              </PerfectScrollbar>
                            </StyledTableCell>
                          );
                        }
                        if (obj.numeric == false) {
                          return (
                            <StyledTableCell17px
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {obj.value}
                            </StyledTableCell17px>
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
            <TableFooter>
              <TableRow style={{ border: "none" }}>
                <TableCell colSpan={3} size="small" style={{ padding: 0 }}>
                  <div>
                    {selected.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 14,
                            margin: 0,
                            paddingLeft: 10,
                            color: variable.materialSecondaryColorMain,
                          }}
                        >
                          {selected.length} được chọn
                        </p>
                        {/* <DeleteButton click={deleteRow} /> */}
                        <CheckCircleButton click={passTest} />
                        <CancelButton click={failTest} />
                      </div>
                    ) : (
                      <Typography
                        style={{ flex: "1 1 100%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        <p></p>
                      </Typography>
                    )}
                  </div>
                </TableCell>
                <TableCell colSpan={4} size={"small"} style={{ padding: 0 }}>
                  <TablePagination
                    style={{ fontSize: 14 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    labelRowsPerPage={
                      <p style={normalPElement}>Số lượng rau mỗi trang:</p>
                    }
                    labelDisplayedRows={({ from, to, count }) => (
                      <p style={normalPElement}>
                        {from}-{to}
                        {" trong "}
                        {count !== -1 ? count : "more than" + to}
                      </p>
                    )}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
