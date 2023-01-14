/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import IndexFooter from "components/Footers/IndexFooter";
import IndexNavbar from "components/Navbars/IndexNavbar";
import React from "react";
// react library for routing
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

// core components

import routes from "routes.js";

function Front() {
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
    // document.body.classList.add("bg-default");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      console.log({ prop });
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/home") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContentRef}>
        <IndexNavbar />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/home" />
        </Switch>
      </div>
      <IndexFooter />
    </>
  );
}

export default Front;
