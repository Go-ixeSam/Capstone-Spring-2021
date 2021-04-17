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
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import MaterialTable from "views/Account";
import SignIn from "views/Signin";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Post from "views/Vegetable";
import SystemCon from "views/SystemConfiguration"
import Label from "views/Labeling"
import { faCheckSquare, faCoffee,faUser,faUserPlus,faPaperPlane,faCog,faTags,faChartBar } from '@fortawesome/free-solid-svg-icons'
import Test from "views/TestingDatabaseRealTime"
library.add(fab, faCheckSquare, faCoffee,faUser)

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
  icon: faChartBar,
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/signin",
  //   name: "Signin",
  //   icon: "",
  //   component: SignIn,
  //   layout: "/admin",
  // },
  {
    path: "/user",
    name: "User Profile",
    icon: faUser,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/testing",
    name: "Fireabase Realtime",
    icon: faUser,
    component: Test,
    layout: "/admin",
  },
  {
    path: "/account",
    name: "Account",
    icon: faUserPlus,
    component: MaterialTable,
    layout: "/admin",
  },
  {
    path: "/post",
    name: "Post",
    icon: faPaperPlane,
    component: Post,
    layout: "/admin",
  },
  {
    path: "/systemconfiguration",
    name: "System Configuartion",
    icon: faCog,
    component: SystemCon,
    layout: "/admin",
  },
  {
    path: "/assignlabel",
    name: "Labeling",
    icon: faTags,
    component: Label,
    layout: "/admin",
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "pe-7s-note2",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "pe-7s-map-marker",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // },
];

export default dashboardRoutes;
