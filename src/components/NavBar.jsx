import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import StockContainer from "./StockContainer";
import image from "../images/logo1.png";
class NavBar extends Component {
  state = {
    balance: "",
  };

  componentDidMount() {}

  render() {
    return (
      <nav className="d-flex justify-content-around opace">
        <Link className="justify-content-end" to="/">
          {" "}
          <p className="logo">STOCKIFY</p>
        </Link>

        <Link className="justify-content-around" to="/stocks">
          Dashboard
        </Link>
        <Link to="/portfolio"> My Portfolio</Link>
        <Link to="/">Log Out</Link>
      </nav>
    );
  }
}

export default NavBar;
