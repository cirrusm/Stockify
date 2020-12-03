import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import StockShow from "../pages/StockShow";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Portfolio from "../pages/Portfolio";
import BuyStock from "../pages/BuyStock";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/stocks" component={Dashboard} />
    <Route exact path="/stocks/:ticker" component={StockShow} />
    <Route exact path="/stocks/buy/:ticker" component={BuyStock} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/portfolio" component={Portfolio} />
  </Switch>
);
