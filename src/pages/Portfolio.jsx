import React, { Component } from "react";
import StockCheck from "../components/StockCheck";

class Portfolio extends Component {
  state = {
    stocks: [],
    balance: "",
    loadingbalance: true,
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

  fetchBalance = () => {
    fetch("http://localhost:5000/api/users/5fc84bfbc6af2d1b5e507cb7")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data["users"][0]["balance"]));
        this.setState({
          balance: JSON.stringify(data["users"][0]["balance"]),
          loadingbalance: false,
        });
      });

    //   this.setState({
    //     stocks: data.stocks,
    //   });
  };
  renderStocks() {
    return this.state.stocks.map((stock, index) => {
      return <StockCheck stock={stock} ticker={stock.ticker} />;
    });
  }

  render() {
    return (
      <div className="fullchart">
        {this.fetchBalance()}
        <h2>Cirrus's Portfolio</h2>{" "}
        <h2>
          {" "}
          {this.state.loadingbalance
            ? "Loading your balance... "
            : "Current Balance: $" + this.state.balance}
        </h2>
        <div className="row portfoliochart">
          <div className="col-1">sell</div>
          <div className="col">Ticker</div>
          <div className="col">Shares</div>
          <div className="col">Current Value</div>
          <div className="col">Purchased For</div>
          <div className="col">Total Gain</div>
        </div>
        <div className="tablevalues">{this.renderStocks()}</div>
      </div>
    );
  }
}

export default Portfolio;
