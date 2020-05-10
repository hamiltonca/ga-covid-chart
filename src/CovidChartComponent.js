import React, {Component} from 'react';
import Chart from 'chart.js';

export default class CovidChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            county: this.props.selectedCounty,
            dates: this.props.dates,
            infections: this.props.infections,
            deaths: this.props.deaths,
        }
        this.chartRef = React.createRef();
        this.chart = {};
        this.chartConfig =  {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Infections',
                        backgroundColor: '#408040',
                        borderColor: '#408040',
                        data: [],
                        fill: false
                    },
                    {
                        label: 'New Infections',
                        backgroundColor: '#408040',
                        borderColor: '#40F080',
                        data: [],
                        fill: false
                    },
                    {
                        label: 'Deaths',
                        backgroundColor: '#404080',
                        borderColor: '#404080',
                        data: [],
                        fill: false
                    },
                    {
                        label: 'New Deaths',
                        backgroundColor: '#404080',
                        borderColor: '#4080F0',
                        data: [],
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: ''
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display:true,
                            labelString: 'Date and Time'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Infections'
                        }
                    }]
                }
            }

        };
        this.drawChart = this.drawChart.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.drawChart();
    }

    drawChart = () => {
        //
        // If there was a previous chart, destroy it.
        // This is needed to clear the various rollover events
        // from the old chart causing it to appear in the current chart's view
        // when you roll over one of the old plot points.
        //
        if (this.chart instanceof Chart) {
            this.chart.destroy();
        }
        this.chartConfig.data.labels = this.props.dates;
        this.chartConfig.options.title.text = this.props.selectedCounty;
        this.chartConfig.data.datasets.forEach((dataset, index) => {
            switch (index) {
                case 0:
                    dataset.data = this.props.infections;
                    break;
                case 1:
                    let lastCount = 0;
                    dataset.data = this.props.infections.map( (item, index) => {
                        const retVal = index > 0 ? item - lastCount : 0;
                        lastCount = item;
                        return retVal;
                    });
                    break;
                case 2:
                    dataset.data = this.props.deaths;
                    break;
                case 3:
                    let deathCount = 0;
                    dataset.data = this.props.deaths.map( (item, index) => {
                        const retVal = index > 0 ? item - deathCount : 0;
                        deathCount = item;
                        return retVal;
                    });
                    break;
                default:
                    console.log("index: " + index);
            }
        });
        const chartContext = document.getElementById('canvas').getContext('2d');
        this.chart = new Chart(chartContext, this.chartConfig);
        this.chart.update();

    }

    render() {
        return (
            <div className='chartStyle' id="chart-parent">
                <canvas id="canvas" ref={this.chartRef}/>
            </div>
        );
    }
}