import React, { Component } from "react";
import background from "../images/background.png";
const Home = (props) => {
  fetch("http://localhost:5000/api/stocks/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });

  return (
    <div className="home">
      <div className="first">
        <img className="background" src={background} alt="" />
      </div>
      <div className="second">
        <h1 className="text-center"></h1>
      </div>
    </div>
  );
};

export default Home;
