import React, { Component } from "react";
import Form from './Form';
import Button from './Button';
import colors from '../lib/colors'


class MultiForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formIndex: 0,
			response: {},
		}
		this.next = this.next.bind(this)
		this.back = this.back.bind(this)
		this.submit = this.submit.bind(this)
	}

	next(form_values) {
		const current_form = this.props.forms[this.state.formIndex]
		let goTo = this.state.formIndex+1
		if (current_form.type == 'choice') {
			current_form.fields.map(form => {
				if (form_values[form.name] == true) {
					goTo = form.goTo
				}
			})
		}
		this.setState({
			formIndex: goTo,
			response: {...this.state.response, ...form_values}
		})
	}

	back() {
		let goTo = this.state.formIndex-1
		if (typeof(this.props.forms[this.state.formIndex].backTo) !== 'undefined') {
			goTo = this.props.forms[this.state.formIndex].backTo
		}
		this.setState({formIndex: goTo})
	}

	submit(form_values) {
		// callback with state
		if (!this.props.disabled) { // don't submit if still loading last request
			this.props.onSubmit({...this.state.response, ...form_values})
			this.setState({ response: {} })
		}
	}

	render() {
		return (
			<Form {...this.props.forms[this.state.formIndex]}
				  onSubmit={this.submit}
				  onNext={this.next}
				  onBack={this.back}
			/>
		)
	}
}

export default MultiForm
