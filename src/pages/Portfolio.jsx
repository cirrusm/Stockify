import React, { Component } from "react";
import StockCheck from "../components/StockCheck";

class Portfolio extends Component {
  state = {
    stocks: [],
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/stocks/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          stocks: data.stocks,
        });
      });
  }

  renderStocks() {
    return this.state.stocks.map((stock, index) => {
      return <StockCheck stock={stock} ticker={stock.ticker} />;
    });
  }

  render() {
    return (
      <div>
        <h2>Cirrus's Portfolio</h2>
        <div className="row">
          <div className="col">Ticker</div>
          <div className="col">Shares</div>
          <div className="col">Total Gain</div>
          <div className="col">Return on Investment</div>
        </div>
        <div>{this.renderStocks()}</div>
      </div>
    );
  }
}

export default Portfolio;
