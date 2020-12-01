import React, { Component } from "react";
import { Link } from "react-router-dom";

//MAKE CALL FOR INDIVIDUAL STOCK, GET PRICE, DAILY CHANGE, AND NAME OF STOCK GIVEN THE TICKER

class StockCard extends Component {
  state = {};
  render() {
    return (
      <Link className="link" to={`/stocks/${this.props.ticker}`}>
        <div className="row stockcard justify-content-between">
          <div className="col-s6 words">
            <h6>Stock Ticker</h6>
            <h6>Stock Name</h6>
          </div>
          <div className="col-s6 numbers">
            <h5>$123.45</h5>
            <h6 className="gain">+4.6%</h6>
          </div>
        </div>
      </Link>
    );
  }
}

export default StockCard;
