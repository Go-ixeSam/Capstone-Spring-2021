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
import Input from "components/Formik/Input"

function SignInForgotPassword() {
  return (
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
       <Input
       name=""
       
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
  );
}

export default SignInForgotPassword;
