import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import NavBar from "../components/NavBar";

class BuyStock extends Component {
  state = {
    ticker: this.props.match.params["ticker"],
    shares: 1,
    price: Number(this.props.location.currentPrice),
    total: Number(this.props.location.currentPrice),
  };

  fetchLogo() {}
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
    let upper = this.state.ticker.toUpperCase();
    return (
      <>
        <NavBar />
        <div className="buycontainer">
          <div className="row buyheader">
            {" "}
            <h3>
              How many shares of {this.props.location.name} would you like to
              buy?
              {this.props.currentPrice}?
            </h3>
          </div>
          <div className="row">
            <div className="col">
              <img className="buylogo" src={this.props.location.logo} alt="" />
            </div>
            <div className="col">
              <MuiThemeProvider>
                <TextField
                  type="shares"
                  floatingLabelText="Shares"
                  onChange={(event, newValue) =>
                    this.setState({
                      shares: newValue,
                      total: parseFloat(newValue * this.state.price).toFixed(2),
                    })
                  }
                />
                <RaisedButton
                  label="Buy"
                  primary={true}
                  style={style}
                  onClick={(event) => this.handleSubmit(event)}
                />

                <h2 className="totalbuycost">
                  Total cost {this.state.shares} <br></br>
                  <b> {this.state.total} </b>
                </h2>
              </MuiThemeProvider>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const style = {
  margin: 15,
};
export default BuyStock;
