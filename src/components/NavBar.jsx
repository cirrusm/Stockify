import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import StockContainer from "./StockContainer";

const NavBar = (props) => {
  return (
    <nav className="d-flex justify-content-around">
      <Link to="/">Home</Link>
      <Link to="/stocks">Dashboard</Link>
      <Link to="/login"> Log In</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default NavBar;
