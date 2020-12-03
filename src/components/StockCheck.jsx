import React, { Component } from "react";

class StockCheck extends Component {
  state = {
    stock: {},
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col">Ticker</div>
          <div className="col">Shares</div>
          <div className="col">Total Change</div>
          <div className="col">Percent Change</div>
        </div>
      </>
    );
  }
}

export default StockCheck;
