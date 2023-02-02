import React from "react";
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// plugins styles downloaded
import "assets/vendor/nucleo/css/nucleo.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.2.0";

import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import AuthLayout from "layouts/Auth.js";
import { NotifyProvider } from "./context/NotifyContext";
import RestrictedRoutes from "views/pages/PrivateRoutes/RestrictedRoutes";

ReactDOM.render(
  // <Provider store={store}>
  <NotifyProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/" render={(props) => <AuthLayout {...props} />} />

        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </NotifyProvider>,
  // </Provider>
  document.getElementById("root")
);
