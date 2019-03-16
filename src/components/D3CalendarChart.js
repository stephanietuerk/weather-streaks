import React, { Component } from 'react';
import '../App.css';
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { rgb } from 'd3-color';
import { select } from 'd3-selection';
import { min, max } from 'd3-array';


export default class D3CalendarChart extends Component {
    
    
    constructor(props) {
        super(props);
        this.createChart = this.createChart.bind(this);
    }
    
    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        this.createChart();
    }

    createChart() {
        const { xVar, yVar, colorVar, dotRadius, data } = this.props;
        console.log(data);

        const node = this.node;
        const xVarMin = min(data.map(obj => Number(obj[xVar])));
        const colorVarMin = min(data.map(obj => obj.dataVals[colorVar]));
        const colorVarMax = max(data.map(obj => obj.dataVals[colorVar]));

        const color = scaleLinear()
            .domain([colorVarMin, colorVarMax])
            .interpolate(interpolateHcl)
            .range([rgb("#007AFF"), rgb('#FFF500')]);

        const tooltip = select(node)
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background", "#000")
            .text("a simple tooltip");
        
        select(node)
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
     
        select(node)
            .selectAll('circle')
            .data(data)
            .exit()
            .remove()
        
        select(node)
            .selectAll('circle')
            .data(data)
            .style('fill', d => color(d.dataVals[colorVar]))
            .attr('cx', d => {
                return (d[xVar] - xVarMin)*dotRadius*2+dotRadius;
            })
            .attr('cy', d => d[yVar]*dotRadius*2+dotRadius)
            .attr('r', dotRadius)
            .on('mouseover', d => {
                if (this.props.onHover) {
                    const x = (d[xVar] - xVarMin)*dotRadius*2+dotRadius;
                    const y = d[yVar]*dotRadius*2+dotRadius;
                    console.log(x, y);
                    return this.props.onHover(x, y, d);
                  }
                return false;
            });
    }

    render() {
        return <svg ref={node => this.node = node}
        width={1000} height={3600}>
        </svg>
    }

}
