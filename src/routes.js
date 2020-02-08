
import React from "react";
import { Redirect } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import MapContainer from "./views/MapContainer";
import SearchMap from "./views/SearchMap";

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/map",
    component: MapContainer
  },
  {
    path: "/search",
    component: SearchMap
  }
]
