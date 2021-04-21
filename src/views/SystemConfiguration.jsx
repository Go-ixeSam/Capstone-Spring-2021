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
import { ShowPopUp, SuccessPopUp, LoadingPopUp } from "components/Modal/Modal";

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
  const percentNames = {
    elementConfig: {
      options: useSelector((state) => getPercentName(state)),
    },
  };

  React.useEffect(() => {
    // * khúc này lúc sau sẽ lấy giá trị percent đầu tiên của mảng percent report gửi về và đưa vào initialValue percent bằng cách gọi API
    const loadPercentName = async () => {
      const res = await dispatch(getAllPercentReport());
      dispatch(addPercentReportName(res.payload.data));
    };
    loadPercentName();
  }, []);

  const initialValue = {
    [variable.percentName]: "",
    [variable.percent]: "",
  };

  const MyField = (props) => {
    const percent = useSelector((state) => getPercent(state));
    const {
      values: { percentName },
      setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);

    React.useEffect(() => {
      const set = () => {
        dispatch(getPercentById(percentName));
        setFieldValue(props.name, percent);
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
     const updateData= await dispatch(getAllPercentReport());
      dispatch(addPercentReportName(updateData.payload.data));
      console.log("submit= ", res);
      onSubmitProps.setSubmitting(false);
    };
    submitChange();
  };

  return (
    <React.Fragment>
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
                          type="text"
                          label={"Phần trăm ngưỡng"}
                          name={variable.percent}
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
                          Duyệt rau
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
