import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faPhoneAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import "../components/SignIn/style.scss";
import { FormControll } from "components/Formik/FormikControl";
import { Formik, Form } from "formik";
import * as variable from "variables/Variables";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { getSignInForm } from "redux/Selector/Selectors";

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
const onSubmit = (value, onSubmitProps) => {
  console.log("submit value: ", value);
};

/**
 * * hàm test dùng để tạo ra 1 validation custom
 * * với tham số 1 là tên của cái validation này
 * * tham số 2 là message error
 * * tham số 3 là 1 function với value chính là cái data đc input
 */

const validationSchema = Yup.object({
  [variable.password]: Yup.string()
    .required([variable.require])
    .test("checkpassword", "Wrong password", (value, context) => {
      // ? context chính là cái object Yup
      console.log("value nay", value, " context= ", context);
    }),
  [variable.username]: Yup.string().required([variable.require]),
  // [variable.password]: Yup.string().ph([variable.wrongpassword]),
});
function handleSubmit() {}

function Signin() {
  const signInForm = useSelector((state) => getSignInForm(state));
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
            <Form>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: 15,
                  fontFamily: "Roboto",
                }}
              >
                <p style={{ color: "grey", fontSize: headeFontSize }}>
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
                      // label={labeltext}
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      {...column}
                    />
                  );
                });
              })}
              {/* <TextField
                style={{ width: width, marginBottom: marginBottom }}
                type="text"
                variant="standard"
                label="Tên tài khoản"
                name="username"
              />
              <TextField
                style={{ width: width, marginBottom: marginBottom }}
                variant="standard"
                type="password"
                label="Mật khẩu"
                name="password"
              /> */}
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
              <button type="submit">Đăng nhập</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Signin;
