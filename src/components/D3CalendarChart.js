import React, { Component } from 'react';
import '../App.css';
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { rgb } from 'd3-color';
import { select } from 'd3-selection';
import { min, max } from 'd3-array';


export default class D3CalendarChart extends Component {

  makeCircles() {
      // const { xVar, yVar, colorVar, dotRadius, data } = this.props;
      // const xVarMin = min(data.map(obj => Number(obj[xVar])));
      
      // const colorVarMin = min(data.map(obj => obj.dataVals[colorVar]));
      // const colorVarMax = max(data.map(obj => obj.dataVals[colorVar]));
      // const color = scaleLinear()
      //     .domain([colorVarMin, colorVarMax])
      //     .interpolate(interpolateHcl)
      //     .range([rgb("#007AFF"), rgb('#FFF500')]);

      // const xPosition = (d) => (d[xVar] - xVarMin)*dotRadius*2+dotRadius;
      // const yPosition = (d) => d[yVar]*dotRadius*2+dotRadius;

      // return data.map(d => (
      //   <circle 
      //     key={d.date}
      //     cx={xPosition(d)}
      //     cy={yPosition(d)}
      //     r={dotRadius}
      //     fill={color(d.dataVals[colorVar])}
      //     // onHover={() => { this.props.onHover(d) }}
      //   />
      // ));
  }

  render() {
    const { xVar, yVar, colorVar, dotRadius, data } = this.props;
    const xVarMin = min(data.map(obj => Number(obj[xVar])));
    
    const colorVarMin = min(data.map(obj => obj.dataVals[colorVar]));
    const colorVarMax = max(data.map(obj => obj.dataVals[colorVar]));
    const color = scaleLinear()
        .domain([colorVarMin, colorVarMax])
        .interpolate(interpolateHcl)
        .range([rgb("#007AFF"), rgb('#FFF500')]);

    const xPosition = (d) => (d[xVar] - xVarMin)*dotRadius*2+dotRadius;
    const yPosition = (d) => d[yVar]*dotRadius*2+dotRadius;

    const circles = data.map(d => {
      return <circle 
        key={d.date}
        cx={xPosition(d)}
        cy={yPosition(d)}
        r={dotRadius}
        fill={color(d.dataVals[colorVar])}
        // onHover={() => { this.props.onHover(d) }}
      />
    });

      return <svg
          width={this.props.size[0]}
          height={this.props.size[1]}
          >
          {circles}
          </svg>
      // return <svg ref={node => this.node = node}
      // width={1000} height={3600}>
      // </svg>
  }

}


