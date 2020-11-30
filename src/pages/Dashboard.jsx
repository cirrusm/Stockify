import React, { Component } from "react";
import StockContainer from "./StockContainer";
import StockCard from "../components/StockCard";
import "../index.css";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>SearchBar</h1>
        <div className="row"></div>
        <h1>Gainer Section</h1>
        <div className="row graphcontainer">
          <div className="col-md-4">
            {" "}
            <StockContainer />
          </div>
          <div className="col-md-4">
            {" "}
            <StockContainer />
          </div>
          <div className="col-md-4">
            {" "}
            <StockContainer />
          </div>
        </div>
        <h1>Most Popular Stocks today</h1>
        <div className="row">
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
      //     <div class="container">
      //     <div class="row">
      //       <div class="col-sm">
      //         One of three columns
      //       </div>
      //       <div class="col-sm">
      //         One of three columns
      //       </div>
      //       <div class="col-sm">
      //         One of three columns
      //       </div>
      //     </div>
      //   </div>
    );
  }
}

export default Dashboard;
