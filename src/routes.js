
import Charts from "views/pages/Charts.js";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Register from "views/pages/examples/Register.js";
import Tables from "views/pages/tables/Tables.js";
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
  // {
  //   collapse: true,
  //   name: "Dashboards",
  //   icon: "ni ni-shop text-primary",
  //   state: "dashboardsCollapse",
  //   views: [
  //     {
  //       path: "/dashboard",
  //       name: "Dashboard",
  //       miniName: "D",
  //       component: Dashboard,
  //       layout: "/admin",
  //     }
  //   ],
  // },
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
        path: "/tables",
        name: "Tradesman",
        miniName: "T",
        component: Tables,
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
    path: "/charts",
    name: "Charts",
    icon: "ni ni-chart-pie-35 text-info",
    component: Charts,
    layout: "/admin",
  },
];

export default routes;
