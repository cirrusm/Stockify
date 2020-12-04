import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import StockContainer from "./StockContainer";
import image from "../images/logo1.png";
import transparent from "../images/transparent.png";
class NavBar extends Component {
  state = {
    balance: "",
  };

  componentDidMount() {}

  render() {
    return (
      <nav className="d-flex justify-content-around" id="opace">
        <Link className="justify-content-end " to="/">
          {" "}
          <img className="logo" width="190px" src={image} alt="" />
        </Link>

        <Link className="justify-content-around navitem" to="/stocks">
          Dashboard
        </Link>
        <Link className="navitem" to="/portfolio">
          {" "}
          My Portfolio
        </Link>
        <Link className="navitem" to="/">
          Log Out
        </Link>
      </nav>
    );
  }
}

export default NavBar;
