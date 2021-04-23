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
        console.log("table đây= ", hava);
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
    return "";
  };
  return (
    <React.Fragment>
      <ShowPopUp visible={visible} onCLose={closeModal} length="50%">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            title={<React.Fragment></React.Fragment>}
            content={
              <React.Fragment>
                <Row>
                  <Col xs={7}>
                    <div className="post-background-content">
                      <p
                        className="post-text-header"
                        style={{ color: "green" }}
                      >
                        Rau Húng
                      </p>
                      <img
                        src={richado}
                        style={{
                          width: WidthLength,
                          height: HeightLength,
                          borderRadius: 5,
                          marginBottom: 10,
                        }}
                      ></img>
                      <p className="post-text-header">Công dụng</p>
                      <p className="post-text-header">Mổ tả</p>
                      <PerfectScrollbar style={{ height: 50, width: 300 }}>
                        <p className="post-text-content">
                          Curabitur aptent nulla maecenas litora convallis
                          nostra urna ullamcorper nam. Suscipit eleifend litora
                          velit lacinia molestie diam tristique. Consequat
                          penatibus leo dignissim feugiat mollis pulvinar.
                          Lacinia mus augue senectus blandit libero habitasse
                          sollicitudin. Nunc augue aliquam torquent leo pharetra
                          curabitur facilisis. Viverra, massa aenean sapien
                          imperdiet leo odio dis tristique quam natoque varius
                          sapien. Aenean nec imperdiet ultricies mattis cras
                          orci adipiscing elementum vel. Dis primis mus pulvinar
                          dolor. Arcu et gravida ultricies viverra libero
                          vulputate cursus. Praesent faucibus urna habitant
                          luctus felis tempus himenaeos fames maecenas pretium
                          luctus. Tortor quis maecenas primis cum ultricies
                          primis! Praesent elit porta vehicula lacus tincidunt
                          elit vestibulum. Nisi, faucibus fusce nibh pharetra
                          elit massa. Condimentum leo suscipit suspendisse in
                          nibh odio. Curae; elementum scelerisque condimentum
                          duis commodo nunc primis scelerisque class. Penatibus
                          tortor diam lacinia netus sociis facilisi pretium
                          curabitur nulla lacus quam. Laoreet lacus purus dolor
                          vivamus magnis aptent platea nulla interdum
                        </p>
                      </PerfectScrollbar>
                      <PerfectScrollbar style={{ height: 100, width: 300 }}>
                        <p className="post-text-content">
                          Curabitur aptent nulla maecenas litora convallis
                          nostra urna ullamcorper nam. Suscipit eleifend litora
                          velit lacinia molestie diam tristique. Consequat
                          penatibus leo dignissim feugiat mollis pulvinar.
                          Lacinia mus augue senectus blandit libero habitasse
                          sollicitudin. Nunc augue aliquam torquent leo pharetra
                          curabitur facilisis. Viverra, massa aenean sapien
                          imperdiet leo odio dis tristique quam natoque varius
                          sapien. Aenean nec imperdiet ultricies mattis cras
                          orci adipiscing elementum vel. Dis primis mus pulvinar
                          dolor. Arcu et gravida ultricies viverra libero
                          vulputate cursus. Praesent faucibus urna habitant
                          luctus felis tempus himenaeos fames maecenas pretium
                          luctus. Tortor quis maecenas primis cum ultricies
                          primis! Praesent elit porta vehicula lacus tincidunt
                          elit vestibulum. Nisi, faucibus fusce nibh pharetra
                          elit massa. Condimentum leo suscipit suspendisse in
                          nibh odio. Curae; elementum scelerisque condimentum
                          duis commodo nunc primis scelerisque class. Penatibus
                          tortor diam lacinia netus sociis facilisi pretium
                          curabitur nulla lacus quam. Laoreet lacus purus dolor
                          vivamus magnis aptent platea nulla interdum
                          ullamcorper sollicitudin ultrices. Pretium feugiat
                          ultrices sapien. Scelerisque lacinia, curabitur tempus
                          eget massa parturient neque lobortis quis tristique
                          dui. Sit malesuada aliquam sagittis vel lobortis
                          pharetra. Nisi gravida semper senectus vehicula. Fames
                          quis a hendrerit sagittis sodales mauris ad aliquam.
                          Laoreet senectus varius augue platea ridiculus nisl
                          odio cras ante quis nulla. Magnis sagittis aliquam
                          phasellus bibendum class per nascetur sapien accumsan
                          tristique potenti tellus. Proin condimentum ridiculus
                          enim ultricies fusce enim. Vitae, suscipit suspendisse
                          sociosqu ut. Bibendum fermentum vivamus vitae, tortor
                          turpis libero? Leo pellentesque dolor cursus netus
                          accumsan mauris proin eu dignissim ipsum a. Praesent
                          cubilia nisl donec dolor. Massa ac laoreet class morbi
                          sollicitudin class vulputate suspendisse nullam
                          integer. Viverra posuere taciti tempus congue cursus
                          luctus eleifend netus libero neque. Per blandit
                          dictumst mollis adipiscing libero sociosqu massa
                          class! Ultricies cubilia convallis magna curae;
                          volutpat tristique? Netus tincidunt penatibus curae;
                          facilisi lorem vivamus justo ut. Proin dolor
                          consectetur semper integer, aptent nibh habitasse
                          pulvinar nostra dolor. Hac, vivamus metus imperdiet
                          ultrices mollis sollicitudin sagittis. Quis tortor
                          augue, orci malesuada dui rutrum consequat turpis
                          ultrices. Per arcu nascetur etiam nascetur adipiscing.
                          Parturient ullamcorper tincidunt eu porta egestas
                          nullam convallis lectus sapien consectetur placerat.
                          Aliquet, viverra nullam tempor nisi tortor. Maecenas
                          arcu, tortor ante. Natoque turpis dui aenean sed. Nisi
                          lectus dolor himenaeos senectus tempus amet facilisi.
                        </p>
                      </PerfectScrollbar>
                      <div>
                        <div style={{ display: "flex", marginTop: 10 }}>
                          <MaterialButton
                            variant="contained"
                            color="error"
                            size="large"
                            style={{ marginRight: 5 }}
                            click={() => autoCloseSuccessModal()}
                          >
                            Từ chối
                          </MaterialButton>
                          <MaterialButton
                            variant="contained"
                            color="success"
                            size="large"
                            style={{ marginRight: 5 }}
                          >
                            Duyệt rau
                          </MaterialButton>
                          {/* <MaterialButton
                          variant="contained"
                          color="info"
                          size="large"
                          style={{ marginRight: 5 }}
                        >
                          Chỉnh sửa
                        </MaterialButton> */}
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
