import React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getALL, getPlantInfo, setVisible } from "redux/index";
import { CardNoFooter } from "../components/Card/Card";
import EnhancedTable from "../components/SuperTable/AdvanceTable";
import {
  getAdvanceData,
  getMaterialHeader,
  getModalVisible,
} from "../redux/Selector/Selectors";
import * as variable from "../variables/Variables";
import VerticalTab from "components/MaterialComponent/VerticalTab";
import { fetchPostList } from "api/APICall";
import {
  ShowPopUp,
  SuccessPopUp,
  LoadingPopUp,
  FailPopUp,
} from "components/Modal/Modal";
import {} from "components/LoadingSpinner/LoadingSpinner";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import ChartistGraph from "react-chartist";

export default function StickyHeadTable() {
  let materialBody = useSelector((state) => getAdvanceData(state));
  let materialHeader = useSelector((state) => getMaterialHeader(state));
  let dispatch = useDispatch();
  let [successVisible, setSuccessVisible] = React.useState(false);
  let [failVisible, setFailVisible] = React.useState(false);
  let [loadingVisible, setLoadingVisible] = React.useState(false);
  let visible = useSelector((state) => getModalVisible(state));

  // ! Tắt cái modal đi
  function closeModal() {
    dispatch(setVisible(false));
  }

  function autoCloseSuccessModal() {
    setSuccessVisible(true);
    setTimeout(function () {
      setSuccessVisible(false);
    }, 2000);
  }
  function autoCloseFailModal() {
    setFailVisible(true);
    setTimeout(function () {
      setFailVisible(false);
    }, 2000);
  }
  function doing(requestStatus) {
    setLoadingVisible(false);
    switch (requestStatus) {
      case variable.fulfilled:
        console.log("đã vào");
        autoCloseSuccessModal();
        break;
      case variable.rejected:
        autoCloseFailModal();
        break;
      // ! Trường hợp pendding sẽ xảy ra trước và nếu như thành công thì nó sẽ đi vào fullfill, lỗi thì error
      //! đọc trong link này:https://redux-toolkit.js.org/api/createAsyncThunk
    }
  }
  React.useEffect(() => {
    //! 1 lưu ý quan trọng là nếu muón sử dụng async function ở trong useEffect thì ta phải triển khai nó luôn ở trong useEffect và gọi nó như ở dưới,
    // ! Tuyệt đối ko tự biến useEffect thành async function =)
    const fetchPostList = async () => {
      // * Bắt try catch ở đây là để tránh lỗi crash ứng dụng lỡ như trong quá trình dispatch đến getAll bị lỗi
      try {
        // const response = await dispatch(getALL());
        const response = await dispatch(getPlantInfo({ title: "Húng quế" }));
        const requestStatus = response.meta.requestStatus;
        doing(requestStatus);
        console.log("response", response);

        // * Nếu có sử dụng gì ở local này thì ta cứ lấy response ra mà dùng
      } catch (errpr) {
        console.log("Failed to fetch product list: ", errpr);
      }
    };

    //! Trước khi api đc gọi thì ta sẽ cho cái loading nó chạy
    setLoadingVisible(true);
    fetchPostList();
  }, []);
  return (
    <React.Fragment>
      <SuccessPopUp visible={successVisible} length="200px" />
      <ShowPopUp visible={visible} onCLose={closeModal} length="45%">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            title="Danh sách bài đăng bị báo cáo"
            content={
              <React.Fragment>
                <VerticalTab />
              </React.Fragment>
            }
          ></CardNoFooter>
        </Grid>
      </ShowPopUp>
      <FailPopUp visible={failVisible} length="200px" />
      <LoadingPopUp visible={loadingVisible} length="200px" />
      <div className="content">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            titlet="Account list"
            content={
              <Row>
                <Col xs={12}>
                  {/* Để có thể thực hiện hành động lock tài khoản thì hãy thêm field isLock ở mỗi dòng dữ liệu của body data */}
                  <EnhancedTable
                    headCells={materialHeader}
                    bodyData={materialBody}
                    actionbuttonlist={["remove",]}
                    // actionbuttonlist={[]}
                  />
                </Col>
              </Row>
            }
          />
        </Grid>
      </div>
    </React.Fragment>
  );
}
