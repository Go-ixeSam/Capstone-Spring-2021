import { LoadingPopUp, SuccessPopUp } from "components/Modal/Modal";
import NormalTable from "components/SuperTable/NormalTable";
import React, { useState } from "react";
import { Grid, Col, Row } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVegetableUnapproved,
  setNotificationCount,
  setVisible,
  updateVegetableDetail,
  setUpdateSingal
} from "redux/index";
import * as variable from "variables/Variables";

import { FormControll } from "components/Formik/FormikControl";
import EnhancedTable from "components/SuperTable/NoCustomeTable";
import { prepareVegetableData } from "util/Helper";
import { CardNoFooter, Card } from "../components/Card/Card";
import { MaterialButton } from "../components/CustomButton/MaterialButton";
import {
  getPostTableHeader,
  getVegetableAPIloadingTime,
  getTestTable,
  getShowDetail,
  getSeletedVegetable,
  getUpdateSignal
} from "../redux/Selector/Selectors";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from "react-bootstrap";
import { setSelectedVegetable } from "redux/Vegetable/VegetableSlice";
import { uses } from "variables/Variables";

function White() {
  let loading = useSelector((state) => getVegetableAPIloadingTime(state));
  const seletedVegetable = useSelector((state) => getSeletedVegetable(state));
  let [usesInfo, setUses] = React.useState("");
  let [desInfo, setDes] = React.useState("");
  let [successVisible, setSuccessVisible] = React.useState(false); // dùng để hiện succes popup
  const [tableBodyData, setTableBodyData] = useState([]);
  let dispatch = useDispatch();
  const titleStyle = { fontWeight: "bold", marginTop: 10 };

  const updateVegetable = async () => {
    const param = {
      idDescription: seletedVegetable[variable.id],
      title: seletedVegetable[variable.vegetableName],
      description: desInfo,
      feature: usesInfo,
    };
    await dispatch(updateVegetableDetail(param));
    await dispatch(setUpdateSingal(true))
    autoCloseSuccessModal()
  };
  function autoCloseSuccessModal() {
    setSuccessVisible(true);
    setTimeout(function () {
      setSuccessVisible(false);
    }, 2000);
  }

  React.useEffect(() => {
    setUses(seletedVegetable[variable.uses]);
    setDes(seletedVegetable[variable.description]);
  }, [seletedVegetable]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name= ", name, " value= ", value);
    switch (name) {
      case "uses":
        setUses(value);
        break;
      case "des":
        setDes(value);
    }
  };
  return (
    <React.Fragment>
      <LoadingPopUp visible={loading} length="200px" />
      <SuccessPopUp visible={successVisible} length="200px" />
      <div className="content">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <Row>
            <Col md={6}>
              <CardNoFooter
                titlet="Vegetable list"
                content={
                  <EnhancedTable actionbuttonlist={["read", "remove"]} />
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Thông tin chi tiết"
                content={
                  // <div style={{visibility:showDetail}}>
                  <div
                    style={{
                      visibility: "visible",
                      margin: 0,
                      padding: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      style={{ border: "1px solid grey", padding: 5 }}
                      width={200}
                      src={seletedVegetable[variable.vegetableImage]}
                      height={200}
                    />
                    <p style={titleStyle}>Tên rau</p>
                    <p style={{ color: "green" }}>
                      {seletedVegetable[variable.vegetableName]}
                    </p>
                    <form>
                      <p style={titleStyle}>Công dụng</p>
                      <FormGroup controlId="formControlUese">
                        <FormControl
                          style={{ height: 100 }}
                          name="uses"
                          componentClass="textarea"
                          onChange={(event) => handleChange(event)}
                          value={usesInfo}
                        />
                      </FormGroup>
                      <p style={titleStyle}>Mô tả</p>
                      <FormGroup controlId="formControlDes">
                        <FormControl
                          style={{ height: 150 }}
                          name={"des"}
                          componentClass="textarea"
                          onChange={(event) => handleChange(event)}
                          value={desInfo}
                        />
                      </FormGroup>
                      <MaterialButton
                        type="button"
                        variant="contained"
                        color="info"
                        size="large"
                        click={() => updateVegetable()}
                        style={{ marginRight: 5 }}
                      >
                        Cập nhật thông tin
                      </MaterialButton>
                    </form>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default White;
