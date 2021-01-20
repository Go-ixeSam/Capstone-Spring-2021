import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faPhoneAlt, faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import "../components/SignIn/style.scss";


let width = 240;
let marginBottom = 5;
let headeFontSize = 20;
let choseSignInTypeHeight = 30;
let choseSignInTypeWidth = "80%";
let startIcon = 15;
let chooseSignInPadding = 20;

// * Style cho may cai nut chon loai dang nhap
let choseStyle = {
  height: choseSignInTypeHeight,
  padding: 0,
  marginBottom: 10,
  width: choseSignInTypeWidth,
  fontSize: 12,
};
function Signin() {
  // const classes = useStyles();

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div className="login-page">
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
      </div>
      <div style={{ fontSize: 25 }}>- -</div>
      <div className="login-page">
        <div className="form">
          <form
            className="login-form"
            // onSubmit={this.handleSubmit}
          >
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

            <TextField
              style={{ width: width, marginBottom: marginBottom }}
              type="text"
              variant="standard"
              label="Tên tài khoản"
              name="username"
              // onChange={(event) => this.handleChange(event)}
            />
            <TextField
              style={{ width: width, marginBottom: marginBottom }}
              variant="standard"
              type="password"
              label="Mật khẩu"
              name="password"
              // onChange={(event) => this.handleChange(event)}
            />
            <div
              style={{
                textAlign: "right",
                color: "grey",
                paddingRight: 10,
                margin: "5px 5px 15px 0",
              }}
            >
              <p style={{ fontSize: 12, fontWeight: "bold" }}>Quên mật khẩu?</p>
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
