import React, { Component } from "react";
import Plot from 'react-plotly.js'

class Stock extends Component {
  state = {
    stockChartXValues: [],
    stockChartYValues: [],
  };

  componentDidMount() {
    this.fetchStock();
    console.log('mounted')
  }

  componentDidUpdate() {
    
    console.log('updated')
  }

  fetchStock =() => {
    const pointerToThis = this;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    const API_KEY = "TK2WTT1V16S5RE86";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.ticker}&interval=5min&apikey=${API_KEY}`;
    fetch(API_Call)
      // .then((response) => response.json())
      // .then((data) => stockChartXValuesFunction = data)

      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        for (let key in data["Time Series (5min)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (5min)"][key]["1. open"]
          );
        }
        
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }
  render() {
    return (
      <div className ="container d-flex flex-column justify-content-center">
        
        <Plot
        data={[
            {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type : 'scatter',
                mode: 'lines+markers',
                marker: {color : 'red'},
            },
            
        ]}
        layout ={{width: 720, height: 440, title: this.props.ticker}}
        />
        <button width = "50px" onClick={this.fetchStock}>fetch stock</button>
      <h5>Current price {this.state.stockChartYValues[0]}</h5>
      </div>
    );
  }
}

export default Stock;
