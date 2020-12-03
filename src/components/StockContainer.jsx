import React, { Component } from "react";
import Stock from "./Stock";

class StockContainer extends Component {
  state = {
    stockChartXValues: [],
    stockChartYValues: [],
    price: "",
    oldprice: "",
  };
  changeStock = (event) => {
    event.preventDefault();
    this.fetchStock();
  };

  componentDidMount() {
    this.fetchStock();
    this.fetchPrice();
  }

  fetchPrice = () => {
    let ticker = this.props.ticker;
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          price: parseFloat(data).toFixed(2),
        })
      );
  };

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
    const API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${this.props.ticker}/intraday-prices?chartInterval=5&token=${API_KEY}`;

    // console.log(`fetching ${this.props.ticker}`);
    // let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.ticker}&interval=5min&apikey=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        for (let key in data) {
          stockChartXValuesFunction.push(data[key]["label"]);
          stockChartYValuesFunction.push(
            parseFloat(data[key]["average"]).toFixed(2)
          );
        }

        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          oldprice:
            stockChartYValuesFunction[stockChartYValuesFunction.length - 1],
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
          price={this.state.price}
          oldprice={this.state.oldprice}
        />
      </div>
    );
  }
}

export default StockContainer;
