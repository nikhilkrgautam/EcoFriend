/* global google */
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar"
import routes from "./routes"

function App() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <div>
        <Navbar />
        {routes.map((route, index) => {
          return (
              <Route
                path={route.path}
                exact={route.exact}
                key={index}
                render={(props) => <route.component {...props} />}
              />
          );
        })}
      </div>
    </Router>
  );
}

export default App;
