import { Component, OnInit } from '@angular/core';
import { LineChart } from '../../data/data';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  title = 'Line Chart';

  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width: number;
  height: number;
  x: any;
  y: any;
  svg: any;
  line: d3Shape.Line<[number, number]>;

  constructor() {
    // configure margins and width/height of the graph
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }


  ngOnInit() {
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }
  buildSvg() {
    this.svg = d3.select('#line-chart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  addXandYAxis() {
    // range of data configuring
    this.x = d3Scale.scaleLinear().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(LineChart, (d) => {
      return d.Year;
    }));

    this.y.domain(d3Array.extent(LineChart, (d) => d.Revenue));

    // Configure the Y Axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    // Configure the Y Axis
    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));
  }

  private drawLineAndPath() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.Year))
      .y((d: any) => this.y(d.Revenue));
    // Configuring line path
    this.svg.append('path')
      .datum(LineChart)
      .attr('class', 'line')
      .attr('d', this.line)
      .style('fill', 'none')
      .style('stroke', 'red')
      .style('stroke-width', '2px');

  }

}
