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
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    const API_KEY = "TK2WTT1V16S5RE86";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=5min&apikey=${API_KEY}`;
    fetch(API_Call)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        for (let key in data["Time Series (5min)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            parseFloat(data["Time Series (5min)"][key]["1. open"]).toFixed(2)
          );
        }
        this.setState({
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
        {/* <form onSubmit={this.changeStock}>
          <label htmlFor="stock"> View A Different Stock:  </label>
          <input onChange={this.handleChange} type="text" name="stock"></input>
          <input type="submit" />
        </form> */}
      </div>
    );
  }
}

export default StockContainer;
