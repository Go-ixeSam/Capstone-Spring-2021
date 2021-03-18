import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import AdminLayout from "../src/layouts/Admin.jsx";
import Signin from "./views/Signin";
import { useDispatch, useSelector } from "react-redux";
import { getSignInForm, getToken } from "redux/Selector/Selectors";

function App() {
  const token = useSelector((state) => getToken(state));
  const number = 0;
  return (
    <div>
      <Switch>
        <Route
          path="/admin"
          render={
            (props) => (token!="" ? <AdminLayout {...props} /> : <Signin />)
            // (number == 1 ? <AdminLayout {...props} /> : <Signin />)
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
