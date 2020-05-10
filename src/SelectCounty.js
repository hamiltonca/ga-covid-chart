import React, {Component} from 'react';

export default class SelectCounty extends Component {
    constructor(props) {
        super(props);
        this.changeCounty = this.changeCounty.bind(this);
        this.state = {
            // The selected county
            selectedCounty: this.props.selectedCounty,
            // The function to call in the parent when the selected county changes.
            selectCounty: this.props.selectCounty
        };
    }

    changeCounty(event) {
        console.log("changeCounty: event: " + event.target.value);
        this.setState({ selectedCounty: event.target.value} );
        this.state.selectCounty(event.target.value);

    }
    render() {
        return (
            <div id="selectChart" className="selectStyle">
                <label className="label">Select a county:</label>
                <form>
                    <select name="selectedCounty" onChange={this.changeCounty} value={this.state.selectedCounty}>
                        {
                            this.props.countyNames &&
                            this.props.countyNames.map((county) => (
                                <option key={county}>{county}</option> ))
                        }
                    </select>
                </form>
            </div>
        );
    };
}