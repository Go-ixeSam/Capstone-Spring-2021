import { Box } from "@material-ui/core";
import { FormControll } from "components/Formik/FormikControl";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setFirebaseToken } from "redux/index";
import { getSignInForm, getToken } from "redux/Selector/Selectors";
import message from "util/firebase";
import * as variable from "variables/Variables";
import * as Yup from "yup";
import "../components/SignIn/style.scss";

let width = 240;
let marginBottom = 5;
let headeFontSize = 20;
let choseSignInTypeHeight = 30;
let choseSignInTypeWidth = "80%";
let startIcon = 15;
let chooseSignInPadding = 20;
let attensionPadding = 10;
// * Style cho may cai nut chon loai dang nhap
let choseStyle = {
  height: choseSignInTypeHeight,
  padding: 0,
  marginBottom: 10,
  width: choseSignInTypeWidth,
  fontSize: 12,
};

const initialValue = {
  [variable.username]: "",
  [variable.password]: "",
};

/**
 * * hàm test dùng để tạo ra 1 validation custom
 * * với tham số 1 là tên của cái validation này
 * * tham số 2 là message error
 * * tham số 3 là 1 function với value chính là cái data đc input
 */

const validationSchema = Yup.object({
  [variable.password]: Yup.string().required([variable.require]),
  [variable.username]: Yup.string().required([variable.require]),
  checkpassword: Yup.string().when([variable.password], {
    is: (val) => (val == "sam" > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref(variable.password)],
      "Your password is wrong"
    ),
  }),
});

function Signin() {
  const token = useSelector((state) => getToken(state));
  const signInForm = useSelector((state) => getSignInForm(state));
  const [firebaseToken, setFirebaseToken] = React.useState("");
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getTokenFromServer = async () => {
      try {
        const currentToken = await message.getToken({
          vapidKey:
            "BJT4KMAdFm6G8Sjq49q8RmDMsP6w0jPUghMTSMcdfkduJnBNzfxsSlLGEAMQzKjsu1aCtCtGA9TBT4D1wCk4SxM",
        });
        if (currentToken) {
          setFirebaseToken(currentToken);
          console.log(
            "registration success, here firebase token=",
            currentToken
          );
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      } catch (error) {
        console.log("firebase token error= ", error);
      }
    };
    getTokenFromServer();
  }, []);
  const onSubmit = (value, onSubmitProps) => {
    console.log("submit value và có ở Sâm: ", value);
    //* giá trị của submiting thì formik sẽ tự động set khi ta dùng đén fieldError, bỏi vì nó làm thay đổi đến object error nên submiting sẽ ko
    //* chuyển thành true

    //! Nếu như token bằng rỗng thì chứng tỏ mật khẩu sai
    console.log("token lên web vào ngày 5/5", firebaseToken);
    dispatch(
      login({
        phoneNumber: value.username,
        deviceToken: firebaseToken,
        password: value.password,
      })
    ).then(() => {
      if (token == "") {
        onSubmitProps.setFieldError(
          [variable.password],
          "Hãy kiểm tra lại mật khẩu hoặc tên đăng nhập của bạn"
        );
      }
    });
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div className="login-page">
        <div className="form">
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: 15,
                      fontFamily: "Roboto",
                    }}
                  >
                    <p style={{ color: "#9e9e9e", fontSize: headeFontSize }}>
                      Đăng nhập
                    </p>
                    <Box width={5} />
                    <p style={{ fontWeight: "bold", fontSize: headeFontSize }}>
                      Web Admin
                    </p>
                  </div>
                  {signInForm.map((rows) => {
                    const columns = rows.row.cols;
                    return columns.map((column) => {
                      const controlType = column.elementType;
                      const { name, type, placeholder, labeltext } =
                        column.elementConfig;
                      return (
                        <FormControll
                          elementType="input"
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          {...column}
                        />
                      );
                    });
                  })}
                  <div
                    className="attensin"
                    style={{
                      visibility: "hidden",
                      textAlign: "right",
                      paddingRight: attensionPadding,
                      marginTop: 5,
                    }}
                  >
                    <p style={{ fontSize: 12, fontWeight: "bold" }}>
                      Quên mật khẩu?
                    </p>
                  </div>
                  {/* {console.log("formik valid value", formik)} */}
                  <button type="submit">Đăng nhập</button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Signin;
