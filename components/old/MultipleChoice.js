import React, { Component } from "react";
import { connect } from 'react-redux'
import Link from 'next/link'
import colors from '../lib/colors'

const Choice = (props) => (
	<div key={props.choice.name} className="choice" onClick={props.onClick}>
		<span>{props.choice.title}</span>
	    <style jsx>{`
	    	.choice {
	    		height: 40px;
	    		border-radius: 5px;
	    		border-width: 1px;
	    		border-color: ${colors.blue};
	    		border-style: solid;
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				background-color: ${ props.selected ? colors.lightBlue : colors.white };
				margin-bottom: 15px; 
	    	}
			span {
				font-size: 14px;
				color: ${colors.blue};
			}
	   `}</style>
	</div>

)


class MultipleChoice extends Component {
	constructor(props) {
		super(props);
		let values = {}
		props.choices.map(choice => {
			values[choice.name] = false
		})
		this.state = {
			selectedIndex: null,
			values: values,
		}
		this.onClick = this.onClick.bind(this)
	}

	onClick(name) {
		let values = this.state.values
		this.props.choices.map(choice => {
			values[choice.name] = false
		})
		values[name] = true

		
		this.setState({ values })
		this.props.onChange(values)

	}

	render() {
		return (
			<div className="container">
				{this.props.title &&
					<h2>{this.props.title}</h2>
				}
				{this.props.choices.map((choice, i) => (
					<Choice key={i} choice={choice} selected={true == this.state.values[choice.name]} onClick={() => this.onClick(choice.name)}/>
				))}
			    <style jsx>{`
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

export default MultipleChoice