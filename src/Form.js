import React, {Component} from 'react';
import InputField from './InputField';

class Form extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(name,value) {
        const input=[...this.props.input];
        input.find(i=>i.name===name).value=value;
        this.props.onChange(input);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        const inputFields=this.props.input.map((i)=>
            <InputField key={i.toString()} data={i} onChange={this.handleChange}/>
        );
        return (
            <div className="w-1/2">
            <form onSubmit={this.handleSubmit} className="w-full px-3 py-3">
                {inputFields}
                <div className="w-full block py-3 mb-3">
                    <input type="submit" value="抽下去吧" className="shadow bg-pink-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 w-full rounded"/>
                </div>
            </form>
            </div>
        );
    }
}

export default Form;