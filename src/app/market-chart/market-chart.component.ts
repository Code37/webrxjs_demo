import {Component, ChangeDetectionStrategy, ElementRef, Input, OnChanges, ViewChild, Inject} from '@angular/core';
import * as d3 from 'd3';
import {MarketPrice} from '../shared/market-price';


@Component({
  selector: 'app-market-chart',
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MarketChartComponent implements OnChanges {

  @ViewChild('chart', {static: false})
  chartElement: ElementRef;

  parseDate = d3.timeParse('%Y-%m-%d');

  @Input()
  marketStatus: MarketPrice[];

  private svgElement: HTMLElement;
  private chartProps: any;

  constructor(@Inject('BaseURL') private baseURL) {
  }

  ngOnChanges() {
    console.log(this);
    if (this.marketStatus &&  this.chartProps) {
      this.updateChart();
    } else if (this.marketStatus) {
      this.buildChart();
    }
  }

  formatDate() {
    this.marketStatus.forEach(ms => {
      if (typeof ms.date === 'string') {
        ms.date = this.parseDate(ms.date);
      }
    });
  }

  updateChart() {
    const _this = this;
    this.formatDate();

    // Scale the range of the data again
    // tslint:disable-next-line:only-arrow-functions
    this.chartProps.x.domain(d3.extent(this.marketStatus, function(d) {
      if (d.date instanceof Date) {
        return d.date.getTime();
      }
    }));

    // tslint:disable-next-line:only-arrow-functions
    this.chartProps.y.domain([0, d3.max(this.marketStatus, function(d) { return Math.max(d.close, d.open); })]);

    // Select the section we want to apply our changes to
    this.chartProps.svg.transition();

    // Make the changes to the line chart
    this.chartProps.svg.select('.line.line1') // update the line
      .attr('d', this.chartProps.valueline(this.marketStatus));

    this.chartProps.svg.select('.line.line2') // update the line
      .attr('d', this.chartProps.valueline2(this.marketStatus));

    this.chartProps.svg.select('.x.axis') // update x axis
      .call(this.chartProps.xAxis);

    this.chartProps.svg.select('.y.axis') // update y axis
      .call(this.chartProps.yAxis);
  }

  buildChart() {
    this.chartProps = {};
    this.formatDate();

    // Set the dimensions of the canvas / graph
    // tslint:disable-next-line:one-variable-per-declaration
    const margin = { top: 30, right: 20, bottom: 30, left: 50 },
          width = 600 - margin.left - margin.right,
          height = 270 - margin.top - margin.bottom;

    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    let xAxis = d3.axisBottom(this.chartProps.x);
    let yAxis = d3.axisLeft(this.chartProps.y).ticks(5);

    let _this = this;

    // Define the line
    const valueline = d3.line<MarketPrice>()
      .x((d) => {
        if (d.date instanceof Date) {
          return _this.chartProps.x(d.date.getTime());
        }
      })
      .y((d) => { console.log('Close market'); return _this.chartProps.y(d.close); });

    // Define the line
    const valueline2 = d3.line<MarketPrice>()
      .x((d) => {
        if (d.date instanceof Date) {
          return _this.chartProps.x(d.date.getTime());
        }
      })
      .y((d) => { console.log('Open market'); return _this.chartProps.y(d.open); });

    const svg = d3.select(this.chartElement.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale the range of the data
    this.chartProps.x.domain(
      d3.extent(_this.marketStatus, (d) => {
        if (d.date instanceof Date) {
          return (d.date as Date).getTime();
        }
      }));
    this.chartProps.y.domain([0, d3.max(this.marketStatus, (d) => {
      return Math.max(d.close, d.open);
    })]);

    // Add the valueline2 path.
    svg.append('path')
      .attr('class', 'line line2')
      .style('stroke', 'green')
      .style('fill', 'none')
      .attr('d', valueline2(_this.marketStatus));

    // Add the valueline path.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('d', valueline(_this.marketStatus));


    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    this.chartProps.valueline2 = valueline2;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
  }
}
