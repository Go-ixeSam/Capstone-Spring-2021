import richado from "assets/img/richasdo.jpg";
import { ShowPopUp, SuccessPopUp } from "components/Modal/Modal";
import NormalTable from "components/SuperTable/NormalTable";
import React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "redux/index";
import { CardNoFooter } from "../components/Card/Card";
import { MaterialButton } from "../components/CustomButton/MaterialButton";
import {
  getModalVisible,
  getPostTableBodyData,
  getPostTableHeader,
} from "../redux/Selector/Selectors";
import * as variable from "../variables/Variables";

function Post() {
  let materialBody = useSelector((state) => getPostTableBodyData(state));
  let materialHeader = useSelector((state) => getPostTableHeader(state));
  let [successVisible, setSuccessVisible] = React.useState(false);
  let dispatch = useDispatch();
  let visible = useSelector((state) => getModalVisible(state));
  const HeightLength = "200px";
  const WidthLength = "300px";

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
  return (
    <React.Fragment>
      <ShowPopUp visible={visible} onCLose={closeModal} length="50%">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            title={
              <React.Fragment>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p>Ngày đăng:</p>
                  <p style={{ fontWeight: "bold" }}>{HeightLength},</p>
                  {/* <p style={{ marginLeft: 5 }}>tài khoản: </p>
                <p style={{ fontWeight: "bold" }}>Khắc Sâm, </p>
                <p style={{ marginLeft: 5 }}>ID: </p>
                <p style={{ fontWeight: "bold" }}>0304939</p> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p>Tài khoản: </p>
                  <p style={{ fontWeight: "bold" }}>Khắc Sâm, </p>
                  <p>ID: </p>
                  <p style={{ fontWeight: "bold" }}>0304939</p>
                </div>
              </React.Fragment>
            }
            content={
              <React.Fragment>
                <Row>
                  <Col xs={7}>
                    <div className="post-background-content">
                      <img
                        src={richado}
                        style={{
                          width: WidthLength,
                          height: HeightLength,
                          borderRadius: 5,
                          marginBottom: 10,
                        }}
                      ></img>
                      <p className="post-text-header">Nội dung</p>
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
                            Xóa bài
                          </MaterialButton>
                          {/* <MaterialButton
                            variant="contained"
                            color="success"
                            size="large"
                            style={{ marginRight: 5 }}
                          >
                            Chấp nhận
                          </MaterialButton> */}
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
                    {/* </div> */}
                  </Col>

                  {/* Tạm thời ta sẽ để thông tin người đăng ở nội dung bài đăng */}
                  {/* <Col xs={5}> */}
                  {/* <div className="post-background-content">
                      <p className="post-text-header">Loại rau</p>
                      <p className="post-text-content">Rau cần của cải trắng</p>
                      <p className="post-text-header">Công dụng</p>
                      <PerfectScrollbar style={{ height: 50, width: 300 }}>
                        <p className="post-text-content">Đi lên nồi cau</p>
                      </PerfectScrollbar>
                      <p className="post-text-header">Mô tả</p>
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
                    </div> */}
                  {/* <UserCard
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
                    /> */}
                  {/* </Col> */}

                  {/* // description={
                    //   <div>
                    //     <InfoLine icon={faPhoneAlt} text={"08081508"} />
                    //     <InfoLine icon={faEnvelope} text={"Ricado@gmail.com"} />
                    //     <InfoLine icon={faVenusMars} text={"Male"} />
                    //     <InfoLine icon={faBirthdayCake} text={"28/09/1981"} />
                    //   </div>
                    // } */}
                </Row>
              </React.Fragment>
            }
          />
        </Grid>
      </ShowPopUp>
      <SuccessPopUp visible={successVisible} length="200px" />
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
