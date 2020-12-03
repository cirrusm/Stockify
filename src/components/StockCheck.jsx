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
          currentPrice: parseFloat(data).toFixed(2),
        })
      );
  };

  calculateDif = () => {
    let difference = parseFloat(
      (this.state.currentPrice - this.props.stock.price) *
        this.props.stock.shares
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

  currentValue = () => {
    let currentTotal = parseFloat(
      this.state.currentPrice * this.props.stock.shares
    ).toFixed(2);
    return currentTotal;
  };

  color = () => {
    if (this.state.currentPrice < this.props.stock.price) {
      return { color: "red" };
    } else {
      return { color: "green" };
    }
  };

  plus = () => {
    if (this.state.currentPrice > this.props.stock.price) {
      return "+";
    }
  };

  sellStock = () => {};

  render() {
    return (
      <>
        <div className="row stocklisting">
          <div className="col-1">
            {" "}
            <button className="btn-primary">Sell</button>
          </div>
          <div className="col">{this.props.stock.ticker}</div>
          <div className="col">{this.props.stock.shares}</div>
          <div className="col">{this.state.currentPrice}</div>
          <div className="col">{this.props.stock.price}</div>
          <div style={this.color()} className="col">
            {this.plus()} {this.calculateDif()} ({this.percentChange()})
          </div>
        </div>
      </>
    );
  }
}

export default StockCheck;
