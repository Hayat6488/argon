
import Charts from "views/pages/Charts.js";
import Messages from "views/pages/Reports/Inbox/Inbox";
import Works from "views/pages/Reports/Work/WorkReports";
import Transactions from "views/pages/Transactions/Transactions";
import Timeline from "views/pages/examples/Timeline";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Register from "views/pages/examples/Register.js";
import Tradesman from "views/pages/Users/Tradesman/Tradesman";
import Users from "views/pages/Users/Users/Users";
import Posts from "views/pages/Posts/Posts";
import Login from "views/pages/examples/Login";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: "ni ni-archive-2 text-green",
    component: Login,
    layout: "/home",
  },
  {
    collapse: true,
    name: "Dashboards",
    icon: "ni ni-shop text-primary",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "D",
        component: Dashboard,
        layout: "/admin",
      }
    ],
  },
  {
    collapse: true,
    name: "Examples",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/login",
        name: "Login",
        miniName: "L",
        component: Login,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        miniName: "R",
        component: Register,
        layout: "/auth",
      }
    ],
  },
  {
    collapse: true,
    name: "Users",
    icon: "ni ni-single-02 text-default",
    state: "tablesCollapse",
    views: [
      {
        path: "/users/tradesman",
        name: "Tradesman",
        miniName: "T",
        component: Tradesman,
        layout: "/admin",
      },
      {
        path: "/users/users",
        name: "Users",
        miniName: "U",
        component: Users,
        layout: "/admin",
      }
    ],
  },
  {
    collapse: true,
    name: "Reports List",
    icon: "ni ni-bullet-list-67 text-default",
    state: "reportsCollapse",
    views: [
      {
        path: "/reports/messages",
        name: "Messages",
        miniName: "M",
        component: Messages,
        layout: "/admin",
      },
      {
        path: "/reports/works",
        name: "Works",
        miniName: "W",
        component: Works,
        layout: "/admin",
      }
    ],
  },
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-paper-diploma text-info",
    component: Posts,
    layout: "/admin",
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: "ni ni-money-coins text-info",
    component: Transactions,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "ni ni-chart-pie-35 text-info",
    component: Charts,
    layout: "/admin",
  },
  {
    path: "/timeline",
    name: "Timeline",
    icon: "ni ni-chart-pie-35 text-info",
    component: Timeline,
    layout: "/admin",
  },
];

export default routes;
