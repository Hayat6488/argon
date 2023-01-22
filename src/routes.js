
// import Charts from "views/pages/Charts.js";
// import Messages from "views/pages/Reports/Inbox/Inbox";
import Works from "views/pages/Reports/Work/WorkReports";
import Transactions from "views/pages/Transactions/Transactions";
// import Timeline from "views/pages/examples/Timeline";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Tradesman from "views/pages/Users/Tradesman/Tradesman";
import ServiceFee from "views/pages/ServiceFee/ServiceFee";
import Bookings from "views/pages/Bookings/Bookings";
import Users from "views/pages/Users/Users/Users";
import Posts from "views/pages/Posts/Posts";
import Login from "views/pages/examples/Login";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: "ni ni-archive-2 text-green",
    component: Login,
    layout: "/auth",
    invisible: true
  },
  {
    path: "/dashboard",
    name: "Dashboards",
    icon: "ni ni-shop text-primary",
    component: Dashboard,
    layout: "/admin",
    invisible: true
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
    path: "/reportslist",
    name: "Reports List",
    icon: "ni ni-bullet-list-67 text-info",
    component: Works,
    layout: "/admin",
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: "ni ni-collection text-info",
    component: Bookings,
    layout: "/admin",
  },
  // // {
  // //   collapse: true,
  // //   name: "Reports List",
  // //   icon: "ni ni-bullet-list-67 text-default",
  // //   state: "reportsCollapse",
  // //   views: [
  // //     {
  // //       path: "/reports/messages",
  // //       name: "Messages",
  // //       miniName: "M",
  // //       component: Messages,
  // //       layout: "/admin",
  // //     },
  // //     {
  // //       path: "/reports/works",
  // //       name: "Works",
  // //       miniName: "W",
  // //       component: Works,
  // //       layout: "/admin",
  // //     }
  // //   ],
  // // },
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
    icon: "ni ni-credit-card text-info",
    component: Transactions,
    layout: "/admin",
  },
  {
    path: "/servicefee",
    name: "Service Fee",
    icon: "ni ni-money-coins text-info",
    component: ServiceFee,
    layout: "/admin",
  }
];

export default routes;
