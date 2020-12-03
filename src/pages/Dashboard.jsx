import React, { Component } from "react";
import StockContainer from "../components/StockContainer";
import StockCard from "../components/StockCard";
import "../index.css";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = {
    gainer1: "",
    gainer2: "",
    gainer3: "",
    popular1: "",
    popular2: "",
    popular3: "",
    popular4: "",
    popular5: "",
    popular6: "",
    popular7: "",
    popular8: "",
    popular9: "",
    search: "",
  };

  componentDidMount() {
    console.log("dashboard");
  }

  //MAKE API CALL TO GET TOP 3 GAINERS AND TOP 10 POPULAR FROM IEX
  render() {
    console.log("render");
    return (
      <div>
        <MuiThemeProvider>
          <TextField
            type="email"
            floatingLabelText="Search By Ticker"
            onChange={(event, newValue) => this.setState({ search: newValue })}
          />
          <Link to={`/stocks/${this.state.search}`}>
            <input type="submit" value="search" />
          </Link>
        </MuiThemeProvider>
        <div className="row"></div>
        <h1>Gainer Section</h1>
        <div className="row graphcontainer">
          <div className="col-md-4">
            {" "}
            <StockContainer ticker="aapl" />
          </div>
          <div className="col-md-4">
            {" "}
            <StockContainer ticker="dkng" />
          </div>
          <div className="col-md-4">
            {" "}
            <StockContainer ticker="msft" />
          </div>
        </div>
        <h2 className="popular">Most Popular Stocks Today</h2>
        <div className="row cardcontainer">
          <div className="col-md-4 ">
            <StockCard />
            <StockCard />
            <StockCard />
          </div>
          <div className="col-md-4">
            <StockCard />
            <StockCard />
            <StockCard />
          </div>
          <div className="col-md-4">
            <StockCard />
            <StockCard />
            <StockCard />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
