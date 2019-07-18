import React from 'react'
import Button from '../components/Button';
import withLayout from '../components/Layout';
import colors from '../lib/colors'
import Router, { withRouter } from 'next/router';
import db from '../services/db'

// TODO: display rest of information
// - potential refund
// - contact button
// - initiate offer button

class JobSeeker extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user: {},
	  	error: null,
	  };
	}

	componentWillMount() {
		db.employee.get(this.props.id)
			.then(user => this.setState({ user }))
			.catch(error => this.setState({ error }))
	}

	startRequest = () => {
		if (window.confirm('Are you in the process of hiring this jobseeker? The Work Opportuinity Tax Credit can only be filed for after a job offer has been made.')) {
			 Router.push(`/createRequest?id=${this.props.id}`)
		}
	}

	render() {
		return(
		<div className="application">
			{this.state.error == null &&
			<div>
				<div className="jobseeker-header">
					<h2 className="jobseeker-name">{this.state.user.first_name} {this.state.user.last_name}</h2>
					<div className="offer-button">
						<Button
							title={"Build Form"}
							primary={true}
							onClick={this.startRequest}
						/>
					</div>
				</div>
				<div className="jobseeker-content">
					<div className="jobseeker-row">
						<span>Location: {this.state.user.city}, {this.state.user.state} {this.state.user.zipcode}</span>
					</div>
					<div className="jobseeker-row">
						<span>Phonenumber: {this.state.user.phone_number}</span>
					</div>
					<div className="jobseeker-row">
						<span>Email: {this.state.user.email}</span>
					</div>
				</div>
			</div>}
			{this.state.error !== null && 
				<div style={{display: 'flex', 'justify-content': 'center'}}>
					<h2>Error: no jobseeker found</h2>
				</div>
			}
		<style jsx>{`
			.jobseeker-header {
				border-color: ${colors.darkGrey};
				border-width: 0 0 1px 0;
				border-style: solid;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 25px;
			}
			.jobseeker-name {
				color: ${colors.black};
			}
			.offer-button {
				width: 100px;
				height: 30px;
			}
			.jobseeker-row {
				display: flex;
				flex-direction: row;
				margin-bottom: 20px;
				color: ${colors.darkGrey};
			}
		`}</style>
		</div>
		)
	}
}

const Page = withLayout(JobSeeker)

Page.getInitialProps = async function(req) {
	return {
		id: req.query.id,
	};
};

export default Page