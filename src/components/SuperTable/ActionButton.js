import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { getLocked } from "redux/index";
import * as variable from "variables/Variables";
import { StyledTableCell } from "./StyledCell";
import {getModalVisible} from "../../redux/Selector/Selectors"
import { useDispatch, useSelector } from "react-redux";
import {setVisible} from "redux/index"

const ActionButton = (props) => {
  const { row, handlelock, name } = props;
  console.log("row nè", row);
  const dispatch = useDispatch();
  function handleLockAccount(row) {
    let id = row[variable.id];

    // ! Nhấp vào sẽ thành mở/đóng khóa
    dispatch(getLocked(id));
  }
  function openModal() {
    dispatch(setVisible(true));
  }
  switch (name) {
    case "lock":
      return (
        <StyledTableCell
          padding="checkbox"
          onClick={() => handleLockAccount(row)}
        >
          <IconButton>
            <FontAwesomeIcon
              style={{
                color: row[variable.islock] == 1 ? "red" : null,
              }}
              icon={row[variable.islock] == 1 ? faLock : faLockOpen}
            />
          </IconButton>
        </StyledTableCell>
      );
    case "edit":
      return null;
    case "read":
      return (
        <StyledTableCell
          padding="checkbox"
          onClick={() => handleLockAccount(row)}
        >
          <IconButton onClick={openModal}>
            <FontAwesomeIcon
              icon={faReadme}
            />
          </IconButton>
        </StyledTableCell>
      );

    // case "lock":
  }
};

export default ActionButton;
