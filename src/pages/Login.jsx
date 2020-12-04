import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Image from "../images/login.png";
import { Link } from "react-router-dom";
import image from "../images/logo1.png";
// import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  }

  //CREATE FUNCTIION HANDLESUBMIT THAT CREATES A NEW USER WHEN REGISTER FORM IS FILLED OUT
  render() {
    return (
      <div>
        <nav className="d-flex justify-content-around" id="opace">
          <Link className="left " to="/">
            {" "}
            <img className="logo" width="190px" src={image} alt="" />
          </Link>
        </nav>
        <MuiThemeProvider>
          <div className="login">
            <div className="row login-container">
              <div className="col login-image-holder">
                <img src={Image} alt="" width="180px" />
              </div>
              <div className="col-7 login-inputs">
                <h2>Login</h2>
                <TextField
                  type="email"
                  floatingLabelText="Email"
                  onChange={(event, newValue) =>
                    this.setState({ email: newValue })
                  }
                />
                <br />
                <TextField
                  type="password"
                  floatingLabelText="Password"
                  onChange={(event, newValue) =>
                    this.setState({ password: newValue })
                  }
                />
                <br />
                <Link to="/stocks">
                  <RaisedButton label="Submit" primary={true} style={style} />
                </Link>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Login;
