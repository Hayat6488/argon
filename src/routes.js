import Buttons from "views/pages/components/Buttons.js";
import Calendar from "views/pages/Calendar.js";
import Cards from "views/pages/components/Cards.js";
import Charts from "views/pages/Charts.js";
import Components from "views/pages/forms/Components.js";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Elements from "views/pages/forms/Elements.js";
import Google from "views/pages/maps/Google.js";
import Grid from "views/pages/components/Grid.js";
import Icons from "views/pages/components/Icons.js";
import Lock from "views/pages/examples/Lock.js";
import Login from "views/pages/examples/Login.js";
import Notifications from "views/pages/components/Notifications.js";
import Pricing from "views/pages/examples/Pricing.js";
import Profile from "views/pages/examples/Profile.js";
import ReactBSTables from "views/pages/tables/ReactBSTables.js";
import Register from "views/pages/examples/Register.js";
import RTLSupport from "views/pages/examples/RTLSupport.js";
import Sortable from "views/pages/tables/Sortable.js";
import Tables from "views/pages/tables/Tables.js";
import Timeline from "views/pages/examples/Timeline.js";
import Typography from "views/pages/components/Typography.js";
import Validation from "views/pages/forms/Validation.js";
import Vector from "views/pages/maps/Vector.js";
import Widgets from "views/pages/Widgets.js";

import HomePage from "views/pages/front/HomePage";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: "ni ni-archive-2 text-green",
    component: HomePage,
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
      }
      // {
      //   path: "/register",
      //   name: "Register",
      //   miniName: "R",
      //   component: Register,
      //   layout: "/auth",
      // }
    ],
  },
  {
    collapse: true,
    name: "Tables",
    icon: "ni ni-align-left-2 text-default",
    state: "tablesCollapse",
    views: [
      {
        path: "/tables",
        name: "Tables",
        miniName: "T",
        component: Tables,
        layout: "/admin",
      }
    ],
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
