import React, { Component } from 'react';
import { connect } from 'react-redux';
const d3 = require('d3');
// const legendColor = require('../../../public/d3-legend.js');
const ReactFauxDOM = require('react-faux-dom');

class LineChart extends Component {

  render() {
    // Line chart
    const playerStats = this.props.players[1];
    if (Array.isArray(playerStats)) {
      // playerStats = playerStats.slice(0, 17);
      console.log(playerStats);
      const width = 700;
      const height = 200;

      const yahooPoints = {
        total: [[], [], [], []],
        player1: [[]],
        player2: [[]],
      };
      const increment = width / 17;
      let currentWeek = 1;
      playerStats.forEach((obj, i) => {
        const index = i + 1;
        yahooPoints.total[0].push(index);
        yahooPoints.total[1].push(obj.FantasyPointsYahoo);
        yahooPoints.total[2].push((index) * increment);
        yahooPoints.total[3].push([index, obj.FantasyPointsYahoo]);


        if (i % 2 === 0 ) {
          yahooPoints.player1[0].push([currentWeek,obj.FantasyPointsYahoo])
        } else {
          yahooPoints.player2[0].push([currentWeek,obj.FantasyPointsYahoo])
          currentWeek++;
        }
      });
      console.log(yahooPoints);
      const x = d3.scaleOrdinal(yahooPoints.total[2]);
      const y = d3.scaleLinear()
              .domain([0, d3.max(yahooPoints.total[1])])
              .range([height, 0]);

      const line = d3.line()
                .x(function(d) { return x(d[0]) })
                .y(function(d) { return y(d[1]) });

      const linePY = d3.line()
                .x(function(d) { return x(d[0]) })
                .y(function(d) { return y(d[1]) });

      // const linePT = d3.line()
      //           .x(function(d) { return x(d[0]) })
      //           .y(function(d) { return y(d[1]) });

      const margin = {top: 20, right: 20, bottom: 30, left: 50};

      const node = ReactFauxDOM.createElement('svg');
      console.log(node);
      let svg = d3.select(node)
                .append('svg')
                .attr("width", (width + 70))
                .attr("height", (height + 90))
                .style("background", "white");

                node.style.setProperty('width', (width + 100));
                node.style.setProperty('height', (height + 70));
                node.style.setProperty('background', 'white');


      const svgTranslated = svg.append('g')
                .style('transform', 'translate(' + (30) +'px, ' + (50) +'px)');
                svgTranslated.append('path')
                .attr('data-legend', function(d) { return 'Total Points' })
                .datum(yahooPoints.player1[0])
                .attr('class', 'line')
                .attr('d', line)
                .on('mouseover', function(d) {
                  d3.select(this)
                  .style('opacity', '.7');
                })
                .on('mouseout', function(d) {
                  d3.select(this)
                  .style('opacity', '1');
                });

                svgTranslated.append('path')
                .datum(yahooPoints.player2[0])
                .attr('class', 'line-yards')
                .attr('d', linePY)
                .on('mouseover', function(d) {
                  d3.select(this)
                  .style('opacity', '.7');
                })
                .on('mouseout', function(d) {
                  d3.select(this)
                  .style('opacity', '1');
                });

                // svgTranslated.append('path')
                // .datum(yahooPoints.PassingTouchDowns[0])
                // .attr('class', 'line-touch-downs')
                // .attr('d', linePT)
                // .on('mouseover', function(d) {
                //   d3.select(this)
                //   .style('opacity', '.7');
                // })
                // .on('mouseout', function(d) {
                //   d3.select(this)
                //   .style('opacity', '1');
                // });

              svgTranslated.append('g')
              .style('transform', 'translate(0px, 195px)')
              .attr('class', 'axis axis--x')
              .attr('x', '0')
              .call(d3.axisBottom(x));

              svgTranslated.append('g')
              .attr('class', 'axis axis--y')
              .call(d3.axisLeft(y))
              .append('text')
              .attr('transform', 'rotate(-90)')
              .attr('y', 6)
              .attr('dy', '.71em')
              .attr('dx', '.71em')
              .style('text-anchor', 'end')
              .text('Fantasy Points');

              svgTranslated.append('g')
              .attr('class', 'legend')
              .attr('transform', 'translate(50,30)')
              .style('font-size', '12px');

              const ordinal = d3.scaleOrdinal()
              .domain(['Total Points','P. Yards',' P. TouchDowns'])
              .range(['steelblue', '#46b46d', '#ef7118']);

              svg = d3.select('svg');

              svg.append('g')
              .attr('class', 'legendOrdinal')
              .attr('transform', 'translate(590,20)');


              // const legendOrdinal = d3.legendColor()
              // .shape('path', d3.symbol().type(d3.symbolTriangle).size(50)())
              // .shapePadding(10)
              // .scale(ordinal);

              // svg.select('.legendOrdinal')
              //   .call(legendOrdinal);

              svg.append('g')
              .style('transform', 'translate(' + (30) +'px, ' + (height + 50) +'px)')
              .attr('class', 'axis axis--x')
              .attr('x', '0')
              .call(d3.axisBottom(x));
              return <div>{node.toReact()}</div>
    } else {
      return <div>Loading...</div>
    }

    return (
      <div></div>
    );
  }
}

function mapStateToProps(state) {
  return { players: state.query };
}

export default connect(mapStateToProps)(LineChart);
