import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate = () => {
    this.myChart.data.labels = this.props.labels;
    this.myChart.data.datasets[0].data = this.props.data;
    this.myChart.options.scales.yAxes[0].ticks.min = this.props.min;
    this.myChart.update();
  };

  componentDidMount = () => {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "line",
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "week"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        datasets: [
          {
            label: `${this.props.symbol} close price`,
            fill: "none",
            backgroundColor: this.props.color,
            pointRadius: 2,
            borderColor: this.props.color,
            borderWidth: 1,
            lineTension: 0
          }
        ]
      }
    });
  };

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

LineChart.propTypes = {
  symbol: PropTypes.string,
  labels: PropTypes.array,
  min: PropTypes.number,
  data: PropTypes.array
};

export default LineChart;
