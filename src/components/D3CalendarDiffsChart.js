import React, { Component } from 'react';
import '../App.css';
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { rgb } from 'd3-color';
import { select } from 'd3-selection';
import { min, max } from 'd3-array';
import { get } from 'lodash';



export default class D3CalendarChart extends Component {
    
    
    constructor(props) {
        super(props);
        this.createChart = this.createChart.bind(this);
        // this.updateChart = this.updateChart.bind(this);
        // this.destroyChart = this.destroyChart.bind(this);
    }
    
    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        this.createChart();
    }
    // componentDidUpdate() {
    //     this.updateChart();
    // }

    // componentWillUnmount() {
    //     this.destroyChart();
    // }

    createChart() {
        const { xVar, yVar, colorVar, dotRadius, data, averages } = this.props;
        console.log(data);

        const node = this.node;
        const xVarMin = min(data.map(obj => Number(obj[xVar])));
        const diffsArr = data.map(obj => {
            const dayVal = obj.dataVals[colorVar];
            console.log(averages);
            const avgObj = averages.filter(d => d.dayOfYear === obj.dayOfYear)[0];
            const avg = avgObj.dayAvgs[colorVar];
            return dayVal - avg;
        });
        const diffFromAvgMax = max(diffsArr);
        console.log(diffFromAvgMax);
        const diffFromAvgMin = min(diffsArr);
        console.log(diffFromAvgMin);
        // const yearMin = 1893;
        // const avgVarMax
        
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
            .style('fill', d => this.getColor(d.dataVals[colorVar]))
            .attr('cx', d => {
                return (d[xVar] - xVarMin)*dotRadius*2+dotRadius;
            })
            .attr('cy', d => d[yVar]*dotRadius*2+dotRadius)
            .attr('r', dotRadius)
    }

    getColor(d) {
        const color = scaleLinear()
            .domain([0,100])
            .interpolate(interpolateHcl)
            .range([rgb("#007AFF"), rgb('#FFF500')]);
        return color(d);
    }

    getDiffVal(dateObj) {

    }
    // getAvgsColor(d) {
    //     console.log(this.props.data);

    //     var colorScale = d3.scale.linear()
    //         .domain([domLow, (domLow+domHigh)/2, domHigh])
    //         .range(["#2c7bb6", "#ffff8c", "#d7191c"])
    //         .interpolate(d3.interpolateHcl);

        
    //     const color = scaleLinear()
    //         .domain([0,100])
    //         .interpolate(interpolateHcl)
    //         .range([rgb("#007AFF"), rgb('#FFF500')]);
    //     return color(d);
    // }

    render() {
        return <svg ref={node => this.node = node}
        width={1000} height={3600}>
        </svg>
    }

}
