import React, { Component } from "react";
import StockContainer from "./StockContainer";
import '../index.css'

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>SearchBar</h1>
        <div className="row"></div>
        <h1>Gainer Section</h1>
        <div className="row">
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
        <div className="row"></div>
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
