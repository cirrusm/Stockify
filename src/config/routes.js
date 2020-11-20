import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from '../pages/Home'
import StockContainer from '../pages/StockContainer'

export default (
  <Switch>
<Route exact path ='/' component={Home} />
<Route exact path ='/stocks' component={StockContainer} />
  </Switch>
)