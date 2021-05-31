import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import ActionButton from "components/SuperTable/ActionButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  CancelButton,
  CheckCircleButton,
} from "components/CustomButton/CustomButton";
import {
  getModalVisible,
  getVegetableAPIloadingTime,
  getVegetableFormatList,
  getSelectedFilter,
  getUpdateSignal,
} from "redux/Selector/Selectors";
import { prepareVegetableData } from "util/Helper";
import {
  getAllVegetableUnapproved,
  setVisible,
  setSelectedVegetable,
  setNotificationCount,
  setVegetableFormatList,
  setFilterSelect,
  isAccept,
  decreaseNotificationCount,
  setUpdateSingal,
} from "redux/index";
import { CardNoFooter } from "components/Card/Card";
import { Col, Grid, Row } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MaterialButton } from "components/CustomButton/MaterialButton";

import { useDispatch, useSelector } from "react-redux";
import { ShowPopUp, LoadingPopUp } from "components/Modal/Modal";
import { isConstructorDeclaration } from "typescript";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import * as variable from "variables/Variables";
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
// function createData(name, calories) {
//   return { name, calories };
// }
// const rows = [
//   createData("Khăc Sâm", "Rau Húng"),
//   createData("Thế Thông", "Ngọt lèo"),
// ];

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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Hàng đợi",
  },
  //   { id: "calories", numeric: false, disablePadding: true, label: "Tên rau" },
  //   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  //   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  //   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const seletedFilter = useSelector((state) => getSelectedFilter(state));

  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ visibility: "hidden" }}>fsd</TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            style={{
              visibility: seletedFilter == 1 ? "hidden" : "visible",
            }}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
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
              <p style={{ margin: 0, fontWeight: "bold" }}>{headCell.label}</p>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
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

  //! Ta phải làm hơi lằn nhằn để có thể lấy đc value của menu dropdwon
  const options = ["chưa duyệt", "đã duyệt"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const dispatch = useDispatch();

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    console.log("Lựa chọn= ", index);
    setSelectedIndex(index);
    setAnchorEl(null);
    dispatch(setFilterSelect(index));
  };

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
          {numSelected} lựa chọn
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {selectedIndex == 2
            ? "Tất cả rau trong hệ thống"
            : `Rau ${options[selectedIndex]}`}
        </Typography>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          <Tooltip title="Chấp nhận">
            <CheckCircleButton
              click={() => dispatch(setVisible(true))}
              aria-label="chấp nhận"
            />
          </Tooltip>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Tooltip title="Bộ lọc">
            <IconButton
              aria-label="bộ lọc"
              onClick={(event) => handleFilterClick(event)}
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {options.map((option, index) => {
              return (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              );
            })}

            {/* <MenuItem onClick={handleClose}>Đã duyệt</MenuItem> */}
            {/* <MenuItem onClick={handleClose}>Tất cả</MenuItem> */}
          </Menu>
        </React.Fragment>
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
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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

export default function EnhancedTable(props) {
  const actionbuttonlist = props.actionbuttonlist;
  const classes = useStyles();
  const visible = useSelector((state) => getModalVisible(state));
  let loading = useSelector((state) => getVegetableAPIloadingTime(state));
  const updateSignal = useSelector((state) => getUpdateSignal(state));
  // const fullList = useSelector((state) => getVegetableFormatList(state));
  const [fullList, setFulllList] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const seletedFilter = useSelector((state) => getSelectedFilter(state));
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [selectedForStore, setSelectedForStore] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const normalPElement = {
    fontSize: 14,
    margin: 0,
  };

  React.useEffect(() => {
    const update = async () => {
      if (updateSignal == true) {
        await updateVegetableData();
        dispatch(setUpdateSingal(false));
      }
    };
    update();
  }, [updateSignal]);

  const change = (fullList) => {
    let tmp = [];
    switch (seletedFilter) {
      case 0:
        tmp = [
          ...fullList.filter(function (e) {
            return e[variable.vegetableStatus] == false;
          }),
        ];
        console.log(
          "list= ",
          fullList.filter(function (e) {
            return e[variable.vegetableStatus] == false;
          })
        );
        break;
      case 1:
        tmp = [
          ...fullList.filter(function (e) {
            return e[variable.vegetableStatus] == true;
          }),
        ];
        console.log(
          "list= ",
          fullList.filter(function (e) {
            return e[variable.vegetableStatus] == true;
          })
        );
        break;
      case 2:
        tmp = [...fullList];
        break;
    }
    return tmp;
    // setRows(tmp);
  };

  // ! effect nay se kiểm tra sự thay đổi của filter rồi thay đổi list trong table
  React.useEffect(() => {
    setRows(change(fullList));
  }, [seletedFilter]);

  //! hàm dùng để đóng modal
  const closeModal = () => {
    dispatch(setVisible(false));
  };

  /**
   ** Hàm dùng để từ chối những rau sai thông tin
   */
  const failTest = () => {
    const vegetableCensorship = async () => {
      try {
        await dispatch(
          isAccept({
            id: selected,
            status: 3,
          })
        );

        //! sau khi submit thành công thì cập nhật row và load lại list
        const res = await dispatch(getAllVegetableUnapproved());
        const tmp = await [...prepareVegetableData(res.payload.data)];
        await setRows(change(tmp));
        await setFulllList(tmp);

        //! tắt những select đc chọn, xóa những item cần confirm
        await setSelected([]);
        await setSelectedForStore([]);
        await dispatch(decreaseNotificationCount(selected.length));
        closeModal();
      } catch (error) {
        console.log("Normal table error: ", error);
      }
    };
    vegetableCensorship();
  };

  /**
   ** Hàm dùng để duyệt những rau đúng thông tin
   */
  const passTest = () => {
    const vegetableCensorship = async () => {
      try {
        await dispatch(
          isAccept({
            id: selected,
            status: 2,
          })
        );

        //! sau khi submit thành công thì cập nhật row và load lại list
        const res = await dispatch(getAllVegetableUnapproved());
        const tmp = await [...prepareVegetableData(res.payload.data)];
        await setRows(change(tmp));
        await setFulllList(tmp);

        //! tắt những select đc chọn, xóa những item cần confirm
        await setSelected([]);
        await setSelectedForStore([]);
        await dispatch(decreaseNotificationCount(selected.length));
        closeModal();
      } catch (error) {
        console.log("Normal table error: ", error);
      }
    };
    vegetableCensorship();
  };

  async function updateVegetableData() {
    let hava = [];
    const response = await dispatch(getAllVegetableUnapproved());
    console.log("res= ", response);
    setFulllList(prepareVegetableData(response.payload.data));
    hava = prepareVegetableData(
      response.payload.data.filter(function (e) {
        return e.status == false;
      })
    );
    setRows(hava);

    //! đếm số lượng rau chưa duyệt
    console.log("table đây ngày 27/5= ", hava);
    if (hava.length != 0) {
      dispatch(setNotificationCount(hava.length));
    } else {
      dispatch(setNotificationCount(0));
    }
  }
  React.useEffect(() => {
    updateVegetableData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //! Click hết tất cả lựa chọn
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const onlyFalseStatus = rows.filter((n) => {
        return n[variable.vegetableStatus] == false;
      });

      //! cái này dùng cho table
      const newSelecteds = onlyFalseStatus.map((n) => n.ID);
      //! Cái này dùng cho dialog confirm
      const newSelectedForStore = [];

      onlyFalseStatus.map((n) => {
        newSelectedForStore.push({
          id: n.ID,
          image: n.vegetableImage,
          name: n.vegetableName,
        });
      });
      setSelected(newSelecteds);
      setSelectedForStore(newSelectedForStore);
      return;
    }
    setSelected([]);
    setSelectedForStore([]);
  };

  const handleClick = (row) => {
    //* row đc click sẽ dựa theo ID của nó
    console.log("row= ", row.ID);
    const { ID, vegetableName, vegetableImage } = row;
    const item = {
      id: ID,
      image: vegetableImage,
      name: vegetableName,
    };

    // ! index của cái item đc chọn
    const selectedIndex = selected.indexOf(ID);
    let newSelected = [];
    let newSelectedForStore = []; //! list dành riêng cho store

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ID);
      newSelectedForStore = newSelectedForStore.concat(selectedForStore, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedForStore = newSelectedForStore.concat(
        selectedForStore.slice(1)
      );
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedForStore = newSelectedForStore.concat(
        selectedForStore.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedForStore = newSelectedForStore.concat(
        selectedForStore.slice(0, selectedIndex),
        selectedForStore.slice(selectedIndex + 1)
      );
    }

    // ! Ở chỗ này là ta sẽ có đc 1 list những item đc check
    setSelected(newSelected);

    //! tạo 1 list những item dc chọn ở store để hiện lên popup
    setSelectedForStore(newSelectedForStore);

    console.log(
      newSelected,
      " Đây là selected for store: ",
      newSelectedForStore
    );
  };

  const handleChangePage = (event, newPage) => {
    console.log("change page");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("row per page");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const showVegetableDetail = (row) => {
    dispatch(setSelectedVegetable(row));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <MaterialButton
        type="button"
        variant="contained"
        color="info"
        size="large"
        click={() => updateVegetableData()}
        style={{ left: -20, top: -46 }}
      >
        Cập nhật
      </MaterialButton>
      {console.log("rows", rows)}
      <ShowPopUp visible={visible} onCLose={closeModal} length="50%">
        <LoadingPopUp visible={loading} length="200px" />
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            title={<React.Fragment></React.Fragment>}
            content={
              <React.Fragment>
                <Row>
                  <Col xs={7}>
                    <div className="post-background-content">
                      {/* <p className="post-text-header">Xác nhận lựa chọn</p> */}
                      <PerfectScrollbar style={{ height: 200, width: 300 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: 15,
                            marginTop: 15,
                          }}
                        >
                          {selectedForStore.map((selected) => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: 15,
                                }}
                              >
                                <img
                                  src={selected.image}
                                  height="70"
                                  width="70"
                                  style={{
                                    border: "1px solid #ddd",
                                    borderRadius: 4,
                                    padding: 5,
                                  }}
                                />
                                <p style={{ margin: 0, marginLeft: 15 }}>
                                  {selected.name}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </PerfectScrollbar>
                      <div>
                        <div style={{ display: "flex", marginTop: 10 ,width:"max-content"}}>
                          <MaterialButton
                            variant="contained"
                            color="error"
                            size="large"
                            style={{ marginRight: 5}}
                            click={() => failTest()}
                          >
                            Thông tin không đạt yêu cầu
                          </MaterialButton>
                          <MaterialButton
                            variant="contained"
                            color="success"
                            size="large"
                            style={{ marginRight: 5 }}
                            onClick={() => passTest()}
                          >
                            Thông tin rau đạt yêu cầu
                          </MaterialButton>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            }
          />
        </Grid>
      </ShowPopUp>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="small"
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
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.ID);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        //   onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        //   tabIndex={-1}
                        key={row.vegetableName + "index-" + index}
                        selected={isItemSelected}
                      >
                        {actionbuttonlist.map((obj, index) => {
                          if (obj == "remove") {
                            return (
                              <TableCell
                                padding="checkbox"
                                key={obj.labelId + index}
                              >
                                <Checkbox
                                  onClick={() => handleClick(row)}
                                  checked={isItemSelected}
                                  style={{
                                    visibility:
                                      row[variable.vegetableStatus] == true
                                        ? "hidden"
                                        : "visible",
                                  }}
                                  ops={{ "aria-labelledby": labelId }}
                                />
                              </TableCell>
                            );
                          }
                          return (
                            <ActionButton
                              key={"action-butoon" + obj.labelId + index}
                              name={obj}
                              row={row}
                              click={() => showVegetableDetail(row)}
                            />
                          );
                        })}
                        {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell> */}
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          key={row[variable.id + "index" + index]}
                        >
                          <p style={{ margin: 0, color: "green" }}>
                            <img
                              src={row.vegetableImage}
                              style={{
                                width: 50,
                                height: 50,
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 10,
                                border: "1px solid grey",
                                boxSizing: "border-box",
                                padding: 2,
                              }}
                            />
                            {row.vegetableName}
                            {/* <span> - Khắc sâm</span> */}
                          </p>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={2} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
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
                {count !== -1 ? count : "nhiều hơn" + to}
              </p>
            )}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </div>
    </React.Fragment>
  );
}
