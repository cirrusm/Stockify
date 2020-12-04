import React, { Component } from "react";
import { Link } from "react-router-dom";

//MAKE CALL FOR INDIVIDUAL STOCK, GET PRICE, DAILY CHANGE, AND NAME OF STOCK GIVEN THE TICKER

class StockCard extends Component {
  state = {
    logo: "",
    loader: true,
  };

  componentDidMount() {
    this.fetchLogo();
  }
  fetchLogo = () => {
    let ticker = this.props.stock.symbol;
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${ticker}/logo?token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          logo: data["url"],
          loader: false,
        })
      );
  };

  render() {
    let price = parseFloat(this.props.stock["latestPrice"]).toFixed(2);
    let change = parseFloat(this.props.stock["changePercent"] * 100).toFixed(2);
    return (
      <Link className="link" to={`/stocks/${this.props.stock.symbol}`}>
        <div className="row stockcard justify-content-between">
          <div className="col-s2">
            {this.state.loader ? "Loading image" : ""}
            {this.fetchLogo()}
            <img
              className="logodashboard"
              width="50px"
              src={this.state.logo}
              alt=""
            />
          </div>
          <div className="col-s5 words">
            <h6 className="text-center">{this.props.stock["symbol"]}</h6>
            <h6 className="text-grey">{this.props.stock["companyName"]}</h6>
          </div>
          <div className="col-s5 numbers">
            <h5>${price}</h5>
            <h6 className="gain">+{change}%</h6>
          </div>
        </div>
      </Link>
    );
  }
}

export default StockCard;
