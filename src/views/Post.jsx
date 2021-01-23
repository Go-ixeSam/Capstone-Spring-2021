import React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getALL } from "redux/index";
import { CardNoFooter } from "../components/Card/Card";
import EnhancedTable from "../components/SuperTable/AdvanceTable";
import {
  getAdvanceData,
  getMaterialHeader,
  getModalVisible,
} from "../redux/Selector/Selectors";
import * as variable from "../variables/Variables";
import { openPopup, closePopup, ShowPopUp } from "components/Modal/Modal";
import { UserCard } from "components/UserCard/UserCard.jsx";
import avatar from "assets/img/faces/face-3.jpg";
import NormalTable from "components/SuperTable/NormalTable";
import { setVisible } from "redux/index";
import { MaterialButton } from "../components/CustomButton/MaterialButton";
function Post() {
  let materialBody = useSelector((state) => getAdvanceData(state));
  let materialHeader = useSelector((state) => getMaterialHeader(state));
  let dispatch = useDispatch();
  let visible = useSelector((state) => getModalVisible(state));

  // ! Tắt cái modal đi
  function closeModal() {
    dispatch(setVisible(false));
  }
  return (
    <React.Fragment>
      <ShowPopUp visible={visible} onCLose={closeModal} length="80%">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            title="Post content"
            content={
              <Row>
                <Col xs={9}></Col>
                <Col xs={3}>
                  <UserCard
                    bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                    avatar={avatar}
                    name="Mike Andrew"
                    userName="michael24"
                    description={
                      <span>
                        "Lamborghini Mercy
                        <br />
                        Your chick she so thirsty
                        <br />
                        I'm in that two seat Lambo"
                      </span>
                    }
                  />
                  <MaterialButton
                    variant="contained"
                    color="success"
                    // type="submit"
                    size="large"
                    style={{ marginRight: 5 }}
                  >
                    Close
                  </MaterialButton>
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
