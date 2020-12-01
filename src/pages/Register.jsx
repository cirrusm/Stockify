import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
// import axios from 'axios';

class Register extends Component {
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
        <MuiThemeProvider>
          <div className="register">
            <div className="row">
              <div className="col reg-image-holder">
                <img
                  className="reg-image"
                  src="https://image.flaticon.com/icons/png/512/2037/2037710.png"
                  alt=""
                  width="180px"
                />
              </div>
              <div className="col-7 reg-inputs">
                <h2>Register</h2>
                <TextField
                  floatingLabelText="First Name"
                  onChange={(event, newValue) =>
                    this.setState({ first_name: newValue })
                  }
                />
                <br />
                <TextField
                  floatingLabelText="Last Name"
                  onChange={(event, newValue) =>
                    this.setState({ last_name: newValue })
                  }
                />
                <br />
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
                <RaisedButton
                  label="Submit"
                  primary={true}
                  style={style}
                  onClick={(event) => this.handleClick(event)}
                />
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
export default Register;
