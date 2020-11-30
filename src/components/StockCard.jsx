import React, { Component } from "react";

class StockCard extends Component {
  state = {};
  render() {
    return (
      <div className="row stockcard justify-content-between">
          <div className="col-s6 words">
        <h5>Stock Ticker</h5> 
        <h6>Stock Name</h6>
        </div>
        <div className="col-s6 numbers">
            <h5>$123.45</h5>
            <h6 className='text-success'>+4.6%</h6>
        </div>
      </div>
    );
  }
}

export default StockCard;
