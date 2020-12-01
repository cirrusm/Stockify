import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import StockShow from "../pages/StockShow";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/stocks" component={Dashboard} />
    <Route exact path="/stocks/:ticker" component={StockShow} />
  </Switch>
);
