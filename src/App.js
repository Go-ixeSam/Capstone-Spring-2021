import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import AdminLayout from "../src/layouts/Admin.jsx";
import Signin from "./views/Signin";
import { useDispatch, useSelector } from "react-redux";
import {
  getSignInForm,
  getToken,
  getTokenExpiredTime,
} from "redux/Selector/Selectors";
import * as variable from "./variables/Variables";
import { logOut } from "redux/index";
function App() {
  const token = useSelector((state) => getToken(state));
  const expiredToken = useSelector((state) => getTokenExpiredTime(state));
  const dispatch = useDispatch();
  //* kiểm tra thời hạn của token, nếu hết thì gọi logout
  let currentTime = new Date();
  if (currentTime == expiredToken) {
    dispatch(logOut);
  } else {
    // console.log("current time vẫn ổn")
  }
  const number = 0;
  return (
    <div>
      <Switch>
        <Route
          path="/admin"
          render={
            // (props) => (token != "" ? <AdminLayout {...props} /> : <Signin />)
            (props) => (number == 1 ? <AdminLayout {...props} /> : <Signin />)
          }
        />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </div>
  );
}
export default App;
// const mapStatetoProp = (state) => {
//   return {
//     userData: state.user.token,
//     userRole: state.user.roles.text,
//   };
// };
// export default connect(mapStatetoProp)(withRouter(App));
