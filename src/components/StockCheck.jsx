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

  calculateDif = () => {
    let difference = parseFloat(
      this.state.currentPrice - this.props.stock.price
    ).toFixed(2);
    return difference;
  };

  percentChange = () => {
    let change = parseFloat(
      ((this.state.currentPrice - this.props.stock.price) * 100) /
        this.props.stock.price
    ).toFixed(2);
    return change;
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col">{this.props.stock.ticker}</div>
          <div className="col">{this.props.stock.shares}</div>
          <div className="col">{this.calculateDif()}</div>
          <div className="col">{this.percentChange()}</div>
        </div>
      </>
    );
  }
}

export default StockCheck;
