import Works from "views/pages/Reports/Work/WorkReports";
import Transactions from "views/pages/Transactions/Transactions";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Tradesman from "views/pages/Users/Tradesman/Tradesman";
import ServiceFee from "views/pages/ServiceFee/ServiceFee";
import Services from "views/pages/Services/Services";
import Bookings from "views/pages/Bookings/Bookings";
import Users from "views/pages/Users/Users/Users";
import Posts from "views/pages/Posts/Posts";
import Login from "views/pages/examples/Login";
import Admins from "views/pages/Admins/Admins";
import Register from "views/pages/examples/Register";


const routes = [
  {
    path: "/",
    name: "Home",
    icon: "ni ni-archive-2 text-green",
    component: Login,
    invisible: true,
    layout: "/home",
  },
  {
    collapse: true,
    name: "Authentication",
    icon: "ni ni-single-02 text-default",
    state: "tablesCollapse",
    invisible:true,
    views: [
      {
        path: "/login",
        name: "Log In",
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
    path: "/dashboard",
    name: "Home",
    icon: "ni ni-shop text-info",
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Users",
    icon: "ni ni-circle-08 text-info",
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
    invisible: true,
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: "ni ni-collection text-info",
    component: Bookings,
    layout: "/admin",
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
    icon: "ni ni-credit-card text-info",
    component: Transactions,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Utility",
    icon: "ni ni-settings text-info",
    state: "formsCollapse",
    views: [
      {
        path: "/utility/services",
        name: "Add Services",
        miniName: "S",
        component: Services,
        layout: "/admin",
      },
      {
        path: "/utility/servicefee",
        name: "Service Fee",
        miniName: "F",
        component: ServiceFee,
        layout: "/admin",
      }
    ],
  },
  {
    path: "/admins",
    name: "Admins List",
    icon: "ni ni-single-02 text-info",
    component: Admins,
    layout: "/admin",
  }
];

export default routes;
