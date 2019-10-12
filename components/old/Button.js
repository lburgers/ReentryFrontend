import React, { Component } from "react";
import colors from '../lib/colors'


class Button extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	pressedDown: false,
	  };
	}

	render() {
		const props = this.props
		return (
			<div className="container"
				 disabled={props.disabled}
				 onClick={props.onClick}
				 onMouseDown={() => this.setState({pressedDown: true})}
				 onMouseUp={() => this.setState({pressedDown: false})}>
				<span className="title">{props.title}</span>
				<style jsx>{`
					.container {
						border-radius: 3px;
						display: flex;
						height: 100%;
						flex: 1;
						opacity: ${this.state.pressedDown ? '0.8': '1.0'};
						justify-content: center;
						align-items: center;
						background-color: ${props.primary ? colors.blue : colors.grey};
					}
					.title {
						color: ${colors.white};
						font-size: ${this.state.pressedDown ? '11px': '13px'};
					}
			    `}</style>
			</div>
		)
	}
};

export default Button;