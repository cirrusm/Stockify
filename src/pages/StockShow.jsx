import React, { Component } from "react";
import Plot from "react-plotly.js";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

class StockShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      news: [],
      name: "",
      marketCap: "",
      peRatio: "",
      high: "",
      low: "",
      YTD: "",
      volume: "",
      price: "",
      oldprice: "",
      timeframe: "Daily Change",
      logo: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDaily = this.handleClickDaily.bind(this);
    this.handleClickYearly = this.handleClickYearly.bind(this);
  }
  componentDidMount() {
    this.fetchNews();
    this.fetchInfo();
    this.fetchLogo();
    this.fetchStock();
    console.log(this.state.stockChartYValues);
  }

  color = () => {
    if (this.state.price > this.state.oldprice) {
      console.log(this.state.oldprice);
      return "green";
    } else {
      console.log(this.state.oldprice);
      return "red";
    }
  };
  fetchLogo = () => {
    let ticker = this.props.match.params["ticker"];
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${ticker}/logo?token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          logo: data["url"],
        })
      );
  };

  fetchInfo = () => {
    let ticker = this.props.match.params["ticker"];
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/?token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          name: data.companyName,
          marketCap: data.marketCap,
          peRatio: data.peRatio,
          high: data.week52High,
          low: data.week52Low,
          YTD: data.ytdChange,
          volume: data.volume,
        })
      );
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

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    const API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${this.props.match.params["ticker"]}/intraday-prices?chartInterval=5&token=${API_KEY}`;

    fetch(API_Call)
      .then((res) => res.json())
      .then((data) => {
        for (let key in data) {
          stockChartXValuesFunction.push(data[key]["label"]);
          stockChartYValuesFunction.push(
            parseFloat(data[key]["average"]).toFixed(2)
          );
        }

        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          oldprice: stockChartYValuesFunction[0],
          price:
            stockChartYValuesFunction[stockChartXValuesFunction.length - 1],
          timeframe: "Todays Change",
        });
      });
  };

  fetchMonthly = () => {
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    let ticker = this.props.match.params["ticker"];
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1m?chartCloseOnly=true&token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) => {
        for (let key in data) {
          stockChartYValuesFunction.push(data[key]["close"]);
          stockChartXValuesFunction.push(data[key]["label"]);
        }
        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          oldprice: stockChartYValuesFunction[0],
          timeframe: "Monthly Change",
        });
      });
  };

  fetchYearly = () => {
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    let ticker = this.props.match.params["ticker"];
    let API_KEY = "pk_306915c8b8c04bf8bb396ac0e15cd378";
    let API_Call = `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1y?chartCloseOnly=true&token=${API_KEY}`;
    fetch(API_Call)
      .then((res) => res.json())
      .then((data) => {
        for (let key in data) {
          stockChartYValuesFunction.push(data[key]["close"]);
          stockChartXValuesFunction.push(data[key]["label"]);
        }
        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          oldprice: stockChartYValuesFunction[0],
          timeframe: "Yearly Change",
        });
      });
  };

  handleClick() {
    this.fetchMonthly();
  }

  handleClickDaily() {
    this.fetchStock();
  }

  handleClickYearly() {
    this.fetchYearly();
  }

  setColor = () => {
    if (this.state.price < this.state.oldprice) {
      return { color: "red" };
    } else {
      return { color: "green" };
    }
  };

  setSign = () => {
    if (this.state.price > this.state.oldprice) {
      return "+";
    }
  };
  render() {
    let upper = this.props.match.params["ticker"].toUpperCase();
    let changeInPrice = parseFloat(
      this.state.price - this.state.oldprice
    ).toFixed(2);
    let percentChangePrice = parseFloat(
      (changeInPrice * 100) / this.state.oldprice
    ).toFixed(2);
    let updatedYTD = parseFloat(this.state.YTD * 100).toFixed(2) + "%";
    return (
      <>
        <NavBar />
        <div className="row">
          <div className="col-8 chartshowcard">
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
                title: `<b>${upper}</b> \n ${this.state.price}`,
              }}
            />
            <div className="chartbuttons ">
              <button
                className="stockbutton width btn btn-primary"
                onClick={this.handleClickDaily}
              >
                Last Day
              </button>
              <button
                className="stockbutton width btn btn-primary"
                onClick={this.handleClick}
              >
                Last Month
              </button>
              <button
                className="stockbutton width btn btn-primary"
                onClick={this.handleClickYearly}
              >
                Last Year
              </button>
            </div>
          </div>

          <div className="col d-flex flex-column showinfo align-items-center">
            <div className="cardcontent align-items-center">
              <img className="logo" src={this.state.logo} alt="" />
              {this.state.logo["url"]}
              <div className="p-2">{this.state.name}</div>
              <div className="p-2">
                <span className="recentprice">${this.state.price} </span>
                <br />
                <br />
                <span>{this.state.timeframe}: </span>
                <br></br>

                <span style={this.setColor()}>
                  <b>
                    {this.setSign()}
                    {changeInPrice} ({percentChangePrice}%)
                  </b>
                </span>
                <br />
                <br />
              </div>
              <Link
                to={{
                  pathname: `/stocks/buy/${this.props.match.params["ticker"]}`,
                  currentPrice: this.state.price,
                  logo: this.state.logo,
                  name: this.state.name,
                }}
              >
                <div className="p-1 btn stockbutton width">Buy {upper}</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Key Information</h1>
            <div className="keyinfo">
              <div className="row">
                <div className="col top">
                  <span className="underline"> Market Cap </span>
                  <br /> <br />{" "}
                  <span className="info">{this.state.marketCap}</span>
                </div>
                <div className="col top">
                  <span className="underline"> PE Ratio </span> <br /> <br />{" "}
                  <span className="info">{this.state.peRatio}</span>{" "}
                </div>
                <div className="col top">
                  <span className="underline">52 week High </span> <br />
                  <br /> <span className="info">{this.state.high}</span>
                </div>
              </div>
              <div className="row lower">
                <div className="col bottom ">
                  <span className="underline">52 week Low</span> <br />
                  <br /> <span className="info">{this.state.low}</span>
                </div>
                <div className="col bottom">
                  <span className="underline">YTD Change</span> <br />
                  <br /> <span className="info">{updatedYTD}</span>
                </div>
                <div className="col bottom">
                  <span className="underline">Volume</span> <br />
                  <br /> <span className="info">{this.state.volume}</span>
                </div>
              </div>
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
