import richado from "assets/img/richasdo.jpg";
import { ShowPopUp, SuccessPopUp, LoadingPopUp } from "components/Modal/Modal";
import NormalTable from "components/SuperTable/NormalTable";
import React, { useState } from "react";
import { Col, Grid, Row } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { prepareVegetableData } from "util/Helper";
import { useDispatch, useSelector } from "react-redux";
import {
  setVisible,
  isAccept,
  getAllVegetableUnapproved,
  setNotificationCount,
  // useWantAllVegetableUnapproved,
} from "redux/index";
import { CardNoFooter } from "../components/Card/Card";
// import { useAPICalling } from "api/JSONPLACEHOLDERApi";
import { MaterialButton } from "../components/CustomButton/MaterialButton";
import {
  getModalVisible,
  getPostTableBodyData,
  getPostTableHeader,
  getVegetableAPIloadingTime,
  getAllVegetable,
} from "../redux/Selector/Selectors";
import * as variable from "../variables/Variables";
import { createVegetableData } from "util/ContructorCreation";
import { dataSales } from "variables/Variables";
function Post() {
  let materialBody = useSelector((state) => getPostTableBodyData(state));
  let materialHeader = useSelector((state) => getPostTableHeader(state));
  let loading = useSelector((state) => getVegetableAPIloadingTime(state));
  let [successVisible, setSuccessVisible] = React.useState(false);
  const [tableBodyData, setTableBodyData] = useState([]);
  const currentVegetableList = useSelector((state) => getAllVegetable(state));
  let dispatch = useDispatch();
  let visible = useSelector((state) => getModalVisible(state));
  const HeightLength = "200px";
  const WidthLength = "300px";

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
  const closeModal = () => {
    return "";
  };
  const autoCloseSuccessModal = () => {
    dispatch(setVisible(false))
  };
  return (
    <React.Fragment>
     
      {/* <SuccessPopUp visible={successVisible} length="200px" /> */}
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
