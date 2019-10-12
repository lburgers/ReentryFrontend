import React, { Component } from "react";
import colors from '../lib/colors'
import Form from './Form';
import Button from './Button';



class MultiForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      formState: {
	        values: {},
	        errors: {}
	      }
	    }
	    this.mergeForms = this.mergeForms.bind(this)

	    const allFields = [...props.form[0], ...props.form[1], ...props.form[2]]
	    for (var i = 0; i < allFields.length; i++) {
	      const field_name = allFields[i].name
	      if ((props.initialState || {})[field_name]) {
	        this.state.formState.values[field_name] = props.initialState[field_name]
	        this.state.formState.errors[field_name] = false
	      }
	    }
	}

	mergeForms(newFormState) {
	    const values = this.state.formState.values
	    const errors = this.state.formState.errors


	    this.setState({
	      formState: {
	        values: {...values, ...newFormState.values},
	        errors: {...errors, ...newFormState.errors},
	      }
	    })
	}

	submit() {
	    const values = this.state.formState.values
	    const errors = this.state.formState.errors
	    const allFields = [...this.props.form[0], ...this.props.form[1], ...this.props.form[2]]


	    let error = false
	    for (var i = 0; i < allFields.length; i++) {
	      const fieldName = allFields[i].name

	      if ((values[fieldName] || '').length == 0 ||
	            errors[fieldName] != false) {

	        if (fieldName != 'password' && fieldName != 'confirm_password') { // whitelist
	          error = true
	        }
	        
	      }
	    }

	    if ((values['password'] || '').length > 0 && values['password'] != values['confirm_password']) {
	      error = true
	    }

	    if (!error) {
	      const { confirm_password, ...userWithoutConfirm } = values
	      this.props.successCallback(userWithoutConfirm)
	    }
}


	render() {
		return (

		      <div className="info-container">
		        <h1 className="multiform-title">{this.props.title}</h1>

		        <div className="multiform-container">
		            <div className="multiform-column">
		              
		              <h1 className="multiform-subtitle">{this.props.headers[0]}</h1>
		              <Form fields={this.props.form[0]}
		                    onChange={this.mergeForms}
		                    initialState={this.props.initialState}
		              />
		            </div>

		            <div className="multiform-column">
		              <h1 className="multiform-subtitle">{this.props.headers[1]}</h1>
		              <Form fields={this.props.form[1]}
		                    onChange={this.mergeForms}
		                    initialState={this.props.initialState}
		              />

		              <div className="multiform-button">
		                <Button title={this.props.disabled ? "Loading.." : "Save"}
		                        onClick={() => this.submit()}
		                        disabled={this.props.disabled}
		                />
		              </div>
		            </div>

		            <div className="multiform-column">
		              <h1 className="multiform-subtitle">{this.props.headers[2]}</h1>
		              <Form fields={this.props.form[2]}
		                    onChange={this.mergeForms}
		                    initialState={this.props.initialState}
		              />
		            </div>
		            </div>
				    <style jsx>{`

			          .info-container { 
			            display: flex;
			            flex-direction: column;
			          }
			          .multiform-container { 
			            display: flex;
			            flex-direction: row;
			            justify-content: space-between;
			          }
			          .multiform-column:nth-of-type(2n) {
			            margin: 0 90px;
			          }
			          .multiform-title {
			            color: ${colors.secondary};
			            font-family: Avenir-Black;
			            font-size: 24px;
			            margin-bottom: 40px;
			          }
			          .multiform-subtitle {
			            color: ${colors.secondary};
			            font-family: Avenir-Black;
			            font-size: 18px;
			          }
			          .multiform-button {
			            margin-top: 45px;
			          }


				    `}</style>
		        </div>

			   	)
	}
}


export default MultiForm