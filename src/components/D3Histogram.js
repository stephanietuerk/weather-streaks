import React, { Component } from 'react';
import '../App.css';
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { rgb } from 'd3-color';
import { select } from 'd3-selection';


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
        const data = this.props.data;
        const dotRadius = 3;

        const node = this.node;
        const yearMin = 1893;
        // const yScale = scaleLinear()
        //    .domain([0, dataMax])
        //    .range([0, this.props.size[1]])
        
        select(node)
            .selectAll('circle')
            .data(this.props.data)
            .enter()
            .append('circle')
     
        select(node)
            .selectAll('circle')
            .data(this.props.data)
            .exit()
            .remove()
        
        select(node)
            .selectAll('circle')
            .data(this.props.data)
            .style('fill', d => this.getColor(d.avgTemp))
            .attr('cx', d => {
                console.log(d);
                return (d.year - yearMin)*dotRadius*2+dotRadius;
            })
            .attr('cy', d => d.dayOfYear*dotRadius*2+dotRadius)
            .attr('r', dotRadius)
    }

    getColor(d) {
        const color = scaleLinear()
            .domain([0,100])
            .interpolate(interpolateHcl)
            .range([rgb("#007AFF"), rgb('#FFF500')]);
        return color(d);
    }

    render() {
        return <svg ref={node => this.node = node}
        width={1000} height={3600}>
        </svg>
    }

}
