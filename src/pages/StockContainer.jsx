import React, { Component } from "react";
import Stock from "../components/Stock";

class StockContainer extends Component {
  state = {
    ticker: "aapl",
    stockChartXValues: [],
    stockChartYValues: [],
  };
  changeStock = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    this.fetchStock();
  };

  componentDidMount() {
    this.fetchStock();
  }

  handleChange = (event) => {
    this.setState({
      ticker: event.target.value,
    });
  };

  fetchStock = () => {
    const pointerToThis = this;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    const API_KEY = "TK2WTT1V16S5RE86";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=5min&apikey=${API_KEY}`;
    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (let key in data["Time Series (5min)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (5min)"][key]["1. open"]
          );
        }
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  };

  render() {
    return (
      <div>
        <Stock
          ticker={this.state.ticker}
          stockChartXValues={this.state.stockChartXValues}
          stockChartYValues={this.state.stockChartYValues}
        />
        <form onSubmit={this.changeStock}>
          <input onChange={this.handleChange} type="text" name="stock"></input>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default StockContainer;
