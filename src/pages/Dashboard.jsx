import React, { Component } from "react";
import StockContainer from "../components/StockContainer";
import StockCard from "../components/StockCard";
import "../index.css";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

class Dashboard extends Component {
  state = {
    popular: ["dkng", "aapl", "nio", "msft", "amzn", "amd", "dis"],
    popular2: ["tsla", "aal", "spce", "fb"],
    popular3: ["oxy", "crm", "nflx", "f"],
    mover1: "",
    mover2: "",
    mover3: "",
    mover4: "",
    mover5: "",
    mover6: "",
    mover7: "",
    mover8: "",
    mover9: "",
    search: "",
  };

  componentDidMount() {
    console.log("dashboard");
    this.fetchMovers();
  }

  //MAKE API CALL TO GET TOP 3 GAINERS AND TOP 10 POPULAR FROM IEX
  fetchMovers = () => {
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          mover1: data[0],
          mover2: data[1],
          mover3: data[2],
          mover4: data[3],
          mover5: data[4],
          mover6: data[5],
          mover7: data[6],
          mover8: data[7],
          mover9: data[8],
        });
      });
  };

  render() {
    console.log("render");
    return (
      <div>
        <NavBar />
        <div className="searchcontainer">
          <MuiThemeProvider>
            <TextField
              type="email"
              floatingLabelText="Search By Ticker"
              onChange={(event, newValue) =>
                this.setState({ search: newValue })
              }
            />
            <Link to={`/stocks/${this.state.search}`}>
              <button
                id="src"
                className="btn btn-primary stockbutton searchbutton"
                type="submit"
                value="SEARCH"
              >
                Search
              </button>
            </Link>
          </MuiThemeProvider>
        </div>
        <div className="row"></div>
        <h1 className="highvolume">High Volume Stocks</h1>
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
            <StockContainer ticker="tsla" />
          </div>
        </div>
        <h1 className="popular">Today's Most Traded </h1>
        <div className="row cardcontainer">
          <div className="col-md-4 ">
            <StockCard stock={this.state.mover1} />
            <StockCard stock={this.state.mover2} />
            <StockCard stock={this.state.mover3} />
          </div>
          <div className="col-md-4">
            <StockCard stock={this.state.mover4} />
            <StockCard stock={this.state.mover5} />
            <StockCard stock={this.state.mover6} />
          </div>
          <div className="col-md-4">
            <StockCard stock={this.state.mover7} />
            <StockCard stock={this.state.mover8} />
            <StockCard stock={this.state.mover9} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
