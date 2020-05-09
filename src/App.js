import React, {Component} from 'react';
import './App.css';
import CovidChart from "./CovidChartComponent";
import SelectCounty from "./SelectCounty";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.dataEndpoint = props.dataEndpoint;
        this.state = {
            counties: [],
            county: {
                dates: [],
                infections: [],
                deaths: [],
                countyNames: []
            },
            selectedCounty: this.props.selectedCounty,
            loaded: false
        };
        //this.fetchUrl = 'https://compucafe.com/ga-covid-chart/counties.json';
        //this.fetchUrl = 'http://localhost/src/covid19/ga-covid-chart/counties.json';
        this.fetchUrl = 'https://useast1-covid-charts.s3.amazonaws.com/current-covid-data.json';
        this.fetchData = this.fetchData.bind(this);
        this.selectCounty = this.selectCounty.bind(this);
    }


    selectCounty(selectedCounty) {
        console.log("selectedCounty:" + selectedCounty);
        this.setState( () => (
            {
                selectedCounty,
                county: this.state.counties[selectedCounty]
            }))
    }

    fetchData() {
        const myRequest = new Request(this.fetchUrl, {
        });
        fetch(myRequest)
            .then(function (res) {
                if (!res.ok) {
                    console.log("Error encountered fetching json: res.status:" + res.status + " res.: " + res.body);
                    throw (Error(res.status.toString()));
                }
                return res.json();
            })
            .then(data => {
                console.log("statusCode:" + data['statusCode'])
                const counties = data['body'];
                const countyNames = [];
                for (const county in counties) {
                    countyNames.push(county);
                }
                countyNames.sort();
                this.setState(() => (
                    {
                        counties: data['body'],
                        county: counties[this.props.selectedCounty],
                        selectedCounty: this.props.selectedCounty,
                        countyNames: countyNames,
                        isLoaded: true
                    }));
                console.log("data loaded.");
            })
            .catch(err => {
                console.log("Error loading counties.", err);
            });
  }
  componentDidMount() {
        this.fetchData();
  }

  render() {
      return (
          <div>
              <CovidChart
                          selectedCounty={this.state.selectedCounty}
                          dates={this.state.county.dates}
                          infections={this.state.county.infections}
                          deaths={this.state.county.deaths} />
              <SelectCounty
                  selectedCounty = {this.props.selectedCounty}
                  selectCounty={this.selectCounty}
                  countyNames={this.state.countyNames} />
              <div className="info">
                  <p>The data used for this chart is collected from the Georgia Department of Health web site.</p>
                  <p>Here: <a href="https://dph.georgia.gov/covid-19-daily-status-report">https://dph.georgia.gov/covid-19-daily-status-report</a></p>
              </div>
          </div>
      );
  }
}
