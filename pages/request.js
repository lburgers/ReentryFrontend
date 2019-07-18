import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Router, { withRouter } from 'next/router';
import withLayout from '../components/Layout';
import colors from '../lib/colors'
import Button from '../components/Button';
import MultiForm from '../components/MultiForm';
import db from '../services/db'

const description_from_stage = {
	'-1': 'Waiting for applicant to make account',
	'0': 'Waiting for applicant to accept request',
	'1': 'Awaiting additional information',
	'2': 'Awaiting signatures',
	'3': 'Form is completed and should be submitted',
}

const status_from_stage = {
	'-1': 'Pending',
	'0': 'Pending',
	'1': 'Half-complete',
	'2': 'Half-complete',
	'3': 'Completed',
}

const formReady = (state, other_user_type, viewRequest, deleteRequest) => {
	return (
	<div>
		<div className="request-header">
			<h2 className="request-name">{state.request[other_user_type + '_name']}</h2>
		</div>
		<div>
			<div className="request-row">
				<span>Status: {status_from_stage[state.request.stage]}</span>
			</div>
			<div className="request-row">
				<span>{description_from_stage[state.request.stage]}</span>
			</div>
			{state.request.stage > 0 && 
			<div>
				<div className="view-form-button">
					<Button
						title={"View 8850 Form"}
						primary={true}
						onClick={() => viewRequest('8850')}
					/>
				</div>
				<div className="view-form-button">
					<Button
						title={"View 9061 Form"}
						primary={true}
						onClick={() => viewRequest('9061')}
					/>
				</div>
			</div>}
			<div className="view-form-button">
				<Button
					title={"Delete Request"}
					primary={false}
					onClick={() => deleteRequest()}
				/>
			</div>
		</div>
		<style jsx>{`
			.request-header {
				border-color: ${colors.darkGrey};
				border-width: 0 0 1px 0;
				border-style: solid;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 25px;
			}
			.request-name {
				color: ${colors.black};
			}
			.view-form-button {
				width: 140px;
				height: 30px;
				margin-bottom: 15px;
			}
			.request-row {
				display: flex;
				flex-direction: row;
				margin-bottom: 20px;
				color: ${colors.darkGrey};
			}
		`}</style>
	</div>
	)
}

const acceptRequest = (name) => [
	{
		title: `Do you want to give information to ${name}?`,
		type: 'choice',
		fields: [
			{
				name: 'accept',
				title: 'Yes',
			},
			{
				name: 'decline',
				title: 'No',
			},
		],
		primaryButton: 'Submit',
		// secondaryButton: 'Cancel',
	}
]

class Request extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	request: {},
	  	error: null,
	  };
	}

	componentWillMount() {
		db.request.get(this.props.router.query.id)
			.then(request => {
				this.setState({ request })
			})
			.catch(error => this.setState({ error }))
	}

	viewRequest = (type) => {
		Router.push(`/viewform?id=${this.props.router.query.id}&type=${type}&token=${this.props.user.token}`)
	}

	deleteRequest = () => {
			if (window.confirm('Are you sure? this will delete the request from your employer.')) {
				db.request.delete(this.props.router.query.id)
					.then(() => {
						Router.push('/app')
					})
					.catch(error => this.setState({ error }))
			}
	}

	acceptRequest = (response) => {
		if (response.accept) {
			if (window.confirm('This will give your employer personal information. You should only proceed if the employer has offered to hire you.')) {
				db.request.update(this.props.router.query.id, {stage: 1})
					.then(request => {
						this.setState({ request })
					})
					.catch(error => this.setState({ error }))
			}
		} else if (response.decline) {
			this.deleteRequest()
		}
	}

	render() {
		const other_user_type = this.props.user_type == 'employer' ? 'employee' : 'employer'
		return(
		<div className="application">
			{this.state.error == null && (this.state.request.stage > 0 || this.props.user_type == 'employer') && formReady(this.state, other_user_type, this.viewRequest, this.deleteRequest)}
			{this.state.error == null && this.state.request.stage < 1 && this.props.user_type == 'employee' &&
				<div style={{display: 'flex', 'justifyContent': 'center'}}>
			      <MultiForm forms={acceptRequest(this.state.request[other_user_type + '_name'])}
			                 onSubmit={this.acceptRequest}
			      />
				</div>
			}
			{this.state.error !== null && 
				<div style={{display: 'flex', 'justifyContent': 'center'}}>
					<h2>Error: no request found</h2>
				</div>
			}
		</div>
		)
	}
}

const Page = withRouter(withLayout(Request))

const mapStateToProps = state => {
    return {
        user: state.user,
        user_type: state.user_type,
    };
};


export default connect(
  mapStateToProps,
  null,
)(Page)


