import React, { useState } from "react";
import { CardNoFooter } from "../components/Card/Card";
import { Col, Grid, Row } from "react-bootstrap";
import { FormControll } from "../components/Formik/FormikControl";
import { useDispatch, useSelector } from "react-redux";
import {
  getPercentReport,
  getPercent,
  getPercentName,
  getPercentResult,
  getSystemConfigLoading,
} from "../redux/Selector/Selectors";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import {
  ShowPopUp,
  SuccessPopUp,
  LoadingPopUp,
  FailPopUp,
} from "components/Modal/Modal";

import * as variable from "../variables/Variables";
import {
  addPercentReportName,
  getPercentById,
  getAllPercentReport,
  updatePercentThreshold,
} from "../redux/index";
import { MaterialButton } from "../components/CustomButton/MaterialButton";

function SystemConfiguration() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => getSystemConfigLoading(state));
  const percent = useSelector((state) => getPercent(state));
  let [successVisible, setSuccessVisible] = React.useState(false); // dùng để hiện succes popup
  let [failVisible, setFailVisible] = React.useState(false);
  const percentNames = {
    elementConfig: {
      options: useSelector((state) => getPercentName(state)),
    },
  };

  // tư động đóng popup lại sau 2s
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

  React.useEffect(() => {
    // * khúc này lúc sau sẽ lấy giá trị percent đầu tiên của mảng percent report gửi về và đưa vào initialValue percent bằng cách gọi API
    const loadPercentName = async () => {
      const res = await dispatch(getAllPercentReport());
      const result = dispatch(addPercentReportName(res.payload.data));
      console.log("result nè= ",result)

      //* lấy giá trị mặc đinh cho field hiện percent mỗi khi load trang
      dispatch(getPercentById(result.payload[0].id));
    };

    try {
      loadPercentName();
    } catch (error) {
      console.log("Lỗi try system configuaration khi useEffect= ", error);
    }
  }, []);

  const initialValue = {
    [variable.percentName]: "",
    [variable.percent]: percent,
  };

  const MyField = (props) => {
    const { name } = props;
    const {
      values: { percentName }, // value mặc định
      setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);

    React.useEffect(() => {
      const set = () => {
        //! lấy số phần trăm dựa trên loại phần trăm, ta lấy kết quả bằng useSelector ở trên
        dispatch(getPercentById(percentName));
        setFieldValue(name, percent); // * name ở đây là tên của cái field
      };
      set();
    }, [percentName, percent]);

    return (
      <>
        <FormControll {...props} {...field} />
      </>
    );
  };

  const onSubmit = (value, onSubmitProps) => {
    console.log("value, ", value);
    const submitChange = async () => {
      const res = await dispatch(
        updatePercentThreshold({
          id: value[variable.percentName],
          name: "",
          precent: value[variable.percent],
        })
      );

      //* Update lai du lieu sau khi submit xong
      const updateData = await dispatch(getAllPercentReport());
      const result = dispatch(addPercentReportName(updateData.payload.data));
      console.log("submit= ", res);

      //! sau khi việc update thành công thì hiện cái popup success
      if (result.payload) {
        if (result.payload.length > 0) {
          autoCloseSuccessModal();
        }
      }
      onSubmitProps.setSubmitting(false);
    };
    try {
      submitChange();
    } catch (error) {
      autoCloseFailModal();
      console.log("Lỗi ở system configuaration khi submit= ", error);
    }
  };

  return (
    <React.Fragment>
      <SuccessPopUp visible={successVisible} length="200px" />
      <FailPopUp visible={failVisible} length="200px" />
      <LoadingPopUp visible={loading} length="200px" />
      <Grid fluid style={{ margin: 0, padding: 0 }}>
        <CardNoFooter
          title=""
          content={
            <React.Fragment>
              <div style={{ width: "30%" }}>
                <Formik
                  initialValues={initialValue}
                  //   validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <FormControll
                          elementType="select"
                          label={"Loại ngưỡng báo cáo"}
                          name={variable.percentName}
                          {...percentNames}
                        />
                        <MyField
                          elementType="input"
                          type="number"
                          label={"Phần trăm ngưỡng"}
                          name={variable.percent}
                          value="40"
                        />

                        <MaterialButton
                          variant="contained"
                          color="success"
                          type="submit"
                          size="large"
                          disabled={
                            formik.isSubmitting ||
                            !formik.touched[variable.percent]
                          }
                          style={{ marginRight: 5, marginTop: 10 }}
                        >
                          Cập nhật
                        </MaterialButton>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </React.Fragment>
          }
        />
      </Grid>
    </React.Fragment>
  );
}

export default SystemConfiguration;
