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
import React, { Component, useState } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useLocation } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import firebase from "util/firebase";
import { addObject } from "redux/index";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

import imageSide from "assets/img/sidebar-3.jpg";
import { array, object } from "yup/lib/locale";
import { useRef } from "react";
import { getFirebase } from "redux/Selector/Selectors";

// class Admin extends Component {
const Admin = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.notify = null;

  //   this.setNotify = (element) => {
  //     this.notify = element;
  //   };

  //   this.state = {
  //     _notificationSystem: null,
  //     image: image,
  //     color: "black",
  //     hasImage: true,
  //     fixedClasses: "dropdown show-dropdown open",
  //   };
  // }
  // const { notify, setNotify } = React.useState(null);
  const [image, setImage] = useState(imageSide);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const [isNotify, setIsNotify] = useState(0); // ! cái này dùng để ngăn cho việc notification nổ lần đầu tiên khi hàng của store đc thêm vào lần đầu tiên
  const [fixedClasses, setFixedClasses] = useState(
    "dropdown show-dropdown open"
  );
  let history = useHistory();
  let location = useLocation();
  const mainPanel = useRef();
  const notify = useRef();
  const dataInFirebase = useSelector((state) => getFirebase(state));
  const dispatch = useDispatch();

  //! Hàm này có tác dụng là tạo ra một notification, ta sẽ dùng hàm này cứ mỗi khi firebase bắt
  //! sự kiện
  const addNotify = () => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    const notification = notify.current;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    notification.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15,
    });
  };

  // handleNotificationClick = (position) => {
  //   var color = Math.floor(Math.random() * 4 + 1);
  //   var level;
  //   switch (color) {
  //     case 1:
  //       level = "success";
  //       break;
  //     case 2:
  //       level = "warning";
  //       break;
  //     case 3:
  //       level = "error";
  //       break;
  //     case 4:
  //       level = "info";
  //       break;
  //     default:
  //       break;
  //   }
  //   this.state._notificationSystem.addNotification({
  //     title: <span data-notify="icon" className="pe-7s-gift" />,
  //     message: (
  //       <div>
  //         Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
  //         every web developer.
  //       </div>
  //     ),
  //     level: level,
  //     position: position,
  //     autoDismiss: 15,
  //   });
  // };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                // handleClick={handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  const handleImageClick = (image) => {
    // this.setState({ image: image });
    setImage(image);
  };
  const handleColorClick = (color) => {
    // this.setState({ color: color });
    setColor(color);
  };
  const handleHasImage = (hasImage) => {
    // this.setState({ hasImage: hasImage });
    setHasImage(hasImage);
  };
  const handleFixedClick = () => {
    // if (this.state.fixedClasses === "dropdown") {
    if (fixedClasses === "dropdown") {
      // this.setState({ fixedClasses: "dropdown show-dropdown open" });
      setFixedClasses("dropdown show-dropdown open");
    } else {
      // this.setState({ fixedClasses: "dropdown" });
      setFixedClasses("dropdown");
    }
  };

  // React.useEffect(() => {
  //   addNotify();
  // }, [dataInFirebase]);

  React.useEffect(() => {
    console.log("arrr= ", dataInFirebase.firebaseData);
    firebaseListening();
    return () => {
      removeFirebaseListening();
    };
  }, []);

  React.useEffect(() => {
    setIsNotify(isNotify + 1);
    if (dataInFirebase.firebaseData.length != 0 && isNotify == 2) {
      addNotify();
    }
  }, [dataInFirebase]);

  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      // e.history.location.pathname !== e.location.pathname &&
      history.location.pathname !== location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.scrollTop = 0;
    }
  }, [mainPanel]);

  // componentDidMount() {
  // }
  // componentDidUpdate(e) {
  //   if (
  //     window.innerWidth < 993 &&
  //     e.history.location.pathname !== e.location.pathname &&
  //     document.documentElement.className.indexOf("nav-open") !== -1
  //   ) {
  //     document.documentElement.classList.toggle("nav-open");
  //   }
  //   if (e.history.action === "PUSH") {
  //     document.documentElement.scrollTop = 0;
  //     document.scrollingElement.scrollTop = 0;
  //     mainPanel.scrollTop = 0;
  //   }
  // }
  // componentWillUnmount() {
  //   this.removeFirebaseListening();
  // }

  // ! Lắng nghe sự thay đổi của database trên firebase
  const firebaseListening = (params) => {
    var userCount = firebase.database().ref("users");
    userCount.on("value", (snapshot) => {
      let newArr = [];
      // ? Vì snapshot sẽ chỉ trả về các obj nên ta muốn nó thành 1 array ta phải làm bằng tay, chi tiết thế nào thì coi trong quick note
      snapshot.forEach((child) => {
        newArr.push({ ...child.val(), userId: child.key });
      });
      dispatch(addObject(newArr));
    });
  };

  function removeFirebaseListening(params) {
    firebase.database().ref("user").off("value");
  }
  // render() {
  return (
    <div className="wrapper">
      {/* {console.log("arrr= ", dataInFirebase.firebaseData)} */}
      <NotificationSystem ref={notify} style={style} />
      <Sidebar
        {...props}
        routes={routes}
        // image={this.state.image}
        // color={this.state.color}
        // hasImage={this.state.hasImage}
        image={image}
        color={color}
        hasImage={hasImage}
      />
      <div id="main-panel" className="main-panel" ref={mainPanel}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>{getRoutes(routes)}</Switch>
        <Footer />
      </div>
    </div>
  );
};
// }

//Có tác dụng select ra những state cần xử lí
/**
 * state này là của redux, và chữ fn đóng vai trò là 1 props
 * fn có giá trị là state.full_name của redux
 * @param {} state
 */
// const mapStateToProps = (state) => {
//   return {
//     firebase: state.firebase,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {

//   }
// };

// export default connect(mapStateToProps, { addObject })(Admin);
export default Admin;
