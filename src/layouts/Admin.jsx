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
import imageSide from "assets/img/garden.jpg";
import Footer from "components/Footer/Footer";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import React, { useRef, useState } from "react";
import NotificationSystem from "react-notification-system";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { addObject,increaseNotificationCount } from "redux/index";
import { getFirebase } from "redux/Selector/Selectors";
import routes from "routes.js";
import message from "util/firebase";
import { style } from "variables/Variables.jsx";
import * as variable from "../variables/Variables";
const Admin = (props) => {
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
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleHasImage = (hasImage) => {
    setHasImage(hasImage);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show-dropdown open");
    } else {
      setFixedClasses("dropdown");
    }
  };

  // * cho này để lắng nghe firebase DB realtime, ta ko dùng nữa
  React.useEffect(() => {
    // notifyMe();
    // const messaging=firebase.message()
    //     message.requestPermission()
    //     .then(async function() {
    //       const token = await messaging.getToken();
    //       console.log("token nè Amdin, ",token)
    //     })
    //     .catch(function(err) {
    //       console.log("Unable to get permission to notify.", err);
    //     });
    // navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
    // const messaging = firebase.messaging();
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    message
      .getToken({
        vapidKey:
          "BJT4KMAdFm6G8Sjq49q8RmDMsP6w0jPUghMTSMcdfkduJnBNzfxsSlLGEAMQzKjsu1aCtCtGA9TBT4D1wCk4SxM",
        // "AAAAZBez2YQ:APA91bHgjYoWKRpPhXQJ9jIo6EO8ZihVV18bJZEHpES5Yc4Z7lk6icP3sZsfBOzYwZeFBPB7ay9h4XJ89764qBf7_s33JQ9E08qYthGYWM2MnDXCtb5ckHR7HI7krRUl0ZFJ8o5SpZZM",
      })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log("toen nè", currentToken);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })

      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
    message.onMessage((payload) => {
      console.log("Message received. ", payload);

      //! cứ mỗi 1 noti đến là cộgn thêm 1
      increaseNotificationCount()
      // addNotify()
      notifyMe()
    });

    // navigator.serviceWorker.addEventListener("message", (message) =>
    //   console.log(message)
    // );
  }, []);

  function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
  React.useEffect(() => {
    //! setIsNotify dùng để ngăn cho ko hiện notification khi lần đầu event listener đc nổ
    setIsNotify(isNotify + 1);

    //! đây là đk để nổi notification =_
    if (dataInFirebase.firebaseData.length != 0 && isNotify >= 2) {
      addNotify();
    }

    /**
     * * Sẽ có thêm phần chức năng là hiển thị số post cần phải duyệt,
     * * mỗi post sẽ có trạng thái là duyệt và chưa duyệt, những cái chưa duyệt sẽ đc đưa vào list chưa duyệt và hiển thị
     * * số sẽ trừ dần mỗi khi duyệt xong và bài post cũng sẽ biến mất hoàn toàn khỏi list hiển thị
     */
  }, [dataInFirebase]);

  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
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
  }, []);

  // ! Lắng nghe sự thay đổi của database trên firebase
  const firebaseListening = (params) => {
    // var userCount = firebase.database().ref("users");
    // userCount.on("value", (snapshot) => {
    //   let newArr = [];
    //   // ? Vì snapshot sẽ chỉ trả về các obj nên ta muốn nó thành 1 array ta phải làm bằng tay, chi tiết thế nào thì coi trong quick note
    //   snapshot.forEach((child) => {
    //     //chỉ bỏ những node child nào có status là no, tức là chưa đc duyệt
    //     if (child.val()["status"] == "not") {
    //       newArr.push({ ...child.val(), userId: child.key });
    //     }
    //   });
    //   dispatch(addObject(newArr));
    // });
  };

  //! bỏ lắng nghe khi cái component này unmount
  function removeFirebaseListening(params) {
    // firebase.database().ref("user").off("value");
  }
  return (
    <div className="wrapper">
      <NotificationSystem ref={notify} style={style} />
      <Sidebar
        {...props}
        routes={routes}
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
export default Admin;
