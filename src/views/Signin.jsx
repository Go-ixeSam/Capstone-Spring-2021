import { Box } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { FormControll } from "components/Formik/FormikControl";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginReducer from "redux/Login/LoginSlice";
import { getSignInForm, getToken } from "redux/Selector/Selectors";
import * as variable from "variables/Variables";
import * as Yup from "yup";
import "../components/SignIn/style.scss";
import { getALL, getPlantInfo, login, sharingDetail } from "redux/index";
import { loginToWeb } from "components/Hook/CustomHook";

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
  const dispatch = useDispatch();
  const onSubmit = (value, onSubmitProps) => {
    console.log("submit value: ", value);
    //* giá trị của submiting thì formik sẽ tự động set khi ta dùng đén fieldError, bỏi vì nó làm thay đổi đến object error nên submiting sẽ ko
    //* chuyển thành true

    //! Nếu như token bằng rỗng thì chứng tỏ mật khẩu sai
    dispatch(
      login({
        phoneNumber: value.username,
        password: value.password,
      })
    ).then(() => {
      if (token == "") {
        onSubmitProps.setFieldError(
          [variable.password],
          "Hãy kiểm tra lại mật khẩu hoặc tên đăng nhập của bạn"
        );
      } else {
        alert("Ok rồi nha");
      }
    });
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {/* <div className="login-page">
        <div className="form">
          <Button
            style={{
              height: choseSignInTypeHeight,
              padding: chooseSignInPadding,
              marginBottom: 10,
              width: choseSignInTypeWidth,
              fontSize: 12,
            }}
            type="submit"
            startIcon={
              <FontAwesomeIcon
                icon={faUser}
                width={startIcon}
                height={startIcon}
              />
            }
          >
            Tên và mật khẩu
          </Button>
          <Button
            type="submit"
            style={{
              height: choseSignInTypeHeight,
              padding: chooseSignInPadding,
              marginBottom: 10,
              width: choseSignInTypeWidth,
              fontSize: 12,
              backgroundColor: "#e82e1e",
            }}
            startIcon={
              <FontAwesomeIcon
                icon={faGoogle}
                width={startIcon}
                height={startIcon}
              />
            }
          >
            Google
          </Button>
          <Button
            type="submit"
            style={{
              height: choseSignInTypeHeight,
              padding: chooseSignInPadding,
              marginBottom: 10,
              width: choseSignInTypeWidth,
              fontSize: 12,
              backgroundColor: "#c57a09",
            }}
            startIcon={
              <FontAwesomeIcon
                icon={faPhoneAlt}
                width={startIcon}
                height={startIcon}
              />
            }
          >
            Số điện thoại
          </Button>
        </div>
      </div> */}
      {/* <div style={{ fontSize: 25 }}>- -</div> */}

      {/* ! Phần div dùng để thay đổi mật khẩu */}

      {/* <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: 15,
                fontFamily: "Roboto",
              }}
            >
              <p style={{ color: "grey", fontSize: headeFontSize }}>
                Thay đổi mật khẩu
              </p>
            </div>
            <TextField
              style={{ width: width, marginBottom: marginBottom }}
              type="text"
              variant="standard"
              label="Email"
              name="email"
              // onChange={(event) => this.handleChange(event)}
            />
            <div
              className="attensin"
              style={{ textAlign: "left", paddingLeft: attensionPadding }}
            >
              <p style={{ fontSize: 12, fontWeight: "bold" }}>
                Lưu ý: Mail sẽ đến trong vòng 5 phút
              </p>
            </div>
            <button type="submit" className="button">
              <p>
                <a href="#resend">Gửi yêu cầu</a>
              </p>
            </button>{" "}
            <div
              style={{
                textAlign: "center",
                color: "#bb8322",
                paddingLeft: 10,
                margin: "5px 5px 15px 0",
              }}
            >
              <p id="resend">Gửi lại yêu cầu trong {chooseSignInPadding}s</p>
            </div>
          </form>
        </div>
      </div>

      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: 15,
                fontFamily: "Roboto",
              }}
            >
              <p style={{ color: "grey", fontSize: headeFontSize }}>
                Mật khẩu mới
              </p>
            </div>
            <TextField
              size="medium"
              style={{ marginBottom: marginBottom }}
              type="text"
              variant="outlined"
              label="Email"
              name="email"
              // onChange={(event) => this.handleChange(event)}
            />
            <div
              className="attensin"
              style={{ textAlign: "left", paddingLeft: attensionPadding }}
            >
              <p style={{ fontSize: 12, fontWeight: "bold" }}>
                Lưu ý: Mail sẽ đến trong vòng 5 phút
              </p>
            </div>
            <button type="submit" className="button">
              <p>
                <a href="#resend">Gửi yêu cầu</a>
              </p>
            </button>{" "}
            <div
              style={{
                textAlign: "center",
                color: "#bb8322",
                paddingLeft: 10,
                margin: "5px 5px 15px 0",
              }}
            >
              <p id="resend">Gửi lại yêu cầu trong {chooseSignInPadding}s</p>
            </div>
          </form>
        </div>
      </div> */}
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
                      const {
                        name,
                        type,
                        placeholder,
                        labeltext,
                      } = column.elementConfig;
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
