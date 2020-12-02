import React, { Component } from "react";
import Stock from "../components/Stock";
import StockContainer from "../components/StockContainer";
import Plot from "react-plotly.js";

class StockShow extends Component {
  state = {
    stockChartXValues: [],
    stockChartYValues: [],
    news: [],
  };

  componentDidMount() {
    this.fetchStock();
    this.fetchNews();
  }

  color = () => {
    if (this.state.stockChartYValues[0] > this.state.stockChartYValues[99]) {
      return "green";
    } else {
      return "red";
    }
  };
  fetchNews = () => {
    let ticker = this.props.match.params["ticker"];
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378 ";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${ticker}/news?token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          news: data,
        })
      );
    console.log(this.state.news);
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
    let changeInPrice = parseFloat(recentPrice - startingPrice).toFixed(2);
    let percentChangePrice = parseFloat(
      (changeInPrice * 100) / recentPrice
    ).toFixed(2);
    return (
      <>
        <div className="row">
          <div className="col-8">
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
                width: 1150,
                height: 400,
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
          </div>
          <div className="col d-flex flex-column showinfo align-items-center">
            <div className="cardcontent align-items-center">
              <div className="p-2">Apple Technology</div>
              <div className="p-2">
                <span className="recentprice">${recentPrice} </span>
                <br />
                <br />
                <span>
                  +{changeInPrice} ({percentChangePrice}%)
                </span>
                <br />
                <br />
              </div>
              <div className="p-1 btn btn-primary">Buy {upper}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            Key Information
            <div className="row">
              <div className="col top">Market Cap</div>
              <div className="col top">PE Ratio</div>
              <div className="col top">52 week High</div>
            </div>
            <div className="row">
              <div className="col">52 week Low</div>
              <div className="col">YTD Change</div>
              <div className="col">Volume</div>
            </div>
          </div>

          <div className="col">
            <h1>Recent News</h1>
            <a
              className="articlelink"
              href={this.state.news[0] ? this.state.news[0]["url"] : ""}
            >
              <article className="row stockarticle">
                <div className="col-2 articleimage">
                  <img
                    src={this.state.news[0] ? this.state.news[0]["image"] : ""}
                    width="100px"
                    height="100px"
                    alt=""
                  />
                </div>
                <div className="col-9 articlecontent">
                  <div className="row articletop">
                    {this.state.news[0]
                      ? this.state.news[0]["headline"]
                      : "no news to display"}
                  </div>
                  <div className="row articlebottom">
                    {this.state.news[0]
                      ? this.state.news[0]["summary"].substring(0, 250) + "..."
                      : ""}
                  </div>
                </div>
              </article>
            </a>
            <a
              className="articlelink"
              href={this.state.news[0] ? this.state.news[0]["url"] : ""}
            >
              <article className="row stockarticle">
                <div className="col-2 articleimage">
                  <img
                    src={this.state.news[1] ? this.state.news[1]["image"] : ""}
                    width="100px"
                    height="100px"
                    alt=""
                  />
                </div>
                <div className="col-9 articlecontent">
                  <div className="row articletop">
                    {this.state.news[1]
                      ? this.state.news[1]["headline"]
                      : "no news to display"}
                  </div>
                  <div className="row articlebottom">
                    {this.state.news[1]
                      ? this.state.news[1]["summary"].substring(0, 250) + "..."
                      : ""}
                  </div>
                </div>
              </article>
            </a>
            <a
              className="articlelink"
              href={this.state.news[0] ? this.state.news[0]["url"] : ""}
            >
              <article className="row stockarticle">
                <div className="col-2 articleimage">
                  <img
                    src={this.state.news[2] ? this.state.news[2]["image"] : ""}
                    width="100px"
                    height="100px"
                    alt=""
                  />
                </div>
                <div className="col-9 articlecontent">
                  <div className="row articletop">
                    {this.state.news[2]
                      ? this.state.news[2]["headline"]
                      : "no news to display"}
                  </div>
                  <div className="row articlebottom">
                    {this.state.news[2]
                      ? this.state.news[2]["summary"].substring(0, 250) + "..."
                      : ""}
                  </div>
                </div>
              </article>
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default StockShow;
