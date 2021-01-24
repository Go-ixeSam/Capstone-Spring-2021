import React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getALL } from "redux/index";
import { CardNoFooter } from "../components/Card/Card";
import EnhancedTable from "../components/SuperTable/AdvanceTable";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import InfoLine from "components/UserCard/InfoLine";
import {
  getAdvanceData,
  getMaterialHeader,
  getModalVisible,
} from "../redux/Selector/Selectors";
import * as variable from "../variables/Variables";
import { openPopup, closePopup, ShowPopUp } from "components/Modal/Modal";
import { UserCard } from "components/UserCard/UserCard.jsx";
import avatar from "assets/img/faces/face-3.jpg";
import {
  faLock,
  faLockOpen,
  faPhoneAlt,
  faEnvelope,
  faVenusMars,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";

import NormalTable from "components/SuperTable/NormalTable";
import { setVisible } from "redux/index";
import { MaterialButton } from "../components/CustomButton/MaterialButton";
import richado from "assets/img/richasdo.jpg";
function Post() {
  let materialBody = useSelector((state) => getAdvanceData(state));
  let materialHeader = useSelector((state) => getMaterialHeader(state));
  let dispatch = useDispatch();
  let visible = useSelector((state) => getModalVisible(state));
  const length = "300px";
  // ! Tắt cái modal đi
  function closeModal() {
    dispatch(setVisible(false));
  }
  return (
    <React.Fragment>
      <ShowPopUp visible={visible} onCLose={closeModal} length="80%">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            title={`Nội dung bài đăn ngày ${"25/09/2022"}`}
            content={
              <Row>
                <Col xs={8}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <p className="post-text-header">Ảnh bài</p>
                      <img
                        src={richado}
                        style={{
                          width: length,
                          height: length,
                          borderRadius: 5,
                        }}
                      ></img>
                      <div style={{ display: "flex", marginTop: 10 }}>
                        <MaterialButton
                          variant="contained"
                          color="error"
                          // type="submit"
                          size="large"
                          style={{ marginRight: 5 }}
                        >
                          Từ chối
                        </MaterialButton>
                        <MaterialButton
                          variant="contained"
                          color="success"
                          // type="submit"
                          size="large"
                          style={{ marginRight: 5 }}
                        >
                          Chấp nhận
                        </MaterialButton>
                      </div>
                    </div>
                    <div style={{ marginLeft: 15 }}>
                      <p className="post-text-header">Tên rau</p>
                      <p className="post-text-content">Rau cần của cải trắng</p>

                      <p className="post-text-header">Mô tả</p>
                      <p className="post-text-content">Đi lên nồi cau</p>
                      <p className="post-text-header">Công dụng</p>
                      <PerfectScrollbar style={{ height: 200, width: 350 }}>
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
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <p className="post-text-header">Người đăng</p>
                  <UserCard
                    bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                    avatar={avatar}
                    name="Richardo Milos"
                    userName={
                      <p>
                        Richado207
                        <br />
                        --
                        <br />
                        08081508
                        <br />
                        Ricado@gmail.com
                        <br />
                        Male
                        <br />
                        28/09/1981
                      </p>
                    }
                    // description={
                    //   <div>
                    //     <InfoLine icon={faPhoneAlt} text={"08081508"} />
                    //     <InfoLine icon={faEnvelope} text={"Ricado@gmail.com"} />
                    //     <InfoLine icon={faVenusMars} text={"Male"} />
                    //     <InfoLine icon={faBirthdayCake} text={"28/09/1981"} />
                    //   </div>
                    // }
                  />
                </Col>
              </Row>
            }
          />
        </Grid>
      </ShowPopUp>
      <div className="content">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            titlet="Account list"
            content={
              <Row>
                <Col xs={12}>
                  <NormalTable
                    headCells={materialHeader}
                    bodyData={materialBody}
                    notShowing={[variable.islock]}
                    actionbuttonlist={["read"]}
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

export default Post;
