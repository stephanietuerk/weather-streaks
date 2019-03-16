import React, { Component } from 'react';
import './App.css';
import { csv } from 'd3-fetch';
import D3LineChart from './components/D3LineChart';
import D3CalendarChart from './components/D3CalendarChart';
import sourceData from './data/blue_hill_data.csv';
import * as moment from 'moment';
import DataFunctions from './utils/DataFunctions';
import { tooltipStyle } from './utils/style';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      data: [],
      colorVar: 'avgTemp'
    };
    this.onHover = this.onHover.bind(this);
  };

  componentDidMount() {
    this.processData();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  async processData() {
    const data = await csv(sourceData, (d) => {
      return {
        date: d.date,
        year: moment(d.date, "YYYY-MM-DD").format('YYYY'),
        dayOfYear: DataFunctions.getDayOfYear(d.date),
        dataVals: {
          highTemp: +d.high,
          lowTemp: +d.low,
          avgTemp: +d.average,
          precip: +d.precip,
          snowfall: +d.snowfall,
          snowdepth: +d.snowdepth
        }
      };
    });
    console.log(await data);
    const groupByProp = 'dayOfYear';
    const dataAvgs = DataFunctions.getAverages(await data, groupByProp);
    console.log(dataAvgs);
    this.setState({
      data: await data,
      dataAvgs: await dataAvgs
    });
  }

  onHover(x, y, object) {
    console.log(x, y);
    this.setState({ x, y, hoveredObject: object });
  }

  renderTooltip() {
    const { hoveredObject, x, y } = this.state;
    console.log( x, y, hoveredObject );
    return (
      hoveredObject && (
        <div
          className="tooltip"
          style={{
            ...tooltipStyle,
            transform: `translate(${x}px, ${y}px)`
          }}
        >
          <div>
            {moment(hoveredObject.date, "YYYY-MM-DD").format('MMM DD YYYY')}
          </div>
          <div>
            <b>{this.state.colorVar}:</b>
            {hoveredObject.dataVals[this.state.colorVar]}
          </div>
        </div>
      )
    );
  }



  render() {
    return (
      <div className="App">
        {/* <div className="Chart"> 
          <D3LineChart data={[5,10,1,3]} realData={[this.state.data]} size={[500,500]} />
        </div> */}
        <div className="Chart"> 
          <D3CalendarChart 
            xVar={'year'}
            yVar={'dayOfYear'}
            colorVar={this.state.colorVar}
            dotRadius={3}
            data={this.state.data}
            size={[1000,4000]}
            onHover={this.onHover}

          />
          {this.renderTooltip()}
          {/* <D3CalendarDiffsChart
            xVar={'year'}
            yVar={'dayOfYear'}
            colorVar={'avgTemp'}
            dotRadius={3}
            data={this.state.data}
            averages={this.state.dataAvgs} 
            size={[1000,3600]}
          /> */}
        </div>
        
      </div>
      
    );
  }
}
