import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import AdminLayout from "../src/layouts/Admin.jsx";
import Signin from "./views/Signin";


function App() {
  const number = 1;
  return (
    <div>
      <Switch>
        <Route
          path="/"
          render={(props) =>
            (number == 1 ? <AdminLayout {...props} /> : <Signin />)
          }
        />
        <Redirect from="/" to="/fleetManager/trip" />
      </Switch>
    </div>
  );
}
export default App
// const mapStatetoProp = (state) => {
//   return {
//     userData: state.user.token,
//     userRole: state.user.roles.text,
//   };
// };
// export default connect(mapStatetoProp)(withRouter(App));
