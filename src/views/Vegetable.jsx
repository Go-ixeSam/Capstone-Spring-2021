import { LoadingPopUp } from "components/Modal/Modal";
import NormalTable from "components/SuperTable/NormalTable";
import React, { useState } from "react";
import { Grid } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVegetableUnapproved,
  setNotificationCount, setVisible
} from "redux/index";
import { prepareVegetableData } from "util/Helper";
import { CardNoFooter } from "../components/Card/Card";
import { MaterialButton } from "../components/CustomButton/MaterialButton";
import {
  getPostTableHeader,
  getVegetableAPIloadingTime
} from "../redux/Selector/Selectors";
import * as variable from "../variables/Variables";
function Post() {
  let materialHeader = useSelector((state) => getPostTableHeader(state));
  let loading = useSelector((state) => getVegetableAPIloadingTime(state));
  const [tableBodyData, setTableBodyData] = useState([]);
  let dispatch = useDispatch();

  //! function sẽ load những rau trồng đc gửi lên để admin duyệt
  function updateVegetableData() {
    let hava = [];
    dispatch(getAllVegetableUnapproved()).then((response) => {
      if (Object.keys(response.payload.data).length !== 0) {
        hava = [...prepareVegetableData(response.payload.data)];
        console.log("table đây ngày29/01= ", hava);
        dispatch(setNotificationCount(hava.length));
        setTableBodyData(hava);
      } else {
        hava = [...prepareVegetableData(response.payload.data)];
        console.log("table đây= ", hava);
        dispatch(setNotificationCount(0));
        setTableBodyData(hava);
      }
    });
  }

  React.useEffect(() => {
    updateVegetableData();
  }, []);
  return (
    <React.Fragment>
      <LoadingPopUp visible={loading} length="200px" />
      <div className="content">
        <MaterialButton
          variant="contained"
          color="info"
          size="large"
          style={{ marginRight: 5 }}
          onClick={() => {
            updateVegetableData();
          }}
        >
          Cập nhật
        </MaterialButton>
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            titlet="Account list"
            content={
              <NormalTable
                headCells={materialHeader}
                bodyData={tableBodyData}
                notShowing={[variable.islock]}
                actionbuttonlist={["remove"]}
              />
            }
          />
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Post;
