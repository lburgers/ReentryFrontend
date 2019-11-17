import React, { Component } from "react";
import Input from './Input';
import MultipleChoice from './MultipleChoice';
import Button from './Button';
import colors from '../lib/colors'

// TODO hide password

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {}
		}
		this.props.fields.map(field => {
			this.state[field.name] = ''
		})
		this.checkReq = this.checkReq.bind(this)
		this.clear = this.clear.bind(this)
		this.next = this.next.bind(this)
		this.back = this.back.bind(this)
		this.submit = this.submit.bind(this)
	}

	checkReq() {
		let filled_in = true
		let one_true = false
		let errors = {}
		this.props.fields.map(field => {
			if (field.req == true && (typeof(this.state[field.name]) == 'undefined' || this.state[field.name] == '')) {
				filled_in = false
				errors[field.name] = true
			} else if (this.state[field.name] != '' && typeof(field.validator) !== 'undefined' && field.validator(this.state[field.name]) == false) {
				filled_in = false
				errors[field.name] = true
			}
			if (this.state[field.name] == true || this.props.type == 'input') {
				one_true = true
			} 
		})
		this.setState({ errors })
		return filled_in && one_true
	}

	clear() {
		let state = {}
		if (this.props.type == 'input') {
			this.props.fields.map(field => {
				state[field.name] = ''
			})
		} else if (this.props.type == 'choice') {
			this.props.fields.map(field => {
				state[field.name] = false
			})
		}
		this.setState(state)
	}

	next() {
		if (this.checkReq()) {
			this.props.onNext(this.state)
		}
	}

	back() {
		this.props.onBack(this.state)
	}

	submit() {
		if (this.checkReq()) {
			this.props.onSubmit(this.state)
			this.clear()
		}
	}

	render() {
		const isSubmit = this.props.primaryButton == 'Submit'
		const isCancel = this.props.secondaryButton == 'Cancel'

		return (
			<div className="container">
				{this.props.title &&
					<h2>{this.props.title}</h2>
				}
				{this.props.type == 'input'	 &&
					this.props.fields.map(field => (
					<div key={field.name} className="field">
						<h3>{field.desc}</h3>
						<Input placeholder={field.placeholder}
							   onChange={value => this.setState({ [field.name]: value, errors: {} }) }
							   value={this.state[field.name]}
							   error={this.state.errors[field.name] == true}
						/>
					</div>
				))}
				{this.props.type == 'choice' &&
					<MultipleChoice choices={this.props.fields}  
									onChange={state => {
										this.setState(state)
									}}/>}
				<div className="buttons">
					{this.props.secondaryButton &&
					<div className="button">
						<Button onClick={isCancel ? this.clear : this.back} title={this.props.secondaryButton} primary={false} />
					</div>
					}
					{this.props.primaryButton &&
						<div className="button">
							<Button className="button"
									onClick={isSubmit ? this.submit : this.next}
									title={this.props.primaryButton}
									primary={true}
							/>
						</div>
					}
				</div>
		    <style jsx>{`
		      .container {
		      	width: 30vw;
		      }
		      .buttons {
		      	display: flex;
		      	flex: 1;
		      	justify-content: ${this.props.secondaryButton ? 'space-between' : 'flex-end'};
		      	align-items: center;
		      }
		      .button {
				height: 23px;
				width: 64px;

		      }
		      .field {
		      	margin-bottom: 35px;
		      }
		      h3 {
				font-size: 15px;
				color: ${colors.black};
		      }
		      h2 {
				font-size: 20px;
				margin-bottom: 25;
				color: ${colors.black};
		      }
		    `}</style>
			</div>
		)
	}
}

export default Form
