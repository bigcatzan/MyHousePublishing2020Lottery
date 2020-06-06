import React, { Component } from 'react';

class InputField extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.name,event.target.value);
    }

    render() {
        return (
            <div className="w-full">
                <label className="tracking-wide text-gray-700 font-bold">
                {this.props.data.title}
                </label>
                <input type="text" name={this.props.data.name} value={this.props.data.value} onChange={this.handleChange}
                       className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-pink-400"/>
            </div>
        );
    }
}

export default InputField;