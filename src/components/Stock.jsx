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
    return (
      <div className ="container d-flex flex-column justify-content-center">
        
        <Plot
        data={[
            {
                x: this.props.stockChartXValues,
                y: this.props.stockChartYValues,
                type : 'scatter',
                mode: 'lines+markers',
                marker: {color : 'lime'}
            },
            
        ]}
        //MAIN-SVG
        layout ={{width: 900, height: 640, title: this.props.ticker}}
        />
      <h5 className= "text-center">Current price {this.props.stockChartYValues[0]}</h5>
      </div>
    );
  }
}

export default Stock;
