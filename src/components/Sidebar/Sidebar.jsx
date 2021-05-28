/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getFirebase,
  getNotificationCount,
  getNotificationCountFromLogin,
} from "redux/Selector/Selectors";
import "./CircleDot.css";
import "./DotPosition.css";

// import logo from "assets/img/reactlogo.png";
import logo from "assets/img/vegetable_web_admin.jpg";
import { Box } from "@material-ui/core";

function Sidebar(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     width: window.innerWidth,
  //   };
  // }

  const [width, setWidth] = React.useState(window.innerWidth);
  const dispatch = useDispatch();

  //! Số lượng cay chua dc duyet
  // const length=useSelector(state=>getFirebase(state)).firebaseData.length
  const length = useSelector((state) => getNotificationCountFromLogin(state));

  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  React.useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
  });

  let navLinkHaveNotification = <li></li>;
  const sidebarBackground = {
    backgroundImage: "url(" + props.image + ")",
  };
  return (
    <div
      id="sidebar"
      className="sidebar"
      data-color={props.color}
      data-image={props.image}
    >
      {props.hasImage ? (
        <div className="sidebar-background" style={sidebarBackground} />
      ) : null}
      <div
        className="logo"
        style={
          {
            // display: "flex",
            // flexDirection: "row",
            // alignItems: "center",
          }
        }
      >
        <a
          // href="https://www.creative-tim.com?ref=lbd-sidebar"
          className="simple-text logo-mini"
          style={{ marginTop: -6 }}
        >
          <div className="logo-img">
            <img src={logo} alt="logo_image" />
          </div>
        </a>
        <a
          // href="https://www.creative-tim.com?ref=lbd-sidebar"
          className="simple-text logo-normal"
          style={{ fontSize: 14, color: "#34CBA7" }}
        >
          Veg Exchange
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {width <= 991 ? <AdminNavbarLinks /> : null}
          {props.routes.map((prop, key) => {
            //! Nếu hơn 100 tin nhắn thì sẽ chuyển thành hình vuông

            // ! Nếu là link là post thì ta show thêm 1 cái notification
            if (prop.path == "/vegetable") {
              navLinkHaveNotification = (
                <li key={key}>
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={prop.icon}
                        style={{ width: 25, height: 25 }}
                      />
                      <Box width={15} />
                      <p>{prop.name}</p>
                      <span className={length < 10 ? "dot" : "square"}>
                        {length}
                      </span>
                    </div>
                  </NavLink>
                </li>
              );
            } else if (prop.path == "/white" || prop.path == "/admin/white") {
              navLinkHaveNotification = <li style={{ display: "none" }}></li>;
            } else {
              navLinkHaveNotification = (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {/* Hiện cái icon */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={prop.icon}
                        style={{ width: 25, height: 25 }}
                      />
                      <Box width={10} />
                      <p>{prop.name}</p>
                    </div>
                  </NavLink>
                </li>
              );
            }
            if (!prop.redirect) return navLinkHaveNotification;
            // <li
            //   className={
            //     prop.upgrade
            //       ? "active active-pro"
            //       : this.activeRoute(prop.layout + prop.path)
            //   }
            //   key={key}
            // >
            //   <NavLink
            //     to={prop.layout + prop.path}
            //     className="nav-link"
            //     activeClassName="active"
            //   >
            //     {/* Hiện cái icon */}

            //     <div
            //       style={{
            //         display: "flex",
            //         flexDirection: "row",
            //         alignItems: "center",
            //       }}
            //     >
            //       <FontAwesomeIcon
            //         icon={prop.icon}
            //         style={{ width: 25, height: 25 }}
            //       />
            //       <Box width={10} />
            //       <p>{prop.name}</p>
            //     </div>
            //   </NavLink>
            // </li>
            return null;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
