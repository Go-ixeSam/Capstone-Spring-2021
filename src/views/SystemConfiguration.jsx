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
} from "../redux/Selector/Selectors";
import { Formik, Field, Form, useField, useFormikContext } from "formik";

import * as variable from "../variables/Variables";
import { addPercentReportName, getPercentById } from "../redux/index";
import { MaterialButton } from "../components/CustomButton/MaterialButton";

function SystemConfiguration() {
  const dispatch = useDispatch();
  const percentDefault = useSelector(
    (state) => getPercentResult(state)[0].precent
  );
  const systemConfigForm = useSelector((state) => getPercentReport(state));
  const defaultData = useSelector((state) => getPercentResult(state));
  const percentNames = {
    elementConfig: {
      options: useSelector((state) => getPercentName(state)),
    },
  };

  React.useEffect(() => {
    // * khúc này lúc sau sẽ lấy giá trị percent đầu tiên của mảng percent report gửi về và đưa vào initialValue percent bằng cách gọi API

    //! tạm dùng local để test trước
    const stepByStep = () => {
      dispatch(addPercentReportName());

      //! phan set default nay se dc chay trong async khi chuyen qua goi API
      // setPercentDefault(defaultData[0].precent);
    };
    stepByStep();
  }, []);

  const initialValue = {
    [variable.percentName]: "",
    [variable.percent]: percentDefault,
  };

  const MyField = (props) => {
    const percent = useSelector((state) => getPercent(state));
    const {
      values: { percentName },
      // touched,
      setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);

    React.useEffect(() => {
      const set = () => {
        dispatch(getPercentById(percentName));
        setFieldValue(props.name, percent);
      };
      set()
      // if (touched.percentName) {
      //   set();
      // }
    }, [percentName, percent]);

    return (
      <>
        <FormControll {...props} {...field} />
      </>
    );
  };

  return (
    <Grid fluid style={{ margin: 0, padding: 0 }}>
      <CardNoFooter
        title=""
        content={
          <React.Fragment>
            <div style={{ width: "30%" }}>
              <Formik
                initialValues={initialValue}
                //   validationSchema={validationSchema}
                // onSubmit={onSubmit}
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
                        size="large"
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
  );
}

export default SystemConfiguration;
