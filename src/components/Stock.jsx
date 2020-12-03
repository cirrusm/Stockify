import React, { Component } from "react";
import Plot from "react-plotly.js";
import { Link } from "react-router-dom";

class Stock extends Component {
  state = {
    stockChartXValues: [],
    stockChartYValues: [],
  };

  // componentDidMount() {
  //   // this.fetchStock();
  //   console.log("mounted");
  // }

  // componentDidUpdate() {
  //   console.log("updated");
  // }

  color = () => {
    if (
      this.props.stockChartYValues[0] <
      this.props.stockChartYValues[this.props.stockChartYValues.length - 1]
    ) {
      return "green";
    } else {
      return "red";
    }
  };
  render() {
    // let priceNow = this.props.stockChartYValues[0] ? this.props.stockChartYValues[0].toFixed(2) : ""
    let upper = this.props.ticker.toUpperCase();
    let recentPrice = this.props.price;
    let startingPrice = this.props.stockChartYValues[99];
    let changeInPrice = parseFloat(recentPrice - startingPrice).toFixed(2);

    return (
      <div className="container d-flex flex-column justify-content-center">
        <Plot
          data={[
            {
              x: this.props.stockChartXValues,
              y: this.props.stockChartYValues,
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
        <Link
          to={{
            pathname: `/stocks/${this.props.ticker}`,
            stockChartXValues: this.props.stockChartXValues,
            stockChartYValues: this.props.stockChartYValues,
            price: this.props.price,
            oldprice: this.props.oldprice,
          }}
          className="btn btn-primary stockbutton"
        >
          View
        </Link>
        {/* <h5 className="text-center">Current price {recentPrice} </h5>
        <span>Change in last day {changeInPrice}</span> */}
      </div>
    );
  }
}

export default Stock;
