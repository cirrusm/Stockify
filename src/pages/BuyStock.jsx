import React, { Component } from "react";

class BuyStock extends Component {
  state = {
    ticker: this.props.match.params["ticker"],
    shares: 0,
    price: Number(this.props.location.currentPrice),
    total: Number(this.props.location.currentPrice),
  };
  handleChange = (event) => {
    this.setState({
      shares: event.target.value,
      total: parseFloat(
        event.target.value * Number(this.props.location.currentPrice)
      ).toFixed(2),
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/stocks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("error fetching data");
        return { message: "error creating" };
      })
      .then((data) => {
        this.props.history.push("/portfolio");
      });
  };
  render() {
    let price = Number(this.props.location.currentPrice);
    return (
      <div>
        <h1>
          Would you like to buy {this.props.match.params["ticker"]} stock for
          {" $" + price} total will be {this.state.total}
          {this.props.currentPrice}?
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="shares"
            value={this.state.shares}
            onChange={this.handleChange}
          />

          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default BuyStock;
