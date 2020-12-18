import React, { Component } from "react";
import background from "../images/background.png";
import { Link } from "react-router-dom";
import transparent from "../images/transparent.png";
const Home = (props) => {
  

  return (
    <div className="home">
      <div className="first">
        <img className="background" src={background} alt="" />
      </div>
      <div className="second">
        <div className="row logocontainer">
          <div className="col-s6">
            <img className="homelogo" src={transparent} alt="" />
          </div>
          <div className="homewords">
            <p>Risk free trading made easy.</p>
            <p>Get started today!</p>
            <div className="homebuttons">
              <Link to="/login">
                <button className="homelogin">Log in</button>
              </Link>
              <Link to="/register">
                <button className="homeregister">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
