import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
    state = { 
        ticker : 'aapl'
     }
changeStock = (event) => {
    this.setState({
        ticker : event.target.value
    })

}

    render() { 
        return ( 
            <div>
<Stock ticker={this.state.ticker} />
<input onChange = {this.changeStock} type='text' name="stock"></input>
<button width = "50px" onClick={this.changeStock}>fetch stock</button>
            </div>
         );
    }
}
 
export default StockContainer;