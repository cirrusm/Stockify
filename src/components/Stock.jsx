import React, { Component } from "react";
import Plot from 'react-plotly.js'

class Stock extends Component {
  state = {
    stockChartXValues: [],
    stockChartYValues: [],
  };

  componentDidMount() {
    // this.fetchStock();
    console.log('mounted')
  }

  componentDidUpdate() {
    
    console.log('updated')
  }


  color = () => {
    if(this.props.stockChartYValues[0] > this.props.stockChartYValues[99]){
      return {color : 'green'}
    } else {
      return {color: 'red'}
    }
  }
  render() {
    // let priceNow = this.props.stockChartYValues[0] ? this.props.stockChartYValues[0].toFixed(2) : ""
    let upper = this.props.ticker.toUpperCase()
    let recentPrice = this.props.stockChartYValues[0]
    let startingPrice = this.props.stockChartYValues[99]
    let changeInPrice = parseFloat(recentPrice - startingPrice).toFixed(2)
    
    return (
      <div className ="container d-flex flex-column justify-content-center">
        
        <Plot
        data={[
            {
                x: this.props.stockChartXValues,
                y: this.props.stockChartYValues,
                type : 'scatter',
                mode: 'lines+markers',
                marker: this.color()
            },
            
        ]}
        //MAIN-SVG IN CSS
        layout ={{width: 450, height: 400, title: `<b>${upper}</b> \n ${recentPrice}`}}
        />
      <h5 className= "text-center">Current price {recentPrice} </h5>
      <span>Change in last day {changeInPrice}</span>
      </div>
    );
  }
}

export default Stock;
