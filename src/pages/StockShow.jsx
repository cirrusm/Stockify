import React, { Component } from "react";
import Stock from "../components/Stock";
import StockContainer from "../components/StockContainer";
import Plot from "react-plotly.js";

class StockShow extends Component {
  state = {
    stockChartXValues: [],
    stockChartYValues: [],
  };

  componentDidMount() {
    this.fetchStock();
    console.log(this.props.match.params["ticker"]);
  }

  color = () => {
    if (this.state.stockChartYValues[0] > this.state.stockChartYValues[99]) {
      return "green";
    } else {
      return "red";
    }
  };

  fetchStock = () => {
    if (this.props.ticker === "") {
      console.log("cant fetch blank");
      return;
    }
    //MIGHT NEED TO CHANGE CALL TO TAKE props PASSED IN FROM DASHBOARD
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    let ticker = this.props.match.params["ticker"];
    const API_KEY = "TK2WTT1V16S5RE86";
    console.log(`fetching ${ticker}`);
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${API_KEY}`;
    fetch(API_Call)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        for (let key in data["Time Series (5min)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            parseFloat(data["Time Series (5min)"][key]["1. open"]).toFixed(2)
          );
        }
        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  };
  render() {
    let upper = this.props.match.params["ticker"].toUpperCase();
    let recentPrice = this.state.stockChartYValues[0];
    let startingPrice = this.state.stockChartYValues[99];
    return (
      <div>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: {
                color: this.color(),
                opacity: "0",
              },
            },
          ]}
          //MAIN-SVG IN CSS
          layout={{
            width: 350,
            height: 300,
            font: {
              color: "white",
            },
            xaxis: {
              showticklabels: false,
              ticks: "",
              showgrid: false,
            },
            yaxis: {
              showgrid: false,
            },
            paper_bgcolor: "rgba(31, 63, 99, 0)",
            plot_bgcolor: "rgba(31, 63, 99, 0)",
            title: `<b>${upper}</b> \n ${recentPrice}`,
          }}
        />
        hi
      </div>
    );
  }
}

export default StockShow;
