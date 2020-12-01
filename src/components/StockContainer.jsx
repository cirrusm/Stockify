import React, { Component } from "react";
import Stock from "./Stock";

class StockContainer extends Component {
  state = {
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

  componentDidUpdate() {
    console.log(`${this.props.ticker} updated`);
  }

  handleChange = (event) => {
    this.setState({
      ticker: event.target.value,
    });
  };

  fetchStock = () => {
    if (this.props.ticker === "") {
      console.log("cant fetch blank");
      return;
    }
    //MIGHT NEED TO CHANGE CALL TO TAKE props PASSED IN FROM DASHBOARD
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    const API_KEY = "TK2WTT1V16S5RE86";
    console.log(`fetching ${this.props.ticker}`);
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.ticker}&interval=5min&apikey=${API_KEY}`;
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
      <div className="chartcard">
        <Stock
          ticker={this.props.ticker}
          stockChartXValues={this.state.stockChartXValues}
          stockChartYValues={this.state.stockChartYValues}
        />
      </div>
    );
  }
}

export default StockContainer;
