import React, {Component} from 'react';

export default class SelectCounty extends Component {
    constructor(props) {
        super(props);
        this.selectCounty = this.selectCounty.bind(this);
        this.changeCounty = this.changeCounty.bind(this);
        this.state = {
            selectedCounty: this.props.selectedCounty,
            selectCounty: this.props.selectCounty
        };
    }

    selectCounty(event) {
        console.log("selectCounty event: " + event.target.value);
        event.preventDefault();
        this.setState(() => { selectedCounty: event.target.value});
    }
    changeCounty(event) {
        console.log("changeCounty: event: " + event.target.value);
        this.setState({ selectedCounty: event.target.value} );
        console.log("changeCounty state selectedCounty: " + this.state.selectedCounty);
        this.state.selectCounty(event.target.value);

    }
    render() {
        return (
            <div id="selectChart" className="selectStyle">
                <label>Select a county:</label>
                <form onSubmit={this.selectCounty}>
                    <select name="selectedCounty" onChange={this.changeCounty} value={this.state.selectedCounty}>
                        {
                            this.props.countyNames &&
                            this.props.countyNames.map((county, index) => (
                                <option key={county}>{county}</option> ))
                        }
                    </select>
                </form>
            </div>
        );
    };
}