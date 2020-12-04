import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import StockContainer from "./StockContainer";
import image from "../images/logo1.png";
import transparent from "../images/transparent.png";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
class NavBar extends Component {
  state = {
    balance: "",
    search: "",
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
        <div className="navitemsearch" id="search">
          <MuiThemeProvider>
            <TextField
              type="email"
              floatingLabelText="Find Stock by Ticker Symbol"
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
      </nav>
    );
  }
}

export default NavBar;
