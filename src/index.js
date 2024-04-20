import React from "react";
import { render } from "react-dom";
import Chart from "./Chart";
// import { getData, getData1 } from "./utils";
import { getData1 } from "./utils";

import { TypeChooser } from "react-stockcharts/lib/helper";
import CandleStickChartWithInteractiveIndicator from "./CandleStickChartWithInteractiveIndicator";
import CandleStickChartWithGannFan from "./CandleStickChartWithGannFan";
import CandleStickChartWithStandardDeviationChannel from "./CandleStickChartWithStandardDeviationChannel";
import CandleStickChartWithFibonacciInteractiveIndicator from "./CandleStickChartWithFibonacciInteractiveIndicator";

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null, // Initialize data state variable
      symbol: 'ETHUSDT', // Initialize symbol state variable
      time: '1m', // Initialize time state variable
      selectedChart: 1
    };
  }

  buttonData = [
    { id: 1, time: '1M', selected: true},
    { id: 2, time: '3M', selected: false},
    { id: 3, time: '5M', selected: false}
  ];
  
  symbolData = [
    { id: 1, symbol: 'ETHUSDT', selected: true},
    { id: 2, symbol: 'EURUSDT', selected: false},
    { id: 3, symbol: 'GBPUSDT', selected: false}
  ];

  trendlineData = [
    { id: 1, type: 'EquidistantChannel', selected: true},
    { id: 2, type: 'LineIndicator', selected: false},
    { id: 3, type: 'Deviation', selected: false},
    { id: 4, type: 'Fabinocci', selected: false},
    { id: 5, type: 'Fan', selected: false}
  ];

  componentDidMount() {
    this.loadData(); // Load initial data
  }

  loadData() {
    getData1(this.state.symbol, this.state.time).then((graphdata) => {
      console.log(graphdata[0]);
      this.setState({ data: graphdata });
    });
  }

  handleTimeClick = (e, btnid) => {
    console.log(btnid)
    this.setState({ time: e.target.textContent.toLowerCase()}, () => {
      this.loadData();
    });
    this.buttonData = this.buttonData.map((item)=> { 
      return {...item, selected: item.id === btnid }
    })
  }

  handleSymbolClick = (e, symbid) => {
    this.setState({ symbol: e.target.textContent}, () => {
      this.loadData();
    });
    this.symbolData = this.symbolData.map((item)=> { 
      return {...item, selected: item.id === symbid }
    })
  }

  handleTrendlineClick = (e, trendid) => {
    this.setState({selectedChart: trendid})
      this.trendlineData = this.trendlineData.map((item)=> { 
      return {...item, selected: item.id === trendid }
    })
    
  }
  

  render() {
    if (this.state.data === null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div style={{display:'flex', justifyContent:'space-between', margin: '12px'}}>
          <div  style={{display:'flex', gap:'12px'}}>
            {this.buttonData.map(item => (
              <button
                key={item.id}
                onClick={(e) => this.handleTimeClick(e, item.id)}
                style={{background: item.selected ? '#478898' : 'transparent', color: item.selected ? '#ffffff' : '#000000'}}
              >
                {item.time}
              </button>
            ))}
          </div>

          <div  style={{display:'flex', gap:'12px'}}>
            {this.trendlineData.map(item => (
              <button
                key={item.id}
                onClick={(e) => this.handleTrendlineClick(e, item.id)}
                style={{background: item.selected ? '#478898' : 'transparent', color: item.selected ? '#ffffff' : '#000000'}}
              >
                {item.type}
              </button>
            ))}
          </div>

          <div  style={{display:'flex', gap:'12px'}}>
            {this.symbolData.map(item => (
              <button
                key={item.id}
                onClick={(e) => this.handleSymbolClick(e, item.id)}
                style={{background: item.selected ? '#478898' : 'transparent', color: item.selected ? '#ffffff' : '#000000'}}
              >
                {item.symbol}
              </button>
            ))}
          </div>
        </div>

        {this.state.selectedChart == 1 ? <TypeChooser>
          {(type) => (
            <Chart
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser> : this.state.selectedChart == 2 ? <TypeChooser>
          {(type) => (
            <CandleStickChartWithInteractiveIndicator
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser> : this.state.selectedChart == 3 ? <TypeChooser>
          {(type) => (
            <CandleStickChartWithStandardDeviationChannel
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>: this.state.selectedChart == 4 ? <TypeChooser>
          {(type) => (
            <CandleStickChartWithFibonacciInteractiveIndicator
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser> : <TypeChooser>
          {(type) => (
            <CandleStickChartWithGannFan
              type={type}
              data={this.state.data}
            />
          )}
        </TypeChooser>}
      </div>
    );
  }
}

render(<ChartComponent />, document.getElementById("root"));
