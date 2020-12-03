import React, { Component } from "react";

class StockCheck extends Component {
  state = {
    stock: {},
    currentPrice: 0,
  };

  componentDidMount() {
    this.getCurrentPrice();
  }

  getCurrentPrice = () => {
    let ticker = this.props.stock.ticker;
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          currentPrice: data,
        })
      );
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
