import React, { Component } from "react";
import Input from './Input';
import colors from '../lib/colors'


class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fields: props.fields,
			values: {},
			errors: {}
		}

		for (var i = 0; i < props.fields.length; i++) {
			const field_name = props.fields[i].name
			if ((props.initialState || {})[field_name]) {
				this.state.values[field_name] = props.initialState[field_name]
				this.state.errors[field_name] = false
			} else {
				this.state.values[field_name] = ''
				this.state.errors[field_name] = true
			}
		}
	}

	// componentWillMount() {
	// 	this.props.onChange({ values: this.state.values, errors: this.state.errors})
	// }

	componentWillUpdate(nextProps, nextState) {
		if (this.state.values !== nextState.values) {
			this.props.onChange({ values: nextState.values, errors: this.state.errors})
		}
	}

	checkReq(field_num) {

		let errors = this.state.errors
		const field = this.state.fields[field_num]
		const value = this.state.values[field.name]
		errors[field.name] = false // first clear the error

		if (field.req == true && (typeof(value) == 'undefined' || value == '')) {
			errors[field.name] = true
		} else if (value != '' && typeof(field.validator) !== 'undefined' && field.validator(value) == false) {
			errors[field.name] = true
		}

		this.setState({ errors })
		this.props.onChange({ errors, values: this.state.values })
	}

	clear(field_num) {
		let errors = this.state.errors
		let values = this.state.values
		const field = this.state.fields[field_num]

		if (errors[field.name]) {
			values[field.name] = ''
		}
		errors[field.name] = false // first clear the error

		this.setState({ errors, values })
		this.props.onChange({ errors, values })
	}

	render() {

		return (
		<div>
		    { this.state.fields.map((field, i) => {

		    	return (
		    	<div key={i}>
				    <h2 className="input-title">{field.title}</h2>
				    <div className="form-input">
				      <Input onChange={value => this.setState({ 
						      	values: { ...this.state.values, [field.name]: value }
						      })}
				      		onBlur={() => this.checkReq(i)}
				      		onFocus={() => this.clear(i)}
				      		value={this.state.values[field.name]}
				      		placeholder={field.placeholder}
				      		error={this.state.errors[field.name]}
				      />
				    </div>
		    	</div>

			   	)
		    })}
		    <style jsx>{`
		      .form-input {
		        width: 255px;
		        height: 43px;
		        margin: 10px 0;
		      }
		      .input-title {
		        color: ${colors.darkGrey};
		        font-family: Avenir-Light;
		        font-size: 16px;
		        margin: 20px 0 0 0;
		      }
		    `}</style>
		</div>
		)
	}
}

export default Form
